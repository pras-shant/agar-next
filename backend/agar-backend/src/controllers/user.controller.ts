import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { generateToken } from '../middlewares/auth.middleware';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Unable to register user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { user_address } = req.body;

      // Validate input
      if (!user_address) {
        return res.status(400).json({ message: 'User address is required' });
      }

      const user = await UserService.getUserByWalletAddress(user_address);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = generateToken(user_address);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Unable to login user' });
    }
  }

   async generateNonce(req: Request, res: Response) {
    try {
      const { user_address } = req.body;

      // Validate input
      if (!user_address) {
        return res.status(400).json({ message: 'User address is required' });
      }

      const nonce = await UserService.generateNonce(user_address);
      return res.status(200).json({ message: 'Nonce generated successfully', nonce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to generate nonce' });
    }
  }

  // Fetch a nonce for a user using their wallet address
  async getNonce(req: Request, res: Response) {
    try {
      const { user_address } = req.query;

      if (!user_address) {
        return res.status(400).json({ message: 'User address is required' });
      }

      const nonce = await UserService.getNonce(user_address as string);
      if (!nonce) {
        return res.status(404).json({ message: 'Nonce not found' });
      }

      return res.status(200).json({ nonce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch nonce' });
    }
  }

   async verifySignature(req: Request, res: Response) {
    try {
      const { message, signature, expectedAddress, nonce } = req.body;
 
     if (!message || !signature || !expectedAddress || !nonce) {
        return res.status(400).json({
          error: 'Message, signature, expectedAddress, and nonce are required.',
        });
      }

      // Verify signature
      const isValid = await UserService.verifySignature(
        message,
        signature,
        expectedAddress,
        nonce
      );

      if (isValid) {
        // Generate JWT token
        const token = generateToken(expectedAddress);
        return res.status(200).json({
          message: 'Signature verified successfully!',
          recoveredAddress: expectedAddress,
          token,
        });
      } else {
        return res.status(400).json({ error: 'Signature does not match the address.' });
      }
    } catch (error) {
      console.error('Error verifying signature:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default new UserController();
