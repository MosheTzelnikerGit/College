import mongoose, { Document, Schema } from "mongoose";

// הגדרת טיפוס לסטודנט
interface IGrade {
    course: string;
    grades: number[];
}

interface IStudent extends Document {
    name: string;
    courses: IGrade[];
    calculateAverage: () => number; // הוספת הפונקציה כאן
}

// הגדרת הסכמה
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courses: [
        {
            course: { type: String, required: true },
            grades: { type: [Number], default: [] } // מערך של ציונים לכל קורס
        }
    ]
});

// הוספת method לחישוב ממוצע הציונים
StudentSchema.methods.calculateAverage = function (): number {
    let totalGrades = 0;
    let gradeCount = 0;

    // מעבר על כל הקורסים והציונים
    this.courses.forEach((course: { grades: number[] }) => {
        course.grades.forEach((grade: number) => {
            totalGrades += grade;
            gradeCount++;
        });
    });

    // חישוב ממוצע
    return gradeCount > 0 ? totalGrades / gradeCount : 0;
};

// ייצוא המודל
export const Student = mongoose.model<IStudent>("Student", StudentSchema);
