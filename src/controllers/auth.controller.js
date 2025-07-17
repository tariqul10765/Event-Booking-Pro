const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
    /*
     * 1. Get the email, password, and name from the request body
     * 2. Check if the user already exists
     * 3. If the user exists, return an error
     * 4. If the user does not exist, hash the password
     * 5. Create a new user
     * 6. Generate a token
     * 7. Return the user and the token
    */
    const { email, password, name } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed, name }
    });

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Registered', user });
};

exports.login = async (req, res) => {
    /**
     * 1. Get the email and password from the request body
     * 2. Find the user by email
     * 3. If the user does not exist, return an error
     * 4. If the user exists, compare the password with the hashed password
     * 5. If the password is incorrect, return an error
     * 6. If the password is correct, generate a token
     * 7. Return the user and the token
     */
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in', user });
};