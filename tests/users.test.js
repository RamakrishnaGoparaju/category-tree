const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');


const userPayload = {
  username: 'testuser124',
      email: 'test@example.com',
      password: 'password123',
}

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Test user registration and login routes', () => {
  it('should register a new user', async () => {
    const res = await axios.post('http://localhost:5000/api/users/register', userPayload);
    expect(res.status).toEqual(201);
  });

  it('should log in an existing user', async () => {

    const res = await axios.post('http://localhost:5000/api/users/login', userPayload);

    console.log(res,"resresres")
    expect(res.data).toHaveProperty('token');

    // expect(res.headers['auth-token']).toBeTruthy();
  });

  it('should not register a user with existing email', async () => {
    

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username: 'testuser2',
        email: 'test@example.com', // Already registered email
        password: 'password456',
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      // expect(error.response.data).toEqual('User already registered.');
    }
  });

  it('should not log in with incorrect password', async () => {
    

    try {
      await axios.post('http://localhost:5000/api/users/login', {
        username: 'testuser123',
        password: 'wrongpassword',
      });
    } catch (error) {
      expect(error.response.status).toEqual(401);
    }
  });
});
