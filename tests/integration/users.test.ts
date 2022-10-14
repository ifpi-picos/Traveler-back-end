
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 
const API_USERS = '/users';


// describe('Test the users path', () => {
//   test('It should add new user', async () => {
//     const newUser = {
//       name: 'User 1',
//       email: 'user1@email.com',
//       endereco: 'perto do meu vizinho',
//       senha: 'arroz',
//     };
//     const response = await request(app).post(API_USERS).send(newUser);
//     expect(response.statusCode).toBe(201);
//   });

  test('It should get all users', async () => {
    const response = await request(app).get(API_USERS);
    // const users = response.body;
    // console.log('users: ', users);
    expect(response.statusCode).toBe(200);
    // expect(users.length).toBe(1);
  });

