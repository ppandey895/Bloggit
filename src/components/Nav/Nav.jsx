import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heading,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box
} from '@chakra-ui/react';
import { AiFillPlayCircle } from  'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';


function Nav() {
  const [ user ] = useAuthState(auth);

  return (
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
                      {
                        !user && <MenuItem><Link to='/auth'>Login</Link></MenuItem>
                      }
                      <MenuItem><Link to='/about'>About Us</Link></MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </span>
              GGIT
            </span>BLOGGIT</span>
        </Heading>
      </Flex>
  )
}

export default Nav;