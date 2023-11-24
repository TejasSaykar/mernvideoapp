import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// SignUp Controller
export const signupController = async (req, res) => {
    try {
        const { name, email, password, ...others } = req.body;
        if (!email || !name || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(404).json({
                success: false,
                message: "Email already exists please signin"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await new User({ name, email, password: hashedPass, ...others }).save();
        res.status(201).json({
            success: true,
            message: "Signup successfully",
            newUser
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while signup",
            error
        })

    }
}



// SignIn controller
export const signinController = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Wrong credentials"
            })
        }
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        // const isCorrect = await bcrypt.compare(password, user.password);
        // if (!isCorrect) {
        //     return res.status(402).json({
        //         success: false,
        //         message: "Wrong username or password"
        //     })
        // }

        const { password: pass, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(201).json({
            success: true,
            message: "Signin successfully",
            others
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while signin",
            error
        });
    }
}


// SignIn with Google controller

export const googleAuth = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(201).json({
                success: true,
                message: "Sign in with google",
                user: user._doc
            })
        } else {
            const newUser = new User({ ...req.body, fromGoogle: true });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(201).json({
                success: true,
                message: "SignIn with google",
                user: savedUser._doc
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while signin",
            error
        })
    }
}