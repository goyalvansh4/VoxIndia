const express = require('express');
const dotenv = require('dotenv');
const session = require("express-session");
const cors = require('cors');
const http = require('http');
const connectDB = require('./DB/connectDB');
const authRoutes = require('./Routes/authRoutes');
const passport = require("passport")

dotenv.config();
require("./config/passport"); // Import the Passport config
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "/api"; // Default base URL if not provided

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://voxindia.co.in", "https://voxindia.co.in"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
connectDB().catch(err => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1);
});


app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use(`${BASE_URL}/auth`, authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
