import { useState, useEffect } from 'react';
import axios from 'axios';

function PostForm() {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('');
const [disabled, setDisabled] = useState(true);
const [posts, setPosts] = useState([]);

useEffect(() => {
const fetchPosts = async () => {
const response = await axios.get('http://localhost:3001/api/posts');
setPosts(response.data);
};
fetchPosts();
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/posts', { title, body, author });
      console.log(response.data);
      setPosts([...posts, response.data]);
      setTitle('');
      setBody('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'title') setTitle(value);
    else if (id === 'body') setBody(value);
    else if (id === 'author') setAuthor(value);

    setDisabled(title === '' || body === '' || author === '');
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleInputChange} />
        <label htmlFor="body">Body:</label>
        <textarea id="body" value={body} onChange={handleInputChange}></textarea>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={handleInputChange} />
        <button type="submit" disabled={disabled}>Submit</button>
      </form>

      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>{post.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PostForm;
