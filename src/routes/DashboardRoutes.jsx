import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import DashboardBottomNavBar from "../components/DashboardBottomNavBar"
import { DashboardSideNavBar } from "../components/DashboardSideNavBar"
import { useEffect, useState } from "react";
import { General } from "../pages/dashboard/General";
import { Flex } from "@chakra-ui/react";
import { Especialistas } from "../pages/dashboard/Especialistas";
import { Pruebas } from "../pages/dashboard/Pruebas";
import { Clientes } from "../pages/dashboard/Clientes";
import { useUserStore } from "../store/userStore";
import { Agenda } from "../pages/dashboard/Agenda";
import { EspecialistasSinAprovar } from "../pages/dashboard/EspecialistasSinAprovar";
import { EspecialistasRechazados } from "../pages/dashboard/EspecialistasRechazados";
import { Perfil } from "../pages/dashboard/Perfil";

export const DashboardRoutes = () => {
    const location = useLocation();
    const { userRole } = useUserStore();

    const loged = userRole || userRole !== '';
    const admin = userRole === 'admin';
    const specialist = userRole === 'specialist';
    const client = userRole === 'client';

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
                <Route path="/" element={admin ? <General isMobile={isMobile} /> : <Navigate to="/dashboard/perfil" />} />
                <Route path="especialistas" element={admin ? <Especialistas /> : <Navigate to="/dashboard/perfil" />} />
                <Route path="especialistas-sin-aprobar" element={admin ? <EspecialistasSinAprovar /> : <Navigate to="/dashboard/perfil" />} />
                <Route path="especialistas-rechazados" element={admin ? <EspecialistasRechazados /> : <Navigate to="/dashboard/perfil" />} />
                <Route path="clientes" element={admin ? <Clientes /> : <Navigate to="/dashboard/perfil" />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="perfil" element={loged ? <Perfil /> : <Navigate to="/login" />} />
                {/* <Route path="clientes" element={<Clientes/>} /> */}
                <Route path="pruebas" element={<Pruebas />} />
                {/* Ruta comodín para cualquier ruta no coincidente */}
                <Route path="*" element={<Navigate to="/404" />} />

                {/* Página 404 */}
                <Route path="404" element={<>Página no encontrada (404)</>} />
            </Routes>
        </Flex>
    )
}