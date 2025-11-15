const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://zephyra-cbe14.web.app', 'https://zephyra.anujprojects.in', 'https://zephyra.shantanuprojects.in', 'https://zephyra.anshika.tech'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const sessionRoutes = require('./routes/sessions');
const canvasRoutes = require('./routes/canvas');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API Running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Use chat routes
app.use('/api/chat', chatRoutes);

// Use session routes
app.use('/api/sessions', sessionRoutes);

// Use canvas routes
app.use('/api/canvas', canvasRoutes);

// Start server
app.listen(PORT, () => {
  // Server running
});
