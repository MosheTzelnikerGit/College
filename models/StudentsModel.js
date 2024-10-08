"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StudentSchema = new mongoose_1.default.Schema({
    course: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('Student', StudentSchema);
