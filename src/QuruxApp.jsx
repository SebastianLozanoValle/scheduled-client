import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";
import { NavBar } from "./components/NavBar";
import theme from "./theme/theme"; 
import {Footer} from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";
import { useLocation } from "react-router-dom";



export const QuruxApp = () => {

    const location = useLocation();
    console.log(location.pathname.split('/')[1]);
    const isLogin = location.pathname.split('/')[1] === 'login';

    return (
        <ChakraBaseProvider theme={theme}>
            <ScrollToTop />
            {!isLogin && <NavBar />}
            <Box mt={!isLogin && '60px'}>
                <QuruxRoutes />
            </Box>
            {!isLogin && <Footer />}
            
        </ChakraBaseProvider>
        
    );
}