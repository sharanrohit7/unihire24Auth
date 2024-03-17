"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const candidateProfileSchema = new Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    profile_photo: {
        type: String,
        default: null
    },
    education: {
        type: [{ type: Schema.Types.Mixed }],
        default: null
    },
    address: {
        type: [{ type: Schema.Types.Mixed }],
        default: null
    },
    mobile: {
        type: Number,
        minlength: 10 // corrected attribute name to 'minlength'
    },
    country_code: {
        type: String,
        default: null
    },
    resume: {
        type: [String],
        default: null
    },
    skills: {
        type: [String],
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now // Set default value to current date/time
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const candiProfile = mongoose_1.default.model("candiProfile", candidateProfileSchema);
exports.default = candiProfile;
