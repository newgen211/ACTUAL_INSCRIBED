import express from 'express';
import getUserInfoController from '../controllers/getUserInfoController';
const router = express.Router();

router.get('/users/:userId', getUserInfoController);

export default router;