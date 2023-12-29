import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import barbero1 from '../assets/imagenes/barbero1.jpg'
import React, { useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import maquillaje from '../assets/imagenes/maquillaje.png'
import { useMediaQuery } from "@chakra-ui/react";
import peluqueriamujer from '../assets/imagenes/peluqueriamujer.jpeg'
import maquillandomujer from '../assets/imagenes/maquillandomujer.jpeg'
import spamujer from '../assets/imagenes/spamujer.jpeg'
import { BusquedaMundos } from "../components/BusquedaMundos";
import { Destacados } from "../components/Destacados";


 


const StyledDatePicker = styled(DatePicker)`
background: white;
width: auto;
height: 70px;
border: 1px solid black; /* Agrega el borde sólido negro */
display: flex; /* Asegúrate de que el contenido se alinee correctamente */
align-items: center; /* Centra verticalmente el contenido */
padding: 0 10px; /* Añade un espacio interno para el contenido */
border-radius: 0px 10px 10px 0px;

@media (max-width: 768px) {
  width:555px; 
  height: 50px;
  border-radius:20px
`;

export const Mundomujeres = () => {
    
  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 5);

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Aquí puedes realizar cualquier acción necesaria con la fecha seleccionada
    setSelectedDate(date);
  }
  
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

  
  return(

     <>
       <Box>
          <Box bg={`url(${maquillaje})`}   backgroundPosition='center'  position='relative' height='500px' justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
          <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.7)'></Box>
            

              <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
                <Box position='relative'marginTop='150px' >
                  <Heading textAlign='center' color='white' fontSize={isSmallerThan760 ? '50px' : '60px'} ><b>Mundo mujeres</b></Heading>
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
          <Box height='500px'marginTop='100px' mb={20} >
            <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
            <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
            <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
           {/* Sección de estilistas seleccionados */}
            {estilistasSeleccionados.length > 0 && (
             <Box> 
            <EstilistasSeleccionados estilistas={estilistasSeleccionados} />
            </Box>
             )}
             <Destacados />
             </Box>
       </Box>
     </>
 
 )

}
