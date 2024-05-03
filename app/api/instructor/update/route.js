import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";


export const PUT = async (request) => {
    try {
        const { instructorId } = request.params;
        const { body } = request;
        await connectToDB();

        // Update the instructor with new data
        await Instructor.findByIdAndUpdate(instructorId, body);

        return new Response(JSON.stringify({ message: 'Instructor updated successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};

