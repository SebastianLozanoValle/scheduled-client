import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { GeneralBox } from "../../../components/GeneralBox"
import { GeneralReseña } from "../../../components/GeneralReseña"


export const GeneralDesktop = ({ reseñas }) => {
    return (
        <Box ml={['0', '265px']}>
    <Heading>Vista general</Heading>
    <Box w={['100%', '60vw', '60vw', '70vw']} m={4} p={4}>
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
                                <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Serv:</Heading>
                                <Center>
                                    <Heading>20</Heading>
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
                                    <Heading>12</Heading>
                                </Center>   
                            </GeneralBox>
                            <GeneralBox
                                w={['100%', '10vw', '10vw', '15vw']}
                                h='100px'
                            >
                                <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Esp:</Heading>
                                <Center>
                                    <Heading>5</Heading>
                                </Center>
                            </GeneralBox>
                        </Flex>
                    </Box>
                    <Box flex={['100%', 1]} m={[0, 2]} height={['auto', 'auto']}>
                        <GeneralBox
                            h={['215px', '215px']}
                        >
                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Citas:</Heading>
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
                <Flex w={['100%', '100%']} ml={[0, 2]}>
                    <Flex flexWrap={['wrap', 'nowrap']} w={['100%', '100%']} gap={4} flex={0} py={2} m={2}>
                        <GeneralBox
                            w={['100%', '55vw', '56vw', '66.5vw']}
                            h='100px'
                            flex={3}
                        >
                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Información:</Heading>
                        </GeneralBox>
                        <GeneralBox
                            w={['100%', '20vw', '50vw', '66.5vw']}
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
                            <Heading as='h3' fontSize={['lg', 'lg', 'lg', 'xl']}>Ciudad:</Heading>
                        </GeneralBox>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    </Box>
</Box>

    )
}