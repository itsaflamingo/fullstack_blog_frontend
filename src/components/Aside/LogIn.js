import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts"

export default function LogIn() {

    const [user, setUser] = useState({ username: '', password: '' });
    const loggedUser = useContext(UserContext);
    const [openForm, setOpenForm] = useState(false);
    const nav = useNavigate();

    const logIn = e => {
        e.preventDefault();

        // Create new URL search params, convert to string
        const formData = new URLSearchParams({
            username: user.username,
            password: user.password
        }).toString();

        // Make POST request to backend server using specified headers, then convert response to json and catch error 
        fetch(`https://fs-blog-backend.fly.dev/login`, { 
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formData
        })
            .then(res => res.json())
            .then(data => loggedUser.setUser(data.user))
            .catch(err => console.log(err))
        
        nav('/blog-secure');
    }

    const usernameChangeHandler = e => setUser({ ...user, username: e.target.value });
    const passwordChangeHandler = e => setUser({ ...user, password: e.target.value });

    return (
        <div className="change-auth">
            <button className="enter"
            onClick={() => {setOpenForm(!openForm)}}>Log In</button>
            {openForm && <form className="login-form">
                <div className="username">
                    <span className="error"></span>
                    <label htmlFor="username">Username</label>
                    <input
                    type='text'
                    id='username'
                    onChange={e => usernameChangeHandler(e)}></input>
                </div>
                <div className="password">
                    <span className="error"></span>
                    <label htmlFor="password">Password</label>
                    <input
                    type='password'
                    id='password'
                    onChange={e => passwordChangeHandler(e)}></input>
                </div>
                <button 
                type='submit'
                className="log-in"
                onClick={e => logIn(e)}>Enter</button>
            </form>}
        </div>
    )
}