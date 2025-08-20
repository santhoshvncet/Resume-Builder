import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummystyle.js'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import {validateEmail} from '../utils/helper.js'
import axiosInstance from '../utils/axiosInstance.jsx';
import { API_PATHS } from '../utils/apiPaths.js';
import { Input } from './Input.jsx';

const SignUp = ({setCurrentPage}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


  console.log(fullName,email,password);

  const handleSignUp=async(e)=>{
      e.preventDefault();
      if(!fullName){
        setError("please enter full name");
        return ;
      }
      if(!validateEmail(email)){
        setError("enter a valid email");
        return ;

      }
      if(password===''){
        setError("enter a password");
        return ;

      }
      try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          name:fullName,
          email,
          password
        });

        const {token}  = response.data;
        console.log(token);
        if(token){
          localStorage.setItem('token',token);
          updateUser(response.data);
          navigate('/dashboard')
        }
      } catch (error) {
        setError(error)
      }
  }





  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of today</p>
      </div>
      {/**form */}
      <form onSubmit={handleSignUp}>
        <Input 
        label='Full name'
        value={fullName}
        onChange={({target})=>setFullName(target.value)}
        type='text'
        placeholder='John Veil' 
        />
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
        <button className={styles.signupSubmit} type='submit'>Create Account</button>

        <p className={styles.switchText}>Already Have an Account?{' '}
          <button onClick={()=>setCurrentPage("login")} type='button' className={styles.signupSwitchButton}>Sign In</button>
        </p>


      </form>
    </div>
  )
}

export default SignUp
