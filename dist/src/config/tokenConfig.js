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
exports.signtoken = exports.connectToToken = void 0;
const axios_1 = __importDefault(require("axios"));
// Get tokenUrl and tokenKey from environment variables
const tokenUrl = process.env.tokenUrl;
const tokenKey = process.env.tokenKey;
// // Function to make a GET request to the specified URL
// export async function fetchData(): Promise<any> {
//   try {
//     const response = await axios.get(`${tokenUrl}/`);
//     return response;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }
function connectToToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Define headers with API key
            const headers = {
                "api-key": tokenKey,
            };
            // Make a GET request to the token URL with token key and API key in headers
            const response = yield axios_1.default.get(`${tokenUrl}/`, { headers });
            // Check if the response status is successful (2xx)
            if (response.status >= 200 && response.status < 300) {
                console.log("Connected to TokenServer");
                return response.data; // Return data if successful
            }
            else {
                console.error("Error connecting to TokenServer:", response.statusText);
                throw new Error(response.statusText); // Throw an error if response status is not successful
            }
        }
        catch (error) {
            console.error("Error connecting to TokenServer:", error.message);
            throw error;
        }
    });
}
exports.connectToToken = connectToToken;
function signtoken(email, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Define payload with email and role
            const payload = {
                email,
                role,
            };
            const headers = {
                "api-key": tokenKey,
            };
            // Make a POST request to the external API
            const response = yield axios_1.default.post(`${tokenUrl}/token/sign-token`, payload, {
                headers,
            });
            // Check if the response status is successful (2xx)
            if (response.status >= 200 && response.status < 300) {
                console.log("Token signed successfully");
                console.log(response.data.token);
                return response.data.token;
            }
            else {
                console.error("Error signing token:", response.statusText);
                throw new Error(response.statusText);
            }
        }
        catch (error) {
            console.error("Error signing token:", error.message);
            throw error;
        }
    });
}
exports.signtoken = signtoken;
