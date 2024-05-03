import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Instructor from "@/models/Instructor";
import Section from "@/models/Section";
import Admin from "@/models/Admin";
import csv from "csv-parser";
import { Readable } from "stream";
import { headers as nextHeaders } from "next/headers";
import Semester from "@/models/Semester";

export const POST = async (request) => {
  try {
    await connectToDB();
    const headersList = nextHeaders();
    const adminName = headersList.get("x-admin-name");
    const admin = await Admin.findOne({ username: adminName });
    if (!admin) {
      return new Response(JSON.stringify({ error: "Admin not found" }), {
        status: 404,
      });
    }
    const form = await request.formData();
    const semesterId = form.get("semesterId");
    const semester = await Semester.findById(semesterId);
    if (!semester) {
      console.error(
        "Semester not found or specified logic to identify semester is missing."
      );
      return new Response(JSON.stringify({ error: "Semester not found" }), {
        status: 404,
      });
    }

    const file = form.get("file");
    console.log("Received file:", file);

    const rowOperations = []; // To store parsed CSV data

    const fileStream = new Readable({
      read() {},
    });

    const reader = file.stream().getReader();

    const processText = ({ done, value }) => {
      if (done) {
        fileStream.push(null); // No more data
      } else {
        fileStream.push(value); // Push the chunk
        reader.read().then(processText); // Continue reading
      }
    };

    reader.read().then(processText); // Start the reading process

    // Return a new Promise that resolves when the CSV has been fully processed
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on("data", (data) => {
          // Process each row by pushing its operation (as a promise) into the rowOperations array
          const operation = processRow(data, admin, semesterId);
          rowOperations.push(operation);
        })
        .on("end", () => {
          // After all rows have been processed, wait for all operations to complete
          Promise.all(rowOperations)
            .then(async (sections) => {
              semester.sections.push(...sections.map((s) => s._id));
              await semester.save();
              console.log("All rows have been processed successfully.");
              resolve(
                new Response(
                  JSON.stringify({
                    message: "Operation completed successfully",
                  }),
                  { status: 200 }
                )
              );
            })
            .catch((dbError) => {
              console.error("Database error during processing:", dbError);
              reject(
                new Response(
                  JSON.stringify({ error: "Database error", detail: dbError }),
                  { status: 500 }
                )
              );
            });
        })
        .on("error", (streamError) => {
          console.error("Stream error:", streamError);
          reject(
            new Response(
              JSON.stringify({ error: "Stream error", detail: streamError }),
              { status: 500 }
            )
          );
        });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};

// Define processRow to process each CSV row
async function processRow(data, admin, semesterId) {
  try {
    // Update or create the instructor with preferenceTime and preferenceDay
    let instructor = await Instructor.findOneAndUpdate(
      { name: data.Prof.trim() },
      {
        $setOnInsert: {
          name: data.Prof.trim(),
          createdBy: admin._id,
          updatedBy: admin._id,
        },
        $addToSet: {
          preferenceTime: {
            $each: data.Time.split(",").map((time) => time.trim()),
          },
          preferenceDay: {
            $each: data.Day.split(",").map((day) => day.trim()),
          },
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    // Update or create the course and link it with the instructor and semester
    let course = await Course.findOneAndUpdate(
      { identifyCode: data["Course #"].trim() },
      {
        $setOnInsert: {
          title: data["Course title"],
          identifyCode: data["Course #"].trim(),
          createdBy: admin._id,
          updatedBy: admin._id,
        },
        $addToSet: {
          teachableInstructors: instructor._id,
          semesters: semesterId,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    // Ensuring instructor is linked to the course
    await Instructor.updateOne(
      { _id: instructor._id },
      { $addToSet: { teachableCourses: course._id } }
    );

    const timePreferences = data.Time.split(",").map((time) => time.trim());
    const dayPreferences = data.Day.split(",").map((day) => day.trim());

    // Determine if the course title contains "Recitation"
    const isLab = data["Course Title"].includes("Recitation");
    // Set duration based on whether it's a lab
    const duration = isLab ? 100 : 200;

    // Create the section with references to the course and instructor
    const section = await Section.create({
      courseCode: data["Course #"],
      courseTitle: data["Course Title"],
      professor: data["Prof"],
      pref_time: timePreferences,
      pref_day: dayPreferences,
      lab: isLab,
      duration: duration,
      students: data["Cap"],
      createdBy: admin._id,
      updatedBy: admin._id,
    });

    return section;
  } catch (error) {
    console.error("Error processing row:", error);
    throw error;
  }
}
