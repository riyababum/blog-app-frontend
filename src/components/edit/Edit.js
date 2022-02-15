import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Edit.css';


const Edit = (props) => {

    const {articleName} = props;

    const [blog, setBlog] = useState({name:' ',title:' ',description:' '});

    useEffect(()=>{
        loadBlogDetails();
    },[])
    
    
    let navigate = useNavigate();

    const loadBlogDetails = async() => {
        const response = await axios.get(`/api/article/${articleName}`) ;
        setBlog(response.data);
    }

    const editBlogDetails = async(e) => {
        e.preventDefault();
        await axios.put(`/api/article/${articleName}/edit`, blog);
        navigate('/article-list');
    }

    const handleChange = async (e)=>{
        const {name,value} =e.target;
        setBlog({...blog, [name]:value});
    }

    return (
        <div>
            <form id='edit'>
                <label>Blog Name:</label><br/>
                <input type='text' name='name' value={blog.name} onChange={(e) =>handleChange(e)} ></input>
                <br/><br/>

                <label>Title:</label><br/>
                <input type='text' name='title' value={blog.title} onChange={(e) =>handleChange(e)} ></input>
                <br/><br/>
                
                <label>Description:</label><br/>
                <textarea rows='10' cols='50' value={blog.description} name='description' type='text' onChange={(e) =>handleChange(e)}></textarea>
                <br/><br/>

                <button onClick={(e) => editBlogDetails(e)}>Update</button><br/>
            </form>
        </div>
    );
}


export default Edit;