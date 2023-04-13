import homeWhite from '../../img/home.png';
import homePurple from '../../img/home-purple.png';
import commentWhite from '../../img/create-comment.png';
import commentPurple from '../../img/comment-purple.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewPostPageMenu({ viewCommentForm, setViewCommentForm }) {

    const [homeIcon, setHomeIcon] = useState(homeWhite);
    const [commentIcon, setCommentIcon] = useState(commentWhite);
    const nav = useNavigate();

    return (
        <div className="blog-post-menu">
            <button className='blog-post-button'
            onMouseEnter={() => setHomeIcon(homePurple)}
            onMouseLeave={() => setHomeIcon(homeWhite)}
            onClick={() => nav('/')}>
                <img className='visit-home' src={homeIcon} alt='home'/>
            </button>
            <button className='blog-post-button'
            onMouseEnter={() => setCommentIcon(commentPurple)}
            onMouseLeave={() => setCommentIcon(commentWhite)}
            onClick={() => setViewCommentForm(!viewCommentForm)}>
                <img className='create-comment-btn' src={commentIcon} alt='create comment'/>
            </button>
        </div>
    )
}