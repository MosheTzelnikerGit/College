"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentsConroller_js_1 = require("../controllers/StudentsConroller.js"); // ייבוא נכון
const router = express_1.default.Router();
// נתיבים עבור ניהול סטודנטים
router.route('/getStudents').get(StudentsConroller_js_1.getStudents); // קבלת כל הסטודנטים
router.route('/addStudent').post(StudentsConroller_js_1.addStudent); // הוספת סטודנט
router.route('/students/:id').get(StudentsConroller_js_1.getStudentById); // קבלת סטודנט לפי ID
router.route('/students/:id').put(StudentsConroller_js_1.updateStudent); // עדכון סטודנט
router.route('/students/:id').delete(StudentsConroller_js_1.deleteStudent); // מחיקת סטודנט
router.route('/:id/grade').patch(StudentsConroller_js_1.addGrade); // הוספת ציונים לתלמיד
router.route('/:id/grade').get(StudentsConroller_js_1.getStudentAverage); // קבלת סטודנט לפי ID
// router.route('/students/:id/grade').patch(updateGrade); // עידכון ציון תלמיד - אם יש צורך לפעולה זו
exports.default = router;
