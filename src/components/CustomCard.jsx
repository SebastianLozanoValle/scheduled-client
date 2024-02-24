import { useState } from 'react';
import { Accordion, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { RiMore2Line, RiStarLine, RiStarSFill, RiDiscussLine, RiShareForwardLine, RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { CustomAccordionItem } from "./CustomAccordionItem";
import { gql, useMutation } from "@apollo/client";
import { GET_SPECIALISTS } from "../pages/dashboard/Especialistas";
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { EditSpecialistForm } from './EditSpecialistForm';
import { color } from 'framer-motion';

const DELETE_SPECIALIST = gql`
    mutation deleteSpecialist($id: ID!) {
        deleteSpecialist(id: $id) {
            id
            username
        }
    }
`;

const TOGGLE_SPECIALIST_HIGHLIGHT = gql`
    mutation toggleSpecialistHighlight($id: ID!) {
        toggleSpecialistHighlight(id: $id) {
            id
            username
            highlighted
        }
    }
`;

const TOGGLE_SPECIALIST_ACTIVE = gql`
    mutation toggleSpecialistActive($id: ID!) {
        toggleSpecialistActive(id: $id) {
            id
            username
            highlighted
            active
        }
    }
`;

export const CustomCard = ({ especialista }) => {
    const [deleteSpecialist] = useMutation(DELETE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALISTS }] });
    const [toggleSpecialistHighlight] = useMutation(TOGGLE_SPECIALIST_HIGHLIGHT,
        { refetchQueries: [{ query: GET_SPECIALISTS }] });
    const [toggleSpecialistActive] = useMutation(TOGGLE_SPECIALIST_ACTIVE,
        { refetchQueries: [{ query: GET_SPECIALISTS }] });

    const handleToggleHighlight = async () => {
        try {
            console.log('Toggling highlight...');
            const { data } = await toggleSpecialistHighlight({
                variables: {
                    id: especialista.id
                }
            });
        } catch (error) {
            console.log(error);
        }
        console.log('Toggled highlight');
    };
    const handleToggleActive = async () => {
        try {
            console.log('Toggling active...');
            console.log('especialista:', especialista.active);
            const { data } = await toggleSpecialistActive({
                variables: {
                    id: especialista.id
                }
            });
        } catch (error) {
            console.log(error);
        }
        console.log('Toggled active');
        console.log('especialista:', especialista.active);
    };
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        console.log('Opening form...');
        setIsFormOpen(true);
        console.log('isFormOpen:', isFormOpen);
    };

    const handleCloseForm = () => {
        console.log('Closing form...');
        setIsFormOpen(false);
        console.log('isFormOpen:', isFormOpen);
    };

    console.log('Rendering CustomCard. isFormOpen:', isFormOpen);

    const profilePicture = especialista.files.find((file) => {
        return file.tipo === 'profilePic';
    });
    const profilePictureUrl = "http://localhost:33402/files/" + profilePicture.filename;
    console.log('profilePIcture:', profilePicture.filename);

    console.log('especialista:', especialista.files.length)

    return (
        <>
            <Card maxW='md' boxShadow='xl'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar bg='brand.primary' name='Sasuke Uchiha' src={profilePictureUrl} />

                            <Box>
                                <Heading size='sm'>{especialista.username}</Heading>
                                <Text>{especialista.role}</Text>
                            </Box>
                        </Flex>
                        <IconButton
                            aria-label='See menu'
                            icon={<RiMore2Line />}
                        />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Accordion allowToggle>
                        <CustomAccordionItem title="Información Personal">
                            <Text>Edad: {especialista.age}</Text>
                            <Text>Sexo: {especialista.gender}</Text>
                            <Text>Ciudad: {especialista.city}</Text>
                            <Text>Calle: {especialista.street}</Text>
                        </CustomAccordionItem>
                        <CustomAccordionItem title="Especialidades">
                            <Text fontWeight={'bold'}>Mundo {especialista.world}</Text>
                            {especialista.specialtys.map((especialidad, index) => (
                                <Text key={`${especialista.id}${index}`}>{especialidad}</Text>
                            ))}
                        </CustomAccordionItem>
                        <CustomAccordionItem title="Horario de Atención">
                            <VStack align="start" spacing={2} mb={4} overflowY='auto' height='200px'>
                                {Object.keys(especialista.weeklySchedule).map((dia, indexDia) => {
                                    const horas = especialista.weeklySchedule[dia];
                                    if (typeof dia === 'string' && dia === '__typename') {
                                        return null;  // No renderizar nada si dia es '__typename'
                                    }
                                    return (
                                        especialista.weeklySchedule[dia].length ? (
                                            <Box key={indexDia}>
                                                <Text fontWeight="bold">{dia}</Text>
                                                {especialista.weeklySchedule[dia].map((hora, indexHora) => (
                                                    <Text key={indexHora}>{hora.start}-{hora.end}</Text>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Box key={indexDia}>
                                                <Text fontWeight="bold">{dia}</Text>
                                                <Text>No hay horarios disponibles</Text>
                                            </Box>
                                        )
                                    );
                                })}
                            </VStack>
                        </CustomAccordionItem>
                        <CustomAccordionItem title="Citas">
                            {especialista.appointments.length > 0 ? (
                                <VStack align="start" spacing={2} mb={4}>
                                    {especialista.appointments.map((appointment, indexCita) => {
                                        const date = new Date(Number(appointment.date));
                                        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                        return (
                                            <VStack align="start" spacing={2} mb={4} borderTop='1px' borderBottom='1px' key={appointment.id}>
                                                <Text fontWeight="bold">id: {appointment.id}</Text>
                                                <Text>Fecha: {formattedDate}</Text>
                                                <Text>{appointment.startTime} - {appointment.estimatedEndTime}</Text>
                                                <Text fontWeight="bold">Status: {appointment.status}</Text>
                                            </VStack>
                                        )
                                    })}
                                </VStack>
                            ) : (
                                <Text>El especialista {especialista.nombre} no tiene citas agendadas aún.</Text>
                            )}
                        </CustomAccordionItem>
                        <CustomAccordionItem title="Archivos Adjuntos">
                            {especialista.files ? (
                                <VStack align="start" spacing={2} mb={4}>
                                    {especialista.files.map((file, indexCita) => {
                                        return (
                                            <VStack align="start" spacing={2} mb={4} borderTop='1px' borderBottom='1px' key={file.id} className='overflow-x-scroll'>
                                                <Text fontWeight="bold">Tipo: {file.tipo}</Text>
                                                <Text fontWeight="bold">Nombre: {file.filename}</Text>
                                                <Text color={'#d3983f'} _hover={{ color: "#caa776" }} fontWeight="bold"><a target='_blank' href={"http://localhost:33402/files/" + file.filename}>Link Revision</a></Text>
                                                <Text fontWeight="bold">Vista previa:</Text>
                                                <Image className='h-[400px] w-[400px] object-cover' src={"http://localhost:33402/files/" + file.filename} alt="preview" />
                                            </VStack>
                                        )
                                    })}
                                </VStack>
                            ) : (
                                <Text>El especialista {especialista.nombre} no tiene archivos adjuntos.</Text>
                            )}
                        </CustomAccordionItem>
                    </Accordion>
                </CardBody>

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                    gap={2}
                >
                    <Button colorScheme='orange' color='white' aria-label="Destacar" flex='1' leftIcon={especialista.highlighted ? <RiStarSFill /> : <RiStarLine />}
                        onClick={handleToggleHighlight}
                    >
                        Destacar
                    </Button>
                    <Button colorScheme='blue' aria-label="Editar" flex='1' leftIcon={<RiPencilLine />}
                        onClick={handleOpenForm}
                    >
                        Editar
                    </Button>
                    <Button colorScheme='red' aria-label="Borrar" flex='1' leftIcon={<RiDeleteBinLine />}
                        onClick={handleOpen}
                    >
                        Borrar
                    </Button>
                    <Button colorScheme={especialista.active ? 'red' : 'green'} aria-label="Borrar" flex='1' leftIcon={especialista.active ? <FaCheck /> : <FaCheckDouble />}
                        onClick={handleToggleActive}
                    >
                        {especialista.active ? 'Desaprobar' : 'Aprobar'}
                    </Button>
                </CardFooter>
            </Card>
            <DeleteConfirmationDialog isOpen={isOpen} onClose={handleClose} especialista={especialista} deleteSpecialist={deleteSpecialist} />
            {isFormOpen && <EditSpecialistForm isFormOpen={isFormOpen} specialist={especialista} onClose={handleCloseForm} />}
        </>
    )
}