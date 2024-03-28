// api/course.js

import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";


export const PUT = async (request) => {
    try {
        const { courseId } = request.params;
        const { body } = request;
        await connectToDB();

        // Update the course with new data
        await Course.findByIdAndUpdate(courseId, body);

        return new Response(JSON.stringify({ message: 'Course updated successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};


