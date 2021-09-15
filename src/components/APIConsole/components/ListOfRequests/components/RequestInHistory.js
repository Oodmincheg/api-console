import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { updateCurrentRequestBodyString, sendRequest, deleteRequest } from '../../../../../features/requestsSlice'

export default function RequestInHistory({request}) {
    const dispatch = useDispatch()
    const [isOpened, setOpened] = useState(false)

    function handleExecute() {
        const requestBodyString = JSON.stringify(request.body)
        dispatch(updateCurrentRequestBodyString(requestBodyString))
        dispatch(sendRequest(request.body))
    }
    
    function handleCopy() {
        //need some research
    }

    function handleDelete() {
        dispatch(deleteRequest(request.body))
    }
    return (
    
        <div onClick={() => setOpened(!isOpened)} style={{border: '1px solid black', padding: '2px'}}>{request.body.action}
        {isOpened && (
            <ul>
                <li onClick={handleExecute}>Выполнить</li>
                <li>Скопировать</li>
                <li onClick={handleDelete}>Удалить</li>
            </ul>
        )}
        </div>
    )
}
