import Student from '../models/StudentsModel'; // ייבוא נכון ללא סיומת .js

export const getStudents = async () => {
    try {
        const students = await Student.find({}); // שימוש במודל המיובא בצורה נכונה
        return students;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export const getStudentById = async (id: string) => { // הגדרת סוג id כ- string
    try {
        const student = await Student.findById(id);
        if (!student) throw new Error('Student not found');
        return student;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export const addStudent = async (student: { name: string, course: string, grade: number }) => { // הגדרת סוג השדה של student
    try {
        const newStudent = new Student(student);
        await newStudent.save();
        return newStudent;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export const updateStudent = async (id: string, updatedStudent: Partial<{ name: string, course: string, grade: number }>) => { // שימוש ב-Partial
    try {
        const student = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });
        if (!student) throw new Error('Student not found');
        return student;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export const deleteStudent = async (id: string) => { // הגדרת סוג id כ-string
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) throw new Error('Student not found');
        return deletedStudent;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};
