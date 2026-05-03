require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/entity/*.js'],
  migrations: ['migrations/*.js'],
  synchronize: false,
  logging: false,
};