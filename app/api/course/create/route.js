import { connectToDB } from "@/utils/mongodbUtil";
import Course from "@/models/Course";
// import Semester from "@/models/Semester";
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const {identifyCode, maxSections,semesterIds, adminName } = await request.json();

    try {
        await connectToDB();

        // Find admin by username
        const admin = await Admin.findOne({ username: adminName });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Create new course
        const newCourse = await Course.create({
            // title,
            identifyCode,
            maxSections,
            semesters: semesterIds,
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        // Update each selected semester to include the new course
        // await Promise.all(semesterIds.map(async (semesterId) => {
        //     await Semester.findByIdAndUpdate(semesterId, { $addToSet: { courses: newCourse._id } });
        // }));

        return new Response(JSON.stringify(newCourse), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};