require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 1. IMPORT ROUTES (Using require)
const collegeRoutes = require('./routes/collegeRoutes');
const chatbot=require('./routes/chat')

const app = express();

// 2. MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// 3. MOUNT ROUTES
app.use('/api', collegeRoutes);
app.use('/api/chat',chatbot );


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});