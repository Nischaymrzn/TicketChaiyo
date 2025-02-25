import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { comparePasswords, createToken, verifyToken } from '../services/auth.service.js';

dotenv.config();

describe('Auth Service', () => {
  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      const password = 'myPassword123';
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const result = await comparePasswords(password, hash);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'myPassword123';
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash('anotherPassword', salt);
      const result = await comparePasswords(password, hash);
      expect(result).toBe(false);
    });
  });

  describe('createToken and verifyToken', () => {
    it('should create a valid token that can be verified', () => {
      const id = 123;
      const token = createToken(id);
      const decoded = verifyToken(token);
      expect(decoded).toHaveProperty('id', id);
    });

    it('should throw an error for an invalid token', () => {
      expect(() => verifyToken('invalid.token')).toThrow();
    });
  });
});
