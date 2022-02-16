import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import './Article.css';

function ArticleList(props) {

    const [articleData,setArticleData] = useState([]);
    const [isVisible, setIsVisible] = useState (true);

    const fetchAPI = async ()=>{

        const response = await fetch(`/api/article-list`);
        const body = await response.json(); 
        setArticleData(body);
    }

    useEffect( ()=>{    
        let cancel = false;
        fetchAPI().then(() => {
            if (cancel) return;
            setIsVisible(false);
        });
        
        return () => { 
            cancel = true;
        }
    }, [ ] );


    return (
            <div>
                <h1 id='articles'>Articles</h1>
                {articleData.map( (article,key1)=> (
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