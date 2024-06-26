import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const { title, adminName } = await request.json();
    console.log(title);
    try {
        await connectToDB();

        // Verify admin exists
        const admin = await Admin.findOne({username: adminName});
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        const newProgram = await Program.create({
            title,
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        console.log(newProgram);

        return new Response(JSON.stringify(newProgram), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};

// Include a PUT method if you want to handle updates as well
