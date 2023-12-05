import React, { useState } from 'react';
import { Box, Image, Heading, Text, Flex, Input, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/react';

const Card = ({ name, rating, image }) => {
  const [newImage, setNewImage] = useState('');

  const handleImageChange = (event) => {
    setNewImage(event.target.value);
  };

  const handleImageUpdate = () => {
    // Add logic to handle the image update, e.g., send to backend or update state
    console.log('Updating image:', newImage);
  };

  return (
    <Box width='300px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={newImage || image} alt={name} />
      <Box p='6'>
        <Heading fontSize='20px' textAlign='center'>{name}</Heading>
        <Flex justify='center' mt='2'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < rating ? 'teal.500' : 'gray.300'} />
            ))}
        </Flex>
        <Text mt='2' textAlign='center' fontSize='12px'>
          Peluquero destacado con {rating} estrellas.
        </Text>
        <Input
          mt='3'
          placeholder='URL de la nueva imagen'
          value={newImage}
          onChange={handleImageChange}
        />
        <Button colorScheme='teal' mt='2' onClick={handleImageUpdate}>
          Actualizar Imagen
        </Button>
      </Box>
    </Box>
  );
}

export default Card;
