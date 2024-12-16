import "./App.scss";
import Header from "./components/Header/Header";
import BlogPosts from "./components/BlogPublic/BlogPosts";
import Aside from "./components/Aside/Aside";
import Portal from "./components/Aside/Portal";

function Blog() {
  return (
    <div className="blog">
      <Header />
      <div className="content">
        <BlogPosts />
        <div className="aside-portal">
          <Aside />
          <Portal />
        </div>
      </div>
    </div>
  );
}

export default Blog;
