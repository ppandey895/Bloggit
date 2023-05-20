import React from 'react';
import {
    Flex,
    Text,
    Heading
} from '@chakra-ui/react';

import './Home.css';


function Home() {
  return (
    <Flex minH='80vh' flexDir='column' w='90%'  justifyContent='center' className='home'>
      <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" className='pointer'>
        <path className='tail' d="M1 100.38C17.65 102.714 32.9118 98.8529 44.771 82.0082C50.5939 73.7373 54.4547 63.3896 57.565 53.0699C57.9517 51.7867 61.1727 44.8597 57.9683 42.9795C53.8944 40.5892 43.5541 43.217 40.7751 43.9315C35.5608 45.2721 19.238 48.3991 22.0423 61.1612C24.6996 73.2541 37.3327 80.915 45.3575 84.3879C59.3846 90.4586 67.8986 86.4735 76.0045 69.7284C86.0693 48.937 91.6535 23.9849 98 1" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <path d="M98 1C97.0852 1.26014 95.9839 2.62329 95.1624 3.26042C93.3613 4.65728 91.6385 6.25271 90 8" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <path d="M98 2C99.4265 4.88427 100.399 7.79676 101 11" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      </svg>


        <Flex>
          <Heading className='heading' color='#555' fontFamily='Rubik'>welcome to <span className='title'>BLOGGIT!</span></Heading>
        </Flex>
        <Flex color='#666' gap='0.3rem'>
          <Text>share your views</Text>
          <Text color='#6FFFC2'>with the world</Text>
        </Flex>
    </Flex>
  )
}

export default Home;