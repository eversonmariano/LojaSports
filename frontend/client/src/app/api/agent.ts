import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Router";

axios.defaults.baseURL = 'http://localhost:8081/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response=>{
    return response
}, (error: AxiosError)=>{
    const {status} = error.response as AxiosResponse;
    switch(status){
        case 404:
            console.log('Resource not found - 404 error');
            router.navigate('/not-found');
            break;
        case 500:
            console.log('Internal server error - 500 error');
            router.navigate('/server-error');
            break;
        default:
            break;
    }
    return Promise.reject(error.message);
}) 


const requests = { 
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Store = {
    list:()=> requests.get('products'),
    details:(id: number) => requests.get(`products/${id}`)
}

const agent = {
    Store
}

export default agent;