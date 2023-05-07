import React from 'react';
import {
    Flex,
    Text,
    Heading, 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel
} from '@chakra-ui/react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './Auth.css';

function Auth() {
  return (
    <Flex boxShadow='xl' className='auth' flexDir='column' my='10' maxW='768' w='90%'>
        <Tabs isFitted variant='enclosed' colorScheme='telegram'>
            <TabList>
                <Tab  _selected={{bg: '#6FFFC2', color: 'white'}}>Sign Up</Tab>
                <Tab _selected={{bg: '#6FFFC2', color: 'white'}}>Sign In</Tab>
            </TabList>
            <TabPanels h='65vh' borderRadius='md' border='1px' borderColor='#6FFFC2'>
                <TabPanel padding='0'>
                    <SignUp />
                </TabPanel>
                <TabPanel padding='0'>
                    <SignIn />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Flex>
  )
}

export default Auth;