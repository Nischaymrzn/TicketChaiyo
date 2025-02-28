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
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      req.params = { id: 10 };
      userService.deleteUserById = jest.fn().mockResolvedValue({ id: 10 });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'User deleted successfully' });
    });
  });
});
