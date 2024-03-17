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
exports.startServer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connect(mongoURL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoDBConnectionString = mongoURL;
            yield mongoose_1.default.connect(mongoDBConnectionString).then(() => {
                console.log("Connected to DB");
            }).catch((Error) => console.log("error"));
            // console.log("MongoDB connection successful");
            return mongoose_1.default.connection; // Return the mongoose connection object
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error; // You might want to handle this error in the calling code
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = process.env.mongoURL;
            if (db === undefined) {
                return ("Error in database connection");
            }
            // Connect to MongoDB
            yield connect(db);
        }
        catch (error) {
            console.log("Error Connecting to Database", error);
        }
    });
}
exports.startServer = startServer;
