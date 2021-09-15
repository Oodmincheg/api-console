import React from 'react'
import RequestInHistory from './components/RequestInHistory'
import { useSelector } from 'react-redux'

export default function ListOfRequests() {
    const requests = useSelector(state => state.requests.entities)
    return (
        <div style={{display: 'flex'}}>
            {requests.map((request, index) => (<RequestInHistory request={request} key={index}/>))}
        </div>
    )
}



