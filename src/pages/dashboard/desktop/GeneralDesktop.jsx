import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react"
import { GeneralBox } from "../../../components/GeneralBox"

export const GeneralDesktop = () => {
    return (
        <Box ml='265px'>
            <Heading>Vista general</Heading>
            <Box  w={{ md: '60vw', lg: '60vw', xl: '70vw' }} m={4} p={4}>
                <Box w='50%'>
                    <Flex flexWrap={'wrap'} gap={4} w='200%'>
                        <Flex w='100%' flexWrap='wrap'>
                            <Box flex={1} mx={2}>
                                <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0} p={2}>
                                    <GeneralBox
                                        w={{ md: '10vw', lg: '10vw', xl: '14vw' }}
                                        h='100px'
                                    >
                                        <Heading as='h3' fontSize='lg'>User:</Heading>
                                    </GeneralBox>
                                    <GeneralBox
                                        w={{ md: '10vw', lg: '10vw', xl: '15vw' }}
                                        h='100px'
                                    >
                                        <Heading as='h3' fontSize='lg'>Deals:</Heading>
                                    </GeneralBox>
                                </Flex>
                                <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0} p={2}>
                                    <GeneralBox
                                        w={{ md: '10vw', lg: '10vw', xl: '14vw' }}
                                        h='100px'
                                    >
                                        <Heading as='h3' fontSize='lg'>Cli:</Heading>   
                                    </GeneralBox>
                                    <GeneralBox
                                        w={{ md: '10vw', lg: '10vw', xl: '15vw' }}
                                        h='100px'
                                    >
                                        <Heading as='h3' fontSize='lg'>Esp:</Heading>
                                    </GeneralBox>
                                </Flex>
                            </Box>
                            <Box flex={1} m={2} height='auto'>
                                <GeneralBox
                                    h='215px'
                                >
                                    <Heading as='h3' fontSize='lg'>Citas:</Heading>
                                </GeneralBox>
                            </Box>
                        </Flex>
                        <Flex w='100%' ml={4}>
                            <GeneralBox
                                w='100%'
                                h='100px'
                            >
                                <Heading as='h3' fontSize='lg'>Comentarios:</Heading>
                            </GeneralBox>
                        </Flex>
                        <Flex w='100%' ml={2}>
                            <Flex flexWrap={'wrap'} w='200%' gap={4} flex={0} py={2} m={2}>
                                <GeneralBox
                                    w={{ md: '55vw', lg: '56vw', xl: '66.5vw' }}
                                    h='100px'
                                    flex={3}
                                >
                                    <Heading as='h3' fontSize='lg'>Informacion:</Heading>
                                </GeneralBox>
                                <GeneralBox
                                    w={{ md: '20vw', lg: '50vw', xl: '66.5vw' }}
                                    h='100px'
                                    flex={1}
                                    color={"white"}
                                    bg='rgba(255, 255, 255, 0.5)'
                                    p={4}
                                    borderRadius={8}
                                    borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
                                    borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
                                    boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
                                >
                                    <Heading as='h3' fontSize='lg'>Ciudad:</Heading>
                                </GeneralBox>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}