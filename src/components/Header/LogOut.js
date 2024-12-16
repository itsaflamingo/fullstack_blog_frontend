import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts"

export default function LogOut() {

    const user = useContext(UserContext);
    const nav = useNavigate();

    const logOut = () => {
        user.setUser(null);

        nav('/');        
    }

    return (
        <div className="log-out-container">
            <button className='log-out'
            onClick={() => logOut()}>Log Out</button>
        </div>
    )
}