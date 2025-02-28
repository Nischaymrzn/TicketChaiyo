import { signup, login, getMe } from '../controllers/auth.controller.js';
import * as userService from '../services/user.service.js';
import * as validation from '../utils/validation.js';
import * as authService from '../services/auth.service.js';

describe('Auth Controller', () => {
  describe('signup', () => {
    it('should return 400 if validation error occurs', async () => {
      const req = { body: { fullName: 'Test', email: 'bad', userName: 'test', password: 'pass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateSignup = jest.fn(() => 'Validation error message');

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Validation error message' });
    });

    it('should return 409 if user already exists', async () => {
      const req = {
        body: { fullName: 'Test', email: 'test@example.com', userName: 'test', password: 'pass', userRole: 'client' }
      };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateSignup = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue({ id: 1 });

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'User already exists with the provided email.',
      });
    });

    it('should create a user successfully and return 201', async () => {
      const req = {
        body: { fullName: 'Test User', email: 'new@example.com', userName: 'newuser', password: 'pass', userRole: 'client' }
      };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateSignup = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue(null);
      userService.createUser = jest.fn().mockResolvedValue({ id: 2 });

      await signup(req, res);

      expect(userService.createUser).toHaveBeenCalledWith({
        fullName: 'Test User',
        email: 'new@example.com',
        userName: 'newuser',
        password: 'pass',
        userRole: 'client',
        isAccepted: true,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: 'User created successfully' });
    });
  });

  describe('login', () => {
    it('should return 400 if validation error occurs', async () => {
      const req = { body: { email: 'test@example.com', password: 'pass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateLogin = jest.fn(() => 'Invalid login data');

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid login data' });
    });

    it('should return 401 if user is not found', async () => {
      const req = { body: { email: 'nonexistent@example.com', password: 'pass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateLogin = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'Invalid credentials' });
    });

    it('should return 401 if the account is not accepted', async () => {
      const req = { body: { email: 'pending@example.com', password: 'pass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateLogin = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue({ id: 3, isAccepted: false, password: 'hashed' });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Your account is awaiting admin approval',
      });
    });

    it('should return 401 if the password is incorrect', async () => {
      const req = { body: { email: 'test@example.com', password: 'wrongpass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateLogin = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue({ id: 4, isAccepted: true, password: 'hashed' });
      authService.comparePasswords = jest.fn().mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Incorrect password' });
    });

    it('should log in successfully and return a token', async () => {
      const req = { body: { email: 'test@example.com', password: 'correctpass' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      validation.validateLogin = jest.fn(() => null);
      userService.findUserByEmail = jest.fn().mockResolvedValue({
        id: 5,
        isAccepted: true,
        password: 'hashed',
        email: 'test@example.com',
        name: 'Test',
        userRole: 'client',
      });
      authService.comparePasswords = jest.fn().mockResolvedValue(true);
      authService.createToken = jest.fn(() => 'valid.token.here');

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 5,
          email: 'test@example.com',
          name: 'Test',
          userRole: 'client',
        },
        accessToken: 'valid.token.here',
      });
    });
  });

  describe('getMe', () => {
    it('should return user data successfully', async () => {
      const req = { user: { id: 10 } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      userService.findUserById = jest.fn().mockResolvedValue({ id: 10, email: 'user@example.com' });

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        userData: { id: 10, email: 'user@example.com' },
        message: 'User fetched successfully',
      });
    });

    it('should handle errors and return 401', async () => {
      const req = { user: { id: 20 } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      userService.findUserById = jest.fn().mockRejectedValue(new Error('Not found'));

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ data: null });
    });
  });
});
