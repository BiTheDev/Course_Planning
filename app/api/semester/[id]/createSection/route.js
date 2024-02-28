import { connectToDB } from "@/utils/mongodbUtil";
import Section from "@/models/Section";
import Semester from "@/models/Semester";
import Admin from "@/models/Admin";

export const POST = async(request, {params}) =>{
    try {
        await connectToDB();
        const { section, adminName } = await request.json();

        const admin = await Admin.findOne({username: adminName});
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
        }
    
        // Create the new Section
        const newSection = await Section.create({
          ...section,
          createdBy: admin._id,
        });
        // Add the new section to the Semester
        const updatedSemester = await Semester.findByIdAndUpdate(
          params.id,
          { $push: { sections: newSection._id } },
          { new: true }
        ).populate('sections');
    
    
        return new Response(JSON.stringify(updatedSemester), { status: 201 });
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
      }
}