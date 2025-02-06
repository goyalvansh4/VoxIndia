const userModel = require('../Models/user.model');
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.create({email, password:bcrypt.hashSync(password, 10)});
    res.status(201).json({status:"success",message:"User created successfully", user});
  }
  catch (error) {
    res.status(500).json({message:error.message});
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email
    });
    if (!user) {
      return res.status(404).json({message:"User not found"});
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ status: 'success', data:{token , userId:user._id}});
    }
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = { register, login };