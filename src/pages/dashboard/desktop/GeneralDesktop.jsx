import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react"

export const GeneralDesktop = () => {
    return (
        <Box>
            <Heading>General Desktop</Heading>
            <Box  w={{ md: '60vw', lg: '60vw', xl: '70vw' }} m={4} p={4}
                // bg='red'
            >
                <Box w='50%'>
                    <Flex
                        flexWrap={'wrap'}
                        gap={4}
                        w='200%'
                    >
                        <Flex w='100%' flexWrap='wrap'>
                            <Box flex={1} mx={2}>
                                <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0} py={2}>
                                    <Box
                                        w={{ md: '30vw', lg: '30vw', xl: '35vw' }}
                                        h='100px'
                                        flex={1} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                        <Heading as='h3' fontSize='lg'>Cli:</Heading>
                                    </Box>
                                    <Box w={{ md: '30vw', lg: '30vw', xl: '35vw' }} h='100px' flex={1} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                        <Heading as='h3' fontSize='lg'>Esp:</Heading>
                                    </Box>
                                </Flex>
                                <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0} py={2}>
                                    <Box w={{ md: '30vw', lg: '30vw', xl: '35vw' }} h='100px' flex={1} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                        <Heading as='h3' fontSize='lg'>Clientes</Heading>   
                                    </Box>
                                    <Box w={{ md: '30vw', lg: '30vw', xl: '35vw' }} h='100px' flex={1} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                        <Heading as='h3' fontSize='lg'>Clientes</Heading>
                                    </Box>
                                </Flex>
                            </Box>
                            <Box flex={1} m={2} color={"white"}
                                bg='rgba(255, 255, 255, 0.05)'
                                p={4}
                                borderRadius={8}
                                borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                            >
                                hola
                            </Box>
                        </Flex>
                        <Flex w='100%'>
                            <Box w='100%' h='100px' m={2} color={"white"}
                                bg='rgba(255, 255, 255, 0.05)'
                                p={4}
                                borderRadius={8}
                                borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                            >
                                <Heading as='h3' fontSize='lg'>Comentarios</Heading>
                            </Box>
                        </Flex>
                        <Flex w='100%'>
                            <Flex flexWrap={'wrap'} w='200%' gap={4} flex={0} py={2} m={2}>
                                <Box w={{ md: '55vw', lg: '56vw', xl: '66.5vw' }} h='100px' flex={3} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                    <Heading as='h3' fontSize='lg'>Cli:</Heading>
                                </Box>
                                <Box w={{ md: '20vw', lg: '50vw', xl: '66.5vw' }} h='100px' flex={1} color={"white"}
                                        bg='rgba(255, 255, 255, 0.05)'
                                        p={4}
                                        borderRadius={8}
                                        borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                        borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                        boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                    >
                                    <Heading as='h3' fontSize='lg'>Esp:</Heading>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}