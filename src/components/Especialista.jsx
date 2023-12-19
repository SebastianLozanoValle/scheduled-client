import { Accordion, Box, Flex, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { RiDeleteBinLine, RiPencilLine, RiUserLine } from "react-icons/ri";
import { CustomAccordionItem } from "./CustomAccordionItem";
import { v4 as uuid } from 'uuid';

export const Especialista = ({ especialista }) => {
    return (
        <Box p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white" shadow="md" color='black'>
            <Flex align="center" mb={4} justifyContent='space-between'>
                <Flex>
                    <Icon as={RiUserLine} boxSize={6} mr={2} />
                    <Text fontSize="xl">{especialista.username}</Text>
                </Flex>
                <Flex gap={4}>
                    <IconButton colorScheme='blue' aria-label="Editar" icon={<RiPencilLine />}
                        // onClick={/* función para editar */}
                    />
                    <IconButton colorScheme='red' aria-label="Borrar" icon={<RiDeleteBinLine />}
                        // onClick={/* función para borrar */}
                    />
                </Flex>
            </Flex>
            <Accordion allowToggle>
                <CustomAccordionItem title="Información Personal">
                    <Text>Edad: {especialista.age}</Text>
                    {/* <Text>Sexo: {especialista.sexo}</Text> */}
                    <Text>Ciudad: {especialista.city}</Text>
                    <Text>Calle: {especialista.street}</Text>
                </CustomAccordionItem>
                <CustomAccordionItem title="Especialidades">
                    {especialista.specialtys.map((especialidad, index) => (
                        <Text key={`${especialista.id}${index}`}>{especialidad}</Text>
                    ))}
                </CustomAccordionItem>
                {/* <CustomAccordionItem title="Horario de Atención">
                    <VStack align="start" spacing={2} mb={4} overflowY='auto' height='200px'>
                        {Object.entries(especialista.horarios).map(([dia, horas], indexDia) => (
                            <Box key={indexDia}>
                                <Text fontWeight="bold">{dia}</Text>
                                {horas.map((hora, indexHora) => (
                                    <Text key={indexHora}>{hora}</Text>
                                ))}
                            </Box>
                        ))}
                    </VStack>
                </CustomAccordionItem>
                <CustomAccordionItem title="Citas">
                    {especialista.citas.length > 0 ? (
                        <VStack align="start" spacing={2} mb={4}>
                            {especialista.citas.map((cita, indexCita) => (
                                <Box key={indexCita}>
                                    <Text fontWeight="bold">{cita.cliente}</Text>
                                    <Text>{cita.horaInicio} - {cita.horaFin}</Text>
                                </Box>
                            ))}
                        </VStack>
                    ) : (
                        <Text>El especialista {especialista.nombre} no tiene citas agendadas aún.</Text>
                    )}
                </CustomAccordionItem> */}
            </Accordion>
        </Box>
    )
}