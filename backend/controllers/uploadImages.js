import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';

import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async(req,res)=>{
    console.log(req.params.resumeId, req.user)
    try {
        upload.fields([{name:"thumbnail"},{name:"profileImage"}])
        (req,res,async(err)=>{
            if(err){
                return res.status(400).json({message:"upload failed",error:err.message});
            }
            const resumeId = req.params.id;
            const resume = await Resume.findOne({resumeId,userId:req.userId});

            if(!resume){
                return res.status(400).json({message:"resume not found or unauthorized"})
            }

            //use process cwd to locate uploads folder

            const uploadFolder =  path.join(process.cwd(),"uploads")
            const baseUrl = `${req.protocol}://${req.get("host")}`
            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail = path.join(uploadFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail)){
                        fs.unlinkSync(oldThumbnail)
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail}`
            }
            //profile image

            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const old = path.join(uploadFolder,path.basename(resume.profileInfo?.profilePreviewUrl))
                    if(fs.existsSync(old)){
                        fs.unlinkSync(old)
                    }
                }
                resume.profileInfo.profilePreviewUrl= `${baseUrl}/uploads/${newProfileImage.filename}`;
            }
                await resume.save();
                res.status(200).json({
                    message:"image uploaded successfully",
                    thumbnailLink:resume.thumbnailLink,
                    profilePreviewUrl:resume.profileInfo.profilePreviewUrl
                })


        })
    } catch (error) {

        console.error("error at uploading image",error);
        res.status(500).json({
            message:"error at uploading image",
            error:error.message
        })
        
    }
}


