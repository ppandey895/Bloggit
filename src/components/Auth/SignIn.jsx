import React, { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {
    Flex,
    Text,
    Heading,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Divider,
} from '@chakra-ui/react';
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaUserAstronaut } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  const mailRef = useRef(null);
  const passRef = useRef(null);

  const [hidePass, setHidePass] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

	const handleSignIn = function() {
		console.log(mailRef.current.value);
		console.log(passRef.current.value);
    if(passRef.current.value.length < 6) setIsError(true);
    else {
      setIsError(false);
      const res = signInWithEmailAndPassword(auth, mailRef.current.value, passRef.current.value);
      console.log(res);
      return navigate('/explore');
    }
	}

  const GoogleSignIn = async function() {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      return navigate('/explore');
      
    } catch (error) {
      console.log(error.message);
    }    
  }

  return (
    <Flex alignItems='center' justifyContent='center' flexDir='column' p='6'>
        <Form style={{width: '75%'}}>
            <InputGroup>
                <InputLeftElement mt='4' children={<FaUserAstronaut />} />
                <Input
                    type='email'
                    placeholder='user@mail.to'
                    variant='filled'
                    mt='4'
                    _focus={{borderColor: '#6FFFC2'}}
                    ref={mailRef}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement mt='4' children={<HiLockClosed />} />
                <Input
                    type={hidePass ? 'password' : 'text'}
                    placeholder='••••••••'
                    variant='filled'
                    mt='4'
                    _focus={{borderColor: '#6FFFC2'}}
                    ref={passRef}
                />
                <InputRightElement 
                  mt='4' 
                  onClick={() => setHidePass(!hidePass)} 
                  children={hidePass ? <HiEyeOff /> : <HiEye />} 
                  _hover={{cursor: 'pointer'}}  
                />
                </InputGroup>
            <Text fontSize='sm' color={isError ? 'red.400' : 'green.400'} mb='4'>
              {
                isError ? 'incorrect email or password' : '.'
              }
            </Text>
            <Button type='submit' background='#6FFFC2' onClick={handleSignIn}>Sign In</Button>
            <Divider my='2' />
            <Button leftIcon={<FcGoogle />} _active={{bg: '#6FFFC2'}} onClick={GoogleSignIn}>
                <Text>Sign In with Google</Text>    
            </Button>
        </Form>
    </Flex>
  )
}

export default SignIn;