import BlogPost from "./BlogPost";  
import useFetch from "./useFetch";

export default function BlogPosts() {

    const { data, loading } = useFetch({api: 'https://fs-blog-backend.fly.dev/blog', method: 'GET'})

    return (
        <div className="blog-posts">
            {!loading && data.map((post, index) => {
                return (
                    <div className='blog-post-container' key={index}>
                        <BlogPost post={post} />
                    </div>
                )
            })}
        </div>
    )
}