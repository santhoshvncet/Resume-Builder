import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    title:{
        required:true,
        type:String,

    },
    thumbnailLink:{
        type:String,    
    },
    template:{
        theme:String,
        colorPalette:[String]
    },
    profileInfo:{
        profilePreviewUrl:String,
        fullName:String,
        designation:String,
        summary:String,
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String,
        githubLink:String,
        website:String,
    },
    //work exp
    workExperience:[{
        company:String,
        role:String,
        startDate:String,
        endDate:String,
        description:String
    }],
    education:[{
        degree:String,
        institution:String,
        startDate:String,
        endDate:String,
    }],
    skills:[{
        name:String,
        progress:String,
    }],
    projects:[{
        title:String,
        description:String,
        github:String,
        liveDemo:String
    }],
    certifications:[{
            title:String,
            issuer:String,
            year:String
    }],

    languages:[{
        name:String,
        progress:String
    }],
    interests:[String],
},
{
    timestamps:{createdAt:"createdAt",updatedAt:'updatedAt'}
}
)

export default mongoose.model('Resume',resumeSchema)