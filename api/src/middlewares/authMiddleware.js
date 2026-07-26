import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    
    next();
}