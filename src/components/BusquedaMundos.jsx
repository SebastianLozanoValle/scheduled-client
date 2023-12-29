import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { Buscador } from "./Buscador";

export const BusquedaMundos = () => {

  const handleSearchData = (searchData) => {
    console.log(searchData);
  };

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

    return (
      <Box  display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center' marginTop={isSmallerThan760 ? '10px' : '60px'} >
        
        <Box h='auto' width= {isSmallerThan760 ? '100%' : '90%'}  display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center'  padding='10px'boxShadow='2px 20px 20px rgba(0, 0, 0, 0.9)' marginTop= {isSmallerThan760 ? '30px' : '90px'}>
          
          
          <Buscador onSearch={handleSearchData} />
           {/* mirar onClick={handleSearchClick} */}
         </Box>
  
        
        
  
        {/* Resultados de la búsqueda */}
        {/* {peluquerosResult.length > 0 && (
          <Box marginTop='20px'>
            <Heading fontSize='20px'>Resultados de la búsqueda</Heading>
            {peluquerosResult.map((peluquero) => (
              <Box key={peluquero.id} marginTop='10px'>
                <p>{peluquero.nombre}</p>
              </Box>
            ))}
          </Box>
        )} */}

      </Box>
      

    );
  };