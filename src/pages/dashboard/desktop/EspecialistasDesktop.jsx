// import { Box } from "@chakra-ui/react"

// export const EspecialistasDesktop = ({ especialistas }) => {
//     return (
//         <Box ml='265px'>
            
//         </Box>
//     )
// }
import { Box, Flex, Icon } from "@chakra-ui/react"
import { RiUserLine } from "react-icons/ri"
import { v4 as uuid } from 'uuid';

export const EspecialistasDesktop = ({ especialistas }) => {
    return (
        <Box ml='265px'>
            {especialistas.map((especialista) => (
                <Box key={uuid()} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                    <Flex align="center">
                        <Icon as={RiUserLine} boxSize={6} mr={2} />
                        <Box>{especialista.nombre}</Box>
                    </Flex>
                    <Box mt={4}>
                        {Object.entries(especialista.horarios).map(([dia, horas]) => (
                            <Box key={uuid()}>
                                <Box>{dia}</Box>
                                {horas.map((hora) => (
                                    <Box key={uuid()}>{hora}</Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box mt={4}>
                        {especialista.citas.map((cita) => (
                            <Box key={uuid()}>
                                <Box>{cita.cliente}</Box>
                                <Box>{cita.horaInicio} - {cita.horaFin}</Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}
