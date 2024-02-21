import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    semester: { type: Schema.Types.ObjectId, ref: 'Semester' },
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
    schedule: {
      day: String,
      startTime: String,
      endTime: String,
    },

  // Additional fields can be added as needed
});

const Section = models.Section || model("Section", SectionSchema);
export default Section;
