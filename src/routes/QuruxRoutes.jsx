import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"
import {Inicio} from '../pages/Inicio'
import {Mundohombres}  from '../pages/Mundohombres'
import {Especialista} from '../pages/Especialista'



export const QuruxRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<><Inicio/></>} />
            <Route path="/Mundohombres" element={<><Mundohombres/></>} />
            <Route path="/Mundomujeres" element={<>MUNDO MUJERES</>} />
            <Route path="/Mundomascotas" element={<>MUNDO MASCOTAS</>} />
            <Route path="/dashboard/*" element={<><DashboardRoutes/></>} />
            <Route path="/Especialista" element={<><Especialista/></>} />
            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="/*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="/404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}