import React, { useRef, useState, useEffect } from "react";
import { ref, set, update } from "firebase/database";
import ReactQuill from "react-quill";
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
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { FaInfoCircle, FaPlus, FaRocket } from "react-icons/fa";
import { AiFillAlert } from 'react-icons/ai';
import { FcNook } from "react-icons/fc";
import { useAuthState } from'react-firebase-hooks/auth';
import FileBase from 'react-file-base64';
import { db, auth } from "../../firebaseConfig";
import { useNavigate, useParams } from "react-router";
import { useAtom } from 'jotai';
import { blogsAtom } from "../Blogs/BlogCards";
import 'react-quill/dist/quill.snow.css';
import "./BlogForm.css";

const BlogForm = function () {
  const params = useParams();
  const navigate = useNavigate();

  // for storing the blog data from the inputs
  const [blogInfo, setBlogInfo] = useState();
  const [user, loading ] = useAuthState(auth);
  const [thumb, setThumb] = useState('');

  const { onOpen, isOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState({});

  const cancelRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const toast = useToast();

  // fetches the existing blog data from jotai
  const [blogs, setBlogs] = useAtom(blogsAtom);

  const onSubmit = function() {
    // post a blog only if a user is logged in
    if(user) { 

      // check if the blog title or content is empty
      if(titleRef.current.value.length > 0 && contentRef.current.value.length > 0) {

        // update the blog if the blog id is already known
        if(params.blogId) {
          const blogId = params.blogId;
          const updates = {
            ['/blogs/' + blogId]: {
              blog_id: blogId,
              blog_title: titleRef.current.value,
              blog_content: contentRef.current.value,
              blog_thumb: thumb.length !== 0 ? thumb : blogInfo.blog_thumb,
              created_by: blogInfo.created_by,
              email: blogInfo.email,        
              created_at: blogInfo.created_at,
              anon: blogInfo.anon,
              upvotes: blogInfo.upvotes,
            }
          };
          update(ref(db), updates);
          toast({
            title: 'Blog Updated.',
            description: "Your blog was successfully updated.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } 
        
        // create a new blog if the blog id is not known
        else {
          const blogId = Math.random().toString(36).substring(2, 8);
          const newBlog = {
            blog_id: blogId,
            blog_title: blogInfo.blog_title,
            blog_content: contentRef.current.value,
            blog_thumb: thumb,
            created_by: user.displayName,
            email: user.email,        
            created_at: Date.now() / 1000,
            anon: blogInfo.anon,
            upvotes: 0,
          };

          set(ref(db, 'blogs/' + blogId), newBlog);
          toast({
            title: 'Blog Posted.',
            description: "Your blog was successfully posted.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }

        navigate('/explore');
      }

      else {
        setErrorMessage('The blog must have a title and some content');
        onOpen();
      }
    }
    else {
      setErrorMessage('You need to Sign In first.');
      onOpen();
    }
  }

  useEffect(() => {
    if(params.blogId) {
      const BLOG = blogs.filter(blog => blog.blog_id === params.blogId)[0];
      setBlogInfo(BLOG);
      if(titleRef.current.value.length === 0) titleRef.current.value = BLOG.blog_title;
      if(contentRef.current.value.length === 0) contentRef.current.value = BLOG.blog_content;
    }
  })

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
            onChange={e => setBlogInfo({...blogInfo, blog_title: e.target.value})}
            ref={titleRef}
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
          <ReactQuill 
            theme="snow" 
            style={{width: '100%', outline: '2px solid #6FFFC2', border: 'none', borderRadius: '6px'}}
            id="blog-content"
            placeholder="Start writing your blog here..."
            ref={contentRef}
          />
        </InputGroup>

        <InputGroup mt='10' mb='4'>
          <FaPlus style={{marginTop: '6px'}} color='#6fffc2' fontSize='0.8rem' />
          <Text cursor='pointer' fontSize='0.8rem' ml='2px' bg='#fff' p='1' color='#6fffc2' pointerEvents='none'>Add Thumbnail</Text>
          <FileBase 
            id="thumb" 
            type="file"
            accept=".jpeg, .png"
            multiple={false}
            onDone={({base64}) => {
              setBlogInfo(blogInfo => ({...blogInfo, thumb: base64}))
              setThumb(base64)
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
            {
              params.blogId ? 'Update' : 'Post'
            }
          </Button>
        </Flex>
      </Flex>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogContent 
          color='#444' 
          display='flex' 
          bg='red.100' 
          alignItems='center'
          borderColor='red.200' 
          borderWidth='2px'
          mx='10'
        >
          <AlertDialogHeader display='flex' flexDir='column' alignItems='center' fontSize='2rem'><AiFillAlert color='#f66'/>Oops!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{ errorMessage }</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default BlogForm;
