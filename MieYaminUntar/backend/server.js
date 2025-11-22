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

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mie-yamin-loyalty", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Add mongoose connection event listeners for better diagnostics
const db = mongoose.connection;

db.on('connected', () => {
  console.log("Mongoose connected to DB");
});

db.on('error', (err) => {
  console.error("Mongoose connection error:", err);
});

db.on('disconnected', () => {
  console.warn("Mongoose disconnected from DB");
});

// Optional: Reconnect on disconnect
db.on('reconnected', () => {
  console.log("Mongoose reconnected to DB");
});

const menuRoutes = require('../../backend/routes/menu');

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/loyalty", require("./routes/loyalty"));
app.use("/api/admin", require("./routes/admin"));
app.use('/api', menuRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// Log all registered routes for debugging
app._router.stack.forEach((middleware) => {
  if (middleware.route) { // routes registered directly on the app
    console.log('Route:', middleware.route.path);
  } else if (middleware.name === 'router') { // router middleware
    middleware.handle.stack.forEach((handler) => {
      const route = handler.route;
      route && console.log('Route:', route.path);
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
