import React from 'react'
import { useSelector } from 'react-redux'

export default function ListOfRequests() {
    const requests = useSelector(state => state.requests.entities)
    return (
        <div style={{display: 'flex'}}>
            {requests.map(request => (<div style={{border: '1px solid black', padding: '2px'}}>{request.body.action}</div>))}
        </div>
    )
}
