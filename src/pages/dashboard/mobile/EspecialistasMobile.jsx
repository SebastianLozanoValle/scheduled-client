import { Box, Input, Text, IconButton, Flex } from "@chakra-ui/react"
import { useState } from 'react';
import { Especialista } from "../../../components/Especialista";
import { RiAddLine } from "react-icons/ri";

export const EspecialistasMobile = ({ especialistas }) => {
    const [search, setSearch] = useState('');

    const filteredEspecialistas = especialistas.filter(especialista =>
        especialista.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box color='black' minH="calc(100vh - 108px)" pb='64px'>
            <Flex gap={2}>
                <Input
                    color='white'
                    placeholder="Buscar especialista" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    mb={4}
                />
                <IconButton colorScheme="green" aria-label="Agregar" icon={<RiAddLine />} 
                    // onClick={/* función para agregar */}
                />
            </Flex>
            {search.length < 3 ? especialistas.map((especialista) => (
                // Renderizado normal
                <Especialista especialista={especialista} />
            )) : filteredEspecialistas.length > 0 ? filteredEspecialistas.map((especialista) => (
                // Renderizado de búsqueda
                <Especialista especialista={especialista} />
            )) : <Text color='white'>No se ha encontrado ninguna coincidencia con "{search}"</Text>}
        </Box>
    )
}