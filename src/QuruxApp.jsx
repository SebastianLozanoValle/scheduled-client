import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";
import { NavBar } from "./components/NavBar";
import theme from "./theme/theme"; 
import {Footer} from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";



export const QuruxApp = () => {
    return (
        <ChakraBaseProvider theme={theme}>
            <ScrollToTop />
            <NavBar />
            <Box mt='60px'>
                <QuruxRoutes />
            </Box>
            <Footer />
            
        </ChakraBaseProvider>
        
    );
}