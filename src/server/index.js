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




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`);
});
