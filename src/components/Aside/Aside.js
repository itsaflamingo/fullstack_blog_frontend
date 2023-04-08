import Picture from './Picture';
import Description from './Description';
import Archive from './Archive';
import { BlogInfoContext, UserContext } from '../Contexts';
import { useContext, useEffect, useState } from 'react';
import useFetch from '../useFetch';
import LogIn from './LogIn';
import LogOut from './LogOut';
import { useNavigate } from 'react-router-dom';
import BlogName from './BlogName';
import EditDescription from './EditDescription';
import githubIcon from '../../img/github-icon.png';

export default function Aside() {

    const { data, loading } = useFetch({ api: 'https://fs-blog-backend.fly.dev/blog/description', method: 'GET'});
    const [blogInfo, setBlogInfo] = useState(BlogInfoContext);
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const user = useContext(UserContext);

    const nav = useNavigate();

    useEffect(() => {
        // When loading changes, update blogInfo
        if(loading === true) return;
        setBlogInfo(data);
    }, [loading])

    const navToCreatePost = () => nav('/blog-secure/create-post');

    return (
        <BlogInfoContext.Provider value={{blogInfo, setBlogInfo}}>
            <div className='aside'>
            <div className='aside-blog'>
                {user.user.username && <button className='new-post'
                onClick={() => navToCreatePost()}>New</button>}
                
                <div className='blog-section'>
                    <BlogName />
                    <Picture />
                    <Description />
                    <Archive />
                </div>
                </div>
                {user.user.username && 
                <button className='edit-info'
                onClick={() => setOpenEditInfo(!openEditInfo)}>Edit</button>}
                {openEditInfo && <EditDescription />}
                <div className='auth-section'>
                    {user.user.username ? <LogOut /> : <LogIn />}
                </div>
                <a className='github-link' href="https://github.com/itsaflamingo" target="_blank" rel='noreferrer'>
                    <img className='github' src={githubIcon} alt='github-link' />
                    <p className='github-name'>itsaflamingo</p>
                </a>
            </div>
        </BlogInfoContext.Provider>
    )
}