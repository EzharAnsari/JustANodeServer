import { Response } from 'express';
import { Request } from '../extendReqSession';
import UserModel from '../model/User';
import * as crypto from 'crypto-ts';
import { validationResult } from 'express-validator';

class User {
  constructor() {
    // Empty
  }

  // login
  async login(req: Request, res: Response) {
    if (req.session.user != '') {
      res.send({
        status: 0,
        type: 'USER_LOGGED_IN',
        message: 'User is already login',
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        status: 0,
        type: 'FORM_DATA_ERROR',
        message: 'Form information error',
      });
      return;
    }
    const { username, password } = req.body;
    try {
      if (!username) {
        throw new Error('Username parameter error');
      } else if (!password) {
        throw new Error('Password parameter error');
      }
    } catch (err) {
      console.log((err as Error).message, err);
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: (err as Error).message,
      });
      return;
    }

    const newPassword: string = password + 'mysecret321';
    try {
      const user = await UserModel.findOne({ email: username });
      // console.log(user?.password);
      // console.log(newPassword);
      // const tem = crypto.AES.decrypt(user?.password, 'mysecret321');
      // console.log(tem);
      if (!user) {
        res.send({
          status: 0,
          type: 'USER_NOT_FOUND',
          message: 'This email is not found in our database',
        });
        return;
      } else if (newPassword != user.password) {
        res.send({
          status: 0,
          type: 'PASSWORD_NOT_MATCHED',
          message: 'email or password is incorrect!',
        });
        return;
      } else {
        req.session.user = user;
        res.send({
          status: 1,
          message: 'Successful login',
        });
      }
    } catch (err) {
      console.log('Login administrator failed', err);
      res.send({
        status: 0,
        type: 'LOGIN_ADMIN_FAILED',
        message: 'Login administrator failed',
      });
    }
  }

  // signup
  async signup(req: Request, res: Response) {
    if (req.session.user != '') {
      res.send({
        status: 0,
        type: 'USER_LOGGED_IN',
        message: 'User is already login',
      });
      return;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send({
        status: 0,
        type: 'FORM_DATA_ERROR',
        message: 'Form information error',
      });
      return;
    }

    const { email, password, name, phoneNumber } = req.body;

    try {
      if (!email) {
        throw new Error('Email parameter error');
      } else if (!password) {
        throw new Error('Password parameter error');
      } else if (!name) {
        throw new Error('name parameter error');
      }
    } catch (err) {
      console.log((err as Error).message, err);
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: (err as Error).message,
      });
      return;
    }

    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        console.log('This user already exist');
        res.send({
          status: 0,
          type: 'USER_HAS_EXIST',
          message: 'This user already exists',
        });
      } else {
        // const newPassword: string = crypto.AES.encrypt(password, 'mysecret321').toString();
        const newPassword: string = password + 'mysecret321';
        const newUser = {
          name,
          email,
          password: newPassword,
          phoneNumber: phoneNumber ? phoneNumber : '0000000000',
        };
        await UserModel.create(newUser);
        req.session.user = newUser;
        res.send({
          status: 1,
          message: 'Successful Registration',
        });
      }
    } catch (err) {
      console.log('Register administrator failed', err);
      res.send({
        status: 0,
        type: 'REGISTER_ADMIN_FAILED',
        message: 'Resgister administrator failed',
      });
    }
  }

  // Logout
  async logout(req: Request, res: Response) {
    if (req.session.user === '') {
      console.log('Failed Logout');
      res.status(401).send({
        status: 0,
        message: 'User is not login!',
      });
    } else {
      req.session.user = '';
      res.send({
        status: 1,
        success: 'Logout successful',
      });
    }
  }
}

export default new User();
