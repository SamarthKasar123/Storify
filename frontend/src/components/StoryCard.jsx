import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
        <p className="text-gray-400 mb-4">{story.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/story/${story.id}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Read More
          </Link>
          <span className="text-gray-400 text-sm">
            {new Date(story.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
