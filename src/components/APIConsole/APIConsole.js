import React from 'react'
import { Header } from './components/Header'
import Console from './components/Console'
import ListOfRequests from './components/ListOfRequests'

export default function APIConsole() {
    

    return (
        <div>
            <Header />
            <ListOfRequests />
            <Console />
        </div>
    )
}
