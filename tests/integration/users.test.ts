// import 'jest';
// import request from 'supertest';
// import app from '../../src/app';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient(); 
// const API_USERS = '/users';
// const id = '2';

// beforeAll(async () => {
//   const removeUser= prisma.user.deleteMany();
//   await prisma.$transaction([removeUser]);
// });

// afterAll(async () => {
//   const removeUser = prisma.user.deleteMany();
//   await prisma.$transaction([removeUser]);
//   await prisma.$disconnect();
// });

// describe('Test the users path', () => {
  
//   test('It should add new user', async () => {
//     const newUser = {
//       nome: 'User 1',
//       email: 'user1@email.com',
//       senha: 'aaa12'
//     };
//     const response = await request(app).post(API_USERS).send(newUser);
//     expect(response.statusCode).toBe(201);
//   })
//   });

  // test('It should update user', async () => {
    
  //   const newUser = {
  //     name: 'User 1',
  //     email: 'user1@email.com',
  //     endereco: 'por ali',
  //   };
  //   const response = await request(app).put(API_USERS/:id).send(newUser);
  //   const user = response.body;
  //   console.log('user: ', user);
  //   expect(response.statusCode).toBe(200);
  // });

  // test('It should delete users', async () => {
  //   const response = await request(app).delete(API_USERS/id);
  //   expect(response.statusCode).toBe(200);
  // });
// }
// )
