const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Routes
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
