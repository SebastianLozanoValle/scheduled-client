import { Navigate, Route, Routes } from "react-router-dom"

export const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<>inicio de dashboard</>} />
            <Route path="opcion1" element={<>muestra opcion1</>} />
            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}