import { connectToDB } from "@/utils/mongodbUtil";
import Section from "@/models/Section";

export const PUT = async (request) => {
  try {
    const { sectionId } = request.params;
    const { body } = request;
    await connectToDB();

    // Update the section with new data
    await Section.findByIdAndUpdate(sectionId, body);

    return new Response(JSON.stringify({ message: 'Section updated successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};

