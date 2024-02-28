import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";

export const GET = async (request) => {
    try {
        await connectToDB();

        // Retrieve all programs from the database
        const programs = await Program.find({}); 

        return new Response(JSON.stringify(programs), { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};