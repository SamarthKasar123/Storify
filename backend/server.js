const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const http = require('http');
  const socketIo = require('socket.io');
  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    socket.on('joinChapter', (chapterId) => {
      socket.join(`chapter_${chapterId}`);
    });
  
    socket.on('updateContent', (data) => {
      socket.to(`chapter_${data.chapterId}`).emit('contentUpdated', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

sequelize.sync({ force: false })  // Change force to false for production
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  });
