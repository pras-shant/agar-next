import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = 'your_secret_key';

export const generateToken = (user_address: string): string => {
  return jwt.sign({ user_address }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    return; // Explicit return to avoid "not all code paths return a value"
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>" format

  if (!token) {
    res.status(401).json({ message: 'Access Denied: Invalid Token Format!' });
    return; // Explicit return to handle invalid token format
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { user_address: string };
    req.body.user_address = decoded.user_address; // Attach user address to request
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
    return; // Explicit return to handle invalid token
  }
};
