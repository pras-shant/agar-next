"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dao_1 = __importDefault(require("../daos/user.dao"));
class UserService {
    async createUser(userData) {
        return user_dao_1.default.create(userData);
    }
    async getUserByWalletAddress(user_address) {
        return user_dao_1.default.findByWalletAddress(user_address);
    }
    async updateUserNonce(user_address, nonce) {
        return user_dao_1.default.updateNonce(user_address, nonce);
    }
}
exports.default = new UserService();
