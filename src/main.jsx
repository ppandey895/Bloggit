import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import BlogCards from './components/Blogs/BlogCards';
import BlogForm from './components/BlogForm/BlogForm';
import Auth from './components/Auth/Auth';
import Loader from './components/Loader/Loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'explore',
        element: <BlogCards />,
      },
      {
        path: 'create',
        element: <BlogForm  />,
      },
      {
        path: 'auth',
        element: <Auth />,        
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
