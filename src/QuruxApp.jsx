import { ChakraBaseProvider } from "@chakra-ui/react";
import { QuruxRoutes } from "./routes/QuruxRoutes";

export const QuruxApp = () => {
    return (
        <ChakraBaseProvider>
            <h1>Qurux App</h1>
            <QuruxRoutes />
        </ChakraBaseProvider>
    );
}