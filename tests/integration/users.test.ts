
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 
const API_USERS = '/users';
const id = 2;

describe('Test the users path', () => {
  test('It should add new user', async () => {
    const response = await request(app).post(API_USERS);
    expect(response.statusCode).toBe(201);
  });

  test('It should update user', async () => {
    
    const newUser = {
      name: 'User 1',
      email: 'user1@email.com',
    };
    const response = await request(app).put(API_USERS/:id).send(newUser);
    const user = response.body;
    console.log('user: ', user);
    expect(response.statusCode).toBe(200);
  });

  test('It should delete users', async () => {
    const response = await request(app).delete(API_USERS/id);
    expect(response.statusCode).toBe(200);
  });
}

