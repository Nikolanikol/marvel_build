import {  useCallback, useState } from "react";

export const useHttp = () =>{
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [process, setProcess] = useState('waitng')

    const request = useCallback(async(url, method = 'GET', body = null, headers = {'Content-Type':'apllication/json'}) =>{
        setProcess('loading')
        try{
            const response = await fetch(url,{method,body,headers})
            if(!response.ok){
                throw new Error(`Could not fetch ${url}`)
            }
            const data = await response.json();
            setProcess('confirmed')
            return data;
        }catch(e){
            setProcess('error')
            throw e;
        }
    }, [])

    const clearError = useCallback(()=>{
        setProcess('loading')
    },[])
    return { request,  clearError, process, setProcess}
}