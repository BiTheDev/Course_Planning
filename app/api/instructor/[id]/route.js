import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";

export const PATCH = async (request, { params }) => {
    const { name, teachableCourses, maxCourse, preferenceTime, preferenceDay, instructorType, adminId } = await request.json();
    try {
        await connectToDB();

        const updatedInstructor = await Instructor.findByIdAndUpdate(params.id, {
            name,
            teachableCourses,
            maxCourse,
            preferenceTime,
            preferenceDay,
            instructorType,
            updatedBy: adminId,
        }, { new: true });

        if (!updatedInstructor) {
            return new Response(JSON.stringify({ error: 'Instructor not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedInstructor), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
