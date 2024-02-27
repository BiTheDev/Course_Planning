import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Admin from "@/models/Admin";
import csv from "csv-parser";
import { Readable } from "stream";
import { headers as nextHeaders } from "next/headers";

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
    const file = form.get("file");
    console.log("Received file:", file);

    const courses = []; // To store parsed CSV data

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
          console.log("CSV Row:", data);
          courses.push(data);
        })
        .on("end", async () => {
            try {
                const bulkOps = []; // Array to hold bulk operations
            
                for (const course of courses) {
                  const existingCourse = await Course.findOne({ identifyCode: course.identifyCode });
                  
                  if (!existingCourse) {
                    // If the course doesn't exist, prepare to insert it
                    bulkOps.push({
                      insertOne: {
                        document: {
                          ...course,
                          maxSections: parseInt(course.maxSections, 10), // Convert maxSections from String to Number
                          createdBy: admin._id,
                          updatedBy: admin._id,
                        }
                      }
                    });
                  } // Optionally, else block for updating existing documents or other operations
                }
            
                if (bulkOps.length > 0) {
                  // Execute all bulk operations
                  const result = await Course.bulkWrite(bulkOps);
                  console.log("Bulk write result:", result);
                } else {
                  console.log("No new courses to add.");
                }
            
                resolve(new Response(JSON.stringify({ message: 'Operation completed successfully' }), { status: 200 }));
              } catch (dbError) {
                console.error("Database error during bulk operation:", dbError);
                reject(new Response(JSON.stringify({ error: 'Database error', detail: dbError }), { status: 500 }));
              }
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