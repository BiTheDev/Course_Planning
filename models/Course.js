import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    semesters: [{
        type: Schema.Types.ObjectId,
        ref: 'Semester',
    }],
    classroom: {
        type: Schema.Types.ObjectId,
        ref: 'Classroom',
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
    }],
});

const Course = models.Course || model('Course', CourseSchema);
export default Course;
