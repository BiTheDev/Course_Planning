import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const { name, teachableCourses, maxCourse, preferenceTime, instructorType, adminName } = await request.json();

    try {
        await connectToDB();

        // Find admin by username
        const admin = await Admin.findOne({ username: adminName });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Create new instructor
        const newInstructor = await Instructor.create({
            name,
            teachableCourses,
            maxCourse,
            preferenceTime,
            instructorType,
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        return new Response(JSON.stringify(newInstructor), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};