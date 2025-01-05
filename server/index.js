const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
require('dotenv').config();



// Set up database connection
const dbConfig = require('./config/dbConfig');

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// disable CORS
app.use(cors());

// User routes
// const HomePage = require('./',"Hello This is home page");
// app.use('/', HomePage);



const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

//Admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

//doctors routes
const doctorsRoute = require('./routes/doctorsRoute');
app.use('/api/doctors', doctorsRoute);



const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
