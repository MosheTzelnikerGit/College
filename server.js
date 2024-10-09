"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const StudentsRoutes_js_1 = __importDefault(require("./routes/StudentsRoutes.js"));
dotenv_1.default.config();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
// חיבור למסד הנתונים
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// הוספת מסלולים
app.use('/students', StudentsRoutes_js_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app; // for testing purposes only, remove in a real scenario.
