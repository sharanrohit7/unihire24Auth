"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var employerpermissions = new Schema({
    title: {
        type: String,
        required: true,
    },
});
const employerPermissions = mongoose_1.default.model("employerpermissions", employerpermissions);
exports.default = employerPermissions;
