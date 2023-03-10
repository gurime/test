import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [posts, setPosts] = useState([]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'title') setTitle(value);
    else if (id === 'body') setBody(value);
    else if (id === 'author') setAuthor(value);
    setDisabled(title === '' || body === '' || author === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3003/post', { title, body, author })
      .then((response) => {
        setPosts([...posts, response.data]);
        setTitle('');
        setBody('');
        setAuthor('');
        setDisabled(true);
      })
      .catch((error) => console.error(error));
  };

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleInputChange} />
        <label htmlFor="body">Body:</label>
        <textarea id="body" value={body} onChange={handleInputChange}></textarea>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={handleInputChange} />
        <button className='submitbtn' type="submit" disabled={disabled}>Submit</button>
      </form>

      <div className="posts-container">
  <h2 className="posts-heading">Posts</h2>
  <ul className="posts-list">
    {posts.map((post) => (
    <li key={post._id} className="post-item">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <p className="post-author">by {post.author}</p>
      <button className="post-delete-btn" onClick={() => deletePost(post._id)}>Delete</button>
    </li>
    ))}
  </ul>
</div>

    </>
  );
}

export default PostForm;
