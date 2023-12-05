import { Navigate, Route, Routes } from "react-router-dom"
import DashboardBottomNavBar from "../components/DashboardBottomNavBar"
import { DashboardSideNavBar } from "../components/DashboardSideNavBar"
import { useEffect, useState } from "react";
import { General } from "../pages/dashboard/General";
import { Flex } from "@chakra-ui/react";

export const DashboardRoutes = () => {

    const [isMobile, setIsMobile] = useState(false); // Estado para saber si es móvil o no

    useEffect(() => {
        // Actualiza el estado con el valor de la ventana
        setIsMobile(window.innerWidth <= 768);
        // Función que se ejecuta cada vez que se redimensiona la ventana
        const handleResize = () => {
            // Actualiza el estado con el valor de la ventana
            setIsMobile(window.innerWidth <= 768);
        }
        // Agrega el listener del evento resize
        window.addEventListener('resize', handleResize);
        // Elimina el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <Flex>
            {isMobile ? (
                <DashboardBottomNavBar />
            ) : (
                <DashboardSideNavBar />
            )}
            <Routes>
                <Route path="/" element={<General isMobile={isMobile} />} />
                <Route path="specialists" element={<>muestra opcion1</>} />
                {/* Ruta comodín para cualquier ruta no coincidente */}
                <Route path="*" element={<Navigate to="/404" />} />
                
                {/* Página 404 */}
                <Route path="404" element={<>Página no encontrada (404)</>} />
            </Routes>
        </Flex>
    )
}