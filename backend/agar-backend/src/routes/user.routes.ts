import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Add routes that require authentication
router.get('/protected', verifyToken, (req, res) => {
    console.log(req,'reqq')
    
  res.status(200).json({ message: 'You have access to protected routes' });
});

// Generate a nonce and save it to the database
router.post('/generate-nonce', UserController.generateNonce);

// Fetch a nonce using the wallet address
router.get('/get-nonce', UserController.getNonce);
router.post('/verify-signature', UserController.verifySignature);


export default router;
