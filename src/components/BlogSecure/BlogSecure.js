import BlogPost from "../BlogPublic/BlogPost";
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
            <div className="blog-posts-secure">
                <div className="posts-secure-list">
                    {!loading && data.map(post => {
                        return (
                            <div className='blog-post-container' key={uniqid()}>
                                <BlogPost post={post} />
                            </div>
                        )
                    })}
                </div>
                <Aside />
            </div>
        </div>
    )
}