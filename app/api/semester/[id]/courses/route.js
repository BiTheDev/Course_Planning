import { connectToDB } from "@/utils/mongodbUtil";
import Semester from "@/models/Semester";
import Course from "@/models/Course";

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const getSemesterCourses = await Semester.findById(params.id).populate('courses');

        if (!getSemesterCourses) {
            return new Response(JSON.stringify({ error: 'Semester id not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(getSemesterCourses), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};