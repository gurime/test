import express from 'express';
import cors from 'cors';
import connectDB from '../db/index.js';
import {Post, User} from '../schemas/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const app = express();

connectDB()
.then(() => {
console.log('Connected to MongoDB database!');
})
.catch((error) => {
console.error('Error connecting to MongoDB database:', error);
});

app.use(express.json());
app.use(cors());

// post routes
app.post('/post', async (req, res) => {
const { title, body } = req.body;
if (!title) {
return res.status(400).json({ message: 'Title is required' });
}
if (!body) {
return res.status(400).json({ message: 'Body is required' });
}

const post = new Post({ title, body });
  
try {
await post.save();
res.status(201).json(post);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
});
  

// Route to get all posts
app.get('/posts', async (req, res) => {
try {
const posts = await Post.find();
res.send(posts);
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
});

app.put('/edit/:id', (req, res) => {
const { title, body, userName } = req.body;
const { id } = req.params;
Post.findByIdAndUpdate(id, { title, body }, { new: true })
.then((updatedPost) => {
res.json(updatedPost);
})
.catch((err) => {
res.status(500).json({ error: err.message });
});
});


// Route to delete a post
app.delete('/delete/:id', async (req, res) => {
try {
const deletedPost = await Post.findByIdAndRemove(req.params.id).exec();
if (!deletedPost) {
res.status(404).json({ message: 'Post not found' });
} else {
res.status(200).json(deletedPost);
}
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
});
// post routes

// register routes

// Route to register a new user
app.post('/register', async (req, res) => {
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


// register routes



// Route to authenticate a user
app.post('/login', async (req, res) => {
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

// Route to authenticate a user


// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a single user
app.get('/users/:id', async (req, res) => {
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
app.put('/users/:id', async (req, res) => {
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


app.post('/logout', async (req, res) => {
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

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
