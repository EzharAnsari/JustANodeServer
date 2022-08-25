import { Router } from 'express';
import { body } from 'express-validator';
import User from '../controller/user';
const router: Router = Router();

router.post('/login', body('username').isEmail(), body('password').isLength({ min: 8 }), User.login);
router.post('/signup', body('email').isEmail(), body('password').isLength({ min: 8 }), User.signup);
router.get('/logout', User.logout);

export default router;
