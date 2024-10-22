import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react';
import maquillaje from '../assets/imagenes/maquillaje.png'
import { BusquedaMundos } from "../components/BusquedaMundos";
import { Destacados } from "../components/Destacados";
import { Link, useLocation } from 'react-router-dom';
import { ServiciosMujeres } from "../data/services";

export const Mundomujeres = () => {

  const [paramsToSearch, setParamsToSearch] = useState({});

  const location = useLocation();
  useEffect(() => {
    if (location.state?.searchParams) {
      const searchParams = location.state?.searchParams;
      setParamsToSearch(searchParams);
      console.log('paramsToSearch', searchParams);
    }
  }, [location.state]);

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 5);

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

  const handleSearch = (searchParams) => {
    console.log('searchParams', searchParams);
    searchParams.mundo = 'Mujer';
    setParamsToSearch(searchParams);
  }

  return (
    <>
      <Box>
        <Box bg={`url(${maquillaje})`} backgroundPosition='center' position='relative' justifyContent='center' height='500px' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
          <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.7)'></Box>


          <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
            <Box position='relative' marginTop='150px' >
              <Heading textAlign='center' color='white' fontSize={isSmallerThan760 ? '50px' : '60px'} ><b>Mundo hombres</b></Heading>
              <Link to='/'><Text position='relative' textAlign='center' fontSize={isSmallerThan760 ? '40px' : '40px'} color='#caa776' fontFamily='Tangerine, cursive'>inicio</Text></Link>
            </Box>
          </Box>
        </Box>

        <Box display={isSmallerThan760 ? 'none' : ''} >
          <BusquedaMundos onSearch={handleSearch} tabs={ServiciosMujeres} /> {/* Renderiza el componente YourComponent */}
        </Box>
        <Box display={isSmallerThan760 ? '' : 'none'} >
          <BusquedaMundos onSearch={handleSearch} tabs={ServiciosMujeres} /> {/* Renderiza el componente YourComponent */}
        </Box>



        {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
        {
          paramsToSearch != {} && (
            <Box height='auto' mt={20} position={'relative'} >
              <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Resultados de</Heading>
              <Text fontSize='22px' textAlign='center'><b>Tu Busqueda Personalizada</b></Text>
              <Text fontSize='10px' textAlign='center'><b>Fueron:</b></Text>
              <Box>
                <Destacados paramsToSearch={paramsToSearch} destacados={false} />
              </Box>
            </Box>
          )
        }
        <Box height='auto' marginTop='100px' mt={paramsToSearch != {} ? 0 : 60} mb={30} position={'relative'} >
          <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
          <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
          <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
          <Destacados paramsToSearch={{ mundo: 'Mujer' }} />
        </Box>
      </Box>
    </>
  )
}
