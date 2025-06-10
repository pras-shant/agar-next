"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class UserDAO {
    async create(userData) {
        const user = new user_model_1.default(userData);
        return user.save();
    }
    async findByWalletAddress(user_address) {
        return user_model_1.default.findOne({ user_address });
    }
    async updateNonce(user_address, nonce) {
        return user_model_1.default.findOneAndUpdate({ user_address }, { nonce }, { new: true });
    }
}
exports.default = new UserDAO();
