import express from 'express';
import cors from 'cors';
import connectDB from '../db/index.js';
import router from '../routes/posts.js';
import routers from '../routes/users.js';
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
app.use(routers )
app.use(router)






const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
