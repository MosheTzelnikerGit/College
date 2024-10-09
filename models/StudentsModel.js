"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// הגדרת הסכמה
const StudentSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    courses: [
        {
            course: { type: String, required: true },
            grades: { type: [Number], default: [] } // מערך של ציונים לכל קורס
        }
    ]
});
// הוספת method לחישוב ממוצע הציונים
StudentSchema.methods.calculateAverage = function () {
    let totalGrades = 0;
    let gradeCount = 0;
    // מעבר על כל הקורסים והציונים
    this.courses.forEach((course) => {
        course.grades.forEach((grade) => {
            totalGrades += grade;
            gradeCount++;
        });
    });
    // חישוב ממוצע
    return gradeCount > 0 ? totalGrades / gradeCount : 0;
};
// ייצוא המודל
exports.Student = mongoose_1.default.model("Student", StudentSchema);
