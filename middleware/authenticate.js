const isAuthenticated = (req, res, next) => {
    // Passport sets req.isAuthenticated() when using sessions
    if (typeof req.isAuthenticated === 'function' && req.isAuthenticated()) {
        return next();
    }

    // Fallback for code that stores user in session manually
    if (req.session && req.session.user) {
        return next();
    }

    return res.status(401).json({ message: 'You do not have access!' });
};
module.exports = { isAuthenticated };
