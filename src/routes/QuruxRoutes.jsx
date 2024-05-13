import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"
import { Inicio } from '../pages/Inicio'
import { Mundohombres } from '../pages/Mundohombres'
import { ListaE } from '../pages/ListaE'
import { Mundomujeres } from '../pages/Mundomujeres'
import { Mundomascotas } from "../pages/Mundomascotas"
import { Login } from "../pages/login/Login"
import { Auth } from "../pages/login/Auth"
import { Guiaespecialista } from '../pages/Guiaespecialista'
import { Terminos } from '../pages/Terminos'
import { GuiaUsuario } from '../pages/GuiaUsuario'
import { TCEspecialistas } from '../pages/TCEspecialistas'
import { AgendarEspecialista } from "../pages/AgendarEspecialista"
import { Checkout } from "../pages/pasarela/Checkout"
import { useUserStore } from "../store/userStore"
import { ClientRegisterForm } from "../pages/login/ClienteRegisterForm"
import { SpecialistsRegisterForm } from "../pages/login/SpecialistsRegisterForm"




// eslint-disable-next-line react/prop-types
export const QuruxRoutes = ({ setToken }) => {
        const { userRole } = useUserStore();

        const loged = userRole || userRole !== '';
        const admin = userRole === 'admin';
        const specialist = userRole === 'specialist';
        const client = userRole === 'client';

        console.log('userRole:', userRole);
        console.log('loged:', loged);
        console.log(client)

        return (
                <Routes>
                        <Route path="/" element={!specialist ? <Inicio /> : <Navigate to="/dashboard/perfil" />} />
                        <Route path="/mundohombres" element={!specialist ? <Mundohombres /> : <Navigate to="/dashboard/perfil" />} />
                        <Route path="/mundomujeres" element={!specialist ? <Mundomujeres /> : <Navigate to="/dashboard/perfil" />} />
                        <Route path="/mundomascotas" element={!specialist ? <Mundomascotas /> : <Navigate to="/dashboard/perfil" />} />
                        <Route path="/dashboard/*" element={<DashboardRoutes />} />
                        <Route path="/Guiaespecialista" element={<Guiaespecialista />} />
                        <Route path="/GuiaUsuario" element={<GuiaUsuario />} />
                        <Route path="/TCEspecialistas" element={<TCEspecialistas />} />
                        <Route path="/Terminos" element={<Terminos />} />
                        {/* <Route path="/ListaE" element={<ListaE />} /> */}
                        <Route path="/login" element={!loged ? <Login setToken={setToken} /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!loged ? <ClientRegisterForm /> : <Navigate to="/" />} />
                        <Route path="/signup-especialistas" element={!loged ? <SpecialistsRegisterForm /> : <Navigate to="/" />} />
                        <Route path="/auth" element={!loged ? <Auth /> : <Navigate to="/" />} />
                        <Route path="/agendar-especialista/:id/:paramsToSearch" element={client || userRole === ''?<AgendarEspecialista />:<Navigate to={'/'} />} />
                        <Route path="/checkout/:specialistId/:date/:value/:iva/:subject/:startTime/:estimatedEndTime/:serviceType/:specialistName" element={client?<Checkout />:<Navigate to={'/'} />} />



                        {/* Ruta comodín para cualquier ruta no coincidente */}
                        <Route path="/*" element={<Navigate to="/404" />} />

                        {/* Página 404 */}
                        <Route path="/404" element={<>Página no encontrada (404)</>} />
                </Routes>
        )
}