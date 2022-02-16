import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useParams ,Link, useNavigate} from 'react-router-dom';
import './Article.css';

function Article(props) {
    const navigate = useNavigate();
    const {name} = useParams();

    const {authorized, setArticleName } = props;

    const [articleData,setArticleData] = useState({});
    const [isVisible, setIsVisible] = useState (true);

    async function fetchAPI (){
        const response = await fetch(`/api/article/${name}`);
        const body = await response.json();
        setArticleData(body);
    } 

    useEffect(()=>{    
        let cancel = false;
        fetchAPI().then(() => {
            if (cancel) return;
            setIsVisible(false);
        });
        
        return () => { 
            cancel = true;
        }
    }, [ ] );

    async function deleteBlog(articleName) {
        
        axios.delete(`/api/article/delete-blog/${articleName}`);     

        navigate('/article-list');
    }
    return (
        <>
            <div id='article'>
                <h1 id='article-title'>{articleData.title}</h1>
                <p id='article-body'>{articleData.description}</p>
                <br/><br/>
            </div>
            {authorized ?
            <div id='buttons'>
                <Link to={`/article/edit`} >
                    <button onClick={()=>setArticleName(articleData.name)} id='editbtn'>Edit</button>
                </Link>
                
                <button onClick={()=>deleteBlog(articleData.name)} id='editbtn'>Delete</button>      
            </div> : authorized ===false }
        </>
    );
}

export default Article;