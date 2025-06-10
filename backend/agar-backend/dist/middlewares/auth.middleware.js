"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'your_secret_key';
// Generate a token
const generateToken = (user_address) => {
    return jsonwebtoken_1.default.sign({ user_address }, SECRET_KEY, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
// Verify a token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (typeof decoded === 'object' && 'user_address' in decoded) {
            req.body.user_address = decoded.user_address; // Explicit type assertion
            return next();
        }
        else {
            return res.status(400).json({ message: 'Invalid token payload' });
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
exports.verifyToken = verifyToken;
