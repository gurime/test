import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostForm() {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('');
const [posts, setPosts] = useState([]);
const [disabled, setDisabled] = useState(true);
const [editPostId, setEditPostId] = useState(null);



const handleSubmit = (event) => {
event.preventDefault();
axios.post('http://localhost:3003/post', { title, body, author })
.then((response) => {
setPosts((prevPosts) => [...prevPosts, response.data]);
setTitle('');
setBody('');
setAuthor('');
})
.catch((error) => console.error(error));
};

function handleEdit(post) {
setTitle(post.title);
setBody(post.body);
setAuthor(post.author);
setEditPostId(post._id);
}



useEffect(() => {
axios.get('http://localhost:3003/posts')
.then((response) => setPosts(response.data))
.catch((error) => console.error(error));
}, []);

function deletePost(id) {
axios.delete(`http://localhost:3003/delete/${id}`)
.then(() => {
setPosts(posts.filter((post) => post._id !== id));
})
.catch((error) => console.error(error));
}

useEffect(() => {
if (title && body && author) {
setDisabled(false);
} else {
setDisabled(true);
}
}, [title, body, author]);

return (
<>
<form className='postform' onSubmit={handleSubmit}>
<label htmlFor="title">Title:</label>
<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
<label htmlFor="body">Body:</label>
<textarea rows='10' id="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
<label htmlFor="author">User:</label>
<input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
<button className='submitbtn' type="submit" disabled={disabled}>{editPostId ? 'Save' : 'Submit'}</button>
</form>

<div className="posts-container">
<h2 className="posts-heading">Posts</h2>
<ul className="posts-list">
{posts.map((post) => (
<li key={post._id} className="post-item">
<h3 className="post-title">{post.title}</h3>
<p className="post-body">{post.body}</p>
<p className="post-author">@User {post.author}</p>
<button className="post-edit-btn" onClick={() => handleEdit(post)}>Edit</button>
<button className="post-delete-btn" onClick={() => deletePost(post._id)}>Delete</button>
</li>
))}
</ul>
</div>
</>
);
}

export default PostForm;
