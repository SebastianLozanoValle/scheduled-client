import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SPECIALIST, IS_SLOT_AVAILABLE } from "../querys/querys";
import { useMutation, useQuery } from "@apollo/client";
import { Calendario } from "../components/Calendario";

export const AgendarEspecialista = () => {
    const navigate = useNavigate();
    const [prueba, setPrueba] = useState({
        date: "",
        specialistId: "",
        startTime: "",
        estimatedEndTime: "",
        serviceType: "Presencial"
    });

    const [isAvailable, setIsAvailable] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    useEffect(() => {
        console.log(isAvailable);
    }, [isAvailable]);

    const [selectedValues, setSelectedValues] = useState([]);

    const [minutosTotales, setMinutosTotales] = useState(0);

    const [available, respuesta] = useMutation(IS_SLOT_AVAILABLE, {
        onError: (error) => {
            console.error('Error al verificar la disponibilidad:', error);
        }
    });

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_SPECIALIST, {
        variables: { id: id },
    });

    if (loading) return <p className="h-screen">Cargando...</p>;
    if (error) return <p className="h-screen">{error.message}</p>;

    const especialista = data.getSpecialist;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newSelectedValues;
        if (e.target.checked) {
            newSelectedValues = [...selectedValues, Number(value)];
        } else {
            newSelectedValues = selectedValues.filter(val => val !== Number(value));
        }
        setSelectedValues(newSelectedValues);

        const totalMinutes = newSelectedValues.reduce((acc, val) => acc + val, 0);
        setMinutosTotales(totalMinutes);
        console.log(totalMinutes);

        if (name === 'serviceType') {
            const serviceType = value;
            setPrueba(prevState => ({
                ...prevState,
                serviceType
            }));
        }
        if (name === 'date') {
            const dateRelative = value;
            const dateData = dateRelative.split('T');
            const specialistId = id;
            const unformatedDate = dateData[0];
            const [year, month, day] = unformatedDate.split('-');
            const formattedDate = `${month}-${day}-${year}`;
            const startTime = dateData[1];
            const [hours, minutes] = startTime.split(':');
            let temporalDate = new Date(); // obtiene la fecha y hora actual
            temporalDate.setHours(hours, minutes); // establece la hora y los minutos

            temporalDate.setMinutes(temporalDate.getMinutes() + minutosTotales); // suma 30 minutos

            let newHour = temporalDate.getHours().toString().padStart(2, '0'); // obtiene la nueva hora y la formatea a dos dígitos
            let newMinutes = temporalDate.getMinutes().toString().padStart(2, '0'); // obtiene los nuevos minutos y los formatea a dos dígitos

            let formated = `${newHour}:${newMinutes}`
            const estimatedEndTime = formated;
            console.log('este es el value' + dateData);
            console.log('este es el startTime' + startTime + minutosTotales);
            setPrueba(prevState => ({
                ...prevState,
                startTime,
                date: formattedDate,
                specialistId,
                estimatedEndTime
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/checkout/${id}/${prueba.date}/${100.0}/${0}/${["manicura","pedicura"]}/${prueba.startTime}/${prueba.estimatedEndTime}`);
        // /checkout/:specialistId/:date/:value/:iva/:subject/:startTime/:estimatedEndTime
    }

    const consultarDisponibilidad = () => {
        console.log('verificando disponibilidad');
        console.log(prueba);
        setPrueba(prevState => ({
            ...prevState,
            specialistId: id
        }));
        available({ variables: { input: prueba } })
            .then(response => {
                setIsAvailable(response.data.isSlotAvailable.isSlotAvailable);
                setMensajeError(response.data.isSlotAvailable.reason ? 'No hay disponibilidad en el horario seleccionado' : '')
                console.log(response.data.isSlotAvailable);
                console.log(respuesta);
            });
    }

    const cambiarConsulta = () => {
        setIsAvailable(false);
    }

    const formatDate = () => {
        const dateData = prueba.date.split('-');
        const [month, day, year] = dateData;
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const monthName = monthNames[month - 1];
        return `${day}-${monthName}-${year}`;
    };

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center bg-[#161c26] p-4 rounded-3xl shadow-2xl mt-28 mx-20 text-white">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="px-8 py-2 bg-[#d3983f] rounded-sm shadow-2xl font-bold inline">{especialista.username}</h2>
                    </div>
                    <div>
                        <h4 className="inline">{especialista.city} {especialista.street}</h4>
                        <h5 className="font-bold">Disponibilidad: {especialista.serviceType}</h5>
                    </div>
                </div>
                <img className="h-20 w-20 rounded-full object-cover shadow-2xl" src="https://www.movilzona.es/app/uploads-movilzona.es/2023/04/fto-perfil.jpg?x=480&y=375&quality=40" />
            </div>

            <div className="md:flex md:flex-row flex-col-reverse mx-auto md:justify-around my-8">
                <div className="p-20 w-full sm:w-auto">
                    <ul className="flex flex-col gap-8 w-auto mx-auto bg-[#161c26] text-white rounded-3xl p-8">
                        {Object.keys(especialista.weeklySchedule).map((dia, indexDia) => {
                            return (
                                especialista.weeklySchedule[dia].length ? (
                                    <li className="flex flex-col bg-green-500 rounded-2xl p-2" key={indexDia}>
                                        <p className="font-bold">{dia}</p>
                                        {especialista.weeklySchedule[dia].map((hora, indexHora) => (
                                            <p key={indexHora}>{hora.start}-{hora.end}</p>
                                        ))}
                                    </li>
                                ) : (
                                    <li className="flex flex-col bg-red-500 rounded-2xl p-2" key={indexDia}>
                                        <p className="font-bold">{dia}</p>
                                        <p>No disponible</p>
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
                <div className="w-full md:w-6/12">
                    <Calendario />
                    <div className="bg-white mx-auto w-4/5 p-4 rounded-xl shadow-2xl">
                        <form onSubmit={handleSubmit}>
                            <label className="font-bold">Servicios</label>
                            <div className={`${isAvailable && 'hidden'}`}>
                                <div className={`flex gap-4 my-4`}>
                                    {especialista?.specialtys.map(especialidad => (
                                        <div key={especialidad} className="flex flex-col gap-1 bg-white p-4 rounded-lg shadow-2xl">
                                            <label htmlFor={especialidad} className="flex flex-col gap-1 w-full h-full">
                                                <div className="flex gap-1">
                                                    <input
                                                        type="checkbox"
                                                        id={especialidad}
                                                        name='especialidad'
                                                        value={30}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span>{especialidad}</span>
                                                </div>
                                                precio: 100$
                                                tiempo: {30}min
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="font-bold" htmlFor="fecha">Fecha</label>
                                    <input className="rounded shadow-2xl p-4" type="datetime-local" id="date" name="date" onChange={handleInputChange} />
                                    <label className="font-bold" htmlFor="serviceType">Tipo de Servicio</label>
                                    <select className="rounded shadow-2xl p-4" name="serviceType" id="serviceType" onChange={handleInputChange}>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Domicilio">Domicilio</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                            {isAvailable && <p className="text-green-500">ha seleccionado el día {formatDate()} con hora de {prueba.startTime}-{prueba.estimatedEndTime} Aprox.</p>}
                                {
                                    !isAvailable ?
                                        <button type="button" onClick={consultarDisponibilidad} className="mt-4 bg-green-500 text-white rounded-2xl p-2">Consultar disponibilidad</button>
                                        :
                                        <button type="button" onClick={cambiarConsulta} className="mt-4 bg-green-500 text-white rounded-2xl p-2">Cambiar cobsulta</button>
                                }
                                {respuesta.loading ? <p className="text-green-500">Consultando disponibilidad...</p> : mensajeError && <p className="text-red-500">{mensajeError}.</p>}
                                {isAvailable && <button type="submit" className="bg-green-500 text-white rounded-2xl p-2">Agendar</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
