import { Schema, model, models } from 'mongoose';

const ScheduleSetSchema = new Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
    required: true
  },
  schedules: [{
    type: Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  }],
  // You can add more fields as needed, for example, a description or a name for the schedule set.
});

const ScheduleSet = models.ScheduleSet || model('ScheduleSet', ScheduleSetSchema);

export default ScheduleSet;
