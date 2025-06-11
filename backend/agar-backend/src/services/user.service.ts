import UserDAO from '../daos/user.dao';
import { IUser } from '../models/user.model';
import crypto from 'crypto';
import nacl from'tweetnacl'
import bs58 from 'bs58'; // For decoding Base58 encoded data

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
    const user = await UserDAO.findByWalletAddress(expectedAddress);
    if (!user || user.nonce !== nonce) {
        throw new Error('Invalid or expired nonce.');
    }


    // Validate Base58 strings
    const base58Regex = /^[A-HJ-NP-Za-km-z1-9]+$/;
    if (!base58Regex.test(signature) || !base58Regex.test(expectedAddress)) {
        throw new Error('Invalid Base58 string detected.');
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = bs58.decode(expectedAddress);

    const isSignatureValid = nacl.sign.detached.verify(
        encodedMessage,
        signatureBytes,
        publicKeyBytes
    );

    return isSignatureValid;
}
}

export default new UserService();
