import React from 'react';
import { 
    Flex,
    Text,
    Heading,
    Box,
    Image,
 } from '@chakra-ui/react';
import './About.css';

function About() {
  return (
    <Flex className='about' flexDir='column' alignItems='center'>
        <Heading color='#555' fontFamily='Rubik'>Who are we?</Heading>
        <Flex flexWrap='wrap' alignItems='center' justifyContent='center' gap='4' m='6'>
            <Box>
                <Image padding='2' outline='2px solid #6FFFC2' borderRadius='50vw' width='150px' height='150px' objectFit='cover' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0YiAWiHO0or_mbcJUZYX5wAAAA%26pid%3DApi&f=1&ipt=b3eed4a79f72b1889ebae5e83f59ad815ce776f9ea22859df4f3b15d63d68ce8&ipo=images' />
                <Text textAlign='center' mt='2' fontWeight='600' color='#666'>Pramod Pandey</Text>
            </Box>
            <Box>
                <Image padding='2' outline='2px solid #6FFFC2' borderRadius='50vw' width='150px' height='150px' objectFit='cover' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.SNuB4WZUEJn-8ehuYKcQtAHaHa%26pid%3DApi&f=1&ipt=87ce93816bccdb424bb2013b2522aec168a6fc67e34af645b9c2291ae9f3a261&ipo=images' />
                <Text textAlign='center' mt='2' fontWeight='600' color='#666'>Pranjal Barnwal</Text>
            </Box>
            <Box>
                <Image padding='2' outline='2px solid #6FFFC2' borderRadius='50vw' width='150px' height='150px' objectFit='cover' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F30%2F62%2F75%2F3062756a297f1e3c22e35f3fe89b3ecc.jpg&f=1&nofb=1&ipt=87329c1bac8811faf6a0ab97f1b0560c88cbe3b3b922e7190edbec807c0f7ee3&ipo=images' />
                <Text textAlign='center' mt='2' fontWeight='600' color='#666'>Pintu Kumar</Text>
            </Box>
        </Flex>

        <Flex width='80%' flexDir='column' textAlign='center'>
            <Text>We are the students of Engineering from India. We like to explore and make stuff for the web.</Text>

            <Text>
                Our Tech Stack consists of <span className='highlight'>ReactJS, Chakra-UI, Jotai, Framer Motion, Firebase and lots of cat images</span>
            </Text>

            <Text>Our aim is to create a minimal blogging application that is easy to use and easily accessible. So why wait? Join our vibrant community of passionate bloggers, writers, and storytellers, and let your words make a difference. Sign up today and unlock a world of possibilities with our Blog App. We can't wait to see what you'll create!</Text>
        </Flex>
    </Flex>
  )
}

export default About;