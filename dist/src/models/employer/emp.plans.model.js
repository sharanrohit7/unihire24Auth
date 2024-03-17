"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var employerPlansSchema = new Schema({
    title: String,
    value: Number,
    description: {
        type: [JSON]
    }
});
const employerPlans = mongoose_1.default.model('employerPlansSchema', employerPlansSchema);
exports.default = employerPlans;
