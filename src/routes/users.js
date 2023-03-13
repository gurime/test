import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/index.js';

const routers = Router();

// Route to register a new user
routers.post('/register', async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!userName) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!firstName) {
    return res.status(400).json({ message: 'First name is required' });
  }

  if (!lastName) {
    return res.status(400).json({ message: 'Last name is required' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = new User({ userName, firstName, lastName, email, password });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to authenticate a user
routers.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to get all users
routers.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a single user
routers.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update a user
routers.put('/:id', async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, firstName, lastName, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server Error' });
  }
});


routers.post('/logout', async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.token = '';
    await user.save();
    return res.status(200).json({ message: 'User successfully logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default  routers