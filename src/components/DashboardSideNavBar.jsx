import { Box, Icon, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine, RiFolderUserFill, RiBardFill, RiCoinsLine, RiUser3Line } from "react-icons/ri";
import { TfiAgenda } from "react-icons/tfi";
import { GiHairStrands } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useUserStore } from "../store/userStore";

export const DashboardSideNavBar = () => {

  const { name, userRole, setUser } = useUserStore();
  const diferentThatClient = userRole !== 'client';
  const admin = userRole === 'admin';

  const client = useApolloClient();

  const logout = () => {
    localStorage.removeItem('user-token');
    client.resetStore();
    setUser('', '', ''); // reset Zustand store
  }

  const location = useLocation();

  const Link = ({ to, children, icon, handler }) => {
    const isActive = location.pathname === to;
    return (
      <ChakraLink as={NavLink} to={to} h={'auto'} transition='.5s' display="flex" alignItems="center" color={isActive ? "#caa776" : "inherit"}
        _hover={{
          color: 'brand.primary',
          transform: 'scale(1.2)'
        }}
        onClick={handler}
      >
        <Icon as={icon} mr="2" />
        {children}
      </ChakraLink>
    );
  };

  return (
    <Box position='fixed' left={0} w="265px" bg="#0b0e13" color='white' p="4" h="calc(100vh - 60px)" borderRight='solid 1px #ccc'>
      <VStack spacing="4" align="start" height='100%'>
        {diferentThatClient&&<Link to="/dashboard" icon={RiDashboardLine}>Dashboard</Link>}
        {admin&&<>
        <Link to="/dashboard/especialistas" icon={GiHairStrands}>Especialistas</Link>
        <Link to="/dashboard/especialistas-sin-aprobar" icon={GiHairStrands}>Especialistas Sin Aprobar</Link>
        <Link to="/dashboard/especialistas-rechazados" icon={GiHairStrands}>Especialistas Rechazados</Link>
        <Link to="/dashboard/clientes" icon={RiFolderUserFill}>Clientes</Link>
        {/* <Link to="/dashboard/destacados" icon={RiBardFill}>Destacados</Link> */}
        {/* <Link to="/dashboard/ventas" icon={RiCoinsLine}>Ventas</Link> */}
        </>}{
          diferentThatClient&&<Link to="/dashboard/agenda" icon={TfiAgenda}>Agenda</Link>
        }
        {<Link to="/dashboard/perfil" icon={RiUser3Line}>Perfil</Link>}
        {<Link icon={RiLogoutBoxLine} handler={logout}>Logout</Link>}
        {<Link to="/dashboard/pruebas" icon={RiLogoutBoxLine}>pruebas</Link>}
      </VStack>
    </Box>
  );
};