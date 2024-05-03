import { connectToDB } from "@/utils/mongodbUtil";
import Section from "@/models/Section";


export const DELETE = async (request) => {
  try {
    const { sectionId } = request.params;
    await connectToDB();

    // Delete the section
    await Section.findByIdAndDelete(sectionId);

    return new Response(JSON.stringify({ message: 'Section deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
