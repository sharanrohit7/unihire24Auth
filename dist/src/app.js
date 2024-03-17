"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = require("./config/database");
const tokenConfig_1 = require("./config/tokenConfig");
const jwt_1 = __importDefault(require("./middleware/jwt"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
(0, database_1.startServer)();
(0, tokenConfig_1.connectToToken)();
// Routes
app.use("/auth", auth_route_1.default);
app.get("/", jwt_1.default, (req, res) => {
    res.status(200).json({ message: "Welcome to the loginService" });
});
exports.default = app;
