"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.default.register);
router.post('/login', user_controller_1.default.login);
// Add routes that require authentication
router.get('/protected', auth_middleware_1.verifyToken, (req, res) => {
    console.log(req, 'reqq');
    res.status(200).json({ message: 'You have access to protected routes' });
});
exports.default = router;
