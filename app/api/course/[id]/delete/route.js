
import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";


export const DELETE = async (request) => {
    try {
        const { courseId } = request.params;
        await connectToDB();

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return new Response(JSON.stringify({ message: 'Course deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
