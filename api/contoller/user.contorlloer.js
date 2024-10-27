import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"; // Corrected the import name

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name ) { 
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) { 
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
 // Password length check
 if (password.length < 6) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
    });
}

        // Validate password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).status(200).json({
            success: true,
            message: "User signed in successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role } // Exclude password
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


export const getUserProfile = async (req, res) => {
    try{
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);

    }catch(err){
        console.error(err); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
