import { decodeToken } from "../utils/tokens.js";

// Middleware function to authenticate user requests
function authenticate(req, res, next) {
    try {
        let tokenHeader = req.headers.authorization;

        // Check if Authorization header with Bearer token exists
        if (!tokenHeader || !tokenHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "You're not authorized to perform this action!" });
        }

        // Extract the token from the Authorization header
        tokenHeader = tokenHeader.split(' ')[1];

        // Decode the token to get user_id
        const { user_id } = decodeToken(tokenHeader);

        // Attach user_id to the request object for use in subsequent middleware or routes
        req.user = { user_id };

        next(); // Call the next middleware or route handler
    } catch (error) {
        // If there's an error, return 401 Unauthorized
        return res.status(401).json({ message: "You're not authorized to perform this action!" });
    }
}

export default authenticate;
