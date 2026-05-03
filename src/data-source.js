require('dotenv').config();
const { DataSource } = require('typeorm');

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/entity/*.js'],
  migrations: ['migrations/*.js'],
  synchronize: false,
  logging: false,
};

const AppDataSource = new DataSource(config);

module.exports = AppDataSource;