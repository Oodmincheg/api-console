import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { email } from '@sideway/address';

export const signIn = createAsyncThunk(
  'auth/signIn',
  //TODO: rename params

  async (params, thunkAPI) => {
    //TODO: move request to api or rtk query
    const response = await fetch(
      `https://api.sendsay.ru/general/api/v100/json/${params.login}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          action: 'login',
          login: params.login,
          passwd: params.password,
        }),
      },
    );
    const data = await response.json();
    localStorage.setItem('session', JSON.stringify(data.session));
    localStorage.setItem('login', JSON.stringify(data.login))
    console.log('response ===> ', data);
    return data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: '',
    password: '',
    subLogin: '',
    session: '',
    errorLogin: '',
    errorPassword: '',
  },
  reducers: {
    updateLogin(state, action) {
      state.login = action.payload;
      const login = action.payload;
      const loginIsEmail = login.includes('@') 
      
      if (loginIsEmail && !email.isValid(login)) {
        state.errorLogin = 'Пожалуйста введите корректный эмейл';
        return;
      }
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!loginIsEmail && !regex.test(login)) {
        state.errorLogin =
          'Логин может содержать только латинские буквы, цифры и _';
        return;
      }
      state.errorLogin = '';
    },

    updateSubLogin(state, action) {
      state.subLogin = action.payload;
    },
    updatePassword(state, action) {
      state.password = action.payload;
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(state.password)) {
        state.errorPassword =
          'Пароль может содержать только латинские буквы, цифры пробел и _';
        return;
      }
      state.errorPassword = ''
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signIn.fulfilled, (state, action) => {
      // Add user to the state array
      state.session = action.payload.session;
      
      // console.log('action ===> ', action)
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { updateLogin, updatePassword, updateSubLogin } = actions;
// Export the reducer, either as a default or named export
export default reducer;