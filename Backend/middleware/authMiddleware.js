const jwt = require("jsonwebtoken");

const User = require("../models/User");


const protect = async (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({
                message: "Not authorized. Token missing."
            });

        }


        const token =
            authHeader.split(" ")[1];


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        const row =
            await User.findById(
                decoded.id
            );


        if (!row) {

            return res.status(401).json({
                message: "User not found"
            });

        }


        req.user = User.serializeUser(row);


        next();

    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};


module.exports = {
    protect
};
