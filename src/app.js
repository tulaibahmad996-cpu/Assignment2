const express = require('express');
const AppDataSource = require('./data-source');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;