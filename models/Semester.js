import { Schema, model, models } from "mongoose";
const SemesterSchema = new Schema({
  term: {
    type: String,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: "Program",
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const Semester = models.Semester || model("Semester", SemesterSchema);
export default Semester;
