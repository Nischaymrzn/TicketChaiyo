import bcrypt from 'bcrypt';
import prisma from '../db/prisma.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  getAllCustomers,
  getAllOrganizers,
  deleteUserById,
  updateUserById,
} from '../services/user.service.js';

jest.mock('../db/prisma.js');

describe('User Service', () => {
  describe('createUser', () => {
    it('should hash password and create a user', async () => {
      const userData = {
        fullName: 'Test User',
        email: 'user@test.com',
        userName: 'testuser',
        password: 'plainpass',
        userRole: 'client',
        isAccepted: true,
      };
      const salt = 'fakeSalt';
      const hash = 'fakeHash';

      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(salt);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hash);

      prisma.user.create.mockResolvedValue({ id: 1, ...userData, password: hash });

      const result = await createUser(userData);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, salt);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: userData.fullName,
          username: userData.userName,
          email: userData.email,
          password: hash,
          userRole: userData.userRole,
          isAccepted: userData.isAccepted,
        },
      });
      expect(result).toHaveProperty('id');
    });
  });

  describe('findUserById', () => {
    it('should call prisma.user.findUnique with id and select correct fields', async () => {
      const id = 1;
      const userData = {
        id,
        email: 'user@test.com',
        name: 'Test User',
        username: 'testuser',
        userRole: 'client',
        isAccepted: true,
      };
      prisma.user.findUnique.mockResolvedValue(userData);

      const result = await findUserById(id);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          userRole: true,
          isAccepted: true,
        },
      });
      expect(result).toEqual(userData);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'User One' }];
      prisma.user.findMany.mockResolvedValue(users);

      const result = await getAllUsers();
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by id', async () => {
      const id = 1;
      prisma.user.delete.mockResolvedValue({ id });

      const result = await deleteUserById(id);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toHaveProperty('id', id);
    });
  });

  describe('updateUserById', () => {
    it('should update user data and hash new password if provided', async () => {
      const id = 1;
      const userData = { name: 'Updated', password: 'newpass' };
      const salt = 'newsalt';
      const hash = 'newhash';

      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(salt);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hash);

      prisma.user.update.mockResolvedValue({ id, name: 'Updated', password: hash });

      const result = await updateUserById(id, userData);
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('newpass', salt);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data: { ...userData, password: hash },
      });
      expect(result).toHaveProperty('id', id);
    });
  });
});
