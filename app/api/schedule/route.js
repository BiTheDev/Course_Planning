import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Semester from "@/models/Semester";
import Schedule from "@/models/Schedule";
import ScheduleSet from "@/models/ScheduleSet";
import Classroom from "@/models/Classroom";

export const GET = async (request) => {
  // Extract programId and semesterId from query parameters
  const { programId, semesterId } = req.query;

  try {
    await connectToDB();

    // Fetch all ScheduleSets for the given program and semester
    /* const scheduleSets = await ScheduleSet.find({
      program: programId,
      semester: semesterId,
    })
      .populate({
        path: "schedules",
        model: "Schedule",
        populate: [
          { path: "course", model: "Course" },
          { path: "professor", model: "Instructor" },
          { path: "classroom", model: "Classroom" },
        ],
      })
      .exec(); */
    const scheduleSets = await ScheduleSet.find({
    program: programId,
    semester: semesterId,
    })
    .populate({
        path: "schedules",
        model: "Schedule",
    })
    .populate({
        path: "schedules.classroom",
        model: "Classroom",
    })
    .exec();

    return new Response(JSON.stringify({ scheduleSets }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
