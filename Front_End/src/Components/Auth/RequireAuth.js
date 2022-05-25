import { useContext } from "react";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";



export const RequireAuth = ({children})=>{
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    console.log('auth em RequireAuth: ', auth)
    if(!auth.user){
        console.log('auth.user', auth.user, 'auth', auth)
        navigate('/login', {replace: true})
    }
    return children
    
}