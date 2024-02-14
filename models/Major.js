import { Schema, model, models } from 'mongoose';

const MajorSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

const Major = models.Major || model('Major', MajorSchema);
export default Major;
