import BlogPost from "../BlogPost";
import useFetch from "../useFetch";
import uniqid from 'uniqid';
import Aside from "../Aside/Aside";

export default function BlogSecure() {

    const token = process.env.REACT_APP_BEARER_TOKEN;
    
    const {data, loading} = useFetch({ 
        api: 'https://fs-blog-backend.fly.dev/blog-secure', 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
    
    return (
        <div className="blog-secure">
        {!loading && data.map(post => {
            return (
                <div className='blog-post' key={uniqid()}>
                    <BlogPost post={post} />
                </div>
            )
        })}
        <Aside />
        </div>
    )
}