import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        course: { // אם השדה הוא עבור קורס או משהו כזה
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        grade: { // תיקון השגיאה
            type: Number,
            required: true
        }
    }
);

export default mongoose.model('Student', StudentSchema);
