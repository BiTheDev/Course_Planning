import { connectToDB } from "@/utils/mongodbUtil";
import Semester from "@/models/Semester";
import Course from "@/models/Course";
export const PUT = async (request, {params}) =>{
    const {courses} = await request.json();
    console.log(courses);
    try {
        await connectToDB();

        const addCourseToSemester = await Semester.findByIdAndUpdate(params.id, {$set: {courses}}, { new: true }).populate('courses');

        if (!addCourseToSemester) {
            return new Response(JSON.stringify({ error: 'Semester id not found' }), { status: 404 });
        }

        await Promise.all(courses.map(async (courseId) => {
            await Course.findByIdAndUpdate(courseId, { $addToSet: { semesters: params.id } });
        }));

        return new Response(JSON.stringify(addCourseToSemester), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}