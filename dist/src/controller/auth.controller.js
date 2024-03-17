"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const auth_model_1 = __importDefault(require("../models/common/auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenConfig_1 = require("../config/tokenConfig");
const roleModule_model_1 = __importDefault(require("../models/common/roleModule.model"));
function signUp(email, password, roleId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!email) {
                return { error: 'Email is required' };
            }
            if (!password) {
                return { error: 'Password is required' };
            }
            if (!roleId) {
                return { error: 'Role ID is required' };
            }
            const existingUser = yield auth_model_1.default.findOne({ email });
            if (existingUser) {
                return { error: 'Username already exists' };
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield auth_model_1.default.create({ email, password: hashedPassword, role: roleId });
            if (newUser._id === null || newUser._id === undefined) {
                return { error: "Error creating a new user" };
            }
            const token = yield (0, tokenConfig_1.signtoken)(newUser.email, roleId);
            return token;
        }
        catch (error) {
            console.log(error);
            return { error: `Error signing up: ${error.message}` };
        }
    });
}
exports.signUp = signUp;
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if email and password are provided
            if (!email) {
                return { error: 'Email is required' };
            }
            if (!password) {
                return { error: 'Password is required' };
            }
            // Find the user by email
            const existingUser = yield auth_model_1.default.findOne({ email });
            // If user not found, return error
            if (!existingUser) {
                return { error: 'User not found' };
            }
            // Compare the provided password with the hashed password in the database
            const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
            // If passwords don't match, return error
            if (!passwordMatch) {
                return { error: 'Incorrect password' };
            }
            const roleModels = yield roleModule_model_1.default.findOne({ role_id: existingUser.role });
            const token = yield (0, tokenConfig_1.signtoken)(existingUser.email, existingUser.role);
            return { token: token, role: roleModels === null || roleModels === void 0 ? void 0 : roleModels.value, modules: roleModels === null || roleModels === void 0 ? void 0 : roleModels.modules };
        }
        catch (error) {
            return { error: `Error signing in: ${error.message}` };
        }
    });
}
exports.signIn = signIn;
