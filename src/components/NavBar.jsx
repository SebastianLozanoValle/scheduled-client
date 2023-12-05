import { Box, Flex, Button, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { RiUser3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { forwardRef } from 'react';

const Link = forwardRef((props, ref) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  return (
    <ChakraLink ref={ref} as={NavLink} {...props} color={isActive ? 'red' : 'white'}>
      {props.children}
    </ChakraLink>
  );
});

export const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg="teal.500" px={4} position={'fixed'} top={0} w={'100vw'}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize="xl" color="white">Marca</Text>
                <Box display={{ base: 'block', md: 'none' }} onClick={onOpen}>
                    <RxHamburgerMenu />
                </Box>
                <Box display={{ base: 'none', md: 'block' }}>
                <Flex>
                    <Link to="/" px={8} color="white">Inicio</Link>
                    <Menu>
                    <MenuButton
                      // px={6}
                      as={Button} leftIcon={<RiUser3Line />}>
                      Sebastian
                    </MenuButton>
                      <MenuList
                        // bg={'teal.500'} borderRadius={6} p={6}
                      >
                        <MenuItem as={Link} to="/perfil">Perfil</MenuItem>
                        <MenuItem as={Link} to="/dashboard">Dashboard</MenuItem>
                        <MenuItem as={Link} to="/logout">Cerrar sesión</MenuItem>
                      </MenuList>
                    </Menu>
                </Flex>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mt={16} bg={'#ccc'} p={8}>
                  <ModalBody>
                      <VStack align="start" spacing={4}>
                      <Link to="/" onClick={onClose}>Inicio</Link>
                      <Link to="/nosotros" onClick={onClose}>Nosotros</Link>
                      <Link to="/servicios" onClick={onClose}>Servicios</Link>
                      <Link to="/boletin" onClick={onClose}>Boletín</Link>
                      <Link to="/contacto" onClick={onClose}>Contacto</Link>
                      <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                      </VStack>
                  </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
  );
};