import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const Link = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  return (
    <ChakraLink as={NavLink} {...props} color={isActive ? 'red' : 'white'}>
      {props.children}
    </ChakraLink>
  );
};

export const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg="teal.500" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize="xl" color="white">Marca</Text>
                <Box display={{ base: 'block', md: 'none' }} onClick={onOpen}>
                    <RxHamburgerMenu />
                </Box>
                <Box display={{ base: 'none', md: 'block' }}>
                <Flex>
                    <Link to="/" px={2} color="white">Inicio</Link>
                    <Link to="/nosotros" px={2} color="white">Nosotros</Link>
                    <Link to="/servicios" px={2} color="white">Servicios</Link>
                    <Link to="/boletin" px={2} color="white">Boletín</Link>
                    <Link to="/contacto" px={2} color="white">Contacto</Link>
                </Flex>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Nombre de la empresa</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                    <Link to="/" onClick={onClose}>Inicio</Link>
                    <Link to="/nosotros" onClick={onClose}>Nosotros</Link>
                    <Link to="/servicios" onClick={onClose}>Servicios</Link>
                    <Link to="/boletin" onClick={onClose}>Boletín</Link>
                    <Link to="/contacto" onClick={onClose}>Contacto</Link>
                    </VStack>
                </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
  );
};