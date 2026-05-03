const request = require('supertest');
const app = require('../src/app');
const AppDataSource = require('../src/data-source');
const { User } = require('../src/entity/User');

jest.setTimeout(20000);

describe('POST /users', () => {
  let createdUserId = null;
  const testUser = {
    name: 'Integration Test User',
    email: `testuser_${Date.now()}@example.com`,
  };

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    if (createdUserId) {
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.delete(createdUserId);
    }
    await AppDataSource.destroy();
  });

  it('creates a new user and persists it in the database', async () => {
    const response = await request(app)
      .post('/users')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      name: testUser.name,
      email: testUser.email,
    });

    createdUserId = response.body.id;
    expect(createdUserId).toBeTruthy();

    const userRepository = AppDataSource.getRepository(User);
    const dbUser = await userRepository.findOneBy({ id: createdUserId });

    expect(dbUser).toBeTruthy();
    expect(dbUser).toEqual({
      id: createdUserId,
      name: testUser.name,
      email: testUser.email,
    });
  });
});