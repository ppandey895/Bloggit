import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { onValue, ref } from "firebase/database";
import { atom, useAtom } from 'jotai';
import {
    Flex,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Box
} from '@chakra-ui/react';
import BlogCard from './BlogCard';

export const blogsAtom = atom([]);

function BlogCards() {

  const [blogs, setBlogs] = useAtom(blogsAtom);

  const getBlogs = () => {
    try {
      const query = ref(db, "blogs");
      return onValue(query, (snapshot) => {
        const data = snapshot.val();
        let blogData = [];
        for(let index in data) {
          blogData.unshift(data[index]);
        }
        setBlogs(blogData);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    if(blogs.length === 0) getBlogs();
  }, []);


  return (

  
    <Flex flexDir='column' my='4' maxW='768'>
      {
        blogs.length !== 0 ? 
        blogs.map((blog, id) => <BlogCard blog={blog} key={id} />)
        :
        (
          <>
            <Stack spacing={8} mt='4'  w='75vw' maxW='768px'>
              <Box padding='6' boxShadow='lg' bg='white' borderRadius='md' borderTopColor='#6FFFC2' borderTopWidth='2px'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
              </Box>
              <Box padding='6' boxShadow='lg' bg='white' borderRadius='md' borderTopColor='#6FFFC2' borderTopWidth='2px'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
              </Box>
              <Box padding='6' boxShadow='lg' bg='white' borderRadius='md' borderTopColor='#6FFFC2' borderTopWidth='2px'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
              </Box>
            </Stack>
          </>
        )
      }
    </Flex>
  )
}

export default BlogCards;