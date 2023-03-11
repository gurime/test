import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostForm() {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [posts, setPosts] = useState([]);
const [disabled, setDisabled] = useState(true);
const [editPostId, setEditPostId] = useState(null);
const [users, setUsers] = useState([])
const getData = async() => {
const res = await axios.get('http://localhost:3003/users')
setUsers(res.data)
}

useEffect(() => {
  getData()
}, [])
  
const handleSubmit = (event) => {
event.preventDefault();
axios.post('http://localhost:3003/post', { title, body })
.then((response) => {
setPosts((prevPosts) => [...prevPosts, response.data]);
setTitle('');
setBody('');
})
.catch((error) => console.error(error));
};

function handleEdit(post) {
setTitle(post.title);
setBody(post.body);
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
if (title && body ) {
setDisabled(false);
} else {
setDisabled(true);
}
}, [title, body]);

return (
<>
<form className='postform' onSubmit={handleSubmit}>
<label htmlFor="title">Title:</label>
<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
<label htmlFor="body">Body:</label>
<textarea rows='10' id="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>

{users.map(u => <h4 key={u._id}>{u.firstName} <span className='username'>@{u.userName}</span></h4>)}
<button className='submitbtn' type="submit" disabled={disabled}>{editPostId ? 'Save' : 'Submit'}</button>
</form>

<div className="posts-container">
<h2 className="posts-heading">Posts</h2>
<ul className="posts-list">
{posts.map((post) => (
<li key={post._id} className="post-item">
  <div className='titleBlock'>
<h3 className="post-title">{post.title}</h3>
</div>
<div className='bodyBlock'>
<p className="post-body">{post.body}</p>
</div>
<div className='authorBlock'>
<p className="post-author">{users.map(u => u.firstName)} <span className='username'>@{users.map(u => u.userName)}</span></p>
</div>
<div className='btnBlock'>
<button className="post-edit-btn" onClick={() => handleEdit(post)}>Edit</button>
<button className="post-delete-btn" onClick={() => deletePost(post._id)}>Delete</button>
</div>
</li>
))}
</ul>
</div>
</>
);
}

export default PostForm;
