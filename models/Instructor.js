import { Schema, model, models } from "mongoose";

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  teachableCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
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

  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
});

const Instructor = models.Instructor || model("Instructor", InstructorSchema);
export default Instructor;
