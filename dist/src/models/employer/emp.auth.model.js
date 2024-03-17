"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emp_permissions_model_1 = __importDefault(require("./emp.permissions.model"));
const role_model_1 = __importDefault(require("../common/role.model"));
const { Schema } = mongoose_1.default;
var employerAuthSchema = new Schema({
    email: {
        type: String,
        // required: true,
    },
    hashPassword: {
        type: String,
        // required: true,
        select: false,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: role_model_1.default,
    },
    permissions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: emp_permissions_model_1.default,
            default: "1",
        },
    ],
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_delete: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
});
const employerAuth = mongoose_1.default.model("EmployerAuth", employerAuthSchema);
exports.default = employerAuth;
