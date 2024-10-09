"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGrade = exports.getStudentAverage = exports.addGrade = exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentById = exports.getStudents = void 0;
const StudentsModel_js_1 = require("../models/StudentsModel.js"); // עדכון הייבוא של המודל
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield StudentsModel_js_1.Student.find({});
        res.status(200).json(students);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const student = yield StudentsModel_js_1.Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
});
exports.getStudentById = getStudentById;
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.body;
    try {
        const newStudent = new StudentsModel_js_1.Student(student);
        yield newStudent.save();
        res.status(201).json(newStudent);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
});
exports.addStudent = addStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedStudent = req.body;
    try {
        const student = yield StudentsModel_js_1.Student.findByIdAndUpdate(id, updatedStudent, { new: true });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedStudent = yield StudentsModel_js_1.Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json(deletedStudent);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
});
exports.deleteStudent = deleteStudent;
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id; // קבלת מזהה התלמיד מהפרמטרים
    const { course, grade } = req.body; // קבלת הקורס והציון מהגוף של הבקשה
    try {
        const student = yield StudentsModel_js_1.Student.findById(studentId); // חיפוש התלמיד לפי ID
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return; // הוצאת מהפונקציה במקרה שהתלמיד לא נמצא
        }
        // בדוק אם הקורס כבר קיים
        const courseEntry = student.courses.find(c => c.course === course);
        if (courseEntry) {
            // אם הקורס קיים, הוסף את הציון אליו
            courseEntry.grades.push(grade);
        }
        else {
            // אם הקורס לא קיים, הוסף רשומה חדשה לקורס
            student.courses.push({ course, grades: [grade] });
        }
        yield student.save(); // שמירת המסמך של התלמיד
        res.status(200).json({ message: 'Grade added successfully', student }); // החזרת תגובה
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error }); // החזרת תגובה במקרה של שגיאה
    }
});
exports.addGrade = addGrade;
const getStudentAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const student = yield StudentsModel_js_1.Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        // קריאה לפונקציה לחישוב ממוצע
        const average = student.calculateAverage();
        res.status(200).json({ average });
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
    }
});
exports.getStudentAverage = getStudentAverage;
const updateGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, course, grade } = req.body;
    try {
        const student = yield StudentsModel_js_1.Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        const courseToUpdate = student.courses.find(c => c.course === course);
        if (courseToUpdate) {
            courseToUpdate.grades.push(grade);
        }
        else {
            student.courses.push({ course, grades: [grade] });
        }
        yield student.save();
        res.status(200).json({ message: 'Grade updated successfully', student });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating grade' });
    }
});
exports.updateGrade = updateGrade;
