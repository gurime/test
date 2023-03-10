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

app.post('/post', async (req, res) => {
    const { title, body, author } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
  
    if (!body) {
      return res.status(400).json({ message: 'Body is required' });
    }
  
    if (!author) {
      return res.status(400).json({ message: 'Author is required' });
    }
  
    const post = new Post({ title, body, author });
  
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
  

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
