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
const axios_1 = __importDefault(require("axios"));
const configVar_1 = require("../config/configVar");
const { tokenUrl, tokenKey } = configVar_1.configVar;
const verificationUrl = `${tokenUrl}/token/verify-token`;
function authenticateToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) {
            return res.status(401).json({ error: "Unauthorized: Token is required" });
        }
        try {
            const response = yield axios_1.default.post(verificationUrl, null, {
                headers: { 'Authorization': tokenHeader, 'api-key': tokenKey }
            });
            console.log(response.data);
            next();
        }
        catch (error) {
            console.error('Error verifying token:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    });
}
exports.default = authenticateToken;
