import jwt from "jsonwebtoken";
import { constants } from "../constants.js";
import BlacklistedToken from "../models/blacklistedTokenModel.js";

const { UNAUTHORIZED, SERVER_ERROR } = constants;

export const extractToken = (req) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return null;
    }
    return authHeader.split(" ")[1];
};

// Middleware to validate JWT token
const validateToken = async (req, res, next) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(UNAUTHORIZED).json({ error: "User is not authorized or token is missing" });
    }

    try {

        const blacklistedToken = await BlacklistedToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(UNAUTHORIZED).json({ error: "Token is blacklisted" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(UNAUTHORIZED).json({ error: "User is not authorized" });
            }
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export default validateToken;

