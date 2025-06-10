"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserController {
    async register(req, res) {
        try {
            const user = await user_service_1.default.createUser(req.body);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Unable to register user' });
        }
    }
    async login(req, res) {
        try {
            const { user_address } = req.body;
            // Validate input
            if (!user_address) {
                return res.status(400).json({ message: 'User address is required' });
            }
            const user = await user_service_1.default.getUserByWalletAddress(user_address);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const token = (0, auth_middleware_1.generateToken)(user_address);
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(500).json({ error: 'Unable to login user' });
        }
    }
}
exports.default = new UserController();
