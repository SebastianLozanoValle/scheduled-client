import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"
import {Inicio} from '../pages/Inicio'

export const QuruxRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<><Inicio/></>} />
            <Route path="/Mundohombres" element={<>MUNDO HOMBRES</>} />
            <Route path="/Mundomujeres" element={<>MUNDO MUJERES</>} />
            <Route path="/Mundomascotas" element={<>MUNDO MASCOTAS</>} />
            <Route path="/contacto" element={<>contacto</>} />
            <Route path="/dashboard/*" element={<><DashboardRoutes/></>} />
            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="/*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="/404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}