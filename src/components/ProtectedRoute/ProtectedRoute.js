import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({isAuthenticated, children, path}) {
    return (
        isAuthenticated ? 
        <Route path={path}>
            {children}
        </Route>
        : <Redirect to="/login" />
        
    )
}

