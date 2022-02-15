import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {

const {authorized,setUserLogin} =props;

    return (
        <div>
            <nav id="header">
                <Link to={'/'} id="logo">
                    <h2 >My Blog</h2> 
                </Link>       
                <div id="items">
                    <Link id="link" to="/blog">Home</Link>
                    <Link id="link" to="/article-list">Articles</Link>       
                    {authorized ? <Link id="link" to="/add-blog">Add Blog</Link> : authorized===false}
                    <div id="link" onClick={()=>setUserLogin({})} >Log Out</div>
                    </div>
            </nav>
        </div>
    );
}

export default Header; 