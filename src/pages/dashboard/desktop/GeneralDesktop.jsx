import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react"

export const GeneralDesktop = () => {
    return (
        <Box>
            <Heading>General Desktop</Heading>
            <Box  w='70vw' m={4}
                // bg='red'
            >
                <Box w='100%'>
                    <Flex
                        flexWrap={'wrap'}
                        gap={4}
                    >
                        <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0}>
                            <Box w={{ md: '60vw', lg: '33vw', xl: '34.25vw' }} h='100px' bg='green' flex={1} color={"white"} p={4} borderRadius={8}>
                                <Text>Box 1</Text>
                            </Box>
                            <Box w={{ md: '60vw', lg: '33vw', xl: '34.25vw' }} h='100px' bg='blue' flex={1} color={"white"} p={4} borderRadius={8}>
                                <Text>Box 2</Text>
                            </Box>
                        </Flex>
                        <Flex flexWrap={'wrap'} w='100%' gap={4} flex={0}>
                            <Box w={{ md: '60vw', lg: '33vw', xl: '34.25vw' }} h='100px' bg='green' flex={1} color={"white"} p={4} borderRadius={8}>
                                <Text>Box 1</Text>
                            </Box>
                            <Box w={{ md: '60vw', lg: '33vw', xl: '34.25vw' }} h='100px' bg='blue' flex={1} color={"white"} p={4} borderRadius={8}>
                                <Text>Box 2</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}