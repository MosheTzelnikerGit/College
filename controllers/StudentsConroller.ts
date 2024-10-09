import { Request, Response } from 'express';
import { Student } from '../models/StudentsModel.js'; // עדכון הייבוא של המודל

export const getStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const student = await Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return; 
        }
        res.status(200).json(student);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
};

export const addStudent = async (req: Request, res: Response): Promise<void> => {
    const student: { name: string; course: string; grade: number } = req.body;
    try {
        const newStudent = new Student(student);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const updatedStudent: Partial<{ name: string; course: string; grade: number }> = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return; 
        }
        res.status(200).json(student);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            res.status(404).json({ message: 'Student not found' });
            return; 
        }
        res.status(200).json(deletedStudent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
        }
    }
};



export const addGrade = async (req: Request, res: Response): Promise<void> => {
    const studentId = req.params.id; // קבלת מזהה התלמיד מהפרמטרים
    const { course, grade } = req.body; // קבלת הקורס והציון מהגוף של הבקשה

    try {
        const student = await Student.findById(studentId); // חיפוש התלמיד לפי ID
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return; // הוצאת מהפונקציה במקרה שהתלמיד לא נמצא
        }

        // בדוק אם הקורס כבר קיים
        const courseEntry = student.courses.find(c => c.course === course);
        if (courseEntry) {
            // אם הקורס קיים, הוסף את הציון אליו
            courseEntry.grades.push(grade);
        } else {
            // אם הקורס לא קיים, הוסף רשומה חדשה לקורס
            student.courses.push({ course, grades: [grade] });
        }

        await student.save(); // שמירת המסמך של התלמיד
        res.status(200).json({ message: 'Grade added successfully', student }); // החזרת תגובה
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error }); // החזרת תגובה במקרה של שגיאה
    }
};


 




export const getStudentAverage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        // קריאה לפונקציה לחישוב ממוצע
        const average = student.calculateAverage();
        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה לא ידועה התרחשה' });
    }
};

export const updateGrade = async (req: Request, res: Response): Promise<void> => {
    const { id, course, grade } = req.body;

    try {
        const student = await Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        const courseToUpdate = student.courses.find(c => c.course === course);
        if (courseToUpdate) {
            courseToUpdate.grades.push(grade);
        } else {
            student.courses.push({ course, grades: [grade] });
        }

        await student.save();
        res.status(200).json({ message: 'Grade updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating grade' });
    }
};
