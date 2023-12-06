import { NavLink as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";

const CustomNavLink = ({ to, children, onClick }) => {

    const location = useLocation();

    const currentPath = location.pathname;

    return (
        <ChakraLink
            as={ReactRouterLink}
            to={to}
            color={currentPath == to ? 'brand.primary' : 'brand.secondary'}
            mr="4vw"
            _hover={{ textDecoration: "underline" }}
            style={{
                textDecoration: "none",
            }}
            onClick={onClick}
        >
            {children}
        </ChakraLink>
    );
};

export default CustomNavLink;
