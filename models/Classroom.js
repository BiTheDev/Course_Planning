import { Schema, model, models } from 'mongoose';

const ClassroomSchema = new Schema({
    building: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    features: [String], // List of features e.g., 'projector', 'whiteboard'
    availability: [{
        day: String,
        startTime: String, // Consider using Date or a specific time format
        endTime: String,   // Consider using Date or a specific time format
    }],
    // Additional fields can be added as needed
});

const Classroom = models.Classroom || model('Classroom', ClassroomSchema);
export default Classroom;
