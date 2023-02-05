import express from 'express';
import postController from '../controllers/postController.js';

const router = express.Router();

router.post('/', postController);
  
export default router;   