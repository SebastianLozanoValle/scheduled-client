import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { RiStarLine, RiStarSFill } from "react-icons/ri";
import { v4 as uuid } from "uuid"

export const GeneralReseña = ({ reseñas }) => {
    return (
        <>
            {
                reseñas? reseñas.map(reseña => {
                    return (
                        <Box width='100%' mx='auto' my={2} p={4} key={uuid()} bg='brand.primary' borderRadius={8}>
                            <Heading fontSize='md'>{reseña.title}</Heading>
                            <Text>{reseña.text}</Text>
                            <Flex w='100%' justifyContent='space-between'>
                                <Flex>
                                    {[1, 2, 3, 4, 5].map((starNumber) => (
                                        starNumber <= reseña.rating ? <RiStarSFill key={starNumber} /> : <RiStarLine key={starNumber} />
                                    ))}
                                </Flex>
                                <Text>{reseña.date} | {reseña.user}</Text>
                            </Flex>
                        </Box>
                    )
                }):
                <>Aun no tiene reseñas</>
            }
        </>
    )
}