import React, { useEffect, useState } from 'react';
import {
    Flex,
    Text,
    Heading,
} from '@chakra-ui/react';
import BlogCard from './BlogCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import 'firebase/firestore';

function BlogCards() {
  const [blogs, setBlogs] = useState([
    {
      blog_title: 'Why you should not learn Java',
      blog_content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora veritatis voluptatem hic culpa nostrum nisi sit quas accusantium a doloremque!',
      created_by: 'username1',
      created_at: '23-04-23'
    },
    {
      blog_title: 'Why you should not learn Java in 2023 as the rates of',
      blog_content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora veritatis voluptatem hic culpa nostrum nisi sit quas accusantium a doloremque!',
      created_by: 'username1',
      created_at: '23-04-23'
    },
    {
      blog_title: 'Why you should not learn Java',
      blog_content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora veritatis voluptatem hic culpa nostrum nisi sit quas accusantium a doloremque!',
      created_by: 'username1',
      created_at: '23-04-23'
    }
  ]); 

  const getBlogs = async () => {
    const blogsRef = collection(db, 'blogs');

    const d = await getDocs(blogsRef);

    d.forEach(blog => {
      const data = [blog.data()]
      console.log(data);
      setBlogs(data);
    });
    
  }

  useEffect(() => {
    getBlogs();
  }, []);


  return (
    <Flex flexDir='column' my='4' maxW='768'>
      {
        blogs && blogs.map((blog, id) => <BlogCard blog={blog} key={id} />)
      }
    </Flex>
  )
}

export default BlogCards;