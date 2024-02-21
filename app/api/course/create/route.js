import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Program from "@/models/Program";
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const { title, identifyCode, registrationCode, programs, adminName } = await request.json();

    try {
        await connectToDB();

        // Find admin by username
        const admin = await Admin.findOne({ username: adminName });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Create new course
        const newCourse = await Course.create({
            title,
            identifyCode,
            registrationCode,
            programs, // Array of selected program IDs
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        // Update each selected program to include the new course
        await Promise.all(programs.map(async (programId) => {
            await Program.findByIdAndUpdate(programId, { $addToSet: { courses: newCourse._id } });
        }));

        return new Response(JSON.stringify(newCourse), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
