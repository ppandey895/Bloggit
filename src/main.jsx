import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { createStore, Provider } from 'jotai';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ChakraProvider>
)
