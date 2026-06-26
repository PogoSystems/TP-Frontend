import * as axios from "axios";
import {supabase} from "./supabase-client.ts";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

apiClient.interceptors.request.use(async (config) =>{
    const {data} = await supabase.auth.getSession()

    if(data.session){
        config.headers.Authorization= `Bearer ${data.session.access_token}`
    }
    return config
})