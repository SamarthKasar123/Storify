import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const ChapterEditor = ({ chapterId, initialContent }) => {
  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState(initialContent);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('joinChapter', chapterId);

    newSocket.on('contentUpdated', (data) => {
      setContent(data.content);
    });

    return () => newSocket.close();
  }, [chapterId]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket?.emit('updateContent', {
      chapterId,
      content: newContent,
      userId: user.id
    });
  };

  return (
    <div className="w-full">
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500"
        placeholder="Write your chapter content here..."
      />
    </div>
  );
};

export default ChapterEditor;
