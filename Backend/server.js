const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const connectDB = require('./DB/connectDB');
const http = require('http');
const authRoutes = require('./Routes/authRoutes');
const cors = require('cors');



// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173","http://voxindia.co.in", "https://voxindia.co.in"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
// connection to database
connectDB();
app.use(express.json());

// API Routes
app.use(`${baseUrl}/auth`, authRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

