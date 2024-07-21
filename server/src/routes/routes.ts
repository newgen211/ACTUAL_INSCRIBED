import express from 'express';
import getUserInfoController from '../controllers/getUserInfoController';
import isLoggedIn from '../middleware/isLoggedIn';
import { validateRequestInput } from '../middleware/validateInput';
import { UpdateUserProfileSchema } from '../validationSchemas/updateUserProfileSchema';
import updateUserProfileController from '../controllers/updateUserProfileController';
const router = express.Router();

router.get('/users/:userId', getUserInfoController);
router.put('/users/:userId', isLoggedIn, validateRequestInput(UpdateUserProfileSchema), updateUserProfileController);

export default router;