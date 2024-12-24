import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        setError('Failed to load story.');
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await axios.delete(`http://localhost:5000/api/stories/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        navigate('/dashboard');
      } catch (error) {
        setError('Failed to delete story.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-emerald-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-emerald-500 mb-4">{story.title}</h2>
          <p className="text-gray-400 mb-6">{story.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Created on {new Date(story.createdAt).toLocaleDateString()}
            </span>
            {user && story.authorId === user.id && (
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete Story
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;