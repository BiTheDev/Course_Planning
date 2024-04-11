import { Schema, model, models } from 'mongoose';

const ProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  semesters: [{
    type: Schema.Types.ObjectId,
    ref: 'Semester',
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
});

const Program = models.Program || model('Program', ProgramSchema);
export default Program;
