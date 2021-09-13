import {createAsyncThunk,  createSlice} from '@reduxjs/toolkit'

//action type user/getAccount mutate user state from here???
export const sendRequest = createAsyncThunk(
    'requests/sendRequest',
    //TODO: rename params
    
    async (body, thunkAPI) => {
      //TODO: move request to api or rtk query
     const {account: login, session} = thunkAPI.getState().user.user
      // take login and session from state
      const response = await fetch(
        `https://api.sendsay.ru/general/api/v100/json/${login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            ...body,
            session
          }),
        },
      );
      const data = await response.json();
      return {...data, body, isStatusOK: !!data.errors};
    },
  );


const requestsSlice = createSlice({
    name: 'request',
    initialState : {entities: []},
    reducers: {
       updateCurrentRequest(state, action) {
         const currentRequestIndex = action.payload
         const newEntities  = [state.entities[currentRequestIndex], ...state.entities.filter((_, index) => index !== currentRequestIndex)]
         state.entities = newEntities
       }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(sendRequest.fulfilled, (state, action) => {
          // Add request to the state array
          state.entities.unshift(action.payload)
        });
      },
})

const { reducer, actions} = requestsSlice
export const { updateCurrentRequest }  = actions
export default reducer
