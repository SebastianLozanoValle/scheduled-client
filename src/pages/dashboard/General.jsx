import { GeneralDesktop } from "./desktop/GeneralDesktop"
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { GeneralBox } from "../../components/GeneralBox"
import { GeneralReseña } from "../../components/GeneralReseña"
import { useQuery } from "@apollo/client";
import { APPOINTMENT_COUNT, CLIENT_COUNT, INVOICE_COUNT, SPECIALIST_COUNT } from "../../querys/querys";

const reseñas = [
    {
        title: "Excelente producto",
        text: "Me encanta este producto. Es de alta calidad y cumple con todas mis expectativas.",
        user: "Usuario1",
        rating: 5,
        date: "01/01/2022, 10:30"
    },
    {
        title: "Buen producto",
        text: "Este producto es bueno. Funciona bien y tiene un precio razonable.",
        user: "Usuario2",
        rating: 4,
        date: "02/01/2022, 14:45"
    },
    {
        title: "Regular producto",
        text: "No estoy muy impresionado con este producto. No cumple completamente con lo que esperaba.",
        user: "Usuario3",
        rating: 3,
        date: "03/01/2022, 09:15"
    },
    {
        title: "Producto decepcionante",
        text: "No recomendaría este producto. No funciona como se describe y la calidad es baja.",
        user: "Usuario4",
        rating: 2,
        date: "04/01/2022, 16:20"
    },
    {
        title: "Mala experiencia",
        text: "Este producto es terrible. No funciona en absoluto y es una completa pérdida de dinero.",
        user: "Usuario5",
        rating: 1,
        date: "05/01/2022, 11:10"
    }
];

export const General = ({ isMobile }) => {
    const { loading: loadingSpecialistCount, error: errorSpecialistCount, data: dataSpecialistCount } = useQuery(SPECIALIST_COUNT);
    const { loading: loadingClientCount, error: errorClientCount, data: dataClientCount } = useQuery(CLIENT_COUNT);
    const { loading: loadingInvoiceCount, error: errorInvoiceCount, data: dataInvoiceCount } = useQuery(INVOICE_COUNT);
    const { loading: loadingAppointmentCount, error: errorAppointmentCount, data: dataAppointmentCount } = useQuery(APPOINTMENT_COUNT);
  
    if (loadingSpecialistCount || loadingClientCount || loadingInvoiceCount || loadingAppointmentCount) return <p>Loading...</p>;
    if (errorSpecialistCount || errorClientCount || errorInvoiceCount || errorAppointmentCount) return <p>Error: {errorSpecialistCount ? errorSpecialistCount.message : errorClientCount ? errorClientCount.message : errorInvoiceCount ? errorInvoiceCount.message : errorAppointmentCount.message}</p>;
  
    // Aquí puedes acceder a los datos devueltos por las consultas
    const specialistCount = dataSpecialistCount.specialistCount;
    const clientCount = dataClientCount.clientCount;
    const invoiceCount = dataInvoiceCount.invoiceCount;
    const appointmentCount = dataAppointmentCount.appointmentCount;
    
    return (
        <Box p={12} bg='white' w='100vw' color='black' mx='auto' overflowX='hidden'>
            {/* {isMobile ? <h1>General Mobile</h1> : <GeneralDesktop reseñas={reseñas} />} */}
            <Box ml={isMobile ? '0' : '265px'}>
                <Heading>Vista general</Heading>
                <Box w={['100%']}>
                    <Box w={['100%']}>
                        <Flex flexWrap={['wrap', 'wrap']} gap={4} w={['100%', '100%']}>
                            <Flex w={['100%', '100%']} flexWrap={['wrap', 'wrap']}>
                                <Box flex={['100%', 1]} mx={[0, 2]}>
                                    <Flex flexWrap={['wrap', 'wrap']} w='100%' gap={4} flex={0} p={2}>
                                        <GeneralBox
                                            w={['100%', '10vw', '10vw', '14vw']}
                                            h='100px'
                                        >
                                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Roll:</Heading>
                                            <Center>
                                                <Heading fontSize={['xl', '2xl', '2xl', '3xl']}>Admin</Heading>
                                            </Center>
                                        </GeneralBox>
                                        <GeneralBox
                                            w={['100%', '10vw', '10vw', '15vw']}
                                            h='100px'
                                        >
                                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Facturas Vigentes:</Heading>
                                            <Center>
                                                <Heading>{invoiceCount}</Heading>
                                            </Center>
                                        </GeneralBox>
                                    </Flex>
                                    <Flex flexWrap={['wrap', 'wrap']} w='100%' gap={4} flex={0} p={2}>
                                        <GeneralBox
                                            w={['100%', '10vw', '10vw', '14vw']}
                                            h='100px'
                                        >
                                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Cli:</Heading>
                                            <Center>
                                                <Heading>{clientCount}</Heading>
                                            </Center>
                                        </GeneralBox>
                                        <GeneralBox
                                            w={['100%', '10vw', '10vw', '15vw']}
                                            h='100px'
                                        >
                                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Esp:</Heading>
                                            <Center>
                                                <Heading>{specialistCount}</Heading>
                                            </Center>
                                        </GeneralBox>
                                    </Flex>
                                </Box>
                                <Box flex={['100%', 1]} m={[0, 2]} height={['auto', 'auto']}>
                                    <GeneralBox
                                        h={['215px', '215px']}
                                    >
                                        <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Citas:</Heading>
                                        <Center>
                                                <Heading>{appointmentCount}</Heading>
                                            </Center>
                                    </GeneralBox>
                                </Box>
                            </Flex>
                            <Flex w={['100%', '100%']} ml={[0, 4]}>
                                <GeneralBox
                                    w={['100%', '100%']}
                                    h={['200px', '200px']}
                                >
                                    <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Reseñas:</Heading>
                                    <GeneralReseña reseñas={reseñas} />
                                </GeneralBox>
                            </Flex>
                            <Flex w={['100%']} ml={[0, 2]}>
                                <Flex flexWrap={['wrap']} w={['100%', '100%']} gap={4} py={2} m={2}>
                                    <GeneralBox
                                        w={['100%']}
                                        h='100px'
                                        flex={6}
                                    >
                                        <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Información:</Heading>
                                    </GeneralBox>
                                    <GeneralBox
                                        w={['100%', '50vw']}
                                        h='100px'
                                        flex={6}
                                        color={"white"}
                                        bg='rgba(255, 255, 255, 0.5)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                        <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Ciudad:</Heading>
                                    </GeneralBox>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}