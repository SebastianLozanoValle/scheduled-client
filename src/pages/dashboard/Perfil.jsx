import { useLazyQuery } from "@apollo/client";
import { useUserStore } from "../../store/userStore"
import { GET_CLIENT, GET_SPECIALIST, GET_USER } from "../../querys/querys";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { Accordion } from "@chakra-ui/react";
import { CustomAccordionItem } from "../../components/CustomAccordionItem";

export const Perfil = () => {
    const { userId, name, userRole } = useUserStore()

    const [getUser, { loading: loadingUser, data: dataUser }] = useLazyQuery(GET_USER);
    const [getSpecialist, { loading: loadingSpecialist, data: dataSpecialist }] = useLazyQuery(GET_SPECIALIST);
    const [getClient, { loading: loadingClient, data: dataClient }] = useLazyQuery(GET_CLIENT);

    const [user, setUser] = useState({});

    useEffect(() => {
        switch (userRole) {
            case "admin":
                getUser({ variables: { id: userId } });
                break;

            case "specialist":
                getSpecialist({ variables: { id: userId } });
                break;

            case "client":
                getClient({ variables: { id: userId } });
                break;

            default:
                break;
        }
        console.log(user)
    }, [userRole]);

    useEffect(() => {
        if (dataUser) {
            setUser(dataUser.getUser);
        } else if (dataSpecialist) {
            setUser(dataSpecialist.getSpecialist);
        } else if (dataClient) {
            setUser(dataClient.getClient);
        }
        console.log(dataUser, dataSpecialist, dataClient);
        console.log(user);
    }, [dataUser, dataSpecialist, dataClient]);
    console.log(user);
    // console.log(user.notifications[0].date)
    function timestampAFechaHora(timestamp) {
        // Crear un objeto Date con el timestamp
        const fecha = new Date(parseInt(timestamp));

        // Obtener los componentes de la fecha y hora
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript son 0-indexados
        const dia = fecha.getDate();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const segundos = fecha.getSeconds();

        // Formatear la fecha y hora como un string
        const fechaHoraFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;

        return fechaHoraFormateada;
    }
    return (
        <div className="flex flex-wrap w-full ml-0 mb-20 text-black min-h-[calc(100vh-108px)] pb-[64px] md:ml-[265px] md:pb-0 p-4 md:w-[calc(100vw-265px)]">
            <div className="w-full">
                <div className="p-4 w-full flex flex-wrap justify-between items-center gap-4">
                    <h2 className="text-5xl font-extrabold text-primary">Perfil</h2>
                    {
                        userRole === "specialist" ?
                            <div className="flex flex-wrap justify-center items-center">
                                {
                                    user.files?.length > 0 && (
                                        <div className="w-28 h-28 overflow-hidden rounded-full hover:scale-125 transition-all duration-500">
                                            {user.files.find(file => file.filename.includes("Profile")) && (
                                                <img
                                                    className='h-full w-full rounded-full object-cover bg-primary'
                                                    src={"http://localhost:33402/files/" + user.files.find(file => file.filename.includes("Profile")).filename}
                                                    alt={`Imagen de perfil`}
                                                />
                                            )}
                                        </div>
                                    )
                                }
                                <h2 className="text-5xl font-extrabold text-secondary bg-[#cccc] p-4 rounded">¡Bienvenido {name}!</h2>
                            </div>
                            :
                            <h2 className="text-5xl font-extrabold text-secondary bg-[#cccc] p-4 rounded">¡Bienvenido {name}!</h2>
                    }
                </div>
                <div className="p-4">
                    <p>Id: {userId}</p>
                    <p>Nombre: {name}</p>
                    <p>Roll: {userRole}</p>
                </div>
            </div>
            {
                loadingUser && <p>Cargando...</p>
            }
            {
                loadingSpecialist && <p>Cargando...</p>
            }
            {
                loadingClient && <p>Cargando...</p>
            }
            <div className="w-full flex flex-col gap-4 lg:w-1/2 p-4">
                {
                    userRole === "Specialist" &&
                    <div className="rounded-2xl border">
                        <Accordion allowToggle>
                            <CustomAccordionItem title="Administrar imagenes">
                                <Accordion allowToggle>
                                    <CustomAccordionItem title="Añadir imagenes a servicios">
                                        <form>
                                            Selec
                                        </form>
                                    </CustomAccordionItem>
                                </Accordion>
                            </CustomAccordionItem>
                        </Accordion>
                    </div>
                }
                <div>
                    <h2 className="text-3xl font-extrabold text-primary">Datos Generales</h2>
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-primary">Editar Perfil</h2>
                </div>
            </div>

            <div className="w-full lg:w-1/2">
                <div className="w-full">
                    <div className="p-4 w-full">
                        <h2 className="text-3xl font-extrabold text-primary">Notificaciones</h2>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 max-h-96 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                        {
                            user.notifications?.length > 0 ? user.notifications.map(notification => {
                                return (
                                    <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                        <div className={`${notification.tipo == 'Aprobar' ? 'bg-green-500 border-green-500 border' : notification.tipo == 'Rechazado' ? 'bg-red-500 border-red-500 border' : 'bg-[#ccc] border-[#ccc] border'} absolute top-0 left-0 h-full w-3`}></div>
                                        <p>Para: {notification.recipient}</p>
                                        <p>Mensaje Adjunto: {notification.message}</p>
                                        <p className="absolute bottom-0 right-3 font-extralight text-[#ccc]">{timestampAFechaHora(notification.date)}</p>
                                        <button><ImCross className="absolute top-3 right-3 text-[#ccc] hover:text-red-500" /></button>
                                    </div>
                                )
                            }) :
                                <p>No tiene notificaciones.</p>
                        }
                    </div>
                </div>
                <div className="w-full">
                    <div className="p-4 w-full">
                        <h2 className="text-3xl font-extrabold text-primary">Papelera</h2>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 max-h-40 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                        {
                            user.notifications?.length > 0 ? user.notifications.map(notification => {
                                return (
                                    <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                        <div className={`${notification.tipo == 'Aprobar' ? 'bg-green-500 border-green-500 border' : notification.tipo == 'Rechazado' ? 'bg-red-500 border-red-500 border' : 'bg-[#ccc] border-[#ccc] border'} absolute top-0 left-0 h-full w-3`}></div>
                                        <p>Para: {notification.recipient}</p>
                                        <p>Mensaje Adjunto: {notification.message}</p>
                                        <p className="absolute bottom-0 right-3 font-extralight text-[#ccc]">{timestampAFechaHora(notification.date)}</p>
                                        <button><ImCross className="absolute top-3 right-3 text-[#ccc] hover:text-red-500" /></button>
                                    </div>
                                )
                            }) :
                                <p>Su papelera esta vacia.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}