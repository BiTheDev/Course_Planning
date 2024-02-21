import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    identifyCode: {
      type: String,
      required: [true, 'Title is required.'],
  },
    registrationCode: {
      type: Number,
  },
  programs: [{ type: Schema.Types.ObjectId, ref: 'Program' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
});

const Course = models.Course || model('Course', CourseSchema);
export default Course;
