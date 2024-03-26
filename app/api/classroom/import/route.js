import { connectToDB } from "@/utils/mongodbUtil";
import Classroom from "@/models/Classroom";
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
        console.log("Received file: ", file);

        const classrooms = [];
        const fileStream = new Readable({
            read() { },
        });

        const reader = file.stream().getReader();

        const processText = ({ done, value }) => {
            if (done) {
                fileStream.push(null);
            } else {
                fileStream.push(value);
                reader.read().then(processText);
            }
        };
        reader.read().then(processText); // start the reading process

        return new Promise((resolve, reject) => {
            fileStream
                .pipe(csv())
                .on("data", (data) => {
                    console.log("CSV ROW:", data);
                    classrooms.push(data);
                })
                .on("end", async () => {
                    try {
                        const bulkOps = []; // Array to hold bulk operations
                        for (const classroom of classrooms) {
                            const existingClassroom = await Classroom.findOne({ building: classroom.building, room: classroom.room });

                            if (!existingClassroom) {
                                // insert a new classroom if not exists
                                bulkOps.push({
                                    insertOne: {
                                        document: {
                                            ...classroom,
                                            capacity: parseInt(classroom.capacity, 10), // Convert capacity from String to Number
                                            createdBy: admin._id,
                                            updatedBy: admin._id,
                                        }
                                    }
                                });
                            }
                        }
                        if (bulkOps.length > 0) {
                            // Execute all bulk operations
                            const result = await Classroom.bulkWrite(bulkOps);
                            console.log("Bulk write result: ", result);
                        } else {
                            console.log("No new coursed to add.");
                        }

                        resolve(new Response(JSON.stringify({ message: 'Operation completed successfully' }), { status: 200 }));
                    } catch (dbError) {
                        console.error("Database error during bulk operations:", dbError);
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
        console.error("Error uploading course file: ", error);
        return new Response(JSON.stringify({ error: " Server error" }),
            { status: 500, })
    }
};