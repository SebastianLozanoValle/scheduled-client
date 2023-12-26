import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import vino from '../assets/imagenes/sirviendo.jpg'
import { MdTouchApp } from "react-icons/md";
import blancoynegro from'../assets/imagenes/blancoynegro.jpg'
import { LuLassoSelect } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from 'react';
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





export const Inicio = () => {
  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

  const [estilistasSeleccionados, setEstilistasSeleccionados] = useState([]);

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
        
        <Box width='100%' display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center'>
          
          
          <Select
            background='white' width={isSmallerThan760 ? '90%' : '330px'}
            height={isSmallerThan760 ? '80px' : '70px'}
            placeholder=' Servicio'
            fontSize='16px'
            value={searchParams.servicio}
            onChange={(e) => handleInputChange('servicio', e.target.value)}
            borderEndRadius={0}
          >
             {/* Opciones para Servicio 1 */}
            {/* Puedes agregar opciones dinámicamente según tus necesidades */}
            <option value='servicio1'>Servicio 1</option>
            <option value='servicio2'>Servicio 2</option>KK
            <option value='servicio3'>Servicio 3</option>
          </Select>
  
          <Select background='white' width={isSmallerThan760 ? '90%' : '330px'}
           height={isSmallerThan760 ? '80px' : '70px'}
           marginTop={isSmallerThan760 ? '10px' : '0px'} 
           placeholder='Ingrese Mundo'
           fontSize='12px'
            value={searchParams.mundo}
            onChange={(e) => handleInputChange('mundo', e.target.value)}
            borderRadius={0}

          ><option value='Mundohombres'>Mundohombres</option>
          <option value='Mundomujeres'>Mundomuejres</option>
          <option value='Mundomascotas'>Mundomascotas</option>
          </Select>
  
          <Input
           background='white' width={isSmallerThan760 ? '90%' : '330px'}
           height={isSmallerThan760 ? '80px' : '70px'}
           marginTop={isSmallerThan760 ? '10px' : '0px'} 
           fontSize='12px'
            placeholder='Ingrese Distrito'
            value={searchParams.distrito}
            onChange={(e) => handleInputChange('distrito', e.target.value)}
            borderStartRadius={0}
          />

           <Link to='especilistas'><Button
           display='flex'
           justifyContent='center'
           bg='#d3983f'
           color='white'
           fontSize='20px'
           marginTop={isSmallerThan760 ? '10px' : '0px'} 
           width={isSmallerThan760 ? '160px' : '150px'}
           height={isSmallerThan760 ? '60px' : '70px'}
           marginLeft={isSmallerThan760 ? '0px' : '8px'} 
           
         
          
           >
           <b>Searh</b>
           </Button></Link>
        </Box>  
        
        
  
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
            <Box bg='#161c26'   backgroundPosition='center' py={28} justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover' >
               <Heading textAlign='center' fontSize={isSmallerThan760 ? '30px' : '50px'}color='#caa776' fontFamily="Tangerine, cursive">El mundo de la belleza digital</Heading> 
               <Heading textAlign='center'fontSize={isSmallerThan760 ? '40px' : '70px'} color='white' ><b>BIENVENIDO A QURUX</b></Heading>
              <YourComponent /> {/* Renderiza el componente YourComponent */}
              
             </Box>
             <div className="container w-4/5">
              <Tabs />
             </div>


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
                borderRadius='0px 20px 0px 20px'>
                <Box bg='white' px={10} pt={4} borderTopRadius={8} color='black' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>HOMBRES</b></Box>

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
                borderRadius='20px 0px 20px 0px'>
                <Box bg='white' px={10} pt={4} borderTopRadius={8} color='black' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>MUJERES</b></Box>

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
              borderRadius='20px 0px 20px 0px'>
              <Box bg='white' px={10} pt={4} borderTopRadius={8} color='black' paddingBottom='20px'><Heading color='#D4AF37' fontSize='13px' textAlign='center'><b>MUNDO</b></Heading><b>MASCOTAS</b></Box>

              </Box>
             </Link>
           </Container>

           <Container bg={`url(${peluquerias})`}  height='500px'  backgroundSize='cover' display='flex' justifyContent='center' alignItems='center' backgroundAttachment='fixed'
            fontSize='20px' backgroundPosition='center' position='relative' maxWidth='100%'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.6)'></Box>
            <Text  color='white' position='relative' fontSize={isSmallerThan760 ? '25px' : '60px'} width='100%' textAlign='center'>Explorar, comparar, reservar y pagar en linea.</Text>
           </Container>

           {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
          <Box marginTop='50px' >
            <Heading color='#caa776' fontSize='22px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
            <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
            <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
          {/* Sección de estilistas seleccionados */}
          </Box>
          <Destacados />


           <Box bg='#161c26'  height='100%'  width='auto'> 
              <Box height='100px' paddingBottom='300px'>
              <Heading paddingTop= {isSmallerThan760 ? '90px' : '80px'}color='white' textAlign='center' fontSize={isSmallerThan760 ? '30px' : '60px'} >COMO FUNCIONA QURUX</Heading><Text color='white' textAlign='center' fontSize={isSmallerThan760 ? '20px' : '20px'}>Lorem ipsum dolor amet, cibo mundi ea duo, vim exerci phaedrum</Text>
              </Box>
             <Container
              display='flex'
              alignItems='center'
              height="100vh"
              left="25%"
              maxW='auto'
              justifyContent='center'>
              
                <iframe
                width={isSmallerThan760 ? '90%' : '90%'}
                height='600px'
                src="https://www.youtube.com/embed/dsLjyLn859g?si=yPE3byugBzpWs2dO"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
              </Container>
              <Box  bg='white' width='100%' display={isSmallerThan760 ? 'column-revers' : 'flex'} justifyContent='center' gap={isSmallerThan760 ? '30px' : '90px'}  height='600px' alignItems='center' paddingTop={{base: '100px', md: '0'}}>
              <Box display='flex' flexDirection='column' alignItems='center' width='auto'  height='auto' marginTop={isSmallerThan760 ? '20px' : '25px'}><MdTouchApp fontSize={isSmallerThan760 ? '30px' : '40px'} color={isSmallerThan760 ? '#B69132' : 'black'}></MdTouchApp><Heading marginTop='20px'fontSize={isSmallerThan760 ? '10px' : '14px'} textAlign='center' color='black'>Elige el mundo del servicio</Heading><Text fontSize={isSmallerThan760 ? '9px' : '10px'}  textAlign='center' color='black' marginTop={isSmallerThan760 ? '0px' : '20px'} >Mascotas,Mujeres,Hombres</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='auto'  height='auto' marginTop={isSmallerThan760 ? '20px' : '25px'}><LuLassoSelect  fontSize={isSmallerThan760 ? '30px' : '40px'} color={isSmallerThan760 ? '#B69132' : 'black'}></LuLassoSelect><Heading marginTop='20px' fontSize={isSmallerThan760 ? '10px' : '14px'} textAlign='center'color='black' >Selecciona los servicios deseados</Heading><Text fontSize={isSmallerThan760 ? '9px' : '10px'} textAlign='center' color='black'  marginTop={isSmallerThan760 ? '0px' : '20px'}>Puedes escoger mas de uno</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='auto'  height='auto' marginTop={isSmallerThan760 ? '20px' : '35px'}><FaMapMarkerAlt  fontSize={isSmallerThan760 ? '30px' : '40px'} color={isSmallerThan760 ? '#B69132' : 'black'}></FaMapMarkerAlt ><Heading marginTop='20px' fontSize={isSmallerThan760 ? '10px' : '14px'} textAlign='center'color='black' >Escoge la ubicacion del servicio</Heading><Text fontSize={isSmallerThan760 ? '9px' : '10px'} textAlign='center' color='black'  marginTop={isSmallerThan760 ? '0px' : '20px'}>si es adomicilio tu especilista debera ser del mismo distrito</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='auto'  height='auto' marginTop={isSmallerThan760 ? '20px' : '25px'}><LuLassoSelect  fontSize={isSmallerThan760 ? '30px' : '40px'} color={isSmallerThan760 ? '#B69132' : 'black'}></LuLassoSelect><Heading marginTop='20px' fontSize={isSmallerThan760 ? '10px' : '14px'} textAlign='center' color='black'>Selecciona los servicios deseados</Heading><Text fontSize={isSmallerThan760 ? '9px' : '10px'} textAlign='center' color='black'  marginTop={isSmallerThan760 ? '0px' : '20px'}>Puedes escoger mas de uno</Text></Box>
              </Box> 
           </Box>
         
           
       </Box>

       
     </>
    
    )
    
}