import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardSideNavBar } from "../components/DashboardSideNavBar"

export const DashboardRoutes = () => {
    return (
        <>
            <DashboardSideNavBar />
            <Routes>
                <Route path="/" element={<>inicio de dashboard</>} />
                <Route path="specialists" element={<>muestra opcion1</>} />
                {/* Ruta comodín para cualquier ruta no coincidente */}
                <Route path="*" element={<Navigate to="/404" />} />
                
                {/* Página 404 */}
                <Route path="404" element={<>Página no encontrada (404)</>} />
            </Routes>
        </>
    )
}