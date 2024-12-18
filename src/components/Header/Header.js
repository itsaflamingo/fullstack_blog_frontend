import Picture from "./Picture";
import Description from "./Description";
import { BlogInfoContext, UserContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";
import BlogName from "./BlogName";
import EditDescription from "./EditDescription";
import githubIcon from "../../img/github-icon.png";

export default function Header() {
  const { data, loading } = useFetch({
    api: "https://fs-blog-backend.fly.dev/blog/description",
    method: "GET",
  });
  const [blogInfo, setBlogInfo] = useState(BlogInfoContext);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const user = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    // When loading changes, update blogInfo
    if (loading === true) return;
    setBlogInfo(data);
  }, [loading]);

  const navToCreatePost = () => nav("/blog-secure/create-post");

  return (
    <BlogInfoContext.Provider value={{ blogInfo, setBlogInfo }}>
      <div className="Header">
        <BlogName />
        <div>
          <div className="Header-blog">
            {user.user.username && (
              <button className="new-post" onClick={() => navToCreatePost()}>
                New
              </button>
            )}
          </div>
          {user.user.username && (
            <button
              className="edit-info"
              onClick={() => setOpenEditInfo(!openEditInfo)}
            >
              Edit
            </button>
          )}
          {openEditInfo && <EditDescription />}
          <div className="auth-section">
            {user.user.username ? <LogOut /> : <LogIn />}
          </div>
          <div className="header-description">
            <div>
              <h2>Elizabeth P.</h2>
            </div>
            <div>
              <h2>The web is my rabit hole.</h2>
              <h3>I build things for it.</h3>
            </div>
          </div>
        </div>
      </div>
    </BlogInfoContext.Provider>
  );
}
