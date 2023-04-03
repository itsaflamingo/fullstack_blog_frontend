import React, { useState } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import Blog from './Blog'
import BlogSecure from './components/BlogSecure/BlogSecure';
import { ThemeContext, UserContext } from './components/Contexts';
import EditBlogPost from './components/EditBlogPost';
import FullBlogPost from './components/FullBlogPost';
import NewBlogPost from './components/NewBlogPost';

const RouteSwitch = () => {
    // Set up context API state
    const [theme, setTheme] = useState(ThemeContext);
    const [user, setUser]   = useState(UserContext);
    console.log(user);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <UserContext.Provider value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Blog />}></Route>
                        <Route path='/post/:id' element={<FullBlogPost />}></Route>
                        {'username' in user && <Route path='/blog-secure' element={<BlogSecure />}></Route>}
                        {'username' in user && <Route path='/blog-secure/create-post' element={<NewBlogPost />}></Route>}
                        {'username' in user && <Route path='/blog-secure/post/:id/edit' element={<EditBlogPost />}></Route>}
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default RouteSwitch;