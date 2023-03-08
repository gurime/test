import { useState } from 'react';
import axios from 'axios';



function PostForm() {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('');

const handleSubmit = async (event) => {
event.preventDefault();
try {
const response = await axios.post('/posts', { title, body, author });
console.log(response.data);
} catch (error) {
console.error('Error creating post:', error);
}
};

return (
<form onSubmit={handleSubmit}>
<label htmlFor="title">Title:</label>
<input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
<label htmlFor="body">Body:</label>
<textarea id="body" value={body} onChange={(event) => setBody(event.target.value)}></textarea>
<label htmlFor="author">Author:</label>
<input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
<button type="submit">Submit</button>
</form>
);
}

export default PostForm;
