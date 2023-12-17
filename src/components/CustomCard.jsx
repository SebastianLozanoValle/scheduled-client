import { Accordion, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { RiMore2Line, RiStarLine, RiStarSFill, RiDiscussLine, RiShareForwardLine } from "react-icons/ri";
import { CustomAccordionItem } from "./CustomAccordionItem";

export const CustomCard = () => {
    return (
        <>
            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar bg='brand.primary' name='Sasuke Uchiha' src='https://bit.ly/broken-link' />

                        <Box>
                        <Heading size='sm'>Segun Adebayo</Heading>
                        <Text>Creator, Chakra UI</Text>
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
                        <CustomAccordionItem title={'Titulo'} children={<>hola</>}/>
                        <CustomAccordionItem title={'Ubicacion'} children={<>Mapa Proximamente</>}/>
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
                >
                    <Button flex='1' leftIcon={<RiStarLine />}>
                    Like
                    </Button>
                    <Button flex='1' leftIcon={<RiDiscussLine />}>
                    Comment
                    </Button>
                    <Button flex='1' leftIcon={<RiShareForwardLine />}>
                    Share
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}