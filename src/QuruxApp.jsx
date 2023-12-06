import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";
import { NavBar } from "./components/NavBar";
import theme from "./theme/theme";



export const QuruxApp = () => {
    return (
        <ChakraBaseProvider theme={theme}>
            <NavBar />
            <Box mt={16}>
                <QuruxRoutes />
            </Box>
            
        </ChakraBaseProvider>
        
    );
}