import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Semester from "@/models/Semester";

export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const getProgramSemester = await Program.findById(params.id).populate('semesters');

        if (!getProgramSemester) {
            return new Response(JSON.stringify({ error: 'Program id not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(getProgramSemester), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};