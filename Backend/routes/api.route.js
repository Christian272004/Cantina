import express from 'express';
import { ApiController } from '../controllers/ApiController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

router.get('/productes', authMiddleware, ApiController.getProductes);
router.get('/check', authMiddleware, ApiController.check);

router.post('/login', ApiController.login);
router.post('/register', ApiController.register);
router.post('/logout', authMiddleware,  ApiController.logout);

export default router;