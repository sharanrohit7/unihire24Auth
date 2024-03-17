"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const employerSchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    industry: String,
    employees: {
        type: Number,
        default: 0,
    },
    gst: String,
    pan: String,
    otherDocType: {
        type: Map,
        of: String,
    },
    location: {
        address: String,
        city: String,
        state: String,
        zip: String,
    },
    website: String,
    logo: String,
    is_premium: {
        type: Boolean,
        default: false
    },
});
// Create the Employer model
const Employer = mongoose_1.default.model('Employer', employerSchema);
exports.default = Employer;
