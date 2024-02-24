import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";
import { NavBar } from "./components/NavBar";
import theme from "./theme/theme"; 
import {Footer} from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";
import { useLocation } from "react-router-dom";
import {useState} from "react";



export const QuruxApp = () => {

    const location = useLocation();
    const isLogin = location.pathname.split('/')[1] === 'login' || location.pathname.split('/')[1] === 'signup' || location.pathname.split('/')[1] === 'signup-especialistas';
    const [token, setToken] = useState(() => localStorage.getItem('user-token'));

    return (
        // <UserProvider>
            <ChakraBaseProvider theme={theme}>
                <ScrollToTop />
                {!isLogin && <NavBar setToken={setToken} />}
                <Box mt={!isLogin && '60px'}>
                    <QuruxRoutes setToken ={setToken} />
                </Box>
                {!isLogin && <Footer />}
            </ChakraBaseProvider>
        // </UserProvider>
    );
}