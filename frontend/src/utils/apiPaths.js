export const BASE_URL ='http://localhost:4000'

//api frontend

export const API_PATHS={

 AUTH:{
        REGISTER:`${BASE_URL}/api/auth/register`,
        LOGIN:`${BASE_URL}/api/auth/login`,
        GET_PROFILE:`${BASE_URL}/api/auth/profile`,
    },

    RESUME:{
        CREATE:'/api/resume/',
        GET_ALL:'/api/resume/',
        GET_BY_ID:(id)=>`/api/resume/${id}`,
        UPDATE:(id)=>`/api/resume/${id}`,
        DELETE:(id)=>`/api/resume/${id}`,
        UPLOAD_IMAGES:(id)=>`/api/resume/${id}/upload-images`,
    },

    image:{
        UPLOAD_IMAGE:'api/auth/upload-image'
    }
}