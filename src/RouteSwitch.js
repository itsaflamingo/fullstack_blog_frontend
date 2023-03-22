import React, { useState } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import Blog from './Blog'
import { ThemeContext, UserContext } from './components/Contexts';

const RouteSwitch = () => {
    // Set up context API state
    const [theme, setTheme] = useState(ThemeContext);
    const [user, setUser] = useState(UserContext);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <UserContext.Provider value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Blog />}></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default RouteSwitch;