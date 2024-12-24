import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StoryCard from '../components/StoryCard';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stories');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-emerald-500">Loading...</div>
      </div>
    );
  }

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-500">Your Stories</h2>
        <Link
          to="/create-story"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium"
        >
          Create New Story
        </Link>
      </div>
      {stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No stories yet. Start creating!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;