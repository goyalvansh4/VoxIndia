const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;
const connectDB = require('./DB/connectDB');
const http = require('http');
const server = http.createServer(app);
const authRoutes = require('./Routes/authRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(`${BASE_URL}/auth`, authRoutes);



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

