import { constants } from "../constants.js";
import { extractToken } from "../middleware/validateToken.js";
import BlacklistedToken from "../models/blacklistedTokenModel.js";
import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { OK, VALIDATION_ERROR, SERVER_ERROR, UNAUTHORIZED } = constants;

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(VALIDATION_ERROR).json({ error: "All fields are mandatory !" })
            return;
        }
        const availableUser = await Users.findOne({ email });

        if (availableUser) {
            res.status(VALIDATION_ERROR).json({ error: "User already registered !" })
            return;
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({ username, email, password: hashedPassword })

        if (user) {
            res.status(OK).json({ _id: user.id, email: user.email });

        } else {
            res.status(VALIDATION_ERROR).json({ error: "User data is not valid" });
            return;
        }

    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        const user = await Users.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.status(OK).json({ accessToken });
        } else {
            res.status(UNAUTHORIZED);
            throw new Error("Email or password is not valid")
        }
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }

}

export const logout = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) {
            return res.status(UNAUTHORIZED).json({ error: "Invalid token" });
        }

        await BlacklistedToken.create({ token });

        res.json({ success: true, message: 'Logout successfully' });
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
