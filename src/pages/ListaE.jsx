
import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import barbero1 from '../assets/imagenes/barbero1.jpg'



export const ListaE = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const specialistsData = [
    { id: 1, name: 'Especialista1', description: 'Descripción del Especialista1' },
    { id: 2, name: 'Especialista2', description: 'Descripción del Especialista2' },
    { id: 3, name: 'Especialista3', description: 'Descripción del Especialista3' },
  ];

  const handleSpecialistClick = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const handlePayButtonClick = () => {
    // Aquí puedes redirigir a la pasarela de pagos con la información seleccionada
    // Puedes usar un sistema de enrutamiento como React Router o simplemente cambiar el estado para mostrar la información real.
    console.log('Redirigiendo a la pasarela de pagos con la siguiente información:');
    console.log('Especialista seleccionado:', selectedSpecialist);
    // Lógica para la redirección o actualización del estado para mostrar la información real
  };

  return (
    <>

     <Box  height='100vh'  bg={`url(${barbero1})`} bgRepeat='no-repeat' backgroundSize='cover'>
       <Heading  color='gold' textAlign='center' fontSize='18px'  paddingTop='30px'>ESPECIALISTAS DISPONIBLES </Heading>
       <Text>Selecciona un Especialista:</Text>
       <Box display='column' width='100%' marginTop='40px'>
       {specialistsData.map((specialist) => (
        <Box  bg="rgba(0, 0, 0, 0.8)" key={specialist.id} border="1px" p={3} m={2} cursor="pointer" onClick={() => handleSpecialistClick(specialist)}>
          <Text color='white'>{specialist.name}</Text>
          <Text fontSize="sm">{specialist.description}</Text>
        </Box>
      ))}

      {selectedSpecialist && (
        <Box mt={4}  textAlign='center'>
          <Text>Información del Especialista:</Text>
          <Text>{`Especialista: ${selectedSpecialist.name}`}</Text>
          <Text>{`Descripción: ${selectedSpecialist.description}`}</Text>
          <Button onClick={handlePayButtonClick}>Pagar</Button>
        </Box>
      )}
    </Box>
     </Box>
     
     
    </>
  );
};

