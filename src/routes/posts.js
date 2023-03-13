import { Router } from 'express';
import { Post } from '../schemas/index.js';
const router = Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
  try {
    const posts = await find();
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/edit/:id', (req, res) => {
  const { title, body, userName } = req.body;
  const { id } = req.params;
  findByIdAndUpdate(id, { title, body }, { new: true })
  .then((updatedPost) => {
    res.json(updatedPost);
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPost = await findByIdAndRemove(req.params.id).exec();
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

export default router;
