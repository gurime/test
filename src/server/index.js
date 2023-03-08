import express from 'express';
import cors from 'cors';
import connectDB from '../db/index.js';
import Post from '../schemas/index.js';

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

app.post('/posts', async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log('Server running on port 3000');
  }
});
