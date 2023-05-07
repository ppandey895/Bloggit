import React, { useEffect, useState } from 'react';
import {
    Flex,
    Text,
    Heading
} from '@chakra-ui/react';
import './BlogCard.css';


function BlogCard({ blog }) {
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const date = new Date();

    const timestamp = blog.created_at.seconds;
    const current = Math.floor(date.getTime() / 1000);
    const difference = current - timestamp;

    let output = ``;
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${difference} seconds ago`;
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
    
    console.log(output);
    setCreatedAt(output);
  }, [blog]);
  return (
    <Flex boxShadow='lg' px='4' py='2' flexDir='column' mx='6' my='4' borderRadius='md' borderTopColor='#6FFFC2' borderTopWidth='4px'>
        <Heading color='#606060' fontSize='lg' className="blog-title">{blog.blog_title}</Heading>
        <Text className='blog-text' my='2' color='#707070' fontSize='sm'>{blog.blog_content}</Text>
        <Flex justifyContent='space-between' fontSize='0.8rem'>
            <Text>
              {
                blog.anon ? '@anonymous' : `@${blog.created_by}`
              }
            </Text>
            <Text>{createdAt}</Text>
        </Flex>
    </Flex>
  )
}

export default BlogCard;