import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';


const genToken = (userId)=>{
    return  jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'})
}

//register
export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already Exists"});
        }
        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password should be minimum 6 characters"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a user

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:genToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }

}


//login

export const loginUser = async(req,res)=>{
    const{email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message:"email not registered"})
        }

        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message:"invalid credentials"});
        }
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:genToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
}

export const getUserProfile = async(req,res)=>{
    try {
        const user= User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.json(user);
    } catch (error) {
        
    }
}