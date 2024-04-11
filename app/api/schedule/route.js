// pages/api/generateScheduleSet.js
import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Semester from "@/models/Semester";
import Schedule from "@/models/Schedule";
import ScheduleSet from "@/models/ScheduleSet";
import Classroom from "@/models/Classroom";

export const POST = async (request) => {
  const { programId, semesterId, generatedSchedules } = req.body;

  try {
    await connectToDB();

    // Verify program and semester exist
    const program = await Program.findById(programId);
    const semester = await Semester.findById(semesterId);
    if (!program || !semester) {
      return res.status(404).json({ error: "Program or Semester not found" });
    }

    // Create Schedule documents
    const scheduleDocuments = await Promise.all(
      generatedSchedules.map(async (generatedSchedule) => {
        // Split the room property to extract building and roomNumber
        const [building, roomNumber] = generatedSchedule.room.split("-");

        // Find the matching Classroom
        const classroom = await Classroom.findOne({ building, roomNumber });
        if (!classroom) {
          // Handle the case where no matching classroom is found
          console.error(
            `No matching classroom found for ${generatedSchedule.room}`
          );
          return null; // Or handle differently based on your requirements
        }

        // Create the Schedule document with a reference to the found Classroom
        return Schedule.create({
          course: generatedSchedule.course,
          professor: generatedSchedule.professor,
          startDay: generatedSchedule.startDay,
          startTime: generatedSchedule.startTime,
          endTime: generatedSchedule.endTime,
          duration: generatedSchedule.duration,
          criteriaSatisfied: generatedSchedule.criteriaSatisfied,
          classroom: classroom._id, // Reference the Classroom document
        });
      })
    );
    // Create a new ScheduleSet with references to the created schedules, program, and semester
    const newScheduleSet = await ScheduleSet.create({
      program: programId,
      semester: semesterId,
      schedules: scheduleDocuments.map((doc) => doc._id),
    });

    semester.scheduleSet.push(newScheduleSet._id);
    await semester.save();

    return res
      .status(201)
      .json({
        success: "ScheduleSet created successfully",
        scheduleSet: newScheduleSet,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// pages/api/getScheduleSets.js
import { connectToDB } from "@/utils/mongodbUtil";
import ScheduleSet from "@/models/ScheduleSet";
export const GET = async (request) => {
  // Extract programId and semesterId from query parameters
  const { programId, semesterId } = req.query;

  try {
    await connectToDB();

    // Fetch all ScheduleSets for the given program and semester
    const scheduleSets = await ScheduleSet.find({
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
      .exec();

    if (!scheduleSets.length) {
      return res
        .status(404)
        .json({
          error: "No schedule sets found for the given program and semester.",
        });
    }

    return res.status(200).json(scheduleSets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
