import { Box, Flex, Button, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { RiUser3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { forwardRef } from 'react';

const CustomLink = forwardRef((props, ref) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  return (
    <ChakraLink ref={ref} as={NavLink} {...props} color={isActive ? '#caa776' : 'white'}>
      {props.children}
    </ChakraLink>
  );
});

export const NavBar = () => {

  const location = useLocation();

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg="#242424" px={4} position={'fixed'} top={0} w={'100vw'} borderBottom='solid 1px #ccc' zIndex={2}>
            <Flex h='60px' alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize="xl" color="#caa776">Qurux</Text>
                <Box display={{ base: 'block', md: 'none' }} onClick={onOpen}>
                    <RxHamburgerMenu />
                </Box>
                <Box display={{ base: 'none', md: 'block' }}>
                <Flex>
                    <CustomLink to="/" px={8} my='auto' color="white">Inicio</CustomLink>
                    <Menu>
                    <MenuButton
                      // px={6}
                      bg={'#242424'}
                      color={'white'}
                      _active={{ bg: '#212024',
                      color: '#caa776' }}
                      as={Button} leftIcon={<RiUser3Line />}>
                      Sebastian
                    </MenuButton>
                      <MenuList
                        // bg={'teal.500'} borderRadius={6} p={6}
                      >
                        <MenuItem bg='#212024' color={location.pathname === "/perfil" ? '#caa776' : 'white'} as={CustomLink} to="/perfil">Perfil</MenuItem>
                        <MenuItem bg='#212024' color={location.pathname === "/dashboard" ? '#caa776' : 'white'} as={CustomLink} to="/dashboard">Dashboard</MenuItem>
                        <MenuItem bg='#212024' color={location.pathname === "/logout" ? '#caa776' : 'white'} as={CustomLink} to="/logout">Cerrar sesión</MenuItem>
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
                      <CustomLink to="/" onClick={onClose}>Inicio</CustomLink>
                      <CustomLink to="/nosotros" onClick={onClose}>Nosotros</CustomLink>
                      <CustomLink to="/servicios" onClick={onClose}>Servicios</CustomLink>
                      <CustomLink to="/boletin" onClick={onClose}>Boletín</CustomLink>
                      <CustomLink to="/contacto" onClick={onClose}>Contacto</CustomLink>
                      <CustomLink to="/dashboard" onClick={onClose}>Dashboard</CustomLink>
                      </VStack>
                  </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
  );
};