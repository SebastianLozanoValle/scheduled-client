import { Box, Icon, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine, RiFolderUserFill, RiBardFill, RiCoinsLine } from "react-icons/ri";
import { GiHairStrands } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";

export const DashboardSideNavBar = () => {
  const location = useLocation();

  const Link = ({ to, children, icon }) => {
    const isActive = location.pathname === to;
    return (
      <ChakraLink as={NavLink} to={to} h={'auto'} transition='.5s' display="flex" alignItems="center" color={isActive ? "#caa776" : "inherit"}
        _hover={{
          color: 'brand.primary',
          transform: 'scale(1.2)'
        }}
      >
        <Icon as={icon} mr="2" />
        {children}
      </ChakraLink>
    );
  };

  return (
    <Box position='fixed' left={0} w="265px" bg="#212024" color='white' p="4" h="calc(100vh - 60px)" borderRight='solid 1px #ccc'>
      <VStack spacing="4" align="start" height='100%'>
        <Link to="/dashboard" icon={RiDashboardLine}>Dashboard</Link>
        <Link to="/dashboard/especialistas" icon={GiHairStrands}>Especialistas</Link>
        <Link to="/dashboard/clientes" icon={RiFolderUserFill}>Clientes</Link>
        <Link to="/dashboard/destacados" icon={RiBardFill}>Destacados</Link>
        <Link to="/dashboard/ventas" icon={RiCoinsLine}>Ventas</Link>
        <Link to="/settings" icon={RiSettingsLine}>Settings</Link>
        <Link to="/logout" icon={RiLogoutBoxLine}>Logout</Link>
      </VStack>
    </Box>
  );
};