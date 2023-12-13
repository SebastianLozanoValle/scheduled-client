import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import barbero1 from '../assets/imagenes/barbero1.jpg'
import React, { useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import maquillaje from '../assets/imagenes/maquillaje.png'
import { useMediaQuery } from "@chakra-ui/react";

 

const StyledDatePicker = styled(DatePicker)`
  background: white;
  width: auto;
  height: 40px
  /* Otros estilos personalizados */
`;

export const Mundomujeres = () => {
  const [isSmallerThan760] = useMediaQuery('(max-width: 720px)');

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
          (!searchParams.Tipodeservicio || peluquero.Tipodeservicio === searchParams.Tipodeservicio) &&
          (!searchParams.fecha || peluquero.fecha=== searchParams.fecha)
        );
      });
  
      // Actualiza el estado con los resultados de la búsqueda
      setPeluquerosResult(results);
    };
    return (
      <Box  display='flex' justifyContent='center' marginTop='60px'>
        
        <Box width='800px' display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center' gap='20px'>
          
          
          <Select
            background='white' width='auto'
            placeholder='Selecciona Servicio'
            value={searchParams.servicio}
            onChange={(e) => handleInputChange('servicio', e.target.value)}
          >
            {/* Opciones para Servicio 1 */}
            {/* Puedes agregar opciones dinámicamente según tus necesidades */}
            <option value='servicio1'>peluqueria</option>
            <option value='servicio2'>barberia</option>
            <option value='servicio3'>manicure</option>
          </Select>
  
          <Select background='white' width='auto'
            placeholder='Tipodeservicio'
            value={searchParams.mundo}
            onChange={(e) => handleInputChange('mundo', e.target.value)}

          ><option value='Tipodeservicio'>dimicilio</option>
          <option value='Tipodeservicio'>tienda</option>
  
          </Select>
  
          


          <StyledDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Selecciona una fecha"
         />

           

           <a href='ListaE'><Button
           display='flex'
           justifyContent='center'
        
           /*mirar onClick={handleSearchClick}*/
           >
           Buscar 
           </Button></a>
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
          <Box bg={`url(${maquillaje})`}   backgroundPosition='center'  position='relative' height='400px' justifyContent='center' width='auto' backgroundRepeat='no-repeat' backgroundSize='cover'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.3)'></Box>
            <Box  position='relative' display='flex' paddingTop='40px' gap={isSmallerThan760 ? '3px' : '30px'}  paddingLeft={isSmallerThan760 ? '2px' : '60px'} color='#B69132'>
              <Box width='150px'><a href='Mundohombres'><Heading fontSize={isSmallerThan760 ? '12px' : 'xl'} color={isSmallerThan760 ? 'white' : '#B69132'} fontFamily='wraper' textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width:'150px'}} >Mundo hombres</Heading></a></Box>
              <Box width='140px'><a href='Mundomujeres'><Heading fontSize={isSmallerThan760 ? '12px' : 'xl'} color={isSmallerThan760 ? 'white' : '#B69132'} fontFamily='wraper' textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width: '150px' }} >Mundo mujeres</Heading></a></Box>
              <Box width='150px'><a href='Mundomascotas'><Heading fontSize={isSmallerThan760 ? '12px' : 'xl'} color={isSmallerThan760 ? 'white' : '#B69132'} fontFamily='wraper' textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width: '150px' }}>Mundo mascotas</Heading></a></Box>
              </Box>

              <Box display='flex' justifyContent='center' alignItems='end' height='300px'>
                <Box position='relative'>
                  <Heading textAlign='center' color='white'><b>Mundo mujeres</b></Heading>
                  <a href='/'><Text position='relative' textAlign='center' fontSize='15px' color='white'>inicio</Text></a>
               </Box>
              </Box>

          </Box>
          <Box height='200px'>
          <YourComponent /> {/* Renderiza el componente YourComponent */}
          </Box>

          {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
          <Box bg='gray' height='500px'marginTop='50px' >
            <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
            <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
            <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
           {/* Sección de estilistas seleccionados */}
            {estilistasSeleccionados.length > 0 && (
             <Box> 
            <EstilistasSeleccionados estilistas={estilistasSeleccionados} />
            </Box>
             )}
             </Box>
       </Box>
     </>
 
 )

}
