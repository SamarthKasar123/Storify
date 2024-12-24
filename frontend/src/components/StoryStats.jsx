import { useState, useEffect } from 'react';
import axios from 'axios';

const StoryStats = ({ storyId }) => {
  const [stats, setStats] = useState({
    totalChapters: 0,
    totalContributors: 0,
    totalVotes: 0,
    completionPercentage: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/stories/${storyId}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [storyId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="text-center">
        <h3 className="text-emerald-500 font-bold">Chapters</h3>
        <p className="text-2xl text-white">{stats.totalChapters}</p>
      </div>
      <div className="text-center">
        <h3 className="text-emerald-500 font-bold">Contributors</h3>
        <p className="text-2xl text-white">{stats.totalContributors}</p>
      </div>
      <div className="text-center">
        <h3 className="text-emerald-500 font-bold">Votes</h3>
        <p className="text-2xl text-white">{stats.totalVotes}</p>
      </div>
      <div className="text-center">
        <h3 className="text-emerald-500 font-bold">Progress</h3>
        <p className="text-2xl text-white">{stats.completionPercentage}%</p>
      </div>
    </div>
  );
};

export default StoryStats;