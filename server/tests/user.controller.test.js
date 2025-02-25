import * as validation from '../utils/validation.js';
import * as userService from '../services/user.service.js';
import {
  getUsers,
  getCustomers,
  getOrganizers,
  createOrganizers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

describe('User Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn(() => res), json: jest.fn() };
  });

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const users = [{ id: 1, name: 'User One' }];
      userService.getAllUsers = jest.fn().mockResolvedValue(users);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users });
    });

    it('should handle errors and return 500', async () => {
      userService.getAllUsers = jest.fn().mockRejectedValue(new Error('DB error'));

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'DB error',
      });
    });
  });

  describe('getCustomers', () => {
    it('should return list of customers', async () => {
      const users = [{ id: 2, name: 'Customer One' }];
      userService.getAllCustomers = jest.fn().mockResolvedValue(users);

      await getCustomers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users });
    });
  });

  describe('getOrganizers', () => {
    it('should return list of organizers', async () => {
      const users = [{ id: 3, name: 'Organizer One' }];
      userService.getAllOrganizers = jest.fn().mockResolvedValue(users);

      await getOrganizers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users });
    });
  });

  describe('createOrganizers', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should return 400 if validation fails', async () => {
      req.body = { fullName: 'Test', email: 'bad', userName: 'test', password: 'pass' };
      jest.spyOn(validation, 'validateSignup').mockReturnValue('Invalid data');

      await createOrganizers(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    it('should return 409 if organizer already exists', async () => {
      req.body = { fullName: 'Test Organizer', email: 'exists@example.com', userName: 'organizer', password: 'pass' };
      jest.spyOn(validation, 'validateSignup').mockReturnValue(null);
      userService.findUserByEmail = jest.fn().mockResolvedValue({ id: 5 });

      await createOrganizers(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Organizer already exists with the provided email.',
      });
    });

    it('should create an organizer successfully', async () => {
      req.body = { fullName: 'New Organizer', email: 'neworg@example.com', userName: 'neworg', password: 'pass' };
      jest.spyOn(validation, 'validateSignup').mockReturnValue(null);
      userService.findUserByEmail = jest.fn().mockResolvedValue(null);
      userService.createUser = jest.fn().mockResolvedValue({ id: 6 });

      await createOrganizers(req, res);

      expect(userService.createUser).toHaveBeenCalledWith({
        fullName: 'New Organizer',
        email: 'neworg@example.com',
        userName: 'neworg',
        password: 'pass',
        userRole: 'organizer',
        isAccepted: true,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: 'Organizer created successfully' });
    });

    it('should catch errors and return 500 in createOrganizers', async () => {
      req.body = { fullName: 'Test Organizer', email: 'errororg@example.com', userName: 'org', password: 'pass' };
      jest.spyOn(validation, 'validateSignup').mockReturnValue(null);
      userService.findUserByEmail = jest.fn().mockResolvedValue(null);
      userService.createUser = jest.fn().mockRejectedValue(new Error('Creation error'));

      await createOrganizers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
  });

  describe('updateUser', () => {
    it('should update user data successfully', async () => {
      req.params = { id: 7 };
      req.body = { name: 'Updated Name' };
      userService.updateUserById = jest.fn().mockResolvedValue({ id: 7, name: 'Updated Name' });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: 'User updated successfully',
        user: { id: 7, name: 'Updated Name' },
      });
    });

    it('should return 404 if user not found during update', async () => {
      req.params = { id: 8 };
      req.body = { name: 'Updated Name' };
      userService.updateUserById = jest.fn().mockResolvedValue(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should catch errors and return 500 in updateUser', async () => {
      req.params = { id: 9 };
      req.body = { name: 'Updated Name' };
      userService.updateUserById = jest.fn().mockRejectedValue(new Error('Update error'));

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Update error',
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      req.params = { id: 10 };
      userService.deleteUserById = jest.fn().mockResolvedValue({ id: 10 });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'User deleted successfully' });
    });

    it('should return 404 if user not found during deletion', async () => {
      req.params = { id: 11 };
      userService.deleteUserById = jest.fn().mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should catch errors and return 500 in deleteUser', async () => {
      req.params = { id: 12 };
      userService.deleteUserById = jest.fn().mockRejectedValue(new Error('Deletion error'));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Deletion error',
      });
    });
  });
});
