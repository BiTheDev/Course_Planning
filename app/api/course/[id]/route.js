import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
import Instructor from "@/models/Instructor";
export const PATCH = async (request, { params }) => {
    const { title, identifyCode, registrationCode , programs, adminId } = await request.json();
    try {
        await connectToDB();

        const updatedCourse = await Course.findByIdAndUpdate(params.id, {
            title,
            identifyCode,
            registrationCode,
            programs, // Array of program IDs
            updatedBy: adminId,
        }, { new: true });

        if (!updatedCourse) {
            return new Response(JSON.stringify({ error: 'Course not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedCourse), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }

};


export const GET = async (request, {params}) =>{
    try {
        await connectToDB();

        const getInstructorCourses = await Course.findById(params.id).populate("teachableInstructors");

        if (!getInstructorCourses) {
            return new Response(JSON.stringify({ error: 'Course id not found' }), { status: 404 });
        }


        return new Response(JSON.stringify(getInstructorCourses), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}