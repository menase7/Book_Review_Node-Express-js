import user from "../models/user.js";
import { hashPassword, compare_hashed_passwords } from "../utils/hashing.js";
import { createToken } from "../utils/tokens.js";

// Function to log in a user
export async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const registeredUser = await user.findOne({ where: { username } });
        if (!registeredUser) {
            return res.json({ message: "Invalid username or password" });
        }

        // Compare the provided password with the hashed password in the database
        const is_matched = await compare_hashed_passwords(password, registeredUser.password);
        if (!is_matched) {
            return res.json({ message: "Invalid username or password" });
        }

        // If credentials are correct, create a token and send it back to the client
        const token = createToken(registeredUser.id, username);

        return res.json({ message: "User logged in successfully!", token });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Function to register a new user
export async function register(req, res) {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const foundUser = await user.findOne({ where: { username } });
        if (foundUser) {
            return res.json({ message: "This user is already registered" });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await hashPassword(password);

        // Create a new user in the database
        const newUser = await user.create({ username, password: hashedPassword });

        res.json({ message: "User registered successfully" });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: "Internal Server Error" });
    }
}
