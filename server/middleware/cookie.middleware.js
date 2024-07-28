const setUserIDCookie = (req, res, next) => {
    if (!req.cookies.userID) {
        const uniqueID = generateUUID(); // Function to generate a unique identifier
        res.cookie('userID', uniqueID, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Set cookie to expire in 30 days
    }
    next();
};