import express from 'express';
import { 
    getStudents, 
    addStudent, 
    getStudentById, 
    updateStudent, 
    deleteStudent, 
    updateGrade,
    getStudentAverage,
    addGrade // ייבוא הפונקציה לעדכון ציונים
} from '../controllers/StudentsConroller.js'; // ייבוא נכון

const router = express.Router();

// נתיבים עבור ניהול סטודנטים
router.route('/getStudents').get(getStudents); // קבלת כל הסטודנטים
router.route('/addStudent').post(addStudent); // הוספת סטודנט
router.route('/students/:id').get(getStudentById); // קבלת סטודנט לפי ID
router.route('/students/:id').put(updateStudent); // עדכון סטודנט
router.route('/students/:id').delete(deleteStudent); // מחיקת סטודנט
router.route('/:id/grade').patch(addGrade); // הוספת ציונים לתלמיד
router.route('/:id/grade').get(getStudentAverage); // קבלת סטודנט לפי ID


// router.route('/students/:id/grade').patch(updateGrade); // עידכון ציון תלמיד - אם יש צורך לפעולה זו

export default router;
