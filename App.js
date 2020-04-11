import React from 'react';
import Main from './src/components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './src/components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}