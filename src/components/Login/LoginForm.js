import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signIn, updateLogin, updatePassword, updateSubLogin} from '../../features/authSlice'

export default function LoginForm({isAuthenticated}) {
    const dispatch = useDispatch()
    const {login, password, subLogin, errorLogin, errorPassword} = useSelector(state => state.auth)
    
  if(isAuthenticated) {
    return <Redirect to='api-console' />
  }

  return (
    <form>
      <h1>API-консолька</h1>
      <div>
        <label htmlFor="login">Логин</label>
        <input name="login" type="text" onChange={event => dispatch(updateLogin(event.target.value))} value={login}/>
        {errorLogin && <span>{errorLogin}</span>}
      </div>
      <div>
        <label htmlFor="sub-login">Сублогин</label>
        <input name="sub-login" type="text" onChange={event => dispatch(updateSubLogin(event.target.value))} value={subLogin}/>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input name="password" type="text" onChange={event => dispatch(updatePassword(event.target.value))} value={password}/>
        {errorPassword && <span>{errorPassword}</span>}
      </div>
      <button type="button" onClick={() => !errorLogin && dispatch(signIn({login, password}))}>Войти</button>
      <input type="radio" name="lol" id="1" onChange={e => console.log('1', e.target.checked)} />
      <input type="radio" name="lol" id="2" onChange={e => console.log('2', e.target.checked)} />

    </form>
  );
}
