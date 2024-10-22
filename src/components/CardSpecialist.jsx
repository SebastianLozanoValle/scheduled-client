import { useState } from 'react';
import { Accordion, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { RiMore2Line, RiStarLine, RiStarSFill, RiDiscussLine, RiShareForwardLine, RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { CustomAccordionItem } from "./CustomAccordionItem";
import { gql, useMutation } from "@apollo/client";
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { EditSpecialistForm } from './EditSpecialistForm';
import { color } from 'framer-motion';
import { SendMessage } from './SendMessage';
import { FIND_SPECIALISTS, SEND_NOTIFICATION, TOGGLE_REJECT } from '../querys/querys';
import { v4 as uuid } from "uuid"

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

const TOGGLE_SERVICE_ACTIVE = gql`
    mutation ToggleServiceActive($id: ID!, $serviceName: String!) {
        toggleServiceActive(id: $id, serviceName: $serviceName) {
            id
            # Otros campos que deseas devolver después de cambiar el estado del servicio
        }
    }
`;

let daysOfWeek = {
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo"
};

// cambiar link en produccionnn importanteeeeeeeee

const rutaApi = "https://sever-qurux.onrender.com/files/"
// const rutaApi = "http://localhost:33402/files"

//#################################################

export const CardSpecialist = ({ especialista }) => {
    const [deleteSpecialist] = useMutation(DELETE_SPECIALIST,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });
    const [sendNotification] = useMutation(SEND_NOTIFICATION,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });
    const [toggleSpecialistHighlight] = useMutation(TOGGLE_SPECIALIST_HIGHLIGHT,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });
    const [toggleSpecialistActive] = useMutation(TOGGLE_SPECIALIST_ACTIVE,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });
    const [toggleReject] = useMutation(TOGGLE_REJECT,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });

    const [toggleServiceActive, { loading, error, data }] = useMutation(TOGGLE_SERVICE_ACTIVE,
        { refetchQueries: [{ query: FIND_SPECIALISTS }] });

    console.log(especialista)

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
    };
    const handleToggleActive = async () => {
        try {
            const { data } = await toggleSpecialistActive({
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

    const [isOpenReject, setIsOpenReject] = useState(false);

    const handleOpenReject = () => setIsOpenReject(true);
    const handleCloseReject = () => setIsOpenReject(false);
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

    const profilePicture = especialista.files?.find((file) => {
        return file.tipo === 'profilePic';
    });
    const profilePictureUrl = "http://localhost:33402/files/" + profilePicture?.filename;
    console.log('profilePIcture:', profilePicture?.filename);

    console.log('especialista:', especialista.files?.length)

    const handleToggleServiceActive = async (id, serviceName) => {
        try {
            const result = await toggleServiceActive({
                variables: { id, serviceName }
            });
            // Aquí puedes manejar el resultado de la mutación si es necesario
            console.log(result.data.toggleServiceActive);
            console.log(additionalParam); // Puedes acceder a los parámetros adicionales aquí
        } catch (error) {
            // Aquí puedes manejar cualquier error que ocurra durante la mutación
            console.error(error);
        }
    };

    return (
        <>
            <div className={`w-full rounded-3xl transition-all duration-500 ${especialista.highlighted ? 'bg-primary' : 'bg-secondary'}`}>
                <Accordion allowToggle>
                    <CustomAccordionItem title={especialista.username} >
                        <div className='flex flex-wrap gap-4 w-full'>
                            <div className='flex flex-wrap w-full'>
                                <div className='w-full sm:w-1/2'>
                                    <h2 className='text-xl font-extrabold my-4'>
                                        Personal:
                                    </h2>
                                    <div>
                                        <div className='flex gap-1'>
                                            <h3 className=''>Correo:</h3>
                                            <p> {especialista.email}</p>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h3 className=''>Fecha Nacimiento:</h3>
                                            <p> {especialista.age}</p>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h3 className=''>Sexo:</h3>
                                            <p> {especialista.gender == "male" ? 'Hombre' : especialista.gender == "female" ? 'Mujer' : 'Otro'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full sm:w-1/2'>
                                    <h2 className='text-xl font-extrabold my-4'>
                                        Locacion:
                                    </h2>
                                    <div>
                                        <div className='flex gap-1'>
                                            <h3 className=''>Ciudad:</h3>
                                            <p> {especialista.city}</p>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h3 className=''>Direccion:</h3>
                                            <p> {especialista.street}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h2 className='text-xl font-extrabold my-4'>
                                    Galeria:
                                </h2>
                                <div className=' flex flex-wrap items-center p-4 w-full bg-[#f1f1f1] rounded-lg overflow-x-scroll'>
                                    {
                                        especialista.files.length > 0 ? especialista.files.map(file => {
                                            return (
                                                <a className='w-[65px] block' target='_blank' href={rutaApi + file.filename} key={file.id}>
                                                    <img
                                                        className='w-[65px] hover:scale-125'
                                                        src={rutaApi + file.filename}
                                                        alt={`Imagen de ${file.filename}`}
                                                    />
                                                </a>
                                            )
                                        }) :
                                            <p className='font-extralight'>El especialista no tiene imagenes ni documentos adjuntos</p>
                                    }
                                </div>
                                <h2 className='text-xl font-extrabold my-4'>
                                    Imagen de perfil:
                                </h2>
                                <div className='p-4 w-full bg-[#f1f1f1] rounded-lg overflow-x-scroll flex flex-wrap'>
                                    {
                                        especialista.files.length > 0 ? especialista.files.map(file => {
                                            return file.filename.includes("Profile") && (
                                                <a className='w-[65px] block' target='_blank' href={rutaApi + file.filename} key={file.id}>
                                                    <img
                                                        className='w-[65px] hover:scale-125'
                                                        src={rutaApi + file.filename}
                                                        alt={`Imagen de ${file.filename}`}
                                                    />
                                                </a>
                                            )
                                        }) :
                                            <p>el usuario no tiene foto de perfil</p>
                                    }
                                </div>
                                <h2 className='text-xl font-extrabold my-4'>
                                    Imagenes del local:
                                </h2>
                                <div className='p-4 w-full bg-[#f1f1f1] rounded-lg overflow-x-scroll flex flex-wrap'>
                                    {
                                        especialista.files.length > 0 ? especialista.files.map(file => {
                                            return file.filename.includes("Local") && (
                                                <a className='w-[65px] block' target='_blank' href={rutaApi + file.filename} key={file.id}>
                                                    <img
                                                        className='w-[65px] hover:scale-125'
                                                        src={rutaApi + file.filename}
                                                        alt={`Imagen de ${file.filename}`}
                                                    />
                                                </a>
                                            )
                                        }) :
                                            <p className='text-black'>el usuario no tiene foto del local</p>
                                    }
                                </div>
                                <h2 className='text-xl font-extrabold my-4'>
                                    Horario de Atención:
                                </h2>
                                <div className="lg:pr-0 w-full lg:w-auto">
                                    <ul className="flex flex-wrap gap-8 w-auto mx-auto justify-center bg-[#f1f1f1] text-white rounded-lg p-4">
                                        {Object.keys(especialista.weeklySchedule).map((dia, indexDia) => {
                                            return (
                                                especialista.weeklySchedule[dia].length ? (
                                                    <li className="flex flex-col bg-green-500 rounded-2xl p-2" key={indexDia}>
                                                        <p className="font-bold">{daysOfWeek[dia]}</p>
                                                        {especialista.weeklySchedule[dia].map((hora, indexHora) => (
                                                            <p key={indexHora}>{hora.start}-{hora.end}</p>
                                                        ))}
                                                    </li>
                                                ) : (
                                                    <li className="flex flex-col bg-red-500 rounded-2xl p-2" key={indexDia}>
                                                        <p className="font-bold">{daysOfWeek[dia]}</p>
                                                        <p>No disponible</p>
                                                    </li>
                                                )
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className='flex flex-wrap'>
                                    <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                                        <h2 className='text-xl font-extrabold my-4'>
                                            Mundos:
                                        </h2>
                                        <div>
                                            {
                                                especialista?.world?.length > 0 ? especialista.world.map(mundo => {
                                                    return (
                                                        <p key={uuid()}>Mundo {mundo}</p>
                                                    )
                                                }) : <p>Este especialista no ha seleccionado ningun mundo </p>
                                            }
                                        </div>
                                        <h2 className='text-xl font-extrabold my-4'>
                                            Tipo de Servicio:
                                        </h2>
                                        <div>
                                            {
                                                especialista?.serviceType
                                            }
                                        </div>
                                    </div>

                                    <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                                        <h2 className='text-xl font-extrabold my-4'>
                                            Servicios:
                                        </h2>
                                        <div>
                                            {
                                                console.log(especialista)
                                            }
                                            {
                                                especialista.specialtys.length > 0 ? especialista.specialtys.map(servicio => (
                                                    <div key={uuid()}>
                                                        <div className='flex gap-2 py-4 items-center'>
                                                                <span className={`h-3 w-3 rounded-full ${servicio.state ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                            <p key={servicio.id}>{servicio.name}</p>
                                                            <button onClick={() => handleToggleServiceActive(especialista.id, servicio.name)} className={`${servicio.state ? "bg-red-500 text-white hover:bg-white hover:text-red-500 border-red-500 px-2 transition-all duration-500" : "bg-green-500 text-white hover:bg-white hover:text-green-500 border-green-500 px-2 transition-all duration-500"} rounded`}>{servicio.state ? "Desaprobar" : "Aprobar"}</button>
                                                        </div>
                                                        <div className='p-4 w-full bg-[#f1f1f1] rounded-lg overflow-x-scroll flex flex-wrap'>
                                                            {
                                                                especialista.files.length > 0 ? especialista.files.map(file => {
                                                                    return file.filename.includes(servicio.name) && (
                                                                        <a className='w-[65px] block' target='_blank' href={rutaApi + file.filename} key={file.id}>
                                                                            <img
                                                                                className='w-[65px] hover:scale-125'
                                                                                src={rutaApi + file.filename}
                                                                                alt={`Imagen de ${file.filename}`}
                                                                            />
                                                                        </a>
                                                                    )
                                                                }) :
                                                                    <p className='text-black'>el usuario no tiene foto del local</p>
                                                            }
                                                        </div>
                                                    </div>

                                                )) :
                                                    <p>No tiene servicios registrados</p>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className='flex flex-wrap gap-4 justify-center w-full mt-10 sm:justify-end'>
                                <button
                                    className='px-8 py-4 rounded-xl bg-primary text-white border-primary hover:bg-white hover:text-primary transition-all duration-500'
                                    onClick={handleToggleHighlight}
                                >
                                    <div className='flex gap-4  items-center'>
                                        {especialista.highlighted ? <RiStarSFill /> : <RiStarLine />} Destacar
                                    </div>
                                </button>
                                <button
                                    className='px-8 py-4 rounded-xl bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-500'
                                    onClick={handleOpenForm}
                                >
                                    <div className='flex gap-4  items-center'>
                                        {<RiPencilLine />} Editar
                                    </div>
                                </button>
                                <button
                                    className='px-8 py-4 rounded-xl bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600 transition-all duration-500'
                                    onClick={handleOpen}
                                >
                                    <div className='flex gap-4  items-center'>
                                        {<RiDeleteBinLine />} Borrar
                                    </div>
                                </button>
                                <button
                                    className={`px-8 py-4 rounded-xl text-white  transition-all duration-500 ${especialista.active ? 'bg-red-600 border-red-600 hover:bg-white hover:text-red-600' : 'bg-green-600 border-green-600 hover:bg-white hover:text-green-600'}`}
                                    onClick={handleToggleActive}
                                >
                                    <div className='flex  gap-4 items-center'>
                                        {especialista.active ? <FaCheck /> : <FaCheckDouble />} {especialista.active ? 'Desaprobar' : 'Aprobar'}
                                    </div>
                                </button>
                                <button
                                    className={`px-8 py-4 rounded-xl text-white  transition-all duration-500 ${!especialista.reject ? 'bg-red-600 border-red-600 hover:bg-white hover:text-red-600' : 'bg-green-600 border-green-600 hover:bg-white hover:text-green-600'}`}
                                    onClick={handleOpenReject}
                                >
                                    <div className='flex  gap-4 items-center'>
                                        {especialista.reject ? <FaCheckDouble /> : <FaCheck />} {especialista.reject ? 'Aprobar' : 'Rechazar'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </CustomAccordionItem>
                </Accordion>
                <SendMessage recipient={especialista.id} isOpen={isOpenReject} onClose={handleCloseReject} sendNotification={sendNotification} tipo={especialista.reject ? 'Aprobar' : 'Rechazado'} toggleReject={toggleReject} />
                <DeleteConfirmationDialog isOpen={isOpen} onClose={handleClose} especialista={especialista} deleteSpecialist={deleteSpecialist} />
                {isFormOpen && <EditSpecialistForm isFormOpen={isFormOpen} specialist={especialista} onClose={handleCloseForm} />}
            </div>
            {/* <Card maxW='md' boxShadow='xl'>
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
                                <Text key={`${especialista.id}${index}`}>{especialidad.name}</Text>
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
                    <Button colorScheme={especialista.reject ? 'green' : 'red'} aria-label="Borrar" flex='1' leftIcon={especialista.reject ? <FaCheckDouble /> : <FaCheck />}
                        onClick={handleOpenReject}
                    >
                        {especialista.reject ? 'Aprobar' : 'Rechazar'}
                    </Button>
                </CardFooter>
            </Card >
            <SendMessage recipient={especialista.id} isOpen={isOpenReject} onClose={handleCloseReject} sendNotification={sendNotification} tipo={especialista.reject ? 'Aprobar' : 'Rechazado'} toggleReject={toggleReject} />
            <DeleteConfirmationDialog isOpen={isOpen} onClose={handleClose} especialista={especialista} deleteSpecialist={deleteSpecialist} />
            {isFormOpen && <EditSpecialistForm isFormOpen={isFormOpen} specialist={especialista} onClose={handleCloseForm} />} */}
        </>
    )
}