import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Instructor from "@/models/Instructor"; // Import the Instructor model

export const PUT = async (request, { params }) => {
    const { instructors } = await request.json();
    try {
        await connectToDB();

        // Update the course with the new instructors
        const updatedCourse = await Course.findByIdAndUpdate(
            params.id,
            { $addToSet: { teachableInstructors: instructors } },
            { new: true }
        );

        if (!updatedCourse) {
            return new Response(JSON.stringify({ error: 'Course not found' }), { status: 404 });
        }

        // Update each instructor with the new teachable course
        await Promise.all(instructors.map(async (instructorId) => {
            await Instructor.findByIdAndUpdate(instructorId, { $addToSet: { teachableCourses: params.id } });
        }));

        return new Response(JSON.stringify(updatedCourse), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
