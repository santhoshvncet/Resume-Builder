import axios from "axios";
import { BASE_URL } from "./apiPaths.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type':"application/json",
        Accept:"application/json",
    }

})

//request

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('token');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
       return Promise.reject(error)
    }
)


///response

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },

    (error)=>{
        if(error.response){
            if(error.response.status === 401){
                window.location.href = '/'
            }
            else if(error.response.status === 500){
                console.log('server error')
            }
         
        }
       return Promise.reject(error);
    }

)

export default axiosInstance;