import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../components/DashBoardLayout.jsx'
import { dashboardStyles as styles } from '../assets/dummystyle.js'
import { useNavigate } from 'react-router-dom'
import { LucideFilePlus, LucideTrash2 } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance.jsx'
import { API_PATHS } from '../utils/apiPaths.js'
import { ResumeSummaryCard } from '../components/Cards.jsx'
import toast from 'react-hot-toast'
import moment from 'moment';
import Model from '../components/Model.jsx'
import CreateResumeForm from '../components/CreateResumeForm.jsx'


const DashBoard = () => {
  const[openCreateModal,setOpenCreateModal] = useState(false);
  const[allResumes,setAllResumes] = useState([])
  const[loading,setLoading] = useState(true);
  const[resumeToDelete,setResumeToDelete] = useState(null);
  const[showDeleteConfirm,setShowDeleteConfirm] = useState(false)
  const navigate = useNavigate();

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResume= async()=>{
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      const resumeWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume)
      }));

        setAllResumes(resumeWithCompletion)
      } catch (error) {
        console.error("error fetching resume",error)
      } finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    fetchAllResume();
  },[]);

  const handleDelete=async()=>{
    if(!resumeToDelete) return ;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success("resume deleted successfully");
    } catch (error) {
      console.error('error deleting resume',error);
      toast.error('failed to delete resume');
    }
    finally{
      setResumeToDelete(null);
      setShowDeleteConfirm(false);
    }
  }

const handleDeleteClick=(id)=>{
  setResumeToDelete(id);
  setShowDeleteConfirm(true);
}

  return (
    <DashBoardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length>0 ? `you have ${allResumes.length} resume${allResumes.length !== 1 ? 's' :''}` : "start Building your professional resume "}
            </p>
            </div>
            <div className='flex gap-4'>
              <button className={styles.createButton} onClick={()=>setOpenCreateModal(true)}>
                <div className={styles.createButtonOverlay}></div>
                <span className={styles.createButtonContent}>Create Now

                  <LucideFilePlus  className='group-hover:translate-x-1 transition-transform' size={18}/>
                </span>
        
              </button>
            </div>
        </div>
          {/** loading state */}
            {
              loading && (
                <div className={styles.spinnerWrapper}> 
                <div className={styles.spinner}></div>
                </div>
              )
            }
            {/** empty */}
              {
                !loading && allResumes.length === 0 && (
                  <div className={styles.emptyStateWrapper}>
                    <div className={styles.emptyIconWrapper}>
                      <LucideFilePlus  size={32} className='text-violet-600'/>
                    </div>
                    <h3 className={styles.emptyTitle}>No Resume yet</h3>
                    <p className={styles.emptyText}>You Haven't created a Resume yet .Start Building you professional resume to land your Dream Job.</p>
                    <button className={styles.createButton} onClick={()=>setOpenCreateModal(true)}>
                      <div className={styles.createButtonOverlay}></div>
                      <span className={styles.createButtonContent}>Create your first Resume
                  <LucideFilePlus  className='group-hover:translate-x-1 transition-transform' size={18}/>
                      </span>
                    </button>
                  </div>
                )
              }
              {
                !loading && allResumes.length>0 && (
                  <div className={styles.grid}>
                    <div className={styles.newResumeCard} onClick={()=>setOpenCreateModal(true)}>
                      <div className={styles.newResumeIcon}>
                        <LucideFilePlus size={32} className='text-white' />
                      </div>
                      <h3 className={styles.newResumeTitle}>Create New Resume</h3>
                      <p className={styles.newResumeText}>Start Building New Career</p>
                    </div>
                    {
                      allResumes.map((resume)=>(
                        <ResumeSummaryCard  key={resume._id} imgUrl={resume.thumbnailLink}
                        title={resume.title}
                        createdAt={resume.createdAt}
                        updatedAt={resume.updatedAt}
                        onSelect={()=>navigate(`/resume/${resume._id}`)}
                        onDelete={()=>handleDeleteClick(resume._id)}
                        completion={resume.completion || 0}
                        isPremium={resume.isPremium}
                        isNew ={moment().diff(moment(resume.createdAt),'days') < 7}
                        />

                      ))
                    }
                  </div>
                )
              }
      </div>

      {/** */}
      <Model isOpen={openCreateModal}
      onClose={()=>setOpenCreateModal(false)}
      hideHeader maxWidth="max-w-2xl"
      >
        <div className='p-6'>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Create New Resume</h3>
          <button onClick={()=>setOpenCreateModal(false)} className={styles.modalCloseButton}>
            X
          </button>
        </div>
        <CreateResumeForm onSuccess={()=>{
          setOpenCreateModal(false);
          fetchAllResume();

        }}/>
        </div>
      </Model>

      {/**delete model */}
      <Model isOpen={showDeleteConfirm} onClose={()=>setShowDeleteConfirm(false)} title='confirm deletion'
        showActionBtn actionBtnText='delete' actionBtnClassName='bg-red-600 hover:bg-red-700'
        onActionClick={handleDelete}
        >
          <div className='p-4'>
            <div className='flex flex-col items-center text-center'>
              <div className={styles.deleteIconWrapper}>
                <LucideTrash2 size={24} className='text-orange-600'/>
              </div>
              <h3 className={styles.deleteTitle}>Delete Resume?</h3>
              <p className={styles.deleteText}>
                Are you sure you want to delete this resume? this action cannot be undone.
              </p>
            </div>
          </div>
        </Model>
    </DashBoardLayout>
  )
}

export default DashBoard
