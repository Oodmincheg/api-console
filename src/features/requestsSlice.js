import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

//action type user/getAccount mutate user state from here???
export const sendRequest = createAsyncThunk(
  'requests/sendRequest',
  //TODO: rename params

  async (body, thunkAPI) => {
    //TODO: move request to api or rtk query
    const { account: login, session } = thunkAPI.getState().user.user;
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
          session,
        }),
      },
    );
    const data = await response.json();
    return { response: data, body, isStatusOK: !!data.errors };
  },
);

const requestsSlice = createSlice({
  name: 'request',
  initialState: { entities: [], currentRequestBodyString: '' },
  reducers: {
    updateCurrentRequest(state, action) {
      const currentRequestIndex = action.payload;
      const newEntities = [
        state.entities[currentRequestIndex],
        ...state.entities.filter((_, index) => index !== currentRequestIndex),
      ];
      state.entities = newEntities;
    },
    updateCurrentRequestBodyString(state, action) {
      state.currentRequestBodyString = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendRequest.fulfilled, (state, action) => {
      const existedRequestIndex = state.entities.findIndex((existedRequest) =>
        isEqual(existedRequest.body, action.payload.body),
      );
      const isNewRequest = existedRequestIndex === -1;
      if (isNewRequest) {
        state.entities.unshift(action.payload);
      } else {
        requestsSlice.caseReducers.updateCurrentRequest(state, {
          payload: existedRequestIndex,
        });
      }
    });
  },
});

const { reducer, actions } = requestsSlice;
export const { updateCurrentRequest, updateCurrentRequestBodyString } = actions;
export default reducer;
