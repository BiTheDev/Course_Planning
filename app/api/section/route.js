// pages/api/section.js
import { connectToDB } from "@/utils/mongodbUtil";
import Section from "@/models/Section";

export const GET = async (request) => {
  try {
    await connectToDB();

    const sections = await Section.find({});
    return new Response(JSON.stringify({ sections }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
