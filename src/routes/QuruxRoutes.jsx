import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"
import {Inicio} from '../pages/Inicio'
import {Mundohombres}  from '../pages/Mundohombres'
import {ListaE} from '../pages/ListaE'
import {Mundomujeres} from '../pages/Mundomujeres'
import { Mundomascotas } from "../pages/Mundomascotas"




export const QuruxRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<><Inicio/></>} />
            <Route path="/Mundohombres" element={<><Mundohombres/></>} />
            <Route path="/Mundomujeres" element={<><Mundomujeres/></>} />
            <Route path="/Mundomascotas" element={<><Mundomascotas/></>} />
            <Route path="/dashboard/*" element={<><DashboardRoutes/></>} />
            <Route path="/ListaE" element={<><ListaE/></>} />
           

            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="/*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="/404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}