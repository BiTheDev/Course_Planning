import { Schema, model, models } from 'mongoose';

const CollegeSchema = new Schema({
  collegeName: {
    type: String,
    required: true,
  },
  majors: [{
    type: Schema.Types.ObjectId,
    ref: 'Major',
  }],
});

const College = models.College || model('College', CollegeSchema);
export default College;
