import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";

export const GET = async (request) => {
    try {
        await connectToDB();

        const instructors = await Instructor.find({})
        return new Response(JSON.stringify(instructors), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
