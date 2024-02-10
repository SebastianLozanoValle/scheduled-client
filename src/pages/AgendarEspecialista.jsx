import { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SPECIALIST, IS_SLOT_AVAILABLE } from "../querys/querys";
import { useMutation, useQuery } from "@apollo/client";
import { Calendario } from "../components/Calendario";

export const AgendarEspecialista = () => {
    const [prueba, setPrueba] = useState({
        date: "",
        specialistId: "",
        startTime: "",
        estimatedEndTime: ""
    });

    const [isAvailable, setIsAvailable] = useState(false);

    const [available] = useMutation(IS_SLOT_AVAILABLE, {
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
        if (e.target.name === 'date') {
            setPrueba(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        consultarDisponibilidad();
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
                setIsAvailable(response.data.isSlotAvailable);
            });
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center bg-[#161c26] p-4 rounded-3xl shadow-2xl mt-28 mx-20 text-white">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="px-8 py-2 bg-[#d3983f] rounded-sm shadow-2xl font-bold inline">{especialista.username}</h2>
                    </div>
                    <div>
                        <h4 className="inline">{especialista.city} {especialista.street}</h4>
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
                            <div className="flex gap-4 my-4">
                                {especialista?.specialtys.map(specialidad => (
                                    <div key={specialidad} className="flex flex-col gap-1 bg-white p-4 rounded-lg shadow-2xl">
                                        <label htmlFor={specialidad} className="flex flex-col gap-1 w-full h-full">
                                            <div className="flex gap-1">
                                                <input type="checkbox" id={specialidad} name="specialistId" value={specialidad} onChange={handleInputChange} />
                                                <span>{specialidad}</span>
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
                                <button type="button" onClick={consultarDisponibilidad} className="mt-4 bg-green-500 text-white rounded-2xl p-2">Consultar disponibilidad</button>
                                <button type="submit" className="bg-green-500 text-white rounded-2xl p-2">Agendar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
