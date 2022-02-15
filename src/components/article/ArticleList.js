import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

function ArticleList(props) {

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
            <div id='container'>
                <h1 id='articles'>Articles</h1> <br/>

                {articleData.map( (article,key1)=> (
                    <div key={key1} >
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