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

export default function Aside() {

    const { data, loading } = useFetch({ api: 'https://fs-blog-backend.fly.dev/blog/description', method: 'GET'});
    const [blogInfo, setBlogInfo] = useState(BlogInfoContext);
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
            {user.user.username && <button onClick={() => navToCreatePost()}>New</button>}
            <div id='aside'>
                <BlogName />
                <Picture />
                <Description />
                <Archive />
                {user.user.username ? <LogOut /> : <LogIn />}
            </div>
        </BlogInfoContext.Provider>
    )
}