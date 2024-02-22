import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";

export const GET = async (request) => {
    try {
        await connectToDB();

        const courses = await Course.find({}).populate('programs'); // Assuming 'programs' is the field in Course schema that references Program documents
        return new Response(JSON.stringify(courses), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
