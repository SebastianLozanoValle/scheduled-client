import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Service } from "./Service";
import { IS_SLOT_AVAILABLE } from "../querys/querys";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const AgendaForm = ({ especialista }) => {

    const { userRole } = useUserStore();

    const isClient = userRole === 'client';

    const navigate = useNavigate();
    const [alreadyValidated, setAlreadyValidated] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [endTime, setEndTime] = useState("0:0");
    const [mensajeError, setMensajeError] = useState('');
    const [fecha, setFecha] = useState('');
    const [total, setTotal] = useState(0);
    const [servicesNames, setServicesNames] = useState([]);
    const [prueba, setPrueba] = useState({
        date: "",
        specialistId: especialista.id,
        startTime: "",
        estimatedEndTime: "",
        serviceType: "Local"
    });

    const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm({
        mode: "onChange"
    });

    const [available, respuesta] = useMutation(IS_SLOT_AVAILABLE, {
        onError: (error) => {
            console.error('Error al verificar la disponibilidad:', error);
        }
    });

    const selectedDate = watch("date");
    const selectedHour = watch("startTime");
    const selectedServiceType = watch("serviceType");

    const handleServiceCheck = (servicio) => {
        setSelectedServices(prevServices => {
            if (prevServices.find(service => service.name === servicio.name)) {
                return prevServices.filter(service => service.name !== servicio.name);
            } else {
                return [...prevServices, servicio];
            }
        });
    };

    const cambiarConsulta = () => {
        setAlreadyValidated(false);
    }

    const onSubmit = () => {
        // console.log('navegando a pasarela');
        // console.log({
        //     specialistId: especialista.id,
        //     date: fecha,
        //     value: total,
        //     iva: 0,
        //     services: servicesNames,
        //     startTime: prueba.startTime,
        //     estimatedEndTime: prueba.estimatedEndTime,
        //     serviceType: prueba.serviceType,
        //     specialistName: especialista.username
        // })
        navigate(`/checkout/${especialista.id}/${fecha}/${total}/${0}/${servicesNames}/${prueba.startTime}/${prueba.estimatedEndTime}/${prueba.serviceType}/${especialista.username}`);
        // /checkout/:specialistId/:date/:value/:iva/:subject/:startTime/:estimatedEndTime/:serviceType
    }

    let diasDeLaSemana = {
        "Monday": "Lunes",
        "Tuesday": "Martes",
        "Wednesday": "Miércoles",
        "Thursday": "Jueves",
        "Friday": "Viernes",
        "Saturday": "Sábado",
        "Sunday": "Domingo"
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {

        if (selectedDate) {
            const [year, month, day] = selectedDate.split('-');
            const formattedDate = `${month}-${day}-${year}`;
            setFecha(formattedDate);
        }

    }, [selectedDate]);

    useEffect(() => {
        console.log(selectedServiceType)
        setPrueba({
            date: fecha,
            specialistId: especialista.id,
            startTime: selectedHour,
            estimatedEndTime: endTime,
            serviceType: selectedServiceType
        });

    }, [fecha, selectedHour, endTime, selectedServiceType]);

    const minutesToInt = (hour) => {

        const time = hour;
        const parts = time.split(":");
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        return hours * 60 + minutes;
    }

    const intToMinutes = (time) => {
        const hours = Math.floor(time / 60);
        const min = time % 60;
        return `${hours}:${min == 0 ? '00' : min}`;
    }

    useEffect(() => {
        // console.log(selectedServices)
        // console.log(selectedHour)
        setEndTime(intToMinutes(
            (selectedHour && selectedServices.length > 0 &&
                // console.log(minutesToInt(selectedHour))
                // selectedServices.map((service) => {
                //     console.log(service.time)
                //     console.log(minutesToInt(service.time))
                // })
                selectedServices.reduce((acc, service) => {
                    if (typeof service.time === 'string') {
                        return acc + minutesToInt(service.time);
                    } else {
                        console.warn(`Invalid duration for service: ${service.name}`);
                        return acc;
                    }
                }, minutesToInt(selectedHour))
            )
        ))
        setTotal(selectedServices.reduce((acc, service) => acc + service.price, 0))
        setServicesNames(selectedServices.map(service => service.name))
    }, [selectedServices, selectedHour])

    const validateForm = () => {
        console.log('verificando disponibilidad');
        console.log(prueba);
        console.log(especialista)
        if (isClient) {
            console.log(prueba);
            available({ variables: { input: prueba } })
                .then(response => {
                    setAlreadyValidated(response.data.isSlotAvailable.isSlotAvailable);
                    setMensajeError(response.data.isSlotAvailable.reason ? 'No hay disponibilidad en el horario seleccionado' : '')
                    console.log(response.data.isSlotAvailable);
                    console.log(respuesta);
                });
        } else {
            setMensajeError('Debe ser un cliente registrado para agendar una cita')
        }
        // const data = getValues();
        // console.log(data);
        // console.log(selectedServices)
        // setAlreadyValidated(!alreadyValidated);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mb-20">
            <div className={`flex flex-col ${alreadyValidated ? "hidden" : ""}`}>
                <label className="self-center font-extrabold text-3xl text-primary">Escoge los servicios</label>
                <div className="flex flex-wrap gap-8 mt-4 justify-evenly">
                    {
                        especialista.specialtys.map(servicio => (
                            <Service key={servicio.name} servicio={servicio} register={register} onServiceCheck={handleServiceCheck} />
                        ))
                    }
                </div>
            </div>

            <div className={`flex w-full justify-center items-center gap-8 transition-all ${alreadyValidated ? "flex-col" : "flex-wrap"}`}>
                <div className={`flex flex-col w-full ${!alreadyValidated && "gap-8"}`}>
                    <h2 className="self-center font-extrabold text-3xl text-primary">Escoge una fecha y hora, luego verifica la disponibilidad</h2>
                    <div className={`flex flex-wrap justify-between gap-8 p-4 lg:p-20 border-8 border-primary rounded-3xl ${alreadyValidated ? "hidden" : ""}`}>
                        <div>
                            <label className="font-bold" htmlFor="date">Fecha</label>
                            <div>
                                <input id="date" {...register("date", {
                                    required: "Este campo es requerido",
                                    validate: value => {
                                        const dayOfWeekMap = {
                                            "Monday": "Tuesday",
                                            "Tuesday": "Wednesday",
                                            "Wednesday": "Thursday",
                                            "Thursday": "Friday",
                                            "Friday": "Saturday",
                                            "Saturday": "Sunday",
                                            "Sunday": "Monday"
                                        };
                                        try {
                                            if (value) {
                                                // Convert the selected date to the day of the week
                                                const selectedDayOfWeek = new Date(value).toLocaleString('en-US', { weekday: 'long' });
                                                const mappedDayOfWeek = dayOfWeekMap[selectedDayOfWeek];
                                                console.log(mappedDayOfWeek)
                                                console.log(especialista.weeklySchedule)
                                                console.log(especialista.weeklySchedule[mappedDayOfWeek])
                                                if (especialista.weeklySchedule[mappedDayOfWeek][0].end ? false : true) {
                                                    // If it's not, show an error message
                                                    return 'The selected day is not available. Please choose another day.'
                                                }
                                            }
                                        } catch (error) {
                                            return "elija un dia en el que este disponible el especialista"
                                        }
                                    }
                                })}
                                    type="date" />
                            </div>
                            {errors.date && <span className="font-light text-red-500">{errors.date.message}</span>}
                        </div>
                        <div>
                            <label className="font-bold" htmlFor="hour">Hora de Inicio</label>
                            <div>
                                <input
                                    id="hour"
                                    {...register("startTime", {
                                        required: "Este campo es requerido",
                                        validate: value => {
                                            const minutes = value.split(':')[1];
                                            return (minutes === "00" || minutes === "30") || "Solo se pueden escoger horas con minuto 00 o 30";
                                        }
                                    })}
                                    type="time"
                                />
                            </div>
                            {errors.startTime && <span className="font-light text-red-500">{errors.startTime.message}</span>}
                        </div>
                        <div>
                            <label className="font-bold" htmlFor="serviceType">Tipo de Servicio</label>
                            <div>
                                <select
                                    className=""
                                    id="serviceType"
                                    {...register("serviceType", { required: "Este campo es requerido" })}
                                    defaultValue="Local"
                                >
                                    <option value="Local">Local</option>
                                    <option value="Domicilio">Domicilio</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {
                        alreadyValidated ? <button className="px-10 bg-primary rounded-lg text-white hover:border-primary hover:text-black hover:bg-white border transition-all duration-500" onClick={cambiarConsulta} type="button">Editar Cita</button>
                            : <button className="px-10 bg-primary rounded-lg text-white hover:border-primary hover:text-black hover:bg-white border transition-all duration-500" type="button" onClick={validateForm} >Verificar Disponibilidad</button>
                    }
                    {
                        mensajeError != "" ? <span className="font-light text-red-500">{mensajeError}</span> : ""
                    }
                </div>
                <div className="flex flex-col p-10 border-8 border-primary rounded-3xl">
                    <h3 className="self-center text-2xl font-bold p-10">
                        Detalle de la Cita
                    </h3>
                    <h4 className="text-xl font-semibold py-5">
                        Servicios:
                    </h4>
                    <ul className="list-disc pl-5">
                        {
                            selectedServices.length > 0 ? selectedServices.map((service, index) => (
                                <li key={index}>{service.name}</li>
                            )) :
                                <li className="font-light text-[#ccc]">No se ha seleccionado ningun servicio</li>
                        }
                    </ul>
                    <h4 className="text-xl font-semibold py-5">
                        Fecha de la cita:
                    </h4>
                    {
                        selectedDate ? <p>{selectedDate}</p> : <p className="font-light text-[#ccc]">No se ha seleccionado una fecha</p>
                    }
                    <h4 className="text-xl font-semibold py-5">
                        Hora de inicio:
                    </h4>
                    {
                        selectedHour ? <p>{selectedHour}</p> : <p className="font-light text-[#ccc]">No se ha seleccionado una hora de inicio</p>
                    }
                    <h4 className="text-xl font-semibold py-5">
                        Hora de finalizacion estimada:
                    </h4>
                    {
                        endTime != "0:0" ? <p>{endTime}</p> : <p className="font-light text-[#ccc]">Debes seleccionar una hora de inicio y por lo menos un servicio</p>
                    }
                    <h4 className="text-xl font-semibold py-5">
                        Tipo de Servicio:
                    </h4>
                    {
                        selectedServiceType ? <p>{selectedServiceType}</p> : <p className="font-light text-[#ccc]">No se ha seleccionado un tipo de servicio</p>
                    }
                    <h4 className="text-xl font-extrabold py-5">
                        Total a Pagar:
                    </h4>
                    {
                        selectedServices.length > 0 ? <p>{total}</p> : <p className="font-light text-[#ccc]">No se ha seleccionado ningun servicio</p>
                    }

                    {
                        alreadyValidated ? <button className="self-center my-5 px-10 bg-primary rounded-lg text-white hover:border-primary hover:text-black hover:bg-white border transition-all duration-500" type="submit">Ir a Pagar</button> : ""
                    }
                </div>
            </div>
        </form>
    )
}