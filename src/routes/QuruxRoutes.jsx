import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"

export const QuruxRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<>Inicio</>} />
            <Route path="/nosotros" element={<>nosotros</>} />
            <Route path="/servicios" element={<>servicios</>} />
            <Route path="/boletin" element={<>boletin</>} />
            <Route path="/contacto" element={<>contacto</>} />
            <Route path="/dashboard/*" element={<><DashboardRoutes/></>} />
            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="/*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="/404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}