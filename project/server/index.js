import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Route imports
import authRoutes from './routes/auth.js';
import cropRoutes from './routes/crops.js';
import marketplaceRoutes from './routes/marketplace.js';
import storageRoutes from './routes/storage.js';
import forecastRoutes from './routes/forecast.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // Mount auth routes

// Database connection
const connectDB = async () => {
  try {
    // In a real app, this would connect to MongoDB
    // await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection simulated');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/forecast', forecastRoutes);

// Socket.io for real-time notifications
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Join a room based on user ID
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Send notifications (example function)
export const sendNotification = (userId, notification) => {
  io.to(userId).emit('notification', notification);
};

// Root route
app.get('/', (req, res) => {
  res.send('AgriTech API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, async () => {
  // Connect to database
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// // Load environment variables FIRST
// dotenv.config();

// // Import routes
// import authRoutes from './routes/auth.js';
// import cropRoutes from './routes/crops.js';
// import marketplaceRoutes from './routes/marketplace.js';
// import storageRoutes from './routes/storage.js';
// import forecastRoutes from './routes/forecast.js';

// // Initialize Express app
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// // Middleware
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());

// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ Database connection error:', error.message);
//     process.exit(1);
//   }
// };

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/crops', cropRoutes);
// app.use('/api/marketplace', marketplaceRoutes);
// app.use('/api/storage', storageRoutes);
// app.use('/api/forecast', forecastRoutes);

// // Root route
// app.get('/', (req, res) => {
//   res.send('🌿 AgriTech API is running');
// });

// // Socket.io for real-time notifications
// io.on('connection', (socket) => {
//   console.log('⚡ A user connected');

//   socket.on('join', (userId) => {
//     socket.join(userId);
//     console.log(`👤 User ${userId} joined their room`);
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ A user disconnected');
//   });
// });

// // Send notifications (example function)
// export const sendNotification = (userId, notification) => {
//   io.to(userId).emit('notification', notification);
// };

// // Start server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, async () => {
//   await connectDB(); // Connect to MongoDB
//   console.log(`🚀 Server running on port ${PORT}`);
// });
