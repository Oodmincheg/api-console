import React, {useRef, useState} from 'react'
import { useSelector } from 'react-redux'

export default function Console() {
    const requestRef = useRef('')
    const [response, setResponse] = useState('')
    const session = useSelector(state => state.auth.session)

    function sendRequest() {
        const requestJSON = requestRef.current.value
        let body;
        try {
            body = JSON.parse(requestJSON)
        }
        catch (error) {
            console.log('ERROR ===> ', error)
            return
        }
        
    }

    return (
        <div>
            Console
            <textarea ref={requestRef} name="request"></textarea>
            <textarea name="response" value={response} disabled></textarea>
            <button onClick={sendRequest}>Отправить</button>
        </div>
    )
}
