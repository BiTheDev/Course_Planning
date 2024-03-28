import { connectToDB } from "@/utils/mongodbUtil";
import Classroom from "@/models/Classroom";

export const GET = async (request) => {
    try {
        await connectToDB();

        const classrooms = await Classroom.find({});
        return new Response(JSON.stringify(classrooms), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
