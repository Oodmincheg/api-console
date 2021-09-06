import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAccount } from '../../features/userSlice'
import { Header } from './components/Header'
import Console from './components/Console'
import ListOfRequests from './components/ListOfRequests'

export default function APIConsole() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAccount())
    }, [dispatch])

    return (
        <div>
            <Header />
            <ListOfRequests />
            <Console />
        </div>
    )
}
