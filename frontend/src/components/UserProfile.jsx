import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    storiesCreated: 0,
    contributions: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${user.id}/profile`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}/profile`, profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-emerald-500 mb-6">Profile</h2>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded text-white h-32"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-400">Username</h3>
            <p className="text-white text-lg">{profile.username}</p>
          </div>
          <div>
            <h3 className="text-gray-400">Bio</h3>
            <p className="text-white">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-400">Stories Created</h3>
              <p className="text-white text-lg">{profile.storiesCreated}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Contributions</h3>
              <p className="text-white text-lg">{profile.contributions}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;