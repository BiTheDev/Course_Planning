import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Semester from "@/models/Semester"; // Assuming you have a separate model for Semesters
import Admin from "@/models/Admin";

export const POST = async (request) => {
    const { term, programId, adminName } = await request.json();

    try {
        await connectToDB();

        // Verify admin exists
        const admin = await Admin.findOne({username: adminName});
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }

        // Find the program to add the semester to
        const program = await Program.findById(programId);
        if (!program) {
            return new Response(JSON.stringify({ error: 'Program not found' }), { status: 404 });
        }

        // Create a new semester
        const newSemester = await Semester.create({
            term,
            program : programId,
            createdBy: admin._id,
            updatedBy: admin._id,
        });

        // Add the new semester to the program's semesters array
        program.semesters.push(newSemester._id);
        await program.save();

        return new Response(JSON.stringify({ success: 'Semester created successfully', semester: newSemester }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};