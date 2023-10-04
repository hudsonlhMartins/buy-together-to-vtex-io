
import {useEffect, useReducer} from 'react'
import { StateProps, reducer } from "./reducer"



interface UseFetchProps {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: any;
    repeatRequest?: {
        id: string | undefined
    }
}
//@ts-ignore
export const useFetch = <T = unknown>({url,body,headers,method="get", repeatRequest}:UseFetchProps)=>{
    const initialState:StateProps<T> = {
        loading: true,
        data: undefined,
        error: undefined
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect( ()=>{
        const abortController = new AbortController();
        const handleFetch =  async () => {
            dispatch({type: 'loading'})
            try{
                if(!method || method === 'GET'){
                    const res = await fetch(url, {
                        headers:{...headers},
                        method: method,
                        signal: abortController.signal
                    })
                    if(!res.ok){
                        dispatch({type: 'error'})
                        return
                    }
                    const dataApi =  await res.json()
                    dispatch({type: 'fetched', payload: dataApi})
                    return
                }

                if(body){
                    const res = await fetch(url, {
                        headers:{...headers},
                        method: method,
                        signal: abortController.signal,
                        body: JSON.stringify(body)
                    })
                    if(!res.ok){
                        dispatch({type: 'error'})
                        return
                    }
                    const dataApi =  await res.json()
                    dispatch({type: 'fetched', payload: dataApi})
                    return
                }

                const res = await fetch(url, {
                    headers:{...headers},
                    method: method,
                    signal: abortController.signal,
                    body: JSON.stringify(body)
                })
                if(!res.ok){
                    dispatch({type: 'error'})
                    return
                }

                const dataApi =  await res.json()
                dispatch({type: 'fetched', payload: dataApi})
                return

            }catch(err){
                dispatch({type: 'error', payload: err.message})
            }

        }
         handleFetch()

        return ()=>{
            abortController.abort()
        }
    },[url, repeatRequest?.id])

    return {
        loading: state.loading,
        data: state.data as T,
        error: state.error
    }

}
