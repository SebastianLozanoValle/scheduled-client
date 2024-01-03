import { useState } from 'react';
import { Accordion, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { RiMore2Line, RiStarLine, RiStarSFill, RiDiscussLine, RiShareForwardLine, RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import { CustomAccordionItem } from "./CustomAccordionItem";
import { gql, useMutation } from "@apollo/client";
import { GET_SPECIALISTS } from "../pages/dashboard/Especialistas";
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { EditSpecialistForm } from './EditSpecialistForm';

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

export const CustomCard = ({ especialista }) => {
    const [deleteSpecialist] = useMutation(DELETE_SPECIALIST,
        {refetchQueries: [{ query: GET_SPECIALISTS }]});
    const [toggleSpecialistHighlight] = useMutation(TOGGLE_SPECIALIST_HIGHLIGHT);

    const handleToggleHighlight = async () => {
        try {
            const { data } = await toggleSpecialistHighlight({
                variables: {
                    id: especialista.id
                }
            });
        } catch (error) {
            console.log(error);
        }
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

    return (
        <>
            <Card maxW='md' boxShadow='xl'>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar bg='brand.primary' name='Sasuke Uchiha' src='https://bit.ly/broken-link' />

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
                                        especialista.weeklySchedule[dia].length ?(
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
                                    {especialista.appointments.map((appointment, indexCita) => (
                                        <VStack align="start" spacing={2} mb={4} borderTop='1px' borderBottom='1px' key={appointment.id}>
                                            <Text fontWeight="bold">id: {appointment.id}</Text>
                                            <Text>{appointment.startTime} - {appointment.estimatedEndTime}</Text>
                                            <Text fontWeight="bold">Status: {appointment.status}</Text>

                                        </VStack>
                                    ))}
                                </VStack>
                            ) : (
                                <Text>El especialista {especialista.nombre} no tiene citas agendadas aún.</Text>
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
                    <Button colorScheme='orange' color='white' aria-label="Destacar" flex='1' leftIcon={especialista.highlighted? <RiStarSFill/> : <RiStarLine/>}
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
                </CardFooter>
            </Card>
            <DeleteConfirmationDialog isOpen={isOpen} onClose={handleClose} especialista={especialista} deleteSpecialist={deleteSpecialist} />
            {isFormOpen && <EditSpecialistForm isFormOpen={isFormOpen} specialist={especialista} onClose={handleCloseForm} />}
        </>
    )
}