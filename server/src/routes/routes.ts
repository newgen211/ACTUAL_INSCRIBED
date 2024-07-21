import express from 'express';
import getUserInfoController from '../controllers/getUserInfoController';
import isLoggedIn from '../middleware/isLoggedIn';
import { validateRequestInput } from '../middleware/validateInput';
import { UpdateUserProfileSchema } from '../validationSchemas/updateUserProfileSchema';
import updateUserProfileController from '../controllers/updateUserProfileController';
import followUserController from '../controllers/auth/followUserController';
import unfollowUserController from '../controllers/unfollowUserController';
import getFollowersController from '../controllers/getFollowersController';
import getFollowingController from '../controllers/auth/getFollowingController';
import { CreatePostSchema } from '../validationSchemas/createPostSchema';
import createPostController from '../controllers/createPostController';
const router = express.Router();

router.get('/users/:userId', getUserInfoController);
router.put('/users/:userId', isLoggedIn, validateRequestInput(UpdateUserProfileSchema), updateUserProfileController);
router.post('/users/:userId/follow', isLoggedIn, followUserController);
router.post('/users/:userId/unfollow', isLoggedIn, unfollowUserController);
router.get('/users/:userId/followers', getFollowersController);
router.get('/users/:userId/following', getFollowingController);
router.post('/post', isLoggedIn, validateRequestInput(CreatePostSchema), createPostController);

export default router;