import React from "react";
import { Box, Flex,  Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Link as ChakraLink } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import CustomNavLink from '../components/CustomNavLink';
import { VStack } from "@chakra-ui/react";


export const Sub = ({ isMobile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            maxW='100vw'
            height='300px'
            display='flex'
            justifyContent='left'
            flexDirection='column'
            bg="brand.background"
            alignContent='flex-start'
            color="black"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)" // Puedes ajustar la sombra según tus preferencias
        >
            {/* Barra de navegación */}
            <Flex
                p={4}
                align="center"
                fontSize={20}
                fontWeight="bold"
                
            >
              

                {isMobile ? (
                    // Menú hamburguesa para móviles
                    <Box ml='auto' display={{ base: "block", md: "none" }}>
                        <Button onClick={isOpen ? onClose : onOpen} bg='none' fontSize={30} color='brand.secondary'>
                            ☰
                        </Button>
                    </Box>
                ) : (
                    // Menú para escritorio
                    <Flex ml="auto" align="center" color='black'display={{ base: 'none', md: 'flex' }}>
                        {/* Puedes agregar más elementos aquí */}
                        <CustomNavLink to='/' children='Inicio' />
                        <CustomNavLink to='/Mundohombres' children='Mundohombres' />
                        <CustomNavLink to='/Mundomujeres' children='Mundomujeres' />
                        <CustomNavLink to='/Mundomascotas' children='Mundomascotas' />
                    </Flex>
                )}

                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent bg='black'>
                        <DrawerCloseButton />
                        <DrawerHeader color='black'>Menú</DrawerHeader>
                        <DrawerBody >
                            <VStack spacing="3" paddingTop='60px' display='flex' justifyContent='center' height='100vh'>
                                {/* Puedes agregar más elementos aquí */}
                                <CustomNavLink to="/" onClick={onClose} children="Inicio"/>
                                <CustomNavLink to="/Mundohombre" onClick={onClose} children="Mundohombre" />
                                <CustomNavLink to="/Mundomujeres" onClick={onClose} children="Mundomujeres" />
                                <CustomNavLink to="/Mundomascotas" onClick={onClose} children="Mundomascotas" />
                            
                                <Box display='flex' color='white' gap='20px'>
                               <a target='_blank' href="https://www.facebook.com/mcshipbrokers/?locale=es_LA"><Box fontSize='20px'>{<FaFacebookF />}</Box></a>
                               <a target='_blank' href="https://www.linkedin.com/company/2879222/admin/feed/posts/"><Box fontSize={'20px'}>{<CiLinkedin />}</Box></a>
                               <a target='_blank' href="https://www.instagram.com/mcshipbrokersint/"><Box fontSize={'20px'}>{<FaInstagram />}</Box></a>
                               </Box>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Box>
    );
};
