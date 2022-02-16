import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import validation from './validation';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [errors,setErrors] = useState({});
    const [isSubmit,setIsSubmit] =useState(false);

    const handleChange = (e)=>{
        const {name,value} =e.target;
        setUser({...user, [name]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(validation(user));
        setIsSubmit(true);
    }

    useEffect(()=>{

        if(Object.keys(errors).length===0 && isSubmit){

            axios.post("/signup",user)
            .then(res => {
                alert(res.data.message);
                navigate('/login');
            });  
        
        }
    },[errors]);

    return (
        <div className='background'>
        <form className='signup' >

            <h1>Sign Up</h1>

            <input  type='text' name='username' value={user.username} placeholder='Enter your Name' onChange={handleChange}></input>
            <p className='error' >{errors.username}</p>

            <input  type='email' name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange}></input>
            <p className='error' >{errors.email}</p>

            <input  type='password' name='password' value={user.password} placeholder='Enter your Password' onChange={handleChange}></input>
            <p className='error' >{errors.password}</p>

            <input  type='password' name='confirmPassword' value={user.confirmPassword} placeholder='Re-enter your Password' onChange={handleChange}></input>
            <p className='error' >{errors.confirmPassword}</p>

            <div onClick={handleSubmit} className='btn'>Sign Up</div>
            
            <div>or</div>

            <div className='btn' onClick={()=>navigate('/login')}>Log In</div>
        </form>
        </div>
    );
}

export default Signup;