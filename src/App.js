import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { APIConsole } from './components/APIConsole';
import { Login } from './components/Login';
import { getAccount } from './features/userSlice'
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch()
 const isAuthenticated =  !!useSelector(state => state.user.user.session)
 
 //TODO: set loading when app initing
    useEffect(() => {
        dispatch(getAccount())
    }, [dispatch])

    
  return (
    <div className="App">
        <Router>
          <Route path="/login" >
            <Login isAuthenticated={isAuthenticated}/>
          </Route>
          <ProtectedRoute path="/api-console" isAuthenticated={isAuthenticated}>
            <APIConsole />
          </ProtectedRoute>
        </Router>
    </div>
  );
}

export default App;
