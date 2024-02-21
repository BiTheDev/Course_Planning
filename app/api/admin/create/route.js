import Admin from "@/models/Admin";
import { connectToDB } from "@/utils/mongodbUtil";

export const POST = async (request) => {
    const { username, adminType, createdBy } = await request.json();

    try {
        await connectToDB();
        const newAdmin = new Admin({ username, adminType, createdBy });

        // Optional: Check if the creator is a Super Admin for Regular admin creation
        if (createdBy) {
            const creatorAdmin = await Admin.findById(createdBy);
            if (!creatorAdmin || creatorAdmin.adminType !== 'Super') {
                return new Response(JSON.stringify({ error: 'Only Super Admins can create new admins.' }), { status: 403 });
            }
        }

        await newAdmin.save();
        return new Response(JSON.stringify(newAdmin), { status: 201 });
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        return new Response(JSON.stringify({ error: 'Failed to create a new admin' }), { status: 500 });
    }
};