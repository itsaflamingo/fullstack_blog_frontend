import './App.css';
import Aside from './components/Aside/Aside'
import BlogPosts from './components/BlogPublic/BlogPosts';

function Blog() {

  return (
    <div className="blog">
      <BlogPosts />
      <Aside     />
    </div>
  );
}

export default Blog;
