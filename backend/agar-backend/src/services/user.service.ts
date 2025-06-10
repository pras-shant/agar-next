import UserDAO from '../daos/user.dao';
import { IUser } from '../models/user.model';
import crypto from 'crypto';
import { ethers } from 'ethers';


class UserService {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return UserDAO.create(userData);
  }

  async getUserByWalletAddress(user_address: string): Promise<IUser | null> {
    return UserDAO.findByWalletAddress(user_address);
  }

  async updateUserNonce(user_address: string, nonce: string): Promise<IUser | null> {
    return UserDAO.updateNonce(user_address, nonce);
  }

    // Generate a nonce for a user and save it in the database
  async generateNonce(user_address: string): Promise<string> {
    const nonce = crypto.randomBytes(16).toString('hex');
    await UserDAO.updateNonce(user_address, nonce);
    return nonce;
  }

  // Fetch a nonce for a user using their wallet address
  async getNonce(user_address: string): Promise<string | null> {
    const user = await UserDAO.findByWalletAddress(user_address);
    return user?.nonce || null;
  }

  async verifySignature(
    message: string,
    signature: string,
    expectedAddress: string,
    nonce: string
  ): Promise<boolean> {
    // Check if the nonce exists and matches
    const user = await UserDAO.findByWalletAddress(expectedAddress);
    if (!user || user.nonce !== nonce) {
      throw new Error('Invalid or expired nonce.');
    }

    // Recover the address from the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // Validate the recovered address
    return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
  }
}

export default new UserService();
