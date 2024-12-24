import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ChapterVoting = ({ chapterId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const { user } = useAuth();

  const handleVote = async () => {
    try {
      const response = await axios.post(`/api/chapters/${chapterId}/vote`, {
        userId: user.id
      });
      setVotes(response.data.votes);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleVote}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
      >
        Vote
      </button>
      <span className="text-gray-300">{votes} votes</span>
    </div>
  );
};

export default ChapterVoting;