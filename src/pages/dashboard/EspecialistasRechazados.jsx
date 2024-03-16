import { Box, Input, Text, IconButton, Flex, Center } from "@chakra-ui/react"
import { useState } from 'react';
import { Especialista } from "../../components/Especialista";
import { RiAddLine } from "react-icons/ri";
import { gql, useQuery } from "@apollo/client";
import { CustomCard } from "../../components/CustomCard";
import { SpecialistForm } from "../../components/SpecialistForm";
import '../.././index.css';
import { GET_SPECIALISTS } from "./Especialistas";
import { CardSpecialist } from "../../components/CardSpecialist";

export const EspecialistasRechazados = ({ isMobile }) => {

    const { loading, error, data } = useQuery(GET_SPECIALISTS);

    if (error) console.log(error);

    const especialistas = data?.findSpecialists || [];

    console.log(especialistas);
    
    const especialistasAprobados = especialistas.filter(especialista => especialista.active === false);
    const especialistasRechazados = especialistas.filter(especialista => especialista.reject === true);


    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredEspecialistas = especialistas.filter(especialista =>
        especialista.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box p={6} bg="white" w="100vw" color="black" mx="auto">
            <Box ml={{ base: '', md: '265px' }} color='black' minH="calc(100vh - 108px)" pb={{ base: '64px', md: '0' }}>
                <Flex gap={2}>
                    <Input
                        placeholder="Buscar especialista"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        mb={4}
                    />
                    <IconButton colorScheme="green" aria-label="Agregar" icon={<RiAddLine />}
                        onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded"
                    />
                </Flex>
                <SpecialistForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                {
                    search.length < 3 ? especialistasRechazados.map((especialista) => (
                        // Renderizado normal
                        <Center key={especialista.id} mt={20}>
                            <CardSpecialist especialista={especialista} />
                        </Center>
                    )) : especialistasRechazados.length > 0 ? filteredEspecialistas.map((especialista) => (
                        // Renderizado de búsqueda
                        <Center key={especialista.id} mt={20}>
                            <CardSpecialist especialista={especialista} />
                        </Center>
                    )) : <Text>No se ha encontrado ninguna coincidencia con "{search}"</Text>
                }
            </Box>
        </Box>
    );
};
