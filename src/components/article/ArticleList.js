import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Error from '../error/Error';
import './Article.css';
import axios from 'axios';

function ArticleList(props) {

    const navigate = useNavigate();
    const [articleData,setArticleData] = useState([]);

    async function fetchAPI (){
        const response = await fetch(`/api/article-list`);
        const body = await response.json();
        console.log(body); 
        setArticleData(body);
    }

    useEffect(()=>{
        fetchAPI();  
    },[]);


    return (
            <div>
                <h1 id='articles'>Articles</h1>
                {articleData.map( (article,key1,key2)=> (
                    <div key={key1} id='container'>
                        <Link id='body' to={`/article/${article.name}`}>
                            <h3 id='list'>
                                {article.title} 
                            </h3>  
                            <p id='list-body'>
                                {article.description.substring(0,150)}....
                            </p> 
                            <br/>
                        </Link>
                        <br/> <hr/>
                    </div>
                ))}
            </div>
    
    );
}

export default ArticleList;