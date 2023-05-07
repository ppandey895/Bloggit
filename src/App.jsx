import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Heading,
  Flex,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Box
} from '@chakra-ui/react';
import { IoIosCloseCircle } from 'react-icons/io';
import { AiFillPlayCircle } from  'react-icons/ai';
import BlogCards from './components/Blogs/BlogCards';
import UserControl from './components/UserControl/UserControl';
import './App.css';


function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Flex className="App" alignItems='center' justifyContent='center' flexDir='column' overflowX='hidden'>
      <Flex>
        <Heading className='head-text' mt='4' size='3xl' letterSpacing='0.8rem' fontFamily='Rubik' textAlign='center'>
          <span>BLOGGIT
            <span className='heading'>BL
              <span className='o-menu' style={{color: 'white'}}>
                O
                <Box pos='absolute' top='0.32rem' left='-0.2rem'>
                  <Menu>
                    <MenuButton>
                      <AiFillPlayCircle size='3rem' color='#6FFFC2' />
                    </MenuButton>
                    <MenuList fontSize='1rem' color='#EEAA45'>
                      <MenuItem><Link to='/create'>Create</Link></MenuItem>
                      <MenuItem><Link to='/explore'>Explore</Link></MenuItem>
                      <MenuItem><Link to='/auth'>Login</Link></MenuItem>
                      <MenuItem><Link to='/about'>About Us</Link></MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </span>
              GGIT
            </span>BLOGGIT</span>
        </Heading>
      </Flex>
      <Outlet />

      <UserControl user={user} />
    </Flex>
  )
}

export default App