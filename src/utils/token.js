const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    /**
     * 1. Generate a token using the user's id and email
     * 2. Set the expiration time to 7 days
     * 3. Return the token
     */
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { generateToken };
