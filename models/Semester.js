import { Schema, model, models } from 'mongoose';
const SemesterSchema = new Schema({
    term: {
        type: String,
        required : true
    },
    programs: [{
        type: Schema.Types.ObjectId,
        ref: 'Program',
      }],

});
const Semester = models.Semester || model('Semester', SemesterSchema);
export default Semester;