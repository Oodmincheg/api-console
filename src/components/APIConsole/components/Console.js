import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEqual } from 'lodash'
import { sendRequest, updateCurrentRequest} from '../../../features/requestsSlice'

export default function Console(props) {
    
    const dispatch = useDispatch()
    const requestRef = useRef('')
    const [response, setResponse] = useState('')
    const session = useSelector(state => state.auth.session)
    const requests = useSelector(state => state.requests.entities)
    const currentRequestResponseString = requests.length ? JSON.stringify(requests[0].response) : ''

    function handleSendRequest() {
        const requestJSON = requestRef.current.value
        let body;
        try {
            body = JSON.parse(requestJSON)
        }
        catch (error) {
            console.log('ERROR ===> ', error)
            return
        }
        //naming?
        const existedRequestIndex = requests.findIndex((existedRequest) => isEqual(existedRequest.body, body))
        const isNewRequest = existedRequestIndex === -1
        // unique body 
        if(isNewRequest)  return  dispatch(sendRequest(body))

        // if not
        //TODO: duplicate find element here and in reducer
        dispatch(updateCurrentRequest(existedRequestIndex))
        // we should make our request like current - it's make it first
        // change requestRef.value to body of first element
    }

    function prettifyRequstBody() {
        const ugly = requestRef.current.value;
        let pretty;
        try {
            const obj = JSON.parse(ugly);
            pretty = JSON.stringify(obj, undefined, 4);
        }
        catch (err) {
            console.log(err)
            return
        } 

        requestRef.current.value = pretty;
    }

    return (
        <div>
            Console
            <textarea ref={requestRef} name="request"></textarea>
            <textarea name="response" value={currentRequestResponseString} disabled></textarea>
            <button onClick={handleSendRequest}>Отправить</button>
            <button onClick={prettifyRequstBody}>Форматировать</button>
        </div>
    )
}
