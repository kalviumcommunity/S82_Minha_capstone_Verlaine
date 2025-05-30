import { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import 'react-toastify/dist/ReactToastify.css';

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/community/posts', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPosts(data.posts);
      } catch (err) {
        toast.error('Failed to load posts');
        console.error('Load posts error:', err);
      }
    };
    if (token) fetchPosts();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error('Please enter a post');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/community/posts', { content: postContent }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setPostContent('');
      const { data } = await axios.get('/community/posts', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setPosts(data.posts);
      toast.success('Post created');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post');
      console.error('Create post error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <h1 className="text-4xl font-serif font-bold text-rose-800 mb-8 text-center animate-slide-up">
        Community
      </h1>
      <div className="card max-w-2xl mx-auto mb-6 animate-slide-up">
        <h2 className="text-2xl font-serif text-rose-800 mb-4">Share Your Thoughts, {user?.username}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="input-field"
            rows="4"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share a skincare tip or question..."
            disabled={loading}
            aria-label="New post"
          />
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
            aria-label="Post"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
      <div className="max-w-2xl mx-auto space-y-4 animate-slide-up delay-100">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="card">
              <p className="text-rose-600 font-sans">{post.content}</p>
              <p className="text-rose-500 text-sm font-sans mt-2">
                Posted by {post.user.username} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-rose-600 font-sans text-center">No posts yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
}