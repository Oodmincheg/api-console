import {createAsyncThunk,  createSlice} from '@reduxjs/toolkit'

export const getAccount = createAsyncThunk(
    'user/getAccount',
    //TODO: rename params
    
    async () => {
      //TODO: move request to api or rtk query
    
      //TODO: set session to the store 
      const session = localStorage.getItem('session')
      //TODO: redirect if session is not in localstorage
      const login = localStorage.getItem('login')

      const response = await fetch(
        `https://api.sendsay.ru/general/api/v100/json/${login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            action: 'pong',
            session
          }),
        },
      );
      const data = await response.json();
      return data;
    },
  );


const userSlice = createSlice({
    name: 'user',
    initialState : {},
    reducers: {
        updateUser(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAccount.fulfilled, (state, action) => {
          // Add user to the state array
          state.user = action.payload;
          
          console.log('action ===> ', action)
        });
      },
})

const { reducer} = userSlice
export default reducer
