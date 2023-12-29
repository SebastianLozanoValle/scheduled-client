import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import vino from '../assets/imagenes/sirviendo.jpg'
import { MdTouchApp } from "react-icons/md";
import blancoynegro from'../assets/imagenes/blancoynegro.jpg'
import { LuLassoSelect } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useRef, useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import hombre from '../assets/imagenes/hombres.jpg'
import mujer from '../assets/imagenes/mujeres.jpg'
import mascotas from '../assets/imagenes/mascotas.jpg'
import peluquerias from '../assets/imagenes/peluquerias.jpg'
import { useMediaQuery } from "@chakra-ui/react";
import pintura from '../assets/imagenes/pintura.png'
import { Destacados } from "../components/Destacados";
import { Tabs } from "../components/Tabs";
import { Link } from "react-router-dom";
import { cities } from "../data/cities";
import { Buscador } from "../components/Buscador";
import flecha from '../assets/imagenes/flecha.png'





export const Inicio = () => {
    
  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 1000);

  console.log('se esta renderizando inicio')

  const inputRef = useRef();

  function handleInputChanges(e) {
    setInputValue(e.target.value);

    if (e.target.value.length >= 3) {
      setAutocompleteOptions(
        cities.filter(city =>
          city.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setAutocompleteOptions([]);
    }
  }

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

  const [estilistasSeleccionados, setEstilistasSeleccionados] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  // Función para agregar estilista seleccionado por el administrador
  const handleEstilistaSeleccionado = (estilista) => {
    setEstilistasSeleccionados((prevEstilistas) => [...prevEstilistas, estilista]);
  };

  const mockPeluqueros = [
    { id: 1, nombre: 'Peluquero 1', servicio: 'servicio1', mundo: 'mundo1', distrito: 'distrito1' },
    { id: 2, nombre: 'Peluquero 2', servicio: 'servicio2', mundo: 'mundo2', distrito: 'distrito2' },
    { id: 3, nombre: 'Peluquero 3', servicio: 'servicio1', mundo: 'mundo3', distrito: 'distrito3' },
    // Agrega más datos según sea necesario
  ];
  
  const YourComponent = () => {
    const [searchParams, setSearchParams] = useState({
      servicio: '',
      mundo: '',
      distrito: '',
    });
  
    const [peluquerosResult, setPeluquerosResult] = useState([]);
  
    const handleInputChange = (field, value) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [field]: value,
      }));
    };
  
    const handleSearchClick = () => {
      // Simulación de búsqueda de peluqueros
      const results = mockPeluqueros.filter((peluquero) => {
        return (
          (!searchParams.servicio || peluquero.servicio === searchParams.servicio) &&
          (!searchParams.mundo || peluquero.mundo === searchParams.mundo) &&
          (!searchParams.distrito || peluquero.distrito === searchParams.distrito)
        );
      });
  
      // Actualiza el estado con los resultados de la búsqueda
      setPeluquerosResult(results);
    };

    return (
      <Box  display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center' marginTop={isSmallerThan760 ? '60px' : '60px'} paddingLeft={isSmallerThan760 ? '60px' : '0px'} >
        
        <Buscador />
        
        
  
        {/* Resultados de la búsqueda */}
        {peluquerosResult.length > 0 && (
          <Box marginTop='20px'>
            <Heading fontSize='20px'>Resultados de la búsqueda</Heading>
            {/* Muestra los datos de los peluqueros encontrados */}
            {peluquerosResult.map((peluquero) => (
              <Box key={peluquero.id} marginTop='10px'>
                <p>{peluquero.nombre}</p>
                {/* Puedes mostrar más información del peluquero según tus necesidades */}
              </Box>
            ))}
          </Box>
        )}

      </Box>
      

    );
  };

    return(
      <>
        <Box>
            <Box bg='#161c26'   backgroundPosition='center' py={28} justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'  height={isSmallerThan760 ? '100%' : '700px'}>
               <Heading textAlign='center' fontSize={isSmallerThan760 ? '20px' : '70px'}color='#caa776' fontFamily="Sacramento, cursive">El mundo de la belleza digital</Heading> 
               <Heading textAlign='center'fontSize={isSmallerThan760 ? '40px' : '90px'}  fontWeight='bold'  textTransform='uppercase' color='white' ><b>BIENVENIDO A QURUX</b></Heading>
              <YourComponent /> {/* Renderiza el componente YourComponent */}
              <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' marginTop={isSmallerThan760 ? '40px' : '60px'}>
                <img src={flecha}></img>
              <Text width={isSmallerThan760 ? 'auto' : 'auto'} fontSize={isSmallerThan760 ? '40px' : '40px'} marginTop={isSmallerThan760 ? '0px' : '90px'} color='white' textAlign='center'fontFamily='Sacramento, cursive'  >Aqui  es donde la belleza y tu hacen match</Text>
              </Box>
             </Box>
             

          {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
          <Box marginTop='50px' >
            <Heading color='#caa776' fontSize='22px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
            <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
            <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
          {/* Sección de estilistas seleccionados */}
          </Box>
          <Destacados />

          

           <Container bg={`url(${peluquerias})`}  height='500px'  backgroundSize='cover' display='flex' justifyContent='center' alignItems='center' backgroundAttachment='fixed'
            fontSize='20px' backgroundPosition='center' position='relative' maxWidth='100%'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.6)'></Box>
            <Text  color='white' position='relative' fontSize={isSmallerThan760 ? '25px' : '60px'} width='70%' textAlign='center'>Explorar, comparar, reservar y pagar en linea.</Text>
           </Container>

           
          <Box marginTop='100px'>
             <Heading color='#caa776' fontSize='18px'  textAlign='center'>AROUND THE WORD</Heading>
             <Heading fontSize='40px' textAlign='center'><b>Mundos</b></Heading>
             <Text textAlign='center' fontSize='12px'><b>Loren ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum</b></Text>
           </Box>

           <Container margin='100px 0px ' display='flex'  gap= {isSmallerThan760 ? '10px' : '60px'}  justifyContent='center' maxW='100%'>
              <Link to='/mundohombres'>
                <Box  bg={`url(${hombre})`}
              backgroundPosition='center'
              width={isSmallerThan760 ? '530px' : '400px'}
              height={isSmallerThan760 ? '250px' : '400px'}
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='80px 0px 80px 0px'
              transition= 'all 0.5s ease 0s'
              _hover={{
                transform: 'scale(1.1)',
                borderRadius:'0px 80px 0px 80px'
              }}
                >
                <Box bg='white' px={10} pt={4} borderTopRadius={8} color='#161c26' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>HOMBRES</b></Box>

                </Box>
              </Link>

              <Link to='/mundomujeres'>
                <Box  bg={`url(${mujer})`}
              backgroundPosition='center'
              width={isSmallerThan760 ? '530px' : '400px'}
              height={isSmallerThan760 ? '250px' : '400px'}
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='80px 0px 80px 0px'
              transition= 'all 0.5s ease 0s'
              _hover={{
                transform: 'scale(1.1)',
                borderRadius:'0px 80px 0px 80px'
              }}
                >
                <Box bg='white' px={10} pt={4} borderTopRadius={8} color='#161c26' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>MUJERES</b></Box>

                </Box>
              </Link>

             <Link to='/mundomascotas'>
              <Box  bg={`url(${mascotas})`}
              backgroundPosition='center'
              width={isSmallerThan760 ? '530px' : '400px'}
              height={isSmallerThan760 ? '250px' : '400px'}
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='80px 0px 80px 0px'
              transition= 'all 0.5s ease 0s'
              _hover={{
                transform: 'scale(1.1)',
                borderRadius:'0px 80px 0px 80px'
              }}
              >
              <Box bg='white' px={10} pt={4} borderTopRadius={8} color='#161c26' paddingBottom='20px'><Heading color='#D4AF37' fontSize='13px' textAlign='center'><b>MUNDO</b></Heading><b>MASCOTAS</b></Box>

              </Box>
             </Link>
           </Container>

           <Box height='100%'  width='auto'> 
            <Box bg='#161c26'  height='750px'>
              <Box height='100px' paddingBottom='200px'>
              <Heading paddingTop= {isSmallerThan760 ? '90px' : '80px'}color='white' textAlign='center' fontSize={isSmallerThan760 ? '30px' : '40px'} >COMO FUNCIONA QURUX</Heading><Text color='white' textAlign='center' fontSize={isSmallerThan760 ? '20px' : '20px'}>Lorem ipsum dolor amet, cibo mundi ea duo, vim exerci phaedrum</Text>
              </Box>
              
             <Container
              display='flex'
              alignItems='center'
              height="100vh"
              left="25%"
              maxW='auto'
              justifyContent='center'
              marginTop={isSmallerThan760 ? '0px' : '100px'}
              background={`radial-gradient(circle at 5% 5%, red 80px, transparent 3px), radial-gradient(circle at 15% 15%, red 40px, transparent 3px), #161c26`}
              >
              
                <iframe
                width={isSmallerThan760 ? '90%' : '70%'}
                height={isSmallerThan760 ? '400px' : '600px'} 
                src="https://www.youtube.com/embed/dsLjyLn859g?si=yPE3byugBzpWs2dO"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
              </Container>
              </Box>

              <Box  width='100%' display={isSmallerThan760 ? 'column-revers' : 'flex'} justifyContent='center' gap={isSmallerThan760 ? '30px' : '30px'}  height='900px' alignItems='center' paddingTop={{base: '200px', md: '0'}}  background={`radial-gradient(circle at 95% 5%, red 80px, transparent 3px), radial-gradient(circle at 85% 15%, red 40px, transparent 3px), white`}>
              <Box  _hover={{transform: 'scale(1.1)',}} justifyContent='center' display='flex' flexDirection='column' alignItems='center' width='100%'  height={isSmallerThan760 ? 'auto' : '400px'} marginTop={isSmallerThan760 ? '20px' : '25px'}><MdTouchApp fontSize={isSmallerThan760 ? '40px' : '70px'} color={isSmallerThan760 ? '#B69132' : '#caa776'}></MdTouchApp><Heading marginTop='20px'fontSize={isSmallerThan760 ? '12px' : '14px'} textAlign='center' color='#161c26'>Elige la categoria del servicio</Heading><Text fontSize={isSmallerThan760 ? '10px' : '12px'}  textAlign='center' color='#161c26' paddingTop={isSmallerThan760 ? '0px' : '30px'} >Mascotas<br/>Mujeres<br/>Hombres<br/></Text></Box>
              <Box _hover={{transform: 'scale(1.1)',}} display='flex' justifyContent='center'flexDirection='column' alignItems='center' width='100%'  height={isSmallerThan760 ? 'auto' : '400px'} marginTop={isSmallerThan760 ? '50px' : '25px'}><LuLassoSelect  fontSize={isSmallerThan760 ? '40px' : '70px'} color={isSmallerThan760 ? '#B69132' : '#caa776'}></LuLassoSelect><Heading marginTop='20px' fontSize={isSmallerThan760 ? '12px' : '14px'} textAlign='center'color='#161c26'   >Selecciona los servicios deseados</Heading><Text fontSize={isSmallerThan760 ? '10px' : '12px'} textAlign='center' color='#161c26'  paddingTop={isSmallerThan760 ? '0px' : '40px'}>Escoge la ubicacion del servicio<br/>Puedes escoger mas de uno </Text></Box>
              <Box _hover={{transform: 'scale(1.1)',}}display='flex' justifyContent='center' flexDirection='column' alignItems='center' width='100%'  height={isSmallerThan760 ? 'auto' : '400px'} marginTop={isSmallerThan760 ? '50px' : '35px'}><FaMapMarkerAlt  fontSize={isSmallerThan760 ? '40px' : '70px'} color={isSmallerThan760 ? '#B69132' : '#caa776'}></FaMapMarkerAlt ><Heading marginTop='20px' fontSize={isSmallerThan760 ? '12px' : '14px'} textAlign='center'color='#161c26' >Escoge la ubicacion del servicio</Heading><Text fontSize={isSmallerThan760 ? '10px' : '12px'} textAlign='center' color='#161c26'  paddingTop={isSmallerThan760 ? '0px' : '45px'}>Local o domicilio tu especilista debera ser del mismo distrito</Text></Box>
              <Box _hover={{transform: 'scale(1.1)',}}display='flex'justifyContent='center' flexDirection='column' alignItems='center' width='100%'  height={isSmallerThan760 ? 'auto' : '400px'} marginTop={isSmallerThan760 ? '50px' : '25px'}><LuLassoSelect  fontSize={isSmallerThan760 ? '40px' : '70px'} color={isSmallerThan760 ? '#B69132' : '#caa776'}></LuLassoSelect><Heading marginTop='20px' fontSize={isSmallerThan760 ? '12px' : '14px'} textAlign='center' color='#161c26'>Selecciona la fecha y la hora deseada</Heading><Text fontSize={isSmallerThan760 ? '10px' : '12px'} textAlign='center' color='#161c26'  paddingTop={isSmallerThan760 ? '0px' : '40px'}>para disfrutar del servicio y realiza el pago correspondiente</Text></Box>
              </Box> 

           </Box>
         
           
       </Box>

       
     </>
    
    )
    
}