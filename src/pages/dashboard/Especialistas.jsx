import { Box } from "@chakra-ui/react";
import { EspecialistasDesktop } from "./desktop/EspecialistasDesktop";

const especialistas = [
    {
        nombre: "Especialista 1",
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
            {
                cliente: "Cliente 1",
                horaInicio: "9:00 AM",
                horaFin: "9:45 AM",
            },
        ],
    },
    {
        nombre: "Especialista 2",
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
        nombre: "Especialista 3",
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
        nombre: "Especialista 4",
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
        nombre: "Especialista 5",
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
    return (
        <Box p={6} bg="black" w="100vw" color="white" mx="auto">
            {isMobile ? (
                <h1>General Mobile</h1>
            ) : (
                <EspecialistasDesktop especialistas={especialistas} />
            )}
        </Box>
    );
};
