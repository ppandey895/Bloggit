import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  Text,
  InputGroup,
  Input,
  Textarea,
  Button,
  Checkbox,
  FormLabel,
  CheckboxGroup,
} from "@chakra-ui/react";
import { FaInfoCircle, FaPlus, FaRocket } from "react-icons/fa";
import { FcNook } from "react-icons/fc";
import { useAuthState } from'react-firebase-hooks/auth';
import FileBase from 'react-file-base64';
import "./BlogForm.css";
import { auth } from "../../firebaseConfig";

const BlogForm = function () {
  const [blogInfo, setBlogInfo] = useState({
    blogTitle: '',
    blogContent: '',
    blogThumb: '',
    anon: false,
  });
  
  const [user, loading ]= useAuthState(auth);
  
  const onSubmit = function() {
    console.log(user);
    if(user) {

    }
    else {
      alert('you need to sign in first');
    }
  }

  return (
    <Flex
      boxShadow="xl"
      className="auth"
      flexDir="column"
      my="10"
      mx="auto"
      maxW="768"
      w="90%"
      p="10"
      borderRadius="lg"
      borderTopColor="#6fffc2"
      borderTopWidth="2px"
    >
      <Heading
        size="lg"
        color="#666"
        display="flex"
        alignItems="center"
        gap="2"
      >
        Create a Blog
        <FcNook />
      </Heading>
      <Flex flexDir="column">
        <InputGroup my="4">
          <Text
            position="absolute"
            top="-0.6rem"
            left="0.8rem"
            zIndex="10"
            background="#fff"
            px="2"
            fontSize="0.8rem"
            color="#6fffc2"
          >
            Title
          </Text>
          <Input
            id="blog-title"
            type="text"
            placeholder="Why AI is more powerful than..."
            variant="filled"
            background="#fff"
            borderColor="#6FFFC2"
            _focus={{ borderColor: "#6FFFC2" }}
            _hover={{ background: "white" }}
            onChange={e => setBlogInfo({...blogInfo, blogTitle: e.target.value})}
          />
        </InputGroup>
        <InputGroup my="2">
          <Text
            position="absolute"
            top="-0.6rem"
            left="0.8rem"
            zIndex="10"
            background="#fff"
            px="2"
            fontSize="0.8rem"
            color="#6fffc2"
          >
            Blog
          </Text>
          <Textarea
            id="blog-content"
            type="text"
            placeholder="Start writing your blog here..."
            variant="filled"
            background="#fff"
            borderColor="#6FFFC2"
            _focus={{ borderColor: "#6FFFC2" }}
            _hover={{ background: "white" }}
            minHeight="100px"
            onChange={e => setBlogInfo({...blogInfo, blogContent: e.target.value})}
          />
        </InputGroup>

        <InputGroup mt='2' mb='4'>
          <FaPlus style={{marginTop: '6px'}} color='#6fffc2' fontSize='0.8rem' />
          <Text cursor='pointer' fontSize='0.8rem' ml='2px' bg='#fff' p='1' color='#6fffc2' pointerEvents='none'>Add Thumbnail</Text>
          <FileBase 
            id="thumb" 
            type="file"
            accept=".jpeg, .png"
            multiple={false}
            onDone={({base64}) => {
              setBlogInfo(blogInfo => ({...blogInfo, blogThumb: base64}))
            }}
          />
        </InputGroup>

        <Flex alignItems="center" mt="4" gap="1">
          <CheckboxGroup>
            <Checkbox id="anon" onChange={e => setBlogInfo({...blogInfo, anon: e.target.checked})} />
            <FormLabel
              color="#aaa"
              mx="1"
              htmlFor="anon"
              height="1rem"
              cursor="pointer"
              fontSize="0.8rem"
              mt="1"
            >
              Stay Anonymous
            </FormLabel>
            <FaInfoCircle className="info-icon" color="#aaa" />
          </CheckboxGroup>

          <Button
            ml="auto"
            justifySelf="flex-end"
            background="#6FFFC2"
            color="#fff"
            _hover={{ bg: "#4cecaa" }}
            _active={{ bg: "#3bffae" }}
            rightIcon={<FaRocket />}
            onClick={onSubmit}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogForm;
