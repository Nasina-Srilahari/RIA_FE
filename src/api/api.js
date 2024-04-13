import axios from 'axios';

const api = axios.create({
  baseURL: 'https://readitagain.onrender.com',
  // baseURL: 'http://localhost:5000'
});


api.interceptors.request.use((req) => {
    let token = localStorage.getItem("token");
    console.log(token)
    if(token && token!==""){
        req.headers.authorization = `Bearer ${token}`
    }
    return req
})

export default api
