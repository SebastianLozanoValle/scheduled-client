import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { Buscador } from "./Buscador";

export const BusquedaMundos = ({ onSearch, tabs }) => {

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');

  return (
    <Box display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center' position='relative'>

      <Box top={-10} position='inherit' h='auto' width='auto' display={isSmallerThan760 ? 'column' : 'flex'} justifyContent='center' padding='10px' boxShadow='2px 20px 20px rgba(0, 0, 0, 0.9)'>


        <Buscador onSearch={onSearch} tabs={tabs} />
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