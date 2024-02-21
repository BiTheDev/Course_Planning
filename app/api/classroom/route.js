import { connectToDB } from "@/utils/mongodbUtil";
import Classroom from "@/models/Classroom";
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const { name, capacity, location, adminName } = await request.json();

    try {
        await connectToDB();

        // Find admin by username
        const admin = await Admin.findOne({ username: adminName });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Create new classroom
        const newClassroom = await Classroom.create({
            name,
            capacity,
            location,
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        return new Response(JSON.stringify(newClassroom), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
