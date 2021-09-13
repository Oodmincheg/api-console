import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import user from './features/userSlice'
import requestsSlice from './features/requestsSlice'


const store = configureStore({
  reducer: {auth: authSlice, user, requests: requestsSlice},
})

export default store
