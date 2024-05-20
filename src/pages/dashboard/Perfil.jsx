import { useLazyQuery, useQuery } from "@apollo/client";
import { useUserStore } from "../../store/userStore"
import { GET_CLIENT, GET_NOTIFICATIONS_BY_RECIPIENT, GET_NOTIFICATIONS_BY_SENDER, GET_SPECIALIST, GET_USER } from "../../querys/querys";
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { Accordion, useToast } from "@chakra-ui/react";
import { CustomAccordionItem } from "../../components/CustomAccordionItem";
import { Notification } from "../../components/Notification";
import { useForm } from "react-hook-form";
import InputDropZone from "../../components/InputDropZone";
import { v4 as uuid } from "uuid"
import { UserForm } from "../../components/UserForm";
import { EditarHorario } from "../../components/EditarHorario";
import { AditionalDataForm } from "../../components/AditionalDataForm";
import { EdicionMundosServicios } from "../../components/EdicionMundosServicios";
import { FormularioServicios } from "../../components/FormularioServicios";
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";

export const Perfil = () => {
    const inputDropZoneRef1 = useRef();
    const toast = useToast();
    const [files, setFiles] = useState([]);
    const { userId, name, userRole } = useUserStore()
    const [servicio, setServicio] = useState("");

    const { register, handleSubmit, formState: { errors }, getValues, watch, setValue } = useForm({
        mode: "onChange"
    });

    const currentService = watch("service");

    const [getUser, { loading: loadingUser, data: dataUser }] = useLazyQuery(GET_USER);
    const [getSpecialist, { loading: loadingSpecialist, data: dataSpecialist }] = useLazyQuery(GET_SPECIALIST);
    const [getClient, { loading: loadingClient, data: dataClient }] = useLazyQuery(GET_CLIENT);


    const { loading: loadingSender, error: errorSender, data: dataSender } = useQuery(GET_NOTIFICATIONS_BY_SENDER, {
        variables: { id: userId },
    });

    const { loading: loadingRecipient, error: errorRecipient, data: dataRecipient } = useQuery(GET_NOTIFICATIONS_BY_RECIPIENT, {
        variables: { id: userId },
    });

    const [user, setUser] = useState({});
    const [sended, setSended] = useState([]);
    const [resived, setResived] = useState([]);
    const [enviadosResividos, setEnviadosResividos] = useState(true)

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
        // console.log(user)
    }, [userRole]);

    useEffect(() => {
        if (dataUser) {
            setUser(dataUser.getUser);
        } else if (dataSpecialist) {
            setUser(dataSpecialist.getSpecialist);
        } else if (dataClient) {
            setUser(dataClient.getClient);
        }
        // console.log(dataUser, dataSpecialist, dataClient);
        // console.log(user);
    }, [dataUser, dataSpecialist, dataClient]);

    useEffect(() => {
        if (dataSender?.getNotificationsBySender) {
            setSended(dataSender.getNotificationsBySender)
        }
        if (dataRecipient?.getNotificationsByRecipient) {
            setResived(dataRecipient.getNotificationsByRecipient)
        }
    }, [dataSender, dataRecipient])

    // useEffect(() => {

    //     console.log(resived)

    //     console.log(sended)
    // }, [sended, resived])

    // console.log(user);
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

    // console.log(resived)
    const notifications = resived.filter(notification => {
        return notification.tipo !== "Papelera";
    }) || [];
    // console.log("NOTIFICACIONES", notifications);

    const papelera = resived.filter(notification => {
        return notification.tipo === "Papelera";
    }) || [];

    const enviados = sended.filter(enviado => {
        return enviado.tipo !== "Papelera"
    })

    const papeleraEnviados = sended.filter(enviado => {
        return enviado.tipo === "Papelera"
    })

    const handleSetResividos = () => {
        setEnviadosResividos(true)
    }

    const handleSetEnviados = () => {
        setEnviadosResividos(false)
    }

    // console.log(user.specialtys)

    const onSubmit = () => {
        if (currentService !== "Seleccione El Servicio") {
            const Subido = inputDropZoneRef1.current.uploadFiles();
            if (Subido) {
                toast({
                    title: "Success",
                    description: `Archivo Subido`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setFiles([])
                setValue("service", 'Seleccione El Servicio')
            } else {
                toast({
                    title: "Error",
                    description: "Failed to Upload.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }

    const onSubmitLocal = (e) => {
        e.preventDefault();
        console.log('entro al onsubmitlocal ejwahfuhauswfhuashuifduisdhfuihiuashudfhiuhsadufhuisdhuhuhsduifhuiseuifiuhihf')
        if (files.length > 0) {
            console.log('entro aca');
            const Subido = inputDropZoneRef1.current.uploadFiles();
            if (Subido) {
                toast({
                    title: "Success",
                    description: `Archivo Subido`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setFiles([])
                setValue("service", 'Seleccione El Servicio')
            } else {
                toast({
                    title: "Error",
                    description: "Failed to Upload.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }

    useEffect(() => {
        if (currentService) {
            setServicio(currentService)
        }
        setFiles([])
    }, [currentService])

    return (
        <div className="flex flex-wrap w-full ml-0 mb-20 text-black min-h-[calc(100vh-108px)] pb-[64px] md:ml-[265px] md:pb-0 p-4 md:w-[calc(100vw-265px)]">
            <div className="w-full">
                <div className="p-4 w-full flex flex-wrap justify-between items-center gap-4">
                    <h2 className="text-5xl font-extrabold text-primary">Perfil</h2>
                    {
                        userRole === "specialist" ?
                            <div className="flex flex-wrap gap-4 justify-center items-center">
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
                                <h2 className="text-5xl font-extrabold text-secondary bg-[#cccc] p-4 rounded">¡Bienvenido {user.username}!</h2>
                            </div>
                            :
                            <h2 className="text-5xl font-extrabold text-secondary bg-[#cccc] p-4 rounded">¡Bienvenido {user.username}!</h2>
                    }
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
                <div>
                    <h2 className="text-3xl font-extrabold text-primary">Datos Generales</h2>
                    <div className="p-4">
                        <p>Correo: {user.email}</p>
                        <p>Nombre: {user.username}</p>
                        <p>Roll: {userRole}</p>
                    </div>
                </div>
                {
                    userRole === "specialist" &&
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-extrabold text-primary">Ingresos</h2>
                        <div className="flex flex-wrap gap-8 justify-center text-center">
                            <div className="flex flex-col gap-2 justify-center items-center p-4 bg-primary rounded-lg shadow-md text-white hover:scale-110 transition-all duration-500 w-full md:w-[30%]">
                                <h4>
                                    Ingresos desde que empezo
                                </h4>
                                <p>
                                    $0
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-center p-4 bg-primary rounded-lg shadow-md text-white hover:scale-110 transition-all duration-500 w-full md:w-[30%]">
                                <h4>
                                    Ingresos pendientes
                                </h4>
                                <p>
                                    $0
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-center p-4 bg-primary rounded-lg shadow-md text-white hover:scale-110 transition-all duration-500 w-full md:w-[30%]">
                                <h4>
                                    Ingresos ultimo mes
                                </h4>
                                <p>
                                    $0
                                </p>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="flex flex-wrap gap-2 justify-between items-center p-4 bg-primary rounded-lg shadow-md text-white hover:scale-110 md:hover:scale-105 transition-all duration-500 w-full">
                                <button className='p-2 text-6xl mx-auto text-white transition-all duration-500 hover:scale-110 hover:text-slate-700 bg-transparent' onClick={() => scrollSpecialists('left')}><RiArrowLeftCircleLine /></button>
                                <div className="flex flex-col">
                                    <h4>
                                        Ingresos de enero(ejemplo)
                                    </h4>
                                    <p>
                                        $0
                                    </p>
                                </div>
                                <button className='p-2 text-6xl mx-auto text-white transition-all duration-500 hover:scale-110 hover:text-slate-700 bg-transparent' onClick={() => scrollSpecialists('right')}><RiArrowRightCircleLine /></button>
                            </div>
                        </div>
                        <p className="text-[#ccc] text-center">Recuerde que todos los pagos se realizan semanalmente el dia (aun no esta definido el dia)</p>
                    </div>
                }
                {
                    (userRole === "specialist" || userRole === "client") && (
                        <div>
                            <h2 className="text-3xl font-extrabold text-primary">Editar Perfil</h2>
                            {userRole === "specialist" && <h3 className="text-2xl">Datos Basicos:</h3>}
                            <div className="w-4/5 mx-auto">
                                <UserForm user={user} />
                            </div>
                            {userRole === "specialist" && user.weeklySchedule &&
                                <div className="flex flex-col">
                                    <h3 className="text-2xl">Editar Horario:</h3>
                                    <div className="w-4/5 mx-auto h-[400px] overflow-y-scroll px-4 pt-4 m-10">
                                        <EditarHorario specialist={user} />
                                    </div>
                                    <h3 className="text-2xl">Otros datos:</h3>
                                    <div className="w-4/5 mx-auto">
                                        <AditionalDataForm user={user} />
                                    </div>
                                    <h3 className="text-2xl">Editar Servicios:</h3>
                                    <div className="w-4/5 mx-auto px-4 m-10 h-[400px] overflow-y-scroll">
                                        <FormularioServicios user={user} />
                                    </div>
                                    <h3 className="text-2xl">Añadir Mundos y Servicios:</h3>
                                    <div className="w-4/5 mx-auto px-4 pt-4 m-10">
                                        <EdicionMundosServicios user={user} />
                                    </div>
                                </div>
                            }

                        </div>
                    )
                }
                {
                    userRole === "specialist" &&
                    <div className="rounded-2xl border">
                        <Accordion allowToggle>
                            <CustomAccordionItem title="Administrar imagenes">
                                <Accordion allowToggle>
                                    <CustomAccordionItem title="Añadir imagenes a servicios">
                                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl">
                                            <div className="flex gap-4">
                                                <label htmlFor="service">Servicio</label>
                                                <select
                                                    key={uuid()}
                                                    className="rounded border"
                                                    id="service"
                                                    {...register("service", { required: "Este campo es requerido" })}
                                                // defaultValue={user.specialtys}
                                                >
                                                    {
                                                        user.specialtys?.map(service => {
                                                            return (
                                                                <option key={service.id + uuid()} value={service.name}>{service.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            {
                                                currentService !== "" ?
                                                    <>
                                                        <InputDropZone
                                                            fileName={servicio}
                                                            tipo={servicio}
                                                            recomendedSize={'Adjunte una foto para el sericio ' + servicio}
                                                            userId={userId}
                                                            ref={inputDropZoneRef1}
                                                            files={files}
                                                            setFiles={setFiles}
                                                        />
                                                        {
                                                            console.log(currentService)
                                                        }
                                                        <div className='flex w-full justify-center'>
                                                            <input type="submit" value="Subir" className="py-2 px-12 bg-primary text-white rounded cursor-pointer" />
                                                        </div>
                                                    </>
                                                    :
                                                    <h3 className="p-4 text-primary">Seleccione un Servicio para poder subir archivos a este.</h3>
                                            }
                                        </form>
                                    </CustomAccordionItem>
                                    <CustomAccordionItem title="Añadir imagenes del Local">
                                        <form onSubmit={onSubmitLocal} className="bg-white p-4 rounded-xl">
                                            <InputDropZone
                                                fileName={'Local'}
                                                tipo={'Local'}
                                                recomendedSize='400x400'
                                                userId={userId}
                                                ref={inputDropZoneRef1}
                                                files={files}
                                                setFiles={setFiles}
                                            />
                                            <div className='flex w-full justify-center'>
                                                <input type="submit" value="Subir" className="py-2 px-12 bg-primary text-white rounded cursor-pointer" />
                                            </div>
                                        </form>
                                    </CustomAccordionItem>
                                </Accordion>
                            </CustomAccordionItem>
                        </Accordion>
                    </div>
                }
            </div>
            <div className="w-full lg:w-1/2">
                <div className="w-full flex relative rounded-full bg-[#f1f1f1] justify-around">
                    <span className={`absolute w-1/2 bg-primary h-full left-0 z-0 transition-all duration-500 rounded-full ${enviadosResividos == false && "left-1/2"}`}></span>
                    <button className="z-[1] w-1/2" onClick={handleSetResividos}>Recibidos</button>
                    <button className="z-[1] w-1/2" onClick={handleSetEnviados}>Enviados</button>
                </div>
                {
                    enviadosResividos ?
                        <>
                            <div className="w-full">
                                <div className="p-4 w-full">
                                    <h2 className="text-3xl font-extrabold text-primary">Notificaciones Resibidas</h2>
                                </div>
                                <div className="flex flex-col gap-y-4 p-4 max-h-96 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                                    {
                                        notifications?.length > 0 ? notifications.map(notification => {
                                            return (
                                                <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                                    <Notification notification={notification} id={userId} />
                                                </div>
                                            )
                                        }) :
                                            <p>No tiene notificaciones.</p>
                                    }
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="p-4 w-full">
                                    <h2 className="text-3xl font-extrabold text-primary">Papelera Resibidos</h2>
                                </div>
                                <div className="flex flex-col gap-y-4 p-4 max-h-40 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                                    {
                                        papelera?.length > 0 ? papelera.map(notification => {
                                            return (
                                                <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                                    <Notification notification={notification} id={userId} />
                                                </div>
                                            )
                                        }) :
                                            <p>Su papelera esta vacia.</p>
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="w-full">
                                <div className="p-4 w-full">
                                    <h2 className="text-3xl font-extrabold text-primary">Notificaciones Enviadas</h2>
                                </div>
                                <div className="flex flex-col gap-y-4 p-4 max-h-96 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                                    {
                                        enviados?.length > 0 ? enviados.map(notification => {
                                            return (
                                                <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                                    <Notification notification={notification} id={userId} />
                                                </div>
                                            )
                                        }) :
                                            <p>No tiene notificaciones enviadas.</p>
                                    }
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="p-4 w-full">
                                    <h2 className="text-3xl font-extrabold text-primary">Papelera enviados</h2>
                                </div>
                                <div className="flex flex-col gap-y-4 p-4 max-h-40 overflow-y-scroll border-t-8 border-b-8 border-primary rounded">
                                    {
                                        papeleraEnviados?.length > 0 ? papeleraEnviados.map(notification => {
                                            return (
                                                <div className={` p-4 relative border rounded-r-3xl`} key={notification.id}>
                                                    <Notification notification={notification} id={userId} />
                                                </div>
                                            )
                                        }) :
                                            <p>Su papelera esta vacia.</p>
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}