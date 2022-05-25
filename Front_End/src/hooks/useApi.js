import axios from "axios";

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API
// });

const useApi =() =>({
    validateToken: async(token)=>{
        let dadosValidate = await axios.post('http://localhost:5412/api/validate',{
            token: token
          })
        
        return dadosValidate
    },
    login: async(username, password)=>{
        let dadosLogin = await axios.post('http://localhost:5412/api/auth',{
            username: username,
            password: password
          })
        
        return dadosLogin
    },
    logout: async()=>{
        // const response = await api.post('/logout')
        let dadosLogout = await axios.post('http://localhost:5412/api/logout')
        console.log('response em logout', dadosLogout)
        return dadosLogout.data;
    }

})

export default useApi;