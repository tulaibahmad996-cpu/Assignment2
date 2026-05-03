const express = require('express');
const { User } = require('../entity/User');
const AppDataSource = require('../data-source');

const router = express.Router();

router.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({ name, email });
    const savedUser = await userRepository.save(user);

    return res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }

    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;