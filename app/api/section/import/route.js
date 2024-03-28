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
    const semesterInfo = headersList.get("semester");
    const admin = await Admin.findOne({ username: adminName });
    if (!admin) {
      return new Response(JSON.stringify({ error: "Admin not found" }), {
        status: 404,
      });
    }
    const semester = await Semester.findOne({term: semesterInfo});
    if (!semester) {
        console.error("Semester not found or specified logic to identify semester is missing.");
        return new Response(JSON.stringify({ error: "Semester not found" }), { status: 404 });
      }


    const form = await request.formData();
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
          const operation = processRow(data, admin);
          rowOperations.push(operation);
        })
        .on("end", () => {
          // After all rows have been processed, wait for all operations to complete
          Promise.all(rowOperations)
            .then(async(sections) => {
                semester.sections.push(...sections.map(s => s._id));
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
    console.error("Error uploading course file:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};

// Define processRow to process each CSV row
async function processRow(data, admin) {
  try {
    // Check if the course exists, if not, add it
    let course = await Course.findOne({ identifyCode: data["Course #"] });
    if (!course) {
      course = await Course.create({
        title: data["Course title"],
        identifyCode: data["Course #"],
        // Add other course details here
        createdBy: admin._id,
        updatedBy: admin._id,
      });
    }

    // Check if the instructor exists, if not, add them
    let instructor = await Instructor.findOne({ name: data.Prof.trim() });
    if (!instructor) {
      instructor = await Instructor.create({
        name: data.Prof.trim(),
        // Add other instructor details here
        createdBy: admin._id,
        updatedBy: admin._id,
      });
    }

    const timePreferences = data.Time.split(',').map(time => time.trim());
    const dayPreferences = data.Day.split(',').map(day=> day.trim());

    // Determine if the course title contains "Recitation"
    const isLab = data['Course Title'].includes('Recitation');
    // Set duration based on whether it's a lab
    const duration = isLab ? 100 : 200;

    // Create the section with references to the course and instructor
    const section = await Section.create({
      course: course._id,
      instructor: instructor._id,
      preference: timePreferences,
      day_pref: dayPreferences,
      lab:isLab,
      duration:duration,
      createdBy: admin._id,
      updatedBy:admin._id
    });

    // Return the section for logging or further processing if needed
    return section;
  } catch (error) {
    // If an error occurs, log it and throw to allow the calling function to handle it
    console.error("Error processing row:", error);
    throw error;
  }
}
