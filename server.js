const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ DB Connection Error:", err.message));

// ✅ User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", userSchema);

// ✅ Test Route to check backend
app.get('/check-backend', (req, res) => {
    console.log("🔥 Backend route /check-backend was hit!");
    res.json({ status: "Backend is working ✅", time: new Date() });
});

// ✅ Get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ✅ Add new user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: '✅ User Added!', user });
});

// ✅ Update user
app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ User Updated!', updatedUser });
});

// ✅ Delete user
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: '🗑️ User Deleted!' });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
