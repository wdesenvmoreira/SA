import { useContext } from "react";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";



export const RequireAuth = ({children})=>{
    const auth = useContext(AuthContext)   
    const navigate = useNavigate();
  
    
    // if(!auth.user){
    //      console.log('auth.user antes do efect', auth.user)
         
    //     navigate('/login', {replace: true})
    // }
  
    console.log('depois do validar', auth.user)
    // eslint-disable-next-line

      // useEffect(() => {  
     

        if(!localStorage.getItem('token')){
         const navg = ()=>{ navigate("/login")}
         navg()
        }
      // }, [auth]); 
      

    // eslint-disable-next-line
// eslint-disable-next-line
    return children
}