// import { useQuery } from "@apollo/client";
// import { GET_CLIENTS } from "../querys/querys";
// import { useEffect, useState } from "react";
// import { useUserStore } from "../store/userStore";

// export const AdicionalAppointment = ({ appointment }) => {

//     const { name, userId, userRole, setUser } = useUserStore();
//     const { clientsLoading, clientsError, clientsData } = useQuery(GET_CLIENTS);
//     const { specialistsLoading, specialistsError, specialistsData } = useQuery(GET_CLIENTS);

//     const clients = clientsData?.getClients || [];
//     // const specialists = data?.findSpecialists || [];
//     console.log(clients)

//     const [client, setClient] = useState();
//     const [specialist, setSpecialist] = useState();

//     useEffect(() => {
//         if (clients.length > 0) { // Verifica si clients tiene datos
//             console.log('si es mayor a 0')
//             console.log(clients[1].username)
//             console.log(appointment.clientUsername)

//             setClient(clients.find((client) => client.username.toLowerCase() === appointment.clientUsername.toLowerCase()));
//         }
//     }, [clients]); // Añade appointment.clientId como dependencia para que el efecto se dispare cuando cambie

//     // useEffect(() => {
//     //     if (clients.length > 0) { // Verifica si clients tiene datos
//     //         console.log('si es mayor a 0')
//     //         console.log(clients[1].username)
//     //         console.log(appointment.clientUsername)

//     //         setClient(clients.find((client) => client.username.toLowerCase() === appointment.clientUsername.toLowerCase()));
//     //     }
//     // }, [specialists]); // Añade appointment.clientId como dependencia para que el efecto se dispare cuando cambie

//     useEffect(() => {
//         console.log(client)
//     }, [client])

//     console.log(appointment);
//     console.log(appointment.serviceType);

//     return (
//         <div className="flex flex-wrap gap-8">
//             <div>
//                 <h3 className="text-bolder text-xl text-primary">Monto:</h3>
//                 <p>{appointment.value}</p>
//             </div>
//             {
//                 appointment.serviceType === "Domicilio" && // Asegúrate de que el cliente existe
//                 <div>
//                     <h3 className="text-bolder text-xl text-primary">Dirección del servicio:</h3>
//                     <p>
//                         {`${client?.city} ${client?.street}`} {/* Mostrar la dirección del cliente */}
//                     </p>
//                 </div>
//             }
//             <div>
//                 <h3 className="text-bolder text-xl text-primary">Detalle:</h3>
//                 <p>{appointment.detail}</p>
//             </div>
//             <div className="flex gap-8">
//                 <div>
//                     <h3 className="text-bolder text-xl text-primary">Hora Inicio:</h3>
//                     <p>{appointment.startTime}</p>
//                 </div>
//                 <div>
//                     <h3 className="text-bolder text-xl text-primary">Hora Fin Estimado:</h3>
//                     <p>{appointment.estimatedEndTime}</p>
//                 </div>
//             </div>
//             <div className="w-full flex gap-4 justify-end">
//                 {
//                     userRole === "specialist" && <button className="rounded-lg border hover:bg-white text-white hover:text-primary bg-primary border-primary transition-all duration-500 p-2">Marcar como finalizada</button>
//                 }
//                 <button className="rounded-lg border hover:bg-white text-white hover:text-red-500 bg-red-500 border-red-500 transition-all duration-500 p-2">cancelar cita</button>
//             </div>
//         </div>
//     );
// };


import { useQuery } from "@apollo/client";
import { FIND_SPECIALISTS, GET_CLIENTS } from "../querys/querys";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

export const AdicionalAppointment = ({ appointment }) => {

    const { name, userId, userRole, setUser } = useUserStore();
        const { clientsLoading, clientsError, data:dataClients } = useQuery(GET_CLIENTS);
        const { specialistsLoading, specialistsError,data: dataSpecialists } = useQuery(FIND_SPECIALISTS);

    const specialists = dataSpecialists?.findSpecialists || [];
    const clients = dataClients?.getClients || [];
    console.log(clients)
    console.log(specialists)

    console.log(dataSpecialists?.findSpecialists)

    const [client, setClient] = useState();
    const [specialist, setSpecialist] = useState();

    useEffect(() => {
        if (clients.length > 0) { // Verifica si clients tiene datos
            // console.log('si es mayor a 0')
            // console.log(clients[1].username)
            // console.log(appointment.clientUsername)

            setClient(clients.find((client) => client.username.toLowerCase() === appointment.clientUsername.toLowerCase()));
        }
        if (specialists.length > 0) { // Verifica si clients tiene datos
            // console.log('si es mayor a 0')
            // console.log(specialists[1].username)
            // console.log(appointment.specialistUsername)

            setSpecialist(specialists.find((specialist) => specialist.username.toLowerCase() === appointment.specialistUsername.toLowerCase()));
        }
    }, [clients, appointment.clientId, specialists, appointment, appointment.specialistId]); // Añade appointment.clientId como dependencia para que el efecto se dispare cuando cambie

    useEffect(() => {
        console.log(dataSpecialists?.findSpecialists)
    }, [dataSpecialists])

    console.log(appointment);
    console.log(appointment.serviceType);

    return (
        <div className="flex flex-wrap gap-8">
            <div>
                <h3 className="text-bolder text-xl text-primary">Monto:</h3>
                <p>{appointment.value}</p>
            </div>
            {
                userRole !== "admin" &&  (appointment.serviceType === "Domicilio" ? // Asegúrate de que el cliente existe
                    <div>
                        <h3 className="text-bolder text-xl text-primary">Dirección del servicio:</h3>
                        <p>
                            {userRole == 'specialist' ? `${client?.city} ${client?.street}` : `${specialist?.city} ${specialist?.street}`} {/* Mostrar la dirección del cliente */}
                        </p>
                    </div>
                    :
                    <div>
                        <h3 className="text-bolder text-xl text-primary">Dirección del servicio:</h3>
                        <p>
                            {userRole == 'specialist' ? `${client?.city} ${client?.street}` : `${specialist?.city} ${specialist?.street}`} {/* Mostrar la dirección del cliente */}
                        </p>
                    </div>)
            }
            <div>
                <h3 className="text-bolder text-xl text-primary">Detalle:</h3>
                <p>{appointment.detail}</p>
            </div>
            <div className="flex gap-8">
                <div>
                    <h3 className="text-bolder text-xl text-primary">Hora Inicio:</h3>
                    <p>{appointment.startTime}</p>
                </div>
                <div>
                    <h3 className="text-bolder text-xl text-primary">Hora Fin Estimado:</h3>
                    <p>{appointment.estimatedEndTime}</p>
                </div>
            </div>
            <div className="w-full flex gap-4 justify-end">
                {
                    userRole === "specialist" && <button className="rounded-lg border hover:bg-white text-white hover:text-primary bg-primary border-primary transition-all duration-500 p-2">Marcar como finalizada</button>
                }
                <button className="rounded-lg border hover:bg-white text-white hover:text-red-500 bg-red-500 border-red-500 transition-all duration-500 p-2">cancelar cita</button>
            </div>
        </div>
    );
};
