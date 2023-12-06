import { Box, Icon, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

export const DashboardSideNavBar = () => {
  const location = useLocation();

  const Link = ({ to, children, icon }) => {
    const isActive = location.pathname === to;
    return (
      <ChakraLink as={NavLink} to={to} display="flex" alignItems="center" color={isActive ? "red" : "inherit"}>
        <Icon as={icon} mr="2" />
        {children}
      </ChakraLink>
    );
  };

  return (
    <Box position='fixed' left={0} w="265px" bg="gray.200" p="4" h="calc(100vh - 60px)">
      <VStack spacing="4" align="start" height='100%'>
        <Link to="/dashboard" icon={RiDashboardLine}>Dashboard</Link>
        <Link to="/settings" icon={RiSettingsLine}>Settings</Link>
        <Link to="/logout" icon={RiLogoutBoxLine}>Logout</Link>
      </VStack>
    </Box>
  );
};