import BlogPost from "./BlogPost";  
import UseFetch from "./useFetch";

export default function BlogPosts() {

    const { data, loading } = UseFetch({api: 'https://fs-blog-backend.fly.dev/blog', method: 'GET'})

    return (
        <div className="blog-posts">
            {!loading && data.map((post, index) => {
                return (
                    <div id='blog-posts' key={index}>
                        <BlogPost post={post} />
                    </div>
                )
            })}
        </div>
    )
}