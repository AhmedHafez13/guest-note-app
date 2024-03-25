import { Request, Response } from 'express';
import UserRepository from '@app/repositories/user.repository';
import AuthValidation from './auth.validation';
import AuthUtils from './auth.utils';

/**
 * This class handles authentication-related API endpoints for user registration and login.
 */
class AuthController {
  /**
   * Registers a new user with the provided credentials.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   */
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const { error } = AuthValidation.validateRegisterInput({
      username,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user exists
    if (await UserRepository.userExists(email)) {
      return res
        .status(422)
        .json({ message: 'This email is already registered' });
    }

    const hashedPassword = await AuthUtils.hashPassword(password);

    const user = await UserRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { username: user.username, email: user.email },
    });
  }

  /**
   * Logs in a user with the provided email and password.
   *
   * @param req - Express request object containing login credentials in the body
   * @param res - Express response object
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { error } = AuthValidation.validateLoginInput({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await UserRepository.findByEmail(email);
    if (!user || !(await AuthUtils.verifyPassword(user, password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = AuthUtils.generateAuthToken(payload);

    res.status(200).json({ message: 'Login successful', token });
  }
}

export default new AuthController();
