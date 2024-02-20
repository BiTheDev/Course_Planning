import Admin from "@/models/Admin";
import { connectToDB } from "@/utils/mongodbUtil";

export const POST = async (request) => {
    const { username } = await request.json();

    try {
        await connectToDB();

        // Find the admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Respond with admin info (excluding sensitive fields)
        return new Response(JSON.stringify({ admin: { id: admin._id, username: admin.username, adminType: admin.adminType } }), { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};
