import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
    Flex,
    Text,
    Heading,
    Button,
    Input,
    InputLeftElement,
    InputGroup,
    Divider,
    useToast,
    InputRightElement,
    FormControl
} from '@chakra-ui/react';
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi';
import { FaUserAstronaut, FaEllo } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function SignUp() {
	const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);
  const [hidePass, setHidePass] = useState(true);
  const [isError, setIsError] = useState(false);
	const [errorText, setErrorText] = useState('.');
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const toast = useToast();

  const signUpSuccess = () => {
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

	const handleSignUp = function() {
    const displayName = nameRef.current.value;
    if(passRef.current.value.length < 8) {
			setIsError(true);
			setErrorText('password too short (min length 8)')
		}
    else {
			setIsError(false);
			setErrorText('.');
      createUserWithEmailAndPassword(auth, mailRef.current.value, passRef.current.value)
      .then(({ user }) => {
        updateProfile(user, { displayName });
      })
      .catch(error => console.log(error));

      signUpSuccess();
      return navigate('/explore');
		}
	}

  const GoogleSignIn = async function() {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      
      signUpSuccess();
      return navigate('/explore');

    } catch (error) {
      console.log(error.message);
    }    
  }

  return (
    <Flex alignItems='center' flexDir='column' p='6'>
        <FormControl width='75%'>
            <InputGroup>
                <InputLeftElement mt='4' children={<FaEllo />} />
                <Input
                    type='text'
                    placeholder='Babu Rao'
                    variant='filled'
                    mt='4'
                    autoComplete='true'
                    _focus={{borderColor: '#6FFFC2'}}
										isRequired
										ref={nameRef}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement mt='4' children={<FaUserAstronaut />} />
                <Input
                    type='email'
                    placeholder='user@mail.to'
                    variant='filled'
                    mt='4'
                    autoComplete='true'
                    _focus={{borderColor: '#6FFFC2'}}
										isRequired
										ref={mailRef}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement mt='4' children={<HiLockClosed />} />
                <Input
                    type={hidePass ? 'password' : 'text'}
                    placeholder='Create password'
                    variant='filled'
                    mt='4'
                    autoComplete='true'
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
              { errorText }
            </Text>
            <Button type='submit' background='#6FFFC2' onClick={handleSignUp}>Sign Up</Button>
            <Divider my='2' />
            <Button leftIcon={<FcGoogle />} _active={{bg: '#6FFFC2'}} onClick={GoogleSignIn}>
                <Text>Sign Up with Google</Text>    
            </Button>
        </FormControl>
    </Flex>
  )
}

export default SignUp;