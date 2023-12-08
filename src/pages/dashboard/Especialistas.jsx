// import { Box } from "@chakra-ui/react";
// import { EspecialistasDesktop } from "./desktop/EspecialistasDesktop";
// import { EspecialistasMobile } from "./mobile/EspecialistasMobile";
import { Box, Input, Text, IconButton, Flex } from "@chakra-ui/react"
import { useState } from 'react';
import { Especialista } from "../../components/Especialista";
import { RiAddLine } from "react-icons/ri";

const especialistas = [
    {
        nombre: "rodrigo",
        edad: 30,
        sexo: "Femenino",
        ciudad: "Ciudad 1",
        especialidades: ["Especialidad 1", "Especialidad 2", "Especialidad 3"],
        horarios: {
            lunes: ["9:00 AM - 5:00 PM"],
            martes: ["9:00 AM - 5:00 PM"],
            miercoles: ["9:00 AM - 5:00 PM"],
            jueves: ["9:00 AM - 5:00 PM"],
            viernes: ["9:00 AM - 5:00 PM"],
            sabado: ["10:00 AM - 2:00 PM"],
            domingo: ["10:00 AM - 2:00 PM"],
        },
        citas: [
        ],
    },
    {
        nombre: "andres",
        edad: 35,
        sexo: "Masculino",
        ciudad: "Ciudad 2",
        especialidades: ["Especialidad 4", "Especialidad 5"],
        horarios: {
            lunes: ["8:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
            martes: ["8:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
            miercoles: ["8:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
            jueves: ["8:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
            viernes: ["8:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
            sabado: ["9:00 AM - 1:00 PM"],
            domingo: ["9:00 AM - 1:00 PM"],
        },
        citas: [
            {
                cliente: "Cliente 2",
                horaInicio: "8:00 AM",
                horaFin: "8:45 AM",
            },
            {
                cliente: "Cliente 3",
                horaInicio: "2:00 PM",
                horaFin: "2:45 PM",
            },
        ],
    },
    {
        nombre: "juan",
        edad: 40,
        sexo: "Femenino",
        ciudad: "Ciudad 3",
        especialidades: ["Especialidad 6", "Especialidad 7", "Especialidad 8"],
        horarios: {
            lunes: ["9:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
            martes: ["9:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
            miercoles: ["9:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
            jueves: ["9:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
            viernes: ["9:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
            sabado: ["10:00 AM - 12:00 PM"],
            domingo: ["10:00 AM - 12:00 PM"],
        },
        citas: [
            {
                cliente: "Cliente 4",
                horaInicio: "9:00 AM",
                horaFin: "9:45 AM",
            },
            {
                cliente: "Cliente 5",
                horaInicio: "3:00 PM",
                horaFin: "3:45 PM",
            },
        ],
    },
    {
        nombre: "andrea",
        edad: 45,
        sexo: "Masculino",
        ciudad: "Ciudad 4",
        especialidades: ["Especialidad 9", "Especialidad 10", "Especialidad 11"],
        horarios: {
            lunes: ["8:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
            martes: ["8:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
            miercoles: ["8:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
            jueves: ["8:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
            viernes: ["8:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
            sabado: ["9:00 AM - 1:00 PM"],
            domingo: ["9:00 AM - 1:00 PM"],
        },
        citas: [
            {
                cliente: "Cliente 6",
                horaInicio: "8:00 AM",
                horaFin: "8:45 AM",
            },
            {
                cliente: "Cliente 7",
                horaInicio: "2:00 PM",
                horaFin: "2:45 PM",
            },
        ],
    },
    {
        nombre: "felipe",
        edad: 50,
        sexo: "Femenino",
        ciudad: "Ciudad 5",
        especialidades: ["Especialidad 12", "Especialidad 13"],
        horarios: {
            lunes: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
            martes: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
            miercoles: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
            jueves: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
            viernes: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
            sabado: ["10:00 AM - 12:00 PM"],
            domingo: ["10:00 AM - 12:00 PM"],
        },
        citas: [
            {
                cliente: "Cliente 8",
                horaInicio: "9:00 AM",
                horaFin: "9:45 AM",
            },
            {
                cliente: "Cliente 9",
                horaInicio: "2:00 PM",
                horaFin: "2:45 PM",
            },
        ],
    },
];

export const Especialistas = ({ isMobile }) => {
    const [search, setSearch] = useState('');

    const filteredEspecialistas = especialistas.filter(especialista =>
        especialista.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box p={6} bg="black" w="100vw" color="white" mx="auto">
            {/* {isMobile ? (
                <EspecialistasMobile especialistas={especialistas} />
            ) : (
                <EspecialistasDesktop especialistas={especialistas} />
            )} */}
            <Box ml={{base:'' ,md: '265px' }} color='black' minH="calc(100vh - 108px)" pb={{base:'64px' ,md: '0' }}>
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
        </Box>
    );
};
