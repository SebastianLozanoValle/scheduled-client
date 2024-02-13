import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import perros from '../assets/imagenes/perros.png'
import React, { useEffect, useState } from 'react';
import { BusquedaMundos } from "../components/BusquedaMundos";
import { Destacados } from "../components/Destacados";
import { useLocation } from "react-router-dom";

export const Mundomascotas = () => {

  const [paramsToSearch, setParamsToSearch] = useState({});

  const location = useLocation();
  useEffect(() => {
    if (location.state?.searchParams) {
      const searchParams = location.state?.searchParams
      setParamsToSearch(searchParams);
    }
  }, [location.state]);

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 5);

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

  return (

    <>
      <Box>
        <Box bg={`url(${perros})`} backgroundPosition='center' position='relative' height='500px' justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
          <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.7)'></Box>


          <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
            <Box position='relative' marginTop='150px'  >
              <Heading textAlign='center' color='white' fontSize={isSmallerThan760 ? '50px' : '60px'} ><b>Mundo mascotas</b></Heading>
              <a href='/'><Text position='relative' textAlign='center' fontSize={isSmallerThan760 ? '40px' : '40px'} color='#caa776' fontFamily='Tangerine, cursive'>inicio</Text></a>
            </Box>
          </Box>

          <Box height='100px' padding={isSmallerThan760 ? '30px' : '0px'} display={isSmallerThan760 ? 'none' : ''} >
            <BusquedaMundos /> {/* Renderiza el componente YourComponent */}
          </Box>
        </Box>

        <Box height='100px' padding={isSmallerThan760 ? '30px' : '0px'} display={isSmallerThan760 ? '' : 'none'} >
          <BusquedaMundos /> {/* Renderiza el componente YourComponent */}
        </Box>



        {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
        <Box height='500px' marginTop='100px' my={60} >
          <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
          <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
          <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
          {/* Sección de estilistas seleccionados */}
          {paramsToSearch != {} && (
            <Box>
              <Destacados paramsToSearch={paramsToSearch} destacados={false} />
            </Box>
          )}
          <Destacados paramsToSearch={{mundo:'Mascota'}} />
        </Box>
      </Box>
    </>

  )

}
