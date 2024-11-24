require('dotenv').config();

const express = require('express');
const deliveryRoutes = require('./routes/deliveryRoutes');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Base routes
app.use('/api/delivery', deliveryRoutes);


// Error handling middleware
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
    res.send('Delivery API is running');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));