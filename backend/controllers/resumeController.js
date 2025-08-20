import Resume from "../models/resumeModel.js";
import fs from 'fs';
import path from 'path'

export const createResume = async(req,res)=>{
    try {
        const {title} = req.body;
        //default template 
         const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume  = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body

        });

        res.status(201).json(newResume);


    } catch (error) {
        res.status(500).json({message:"failed to build a resume",error:error.message});
    }
}


//get resume

export const getUserResume= async(req,res)=>{

    try {
        const resume=await Resume.find({userId:req.user._id}).sort({
            updatedAt:-1
        });
        res.json(resume);
    } catch (error) {
        res.status(500).json({message:"failed to fetch a resume",error:error.message});
        
    }
}

export const getUserById =async(req,res)=>{
 try {
    const resume = await Resume.findOne({_id:req.params.id,userId:req.user._id})
    if(!resume){
        return res.status(400).json({message:"Resume not found"})
    }
    res.json(resume);
 } catch (error) {
        res.status(500).json({message:"failed to fetch a resume",error:error.message});
 }   
}


//update resume
export const updateResume=async(req,res)=>{
    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
    if(!resume){
        return res.status(400).json({message:"Resume not found"})
    }
    //merge updates

    Object.assign(resume,req.body);

    const savedResume = await resume.save();
    res.json(savedResume);
        
    } catch (error) {
        res.status(500).json({message:"failed to fetch a resume",error:error.message});
    }
}

//delete resume

export const deleteResume =async(req,res)=>{
    try {
        const resume = await Resume.find({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
        return res.status(400).json({message:"Resume not found"})
    }

    const uploadFolder = path.join(process.cwd(),'uploads');
    //delete thumbnail

    if(resume.thumbnailLink){
        const oldThumbnail = path.join(uploadFolder,path.basename(resume.thumbnailLink))
        if(fs.existsSync(oldThumbnail)){
            fs.unlinkSync(oldThumbnail)
        }
    }


    if(resume.profileInfo?.profilePreviewUrl){
        const oldProfile = path.join(uploadFolder,path.basename(resume.profileInfo.profilePreviewUrl));
        if(fs.existsSync(oldProfile)){
            fs.unlinkSync(oldProfile)
        }
    }

    //delete resume
    const deleteResume = await Resume.findOneAndDelete({
        _id:req.params.id,
        userId:req.user._id
    })
    if(!deleteResume){
        return res.status(400).json({message:"Resume not found"})  
    }
    res.json("resume deleted successfully");
    } catch (error) {
        
    }
}