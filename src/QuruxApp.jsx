import { ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";
import { NavBar } from "./components/NavBar";

export const QuruxApp = () => {
    return (
        <ChakraBaseProvider>
            <NavBar />
            <QuruxRoutes />
        </ChakraBaseProvider>
    );
}