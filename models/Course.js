import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

const Course = models.Course || model('Course', CourseSchema);
export default Course;
