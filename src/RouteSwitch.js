import React, { useState } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import Blog from './Blog'
import BlogSecure from './components/BlogSecure/BlogSecure';
import { CommentContext, ThemeContext, UserContext } from './components/Contexts';
import EditBlogPost from './components/BlogSecure/EditBlogPost';
import FullBlogPost from './components/BlogPublic/FullBlogPost';
import NewBlogPost from './components/BlogSecure/NewBlogPost';

const RouteSwitch = () => {
    // Set up context API state
    const [theme, setTheme] = useState(ThemeContext);
    const [user, setUser] = useState(UserContext);
    const [comments, setComments] = useState(CommentContext);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <UserContext.Provider value={{user, setUser}}>
                <CommentContext.Provider value={{comments, setComments}}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Routes>
                            <Route path='/' element={<Blog />}></Route>
                            <Route path='/post/:id' element={<FullBlogPost />}></Route>
                            {'username' in user && <Route path='/blog-secure' element={<BlogSecure />}></Route>}
                            {'username' in user && <Route path='/blog-secure/create-post' element={<NewBlogPost />}></Route>}
                            {'username' in user && <Route path='/blog-secure/post/:id/edit' element={<EditBlogPost />}></Route>}
                        </Routes>
                    </BrowserRouter>
                </CommentContext.Provider>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default RouteSwitch;