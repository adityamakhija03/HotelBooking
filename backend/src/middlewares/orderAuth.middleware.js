import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
const orderAuth = async (req, res,next) => {
    try {
        // Request to the browser for the cookies 
        const token = req.cookies.orderSession;

        // If the token is null
        if (!token) {
            // const error = new Error("Invalid order session token");
            // error.statusCode = 403;
            // throw error;
            throw new ApiError(403,"Invalid order session token");
        };

        // Verify the jwt token and return the document to identify the uniqueness 
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // If user not found
        if (!verifyToken) {
            // const error = new Error("Authentication failed");
            // error.statusCode = 401;        
            // throw error;
            throw new ApiError(401,"Authentication failed");
        }


        // Verify the user and call the next() method to validate the authentication

        // Checking for the same user 
        // Supposes user logged in and goes to checkout session and then logs out
        // While logged out, both the user authentication and the order session cookies are removed
        // But if the order session cookie is not removed and a new user logs in, then the same session will be active and this will create an issue

        // Checking for the right user to access the order session
        if (req.user.toString() !== verifyToken.userId.toString()) {
            // const error = new Error("Invalid order session for user");
            // error.statusCode = 401;
            // throw error;
            throw new ApiError(401,"Invalid order session for user");
        }

        req.orderUser = verifyToken.userId;
        req.orderToken = token;

        next();

    } catch (error) {
        next(error)
    }
}

export {orderAuth};