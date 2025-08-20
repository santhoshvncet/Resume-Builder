import mongoose from "mongoose";

export const connectDB = async() =>{ 
    await mongoose.connect("mongodb+srv://sathoshv23:Sandy1234@cluster0.zwnmlzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/resume-build")
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err));
}

