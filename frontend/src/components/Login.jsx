import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance.jsx';
import { API_PATHS } from '../utils/apiPaths.js';
import { authStyles as styles } from '../assets/dummystyle.js';
import { Input } from './Input.jsx';

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();


    const handleLogin=async(e)=>{
      e.preventDefault();
      if(!validateEmail(email)){
              setError("enter a valid email");
              return ; 
            }
      if(password===''){
         setError("enter a password");
        return ;     
       }
       setError('');

       try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password});
        const{token} = response.data;
        if(token){
          localStorage.setItem('token',token);
          updateUser(response.data);
          navigate('/dashboard');
        }

       } catch (error) {
        setError(error.response.data.message || "something went wrong");
       }

    }
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back!</h3>
        <p className={styles.subtitle}>Sign in to Continue Building Amazing resumes</p>
      </div>
      <form onSubmit={handleLogin} className={styles.form}>
          <Input 
          label='email'
                value={email}
                onChange={({target})=>setEmail(target.value)}
                type='text'
                placeholder='example@gmail.com' 
                />
                <Input 
                value={password}
               onChange={({target})=>setPassword(target.value)}
                type='password'
                label='password'
                placeholder='min 8 characters' 
                />
                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.submitButton} type='submit' > Sign In </button>

                <p className={styles.switchText}>Don't have an Account?{' '}
                  <button type='button' className={styles.switchButton} onClick={()=>setCurrentPage("signup")}>Create Account</button>
                </p>
      </form>
    </div>
  )
}

export default Login
