import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Instructor from "@/models/Instructor";

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const getCourseInstructor = await Course.findById(params.id).populate("teachableInstructors");

        if (!getCourseInstructor) {
            return new Response(JSON.stringify({ error: 'Course id not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(getCourseInstructor), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};