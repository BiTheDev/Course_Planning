import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Semester from "@/models/Semester";
import Instructor from "@/models/Instructor";
export const GET = async (request) => {
    try {
        await connectToDB();

        const courses = await Course.find({}).populate("semesters").populate("teachableInstructor");
        return new Response(JSON.stringify(courses), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};

