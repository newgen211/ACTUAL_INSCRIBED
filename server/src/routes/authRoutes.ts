import express from 'express';
import { validateRequestInput } from '../middleware/validateInput';
import { RegisterSchema } from '../validationSchemas/registerSchema';
import registerController from '../controllers/auth/registerController';
import sendVerifyController from '../controllers/auth/sendVerifyController';
import verifyAccountController from '../controllers/auth/verifyAccountController';
import sendPasswordResetController from '../controllers/auth/sendPasswordResetController';
import { ResetPasswordSchema } from '../validationSchemas/resetPasswordSchema';
import resetPasswordController from '../controllers/auth/resetPasswordController';
import loginController from '../controllers/auth/loginController';
import { LoginSchema } from '../validationSchemas/loginSchema';
import isAuthController from '../controllers/auth/isAuth';
import isLoggedIn from '../middleware/isLoggedIn';

const authRouter = express.Router();

authRouter.post('/register', validateRequestInput(RegisterSchema), registerController);
authRouter.post('/send-verify', sendVerifyController);
authRouter.get('/verify-account', verifyAccountController);
authRouter.post('/send-password-reset', sendPasswordResetController);
authRouter.post('/reset-password', validateRequestInput(ResetPasswordSchema), resetPasswordController);
authRouter.post('/login', validateRequestInput(LoginSchema), loginController);
authRouter.get('/is-auth', isLoggedIn, isAuthController);

export default authRouter;