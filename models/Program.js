import { Schema, model, models } from 'mongoose';

const ProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

const Program = models.Program || model('Program', ProgramSchema);
export default Program;
