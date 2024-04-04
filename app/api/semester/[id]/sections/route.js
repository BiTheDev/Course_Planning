// pages/api/section.js
import { connectToDB } from "@/utils/mongodbUtil";
import Section from "@/models/Section";
import Semester from "@/models/Semester";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const semesterSections = await Semester.findById(params.id).populate("sections");
    return new Response(JSON.stringify({ semesterSections }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
