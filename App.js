import React from 'react';
import Main from './src/components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}