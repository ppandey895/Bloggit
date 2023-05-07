import React, { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import {
    Flex,
    Text,
    Heading,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Image,
    Box
} from '@chakra-ui/react';
import { FaUserAstronaut } from 'react-icons/fa';

function UserControl({ user }) {
  return (
    <Flex position='absolute' right='3vw' bottom='3vh'>
        <Menu>
            <MenuButton borderRadius='10vw' background='#bfb'>
            {
                user ? 
                ( <Box boxSize='50px' borderRadius='10vw' boxShadow='xl'><Image alt=':/' src={user?.photoURL} borderRadius='10vw' /></Box>) 
                :
                ( <Flex p='4'><FaUserAstronaut /></Flex>)
            }
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => signOut(auth)}>Log Out</MenuItem>
            </MenuList>
        </Menu>
    </Flex>
  )
}

export default UserControl;