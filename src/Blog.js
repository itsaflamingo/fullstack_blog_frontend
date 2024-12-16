import "./App.css";
import Header from "./components/Header/Header";
import BlogPosts from "./components/BlogPublic/BlogPosts";
import Aside from "./components/Aside/Aside";

function Blog() {
  return (
    <div className="blog">
      <Header />
      <div className="content">
        <BlogPosts />
        <Aside />
      </div>
    </div>
  );
}

export default Blog;
