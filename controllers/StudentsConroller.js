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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentById = exports.getStudents = void 0;
const StudentsModel_1 = __importDefault(require("../models/StudentsModel")); // ייבוא נכון ללא סיומת .js
const getStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield StudentsModel_1.default.find({}); // שימוש במודל המיובא בצורה נכונה
        return students;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
});
exports.getStudents = getStudents;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield StudentsModel_1.default.findById(id);
        if (!student)
            throw new Error('Student not found');
        return student;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
});
exports.getStudentById = getStudentById;
const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudent = new StudentsModel_1.default(student);
        yield newStudent.save();
        return newStudent;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
});
exports.addStudent = addStudent;
const updateStudent = (id, updatedStudent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield StudentsModel_1.default.findByIdAndUpdate(id, updatedStudent, { new: true });
        if (!student)
            throw new Error('Student not found');
        return student;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStudent = yield StudentsModel_1.default.findByIdAndDelete(id);
        if (!deletedStudent)
            throw new Error('Student not found');
        return deletedStudent;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Unknown error occurred');
        }
    }
});
exports.deleteStudent = deleteStudent;
