// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const router = express.Router();

// // Simulated user database
// const users = [
//   {
//     _id: '1',
//   }
// ]
// export default router; 
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Simulated user database
const users = [];

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role, location } = req.body;

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = {
    _id: users.length + 1, // Simulating a database ID
    name,
    email,
    password: hashedPassword,
    role,
    location
  };

  users.push(newUser);

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, 'yourSecretKey', { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token, user: newUser });
});

// @route   POST /api/auth/login
// @desc    Authenticate user & return token
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Find user by email
//   const user = users.find(user => user.email === email);
//   if (!user) {
//     return res.status(400).json({ error: 'Invalid credentials' });
//   }

//   // Check password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ error: 'Invalid credentials' });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

//   res.json({ message: 'Login successful', token, user });
// });

// router.post('/login', async (req, res) => {
//   console.log('Login request received:', req.body); // Debug incoming data

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide email and password' });
//   }

//   const user = users.find(user => user.email === email);
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

//   res.json({ message: 'Login successful', token, user });
// });
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body); // Debug log
  console.log("just checking")

  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });
    console.log('User found in DB:', user); // Debug log

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match status:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;
