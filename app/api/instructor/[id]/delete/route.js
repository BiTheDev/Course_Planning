import { connectToDB } from "@/utils/mongodbUtil";
import Instructor from "@/models/Instructor";


export const DELETE = async (request) => {
    try {
        const { instructorId } = request.params;
        await connectToDB();

        // Delete the instructor
        await Instructor.findByIdAndDelete(instructorId);

        return new Response(JSON.stringify({ message: 'Instructor deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
