import 'jest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
const API_USERS = '/users';
let id: number;
// const myMock = jest.fn().mockReturnValue(201);

beforeAll(async () => {
  const removeUser = prisma.user.deleteMany();
  await prisma.$transaction([removeUser]);
});

afterAll(async () => {
  const removeUser = prisma.user.deleteMany();
  await prisma.$transaction([removeUser]);
  await prisma.$disconnect();
});

describe('Test the users path', () => {

  test('It should add new user', async () => {
    const newUser = {
      name: 'User 1',
      email: 'user1@email.com',
      password: 'aaa12',
    } as User;
    const response = await request(app).post(`${API_USERS}/cadastro`).send(newUser);

    const idFinder = prisma.user.findFirst()
    const [userCreated] = await prisma.$transaction([idFinder]);
    id = userCreated?.id as number

    expect(response.statusCode).toBe(201);
  });


  test('It should update user', async () => {

    const newUser = {
      name: 'User 1',
      email: 'user1@email.com',
      address: 'por ali',
      password: '123wer',
    };
    const response = await request(app).put(`${API_USERS}/${id}`).send(newUser);
    
    expect(response.statusCode).toBe(200);
  });

  test('It should delete users', async () => {
    const response = await request(app).delete(`${API_USERS}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
