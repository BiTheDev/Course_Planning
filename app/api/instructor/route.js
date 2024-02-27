import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";
<<<<<<< HEAD
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

export const PUT = async (request) => {
    const { name, teachableCourses, maxCourse, preferenceTime, instructorType, adminName } = await request.json();

    try {
        await connectToDB();

        // Find admin by username
        const admin = await Admin.findOne({ username: adminName });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Update existing instructor
        const updatedInstructor = await Instructor.findByIdAndUpdate(id, {
            name,
            teachableCourses,
            maxCourse,
            preferenceTime,
            instructorType,
            updatedBy: admin._id,
        }, { new: true });

        if (!updatedInstructor) {
            return new Response(JSON.stringify({ error: 'Instructor not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedInstructor), { status: 200 });
=======

export const GET = async (request) => {
    try {
        await connectToDB();

        const instructors = await Instructor.find({})
        return new Response(JSON.stringify(instructors), { status: 200 });
>>>>>>> 5e1970d (added api/instructors; updated instructor components; updated settings)
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
