import { connectToDB } from "@/utils/mongodbUtil";
import Program from "@/models/Program";
import Semester from "@/models/Semester";
import Schedule from "@/models/Schedule";
import ScheduleSet from "@/models/ScheduleSet";
import Classroom from "@/models/Classroom";

export default async function handler(req, res) {
    const { programId, semesterId, generatedSchedules } = req.body;
    console.log(generatedSchedules);
  try {
    await connectToDB();

    // Verify program and semester exist
    const program = await Program.findById(programId);
    const semester = await Semester.findById(semesterId);
    if (!program || !semester) {
      return new Response(JSON.stringify({ error: 'Program or Semester not found' }), { status: 404 });
    }

    // Create Schedule documents
    const scheduleDocuments = await Promise.all(
      generatedSchedules.map(async (generatedSchedule) => {
        // Split the room property to extract building and roomNumber
        const [building, roomNumber] = generatedSchedule.Room.split("-");

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
          course: generatedSchedule["Course"],
          professor: generatedSchedule["Prof"],
          startDay: generatedSchedule["Start Day"],
          startTime: generatedSchedule["Start Time"],
          endTime: generatedSchedule["End Time"],
          duration: generatedSchedule["Dur"],
          criteriaSatisfied: generatedSchedule["Criteria Satisfied"],
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

    return res.status(201).json({ success: "ScheduleSet created successfully", scheduleSet: newScheduleSet });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
}
}