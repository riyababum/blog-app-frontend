import React,{useEffect, useState} from 'react';
import './Login.css';
import validation from './validation';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login(props) {

    const { setAuthorized }= props;
    const navigate = useNavigate();

    const { setUserLogin } = props;

    const [user, setUser] = useState({
        email:'',
        password:''
    });


    const [errors,setErrors]= useState ({});
    const [isSubmit,setIsSubmit] = useState(false);

    const handleChange=(e)=>{
        const {name,value} =e.target;
        setUser({...user, [name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(user.email=== 'admin' && user.password === '12345')
        {
            setErrors({});
            setAuthorized(true);
        }
        else{
            setAuthorized(false);
            setErrors(validation(user));
        }
        setIsSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmit){

            axios.post('/api/login',user)
            .then(res=>{ 
                alert(res.data.message);
                setUserLogin( res.data.user );
                navigate('/blog');            
            });
        }
    },[errors]);

    return (
        <div className='background'>
        <form className='login'>
            <h1>Login</h1>

            <input  type='email' name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange}></input>
            <p>{errors.email}</p>

            <input  type='password' name='password' value={user.password} placeholder='Enter your Password' onChange={handleChange}></input>
            <p>{errors.password}</p>

            <div onClick={handleSubmit}  className='btn'>Login</div>
            <div>or</div>

            <div className='btn' onClick={()=>navigate('/signup')} >Sign Up</div>
        </form>
        </div>
    );
}

export default Login;