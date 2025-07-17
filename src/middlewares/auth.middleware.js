const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    /**
     * 1. Get the token from the cookies
     * 2. If the token is not found, return an error
     * 3. If the token is found, verify the token
     * 4. If the token is valid, set the user in the request
     * 5. If the token is invalid, return an error
     */
    let token = req.cookies.token || '';

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { protect };
