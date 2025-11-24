const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
require("dotenv").config();

// Initialize passport
require("./middleware/passport");

const app = express();

const path = require('path');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware for passport
app.use(session({
  secret: process.env.SESSION_SECRET || "your-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
// Connect to MongoDB (current driver ignores useNewUrlParser/useUnifiedTopology)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mie-yamin-loyalty")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/loyalty", require("./routes/loyalty"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server with automatic port fallback if in use (tries up to 5 ports)
const DEFAULT_PORT = parseInt(process.env.PORT || '5000', 10);
const MAX_TRIES = 5;

function startServer(port, triesLeft) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is already in use.`);
      if (triesLeft > 0) {
        const nextPort = port + 1;
        console.log(`Trying port ${nextPort} (${triesLeft - 1} attempts left)...`);
        // small delay before retry
        setTimeout(() => startServer(nextPort, triesLeft - 1), 300);
        return;
      }
      console.error(`All fallback ports are in use. Kill the process using this port or set a different PORT env and restart.`);
      console.error(`On macOS: lsof -iTCP:${port} -sTCP:LISTEN -n -P`);
      process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
  });
}

startServer(DEFAULT_PORT, MAX_TRIES);

module.exports = app;
