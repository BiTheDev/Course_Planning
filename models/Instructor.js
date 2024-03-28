import { Schema, model, models } from "mongoose";

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teachableCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  maxCourse: {
    type: Number,
  },
  preferenceTime: [
    {
      type: String,
    },
  ],

  preferenceDay: [
    {
      type: String,
    },
  ],

  instructorType: {
    type: String,
    enum: ["Full-Time", "Part-Time"],
    default: "Full-Time",
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
});

const Instructor = models.Instructor || model("Instructor", InstructorSchema);
export default Instructor;
