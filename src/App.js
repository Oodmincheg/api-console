import { Login } from './components/Login';
import { APIConsole } from './components/APIConsole';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <Login /> */}
        <APIConsole />
      </Provider>
    </div>
  );
}

export default App;
