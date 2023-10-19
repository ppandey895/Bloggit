import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Flex} from '@chakra-ui/react';
import { Routes, Route } from 'react-router';

import UserControl from './components/UserControl/UserControl';
import BlogCards from './components/Blogs/BlogCards';
import BlogForm from './components/BlogForm/BlogForm';
import Auth from './components/Auth/Auth';
import BlogPage from './components/BlogPage/BlogPage';
import Nav from './components/Nav/Nav';
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Flex className="App" alignItems='center' justifyContent='center' flexDir='column' overflowX='hidden'>
      <Nav />
      
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/explore' element={ <BlogCards /> } />
        <Route path='/auth' element={ <Auth /> } />
        <Route path='/create/' element={ <BlogForm /> } />
        <Route path='/create/:blogId' element={ <BlogForm /> } />
        <Route path='/blog/:blogId' element={ <BlogPage /> } />
        <Route path='/about' element={ <About /> } />
      </Routes>

      <UserControl user={user} />
    </Flex>
  )
}

export default App
