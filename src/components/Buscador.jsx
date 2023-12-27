import { useState, useRef } from 'react';
import { Box, Select, Button, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cities } from '../data/cities';
import { tabs } from '../data/tabs';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

export const Buscador = () => {
    const isHome = window.location.pathname === '/';
    const StyledDatePicker = styled(ReactDatePicker)`
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
  const inputRef = useRef();

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Aquí puedes realizar cualquier acción necesaria con la fecha seleccionada
    setSelectedDate(date);
  }
  const [inputValue, setInputValue] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [searchParams, setSearchParams] = useState({
    servicio: '',
    mundo: '',
    distrito: '',
  });

  function handleInputChanges(e) {
    const inputValue = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setInputValue(inputValue);
  
    if (inputValue.length >= 3) {
      setAutocompleteOptions(
        cities.filter(city =>
          city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue.toLowerCase())
        )
      );
    } else {
      setAutocompleteOptions([]);
    }
  }

  const handleInputChange = (field, value) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: value,
    }));
  };

  return (
    <Box width='100%' display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center'>
      <Select
        boxShadow='20px'
        background='white' width={isSmallerThan760 ? '90%' : '330px'}
        height={isSmallerThan760 ? '80px' : '70px'}
        placeholder=' Servicio'
        fontSize='16px'
        value={searchParams.servicio}
        onChange={(e) => handleInputChange('servicio', e.target.value)}
        borderRadius={isSmallerThan760 ? '10px' : '0px'} 
      >
        {
            tabs?.map((tab, index) => (
                <option key={index} value={tab}>{tab}</option>
            ))
        }
      </Select>

      {
        isHome? 
        <Select background='white' width={isSmallerThan760 ? '90%' : '330px'}
            boxShadow='20px'
            height={isSmallerThan760 ? '80px' : '70px'}
            marginTop={isSmallerThan760 ? '10px' : '0px'} 
            placeholder='Ingrese Mundo'
            fontSize='16px'
            value={searchParams.mundo}
            onChange={(e) => handleInputChange('mundo', e.target.value)}
            borderRadius={isSmallerThan760 ? '10px' : '0px'} 
        >
            <option value='Mundohombres'>Mundohombres</option>
            <option value='Mundomujeres'>Mundomujeres</option>
            <option value='Mundomascotas'>Mundomascotas</option>
        </Select> :
        <StyledDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Selecciona una fecha"
            display='flex'
            alignItems='center'

        
         />
      }
      

      <div className="relative shadow-[20px]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChanges}
          placeholder="Ingrese Distrito"
          className={`bg-white  ${isSmallerThan760 ? 'h-20' : 'h-full'}   px-3 py-2 text-sm placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none`}
        />
        {autocompleteOptions.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {autocompleteOptions.map(option => (
              <div
                key={option}
                onClick={() => {
                  setInputValue(option);
                  setAutocompleteOptions([]);
                  handleInputChange('distrito', option);
                  setTimeout(() => inputRef.current.focus(), 0);
                }}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to='especialistas'>
        <Button
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
          <b>Search</b>
        </Button>
      </Link>
    </Box>  
  );
};