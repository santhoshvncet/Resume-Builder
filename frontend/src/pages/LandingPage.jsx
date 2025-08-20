import React from 'react'
import { landingPageStyles } from '../assets/dummystyle.js'
import {LayoutTemplate ,X ,Menu, ArrowRight ,Zap, Download, Pointer} from 'lucide-react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ProfileInfoCard } from '../components/Cards.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';
import Model from '../components/Model.jsx';

const LandingPage = () => {

    const[mobileMenuOpen,setMobileMenuOpen] = useState(false);
    const[openAuthModel,setOpenAuthModel] = useState(false);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const[currentPage,setCurrentPage] = useState("login");

    const handleCTA =()=>{
        if(!user){
            setOpenAuthModel(true);
        }else{
            navigate('/dashboard')
        }
    }
    return (
    <div className={landingPageStyles.container}>
        {/* header */}
        <header className={landingPageStyles.header}>
            <div className={landingPageStyles.headerContainer}>
                <div className={landingPageStyles.logoContainer}>
                    <div className={landingPageStyles.logoIcon}>
                        <LayoutTemplate className={landingPageStyles.logoIconInner} />
                    </div>
                    <span className={landingPageStyles.logoText}>Resume Xpert</span>
                </div>
                {/* mobile menu btn */}
                <button className={landingPageStyles.mobileMenuButton} onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
                {
                    mobileMenuOpen ? 
                    <X size={24} className={landingPageStyles.mobileMenuIcon}/>
                    :
                    <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>
                }
                </button>
                {/* desktop nav */}
                <div className='hidden md:flex items-center'>
                    {
                    user ?  <ProfileInfoCard />
                    :
                    <button className={landingPageStyles.desktopAuthButton} style={{cursor:Pointer}} onClick={()=>setOpenAuthModel(true)}>
                        <div className={landingPageStyles.desktopAuthButtonOverlay}> </div>
                            <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                    </button>
                    }
                </div>
            </div>
            {/* mobile menu */}
            <div className={landingPageStyles.mobileMenu}>
                <div className={landingPageStyles.mobileMenuContainer}>
                    {
                        user ? (
                        <div className={landingPageStyles.mobileUserInfo}>
                            <div className={landingPageStyles.mobileUserWelcome}>Welcome Back</div>
                            <button className={landingPageStyles.mobileDashboardButton} onClick={()=>{
                                navigate('/dashboard');
                                setMobileMenuOpen(false);
                            }}>go to dashboard</button>
                        </div> 
                        ) : 
                        (
                            <button className={landingPageStyles.mobileAuthButton} onClick={()=>{
                                setOpenAuthModel(true);
                                setMobileMenuOpen(false);
                            }}>Get Started</button>
                        )
                    }
                </div>
            </div>

        </header>

        {/* main content */}

        <main className={landingPageStyles.main}>
            <section className={landingPageStyles.heroSection}>
                <div className={landingPageStyles.heroGrid}>
                    {/** left section */}
                    <div className={landingPageStyles.heroLeft}>
                        <div className={landingPageStyles.tagline}>
                            Professional Resume Builder
                        </div>
                        <h1 className={landingPageStyles.heading}>
                            <span className={landingPageStyles.headingText}>Craft</span>
                            <span className={landingPageStyles.headingGradient}>profeesional</span>
                            <span className={landingPageStyles.headingText}>Resume</span>
        
                        </h1>
                        <p className={landingPageStyles.description}>
                            Create job-wining resumes with Expertly designed templates
                            ATS-friendly , recruiter-approved , and tailored to your career goals
                        </p>
                        <div className={landingPageStyles.ctaButtons}>
                            <button className={landingPageStyles.primaryButton } onClick={handleCTA}>
                                <div className={landingPageStyles.primaryButtonOverlay}>
                                </div>
                                <span className={landingPageStyles.primaryButtonContent}>Start Building
                                    <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18}/>
                                </span>
                            </button>
                            <button className={landingPageStyles.secondaryButton} onClick={handleCTA}>
                                View Templates
                            </button>
                        </div>
                        
                    </div>  
                                    
                </div> 
                      
            </section>
            {/** features section  */}
            <section className={landingPageStyles.featuresSection}>
                <div className={landingPageStyles.featuresContainer}>
                    <div className={landingPageStyles.featuresHeader}>
                        <h2 className={landingPageStyles.featureTitle}>
                            Why Choose<span className={landingPageStyles.featuresTitleGradient}>Resume Xpert?</span>
                        </h2>
                        <p className={landingPageStyles.featureDescription}>
                            Everything you need to create a professional resume that stands out
                        </p>
                    </div>
                    <div className={landingPageStyles.featuresGrid}>
                         {[
                                {
                                    icon: <Zap className={landingPageStyles.featureIcon} />,
                                    title: "Lightning Fast",
                                    description: "Create professional resumes in under 5 minutes with our streamlined process",
                                    gradient: landingPageStyles.featureIconViolet,
                                    bg: landingPageStyles.featureCardViolet
                                },
                                {
                                    icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                                    title: "Pro Templates",
                                    description: "Choose from dozens of recruiter-approved, industry-specific templates",
                                    gradient: landingPageStyles.featureIconFuchsia,
                                    bg: landingPageStyles.featureCardFuchsia
                                },
                                {
                                    icon: <Download className={landingPageStyles.featureIcon} />,
                                    title: "Instant Export",
                                    description: "Download high-quality PDFs instantly with perfect formatting",
                                    gradient: landingPageStyles.featureIconOrange,
                                    bg: landingPageStyles.featureCardOrange
                                }
                            ].map((feature,index)=>(
                                <div key={index} className={landingPageStyles.featureCard}>
                                    <div className={landingPageStyles.featureCardHover}></div>
                                    <div className={`${landingPageStyles.featureCardContent}${feature.bg}`}>
                                        <div className={`${landingPageStyles.featureIconContainer}${feature.gradient}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={landingPageStyles.featureTitle}>{feature.title}</h3>
                                        <p className={landingPageStyles.featureDescription}>{feature.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            {/** CTA section */}
            <section className={landingPageStyles.ctaSection}> 
                <div className={landingPageStyles.ctaContainer}>
                    <div className={landingPageStyles.ctaCard}>
                        <div className={landingPageStyles.ctaCardBg}></div>
                        <div className={landingPageStyles.ctaCardContent}>
                            <h2 className={landingPageStyles.ctaTitle}>Ready To Build <span className={landingPageStyles.ctaTitleGradient}>Standout Resume?</span></h2>
                            <p className={landingPageStyles.ctaDescription}>Join thousands of professionals who landed their dream jobs with our platform</p>
                            <button className={landingPageStyles.ctaButton} onClick={handleCTA}>
                                <div className={landingPageStyles.ctaButtonOverlay}></div>
                                <span className={landingPageStyles.ctaButtonText} onClick={handleCTA}>Start Building Now</span>
                            </button>
            
                        </div>
                    </div>
                </div>
            </section>
        </main>
        {/** footer */}
        <footer className={landingPageStyles.footer}>
            <div className={landingPageStyles.footerContainer}>
                <p className={landingPageStyles.footerText}>Crafted With <span className={landingPageStyles.footerHeart}>❤️</span> by{' '}
                <a href='https://portfolio-phi-kohl-53.vercel.app/' target="_blank" className={landingPageStyles.footerLink}>Santhosh v</a>
                </p>
            </div>
        </footer>
        {/** Model and login functions */}
        <Model isOpen={openAuthModel} onClose={()=>{
            setOpenAuthModel(false);
            setCurrentPage("login");
        }} hideHeader>
            <div>
                {currentPage==="login" && <Login setCurrentPage={setCurrentPage}/>}
                {currentPage==="signup" && <SignUp setCurrentPage={setCurrentPage}/>}

            </div>

        </Model>
    </div>
  )
}

export default LandingPage
