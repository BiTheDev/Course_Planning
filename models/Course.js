import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  identifyCode: {
    type: String,
    required: [true, "Title is required."],
  },
  teachableInstructor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
  ],

  semesters: [{ type: Schema.Types.ObjectId, ref: "Semester" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
});

const Course = models.Course || model("Course", CourseSchema);
export default Course;
