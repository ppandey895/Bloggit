import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { ref, set, update, getDatabase, onValue } from 'firebase/database';
import {
    Flex,
    Heading,
    Text,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    useMediaQuery,
    useDisclosure,
    useClipboard,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router';
import './BlogPage.css';
import { blogsAtom } from '../Blogs/BlogCards';
import { SlOptionsVertical } from 'react-icons/sl';
import { BsFillPenFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri';
import { AiOutlineShareAlt } from 'react-icons/ai'; 
import { motion } from 'framer-motion';

function BlogPage() {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, setValue, hasCopied } = useClipboard('https://justbloggit.netlify.app/#/blog/' + params.blogId);
  const [blogs, setBlogs] = useAtom(blogsAtom);
  const [BLOG, setBLOG] = useState(blogs.filter(blog => blog.blog_id === params.blogId)[0]);
  const [createdAt, setCreatedAt] = useState();
  const [liked, setLiked] = useState(false);
  const [ user ] = useAuthState(auth);
  const [ smallerThan768 ] = useMediaQuery('(max-width: 768px)');
  const [cat, setCat] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const db = getDatabase();

  const handleBlogDelete = async function() {
    const blogRef = ref(db, 'blogs/' + BLOG.blog_id);
    const error = await set(blogRef, null);
    console.log(error);

    toast({
      title: 'Blog Deleted',
      description: "The blog was successfully deleted",
      status: 'info',
      duration: 9000,
      isClosable: true,
    });

    
    return navigate('/explore');
  }
  
  const handleBlogEdit = function() {
    return navigate('/create/' + BLOG.blog_id);
  }
  
  const handleLike = function() {
    if(user?.email !== BLOG.email) {
      setLiked(!liked);
      const db = getDatabase();
      if(liked) {
        update(ref(db,  'blogs/' + BLOG.blog_id), { ...BLOG, upvotes: BLOG.upvotes - 1});
      } else {
        update(ref(db,  'blogs/' + BLOG.blog_id), { ...BLOG, upvotes: BLOG.upvotes + 1});
      }
    }

  }
  
  useEffect(() => {
    if(!BLOG) {
      try {
        const query = ref(db, 'blogs/' + params.blogId);
        onValue(query, (snapshot) => {
          const data = snapshot.val();
          setBLOG(data);
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    const loadCat = async() => {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      setCat(data[0].url);
    }
    const date = new Date();
    const timestamp = BLOG?.created_at || 600000;
    const current = Math.floor(date.getTime() / 1000);
    const difference = current - timestamp;

    let output = ``;
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${Math.floor(difference)} seconds ago`;
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`;
    }
    
    setCreatedAt(output);
    loadCat();
  }, [BLOG]);

  return (
    <Flex as={motion.div} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition='0.5s ease-in' flexDir='column' my='10' maxW='768' boxShadow='lg' borderRadius='md' mx='8' bg='gray.100'>
      {
        BLOG && (
        <>
        <Box minH='25vw' color='white' backgroundImage={ BLOG.blog_thumb.length === 0 ? cat : BLOG.blog_thumb } className='blog-thumb' backgroundSize='cover' backgroundPosition='center' py='12' px='6' borderTopRadius='6'>
          <Flex justifyContent='space-between' mt='2'>
            <Heading fontSize={smallerThan768 ? 'lg' : '3xl'} fontFamily='Rubik' textShadow='2xl'>{ BLOG.blog_title }</Heading>
            {
              BLOG.email === user?.email ? (
                <Menu>
                  <MenuButton><SlOptionsVertical /></MenuButton>
                  <MenuList color='#444'>
                    <MenuItem _hover={{ background: '#cfc'}} onClick={handleBlogEdit}><BsFillPenFill style={{marginRight: '8px'}} color='#444'/>Edit</MenuItem>
                    <MenuItem _hover={{ background: '#cfc'}} onClick={onOpen}>
                      <MdDelete fontSize='1.2rem' style={{marginRight: '4px'}} color='#f66' />Delete
                    </MenuItem>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Delete Warning</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          Are you sure you want to delete this blog?
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button colorScheme='red' onClick={handleBlogDelete}>Delete</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuList>
                </Menu>
              ) : ""
            }
          </Flex>
          <Flex justifyContent='space-between' mt='2' fontSize={smallerThan768 ? 'sm' : 'lg'}>
            <Text>@{ BLOG.anon ? 'anonymous' : BLOG.created_by?.toLowerCase() }</Text>
            <Text>{createdAt && createdAt}</Text>
          </Flex>
        </Box>
        <Text dangerouslySetInnerHTML={{ __html : BLOG.blog_content}} px='6' py='4' color='gray.600' fontSize={smallerThan768 ? 'sm' : 'lg'}></Text>

        <Flex px='6' py='4' alignItems='center' gap='2' onClick={user && handleLike} cursor='pointer'>
          { liked ? <RiHeart2Fill color='#f55' size='1.5rem' /> : <RiHeart2Line color='#444' size='1.5rem' /> }
          { BLOG.upvotes }
          <Button onClick={onCopy} marginLeft='auto' fontWeight='500'><AiOutlineShareAlt size='1.5rem' style={{marginRight: '0.5rem' }}/>{hasCopied ? "Copied!" : "Share"}</Button>
        </Flex>
        </>
        )
      }
    </Flex>
  )
}

export default BlogPage;