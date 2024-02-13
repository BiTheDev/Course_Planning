import { Schema, model, models } from 'mongoose';

const InstructorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    teachableCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
    }],
    maxCourse: {
        type: Number,
    },
    preferenceTime: [{
        type: String,
    }],
    instructorType: {
        type: String,
        enum: ['Full-Time', 'Part-Time'],
        default: 'Full-Time'
    },
});

const Instructor = models.Instructor || model('Instructor', InstructorSchema);
export default Instructor;
