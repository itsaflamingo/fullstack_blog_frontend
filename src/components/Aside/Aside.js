import Picture from './Picture';
import Description from './Description';
import Archive from './Archive';
import { BlogInfoContext, UserContext } from '../Contexts';
import { useContext, useEffect, useState } from 'react';
import useFetch from '../useFetch';
import LogIn from './LogIn';

export default function Aside() {

    const { data, loading } = useFetch({ api: 'https://fs-blog-backend.fly.dev/blog/description', method: 'GET'});
    const [blogInfo, setBlogInfo] = useState(BlogInfoContext);
    const user = useContext(UserContext);

    useEffect(() => {
        // When loading changes, update blogInfo
        if(loading === true) return;
        setBlogInfo(data);
    }, [loading])

    return (
        <BlogInfoContext.Provider value={{blogInfo, setBlogInfo}}>
            <div id='aside'>
                <Picture />
                <Description />
                <Archive />
                {!user.user && <LogIn />}
            </div>
        </BlogInfoContext.Provider>
    )
}