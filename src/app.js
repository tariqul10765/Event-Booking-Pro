const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const prisma = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Sample route
app.get("/", async (req, res) => {
    // Find user by email
    const user = await prisma.user.findMany({ where: { email: "test@test.com" } });
    res.send('API is running 🚀', user);
});
// 👇 Auth routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;