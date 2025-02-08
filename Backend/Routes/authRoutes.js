const { login, register } = require('../Controllers/authController');
const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require("passport");
const Router = express.Router();

// Signup Route with Input Validation
Router.post('/signup', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await register(req, res);
});

// Login Route with Input Validation
Router.post('/login', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await login(req, res);
});

// Google OAuth Login
Router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] },(req,res)=>{
    console.log(req.user)
  })
);

// Google OAuth Callback
Router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // console.log(req.user)
    if (!req.user.user) {
      return res.redirect("http://localhost:5173/login?error=failed"); // Redirect to frontend with error
    }
    
    // Send token and user data to frontend
    const token = req.user.token;
    // res.json({
    //   userId:req.user.user._id,
    //   token:req.user.token
    // })
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

module.exports = Router;
