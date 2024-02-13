import { Schema, model, models } from 'mongoose';
const SemesterSchema = new Schema({
    term: {
        type: String,
        required : true
    },
});
const Semester = models.Semester || model('Semester', SemesterSchema);
export default Semester;