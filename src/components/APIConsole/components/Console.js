import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendRequest,
  updateCurrentRequestBodyString,
} from '../../../features/requestsSlice';

export default function Console() {
  //TODO: move to custom hook
  const dispatch = useDispatch();
  const currentRequestBodyString = useSelector(
    (state) => state.requests.currentRequestBodyString,
  );
  const requests = useSelector((state) => state.requests.entities);
  const currentRequestResponseString = requests.length
    ? JSON.stringify(requests[0].response)
    : '';

  function handleSendRequest() {
    const requestJSON = currentRequestBodyString;
    let body;
    try {
      body = JSON.parse(requestJSON);
    } catch (error) {
      console.log('ERROR ===> ', error);
      return;
    }
    dispatch(sendRequest(body));
  }

  function prettifyRequstBody() {
    const ugly = currentRequestBodyString;
    let pretty;
    try {
      const obj = JSON.parse(ugly);
      pretty = JSON.stringify(obj, undefined, 4);
    } catch (err) {
      console.log(err);
      return;
    }

    updateCurrentRequestBodyString(pretty);
  }

  return (
    <div>
      Console
      <textarea
        value={currentRequestBodyString}
        onChange={(event) => {
          dispatch(updateCurrentRequestBodyString(event.target.value));
        }}
        name="request"
      ></textarea>
      <textarea
        name="response"
        value={currentRequestResponseString}
        disabled
      ></textarea>
      <button onClick={handleSendRequest}>Отправить</button>
      <button onClick={prettifyRequstBody}>Форматировать</button>
    </div>
  );
}
