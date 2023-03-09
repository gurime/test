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

app.get('/api/posts', async (req, res) => {
try {
const posts = await Post.find();
res.status(200).json(posts);
} catch (error) {
console.error('Error fetching posts:', error);
res.status(500).json({ message: 'Server error' });
}
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`);
});
