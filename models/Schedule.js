import { Schema, model, models } from 'mongoose';

const ScheduleSchema = new Schema({
  course: {
    type:String
  },
  professor: {
    type:String
  },
  startDay: {
    type: String,
    required: true
  }, 
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  criteriaSatisfied: {
    type: Boolean,
    required: true
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
  },
}); // Adds createdAt and updatedAt timestamps

const Schedule = models.Schedule || model('Schedule', ScheduleSchema);

export default Schedule;
