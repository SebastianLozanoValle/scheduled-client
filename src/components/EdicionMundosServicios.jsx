import { useMutation } from "@apollo/client";
import { GET_SPECIALIST, UPDATE_SPECIALIST } from "../querys/querys";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ServiciosHombres, ServiciosMascotas, ServiciosMujeres } from "../data/services";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@chakra-ui/react";

export const EdicionMundosServicios = ({ user }) => {
    const toast = useToast();
    const [updateSpecialist, { data, loading, error }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: user.id } }] });
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();

    useEffect(() => {
        // Función para obtener los servicios según los mundos seleccionados
        const getServicesByWorlds = () => {
            let selectedServices = [];
            if (user.world.includes("Hombre")) {
                selectedServices = selectedServices.concat(ServiciosHombres);
            }
            if (user.world.includes("Mujer")) {
                selectedServices = selectedServices.concat(ServiciosMujeres);
            }
            if (user.world.includes("Mascota")) {
                selectedServices = selectedServices.concat(ServiciosMascotas);
            }
            // return selectedServices;
            return selectedServices.filter(service => !user.specialtys.some(specialty => specialty.name === service));
        };

        // Establece los servicios según los mundos seleccionados del usuario
        setServices(getServicesByWorlds());
    }, [user]);

    useEffect(() => {
        // Establece los valores predeterminados de las especialidades seleccionadas
        // user.specialtys.forEach((specialty, index) => {
        //     setValue(`specialtys[${index}].name`, specialty.name);
        //     setValue(`specialtys[${index}].description`, specialty.description);
        //     setValue(`specialtys[${index}].price`, specialty.price);
        //     setValue(`specialtys[${index}].time`, specialty.time);
        // });

        // Establece los mundos seleccionados por el usuario
        const selectedWorlds = {
            Hombre: user.world.includes("Hombre"),
            Mujer: user.world.includes("Mujer"),
            Mascota: user.world.includes("Mascota"),
        };
        setSelectedWorlds(selectedWorlds);

        // Establece los servicios correspondientes según los mundos seleccionados
        // const allServices = [...ServiciosHombres, ...ServiciosMujeres, ...ServiciosMascotas];
        // const selectedServices = allServices.filter(service => user.specialtys.some(specialty => specialty.name === service));
        // // setServices(selectedServices);
        // setSelectedServices(selectedServices.map(service => service.name));

        // console.log("seleccionados", selectedServices)
    }, [user]);


    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedWorlds, setSelectedWorlds] = useState({
        Hombre: false,
        Mujer: false,
        Mascota: false
    });

    const worlds = ["Hombre", "Mujer", "Mascota"];

    // Función para manejar el cambio de los checkboxes de especialidad
    const handleServiceChange = (event) => {
        const { value, checked } = event.target;

        // Actualiza el estado de las especialidades seleccionadas
        if (checked) {
            setSelectedServices(prevServices => [...prevServices, value]);
        } else {
            setSelectedServices(prevServices => prevServices.filter(service => service !== value));
        }
    };

    // ...

    // Añade el manejador de cambio a los checkboxes de especialidad
    {
        services.map((service, index) => (
            <div key={service + uuidv4()}>
                {/* <input type="checkbox" value={service} {...register("services")} onChange={handleServiceChange} /> */}
                <input type="checkbox" value={service} {...register(`specialtys[${index}].name`)} onChange={handleServiceChange} />
                <label htmlFor={service}>{service}</label>
            </div>
        ))
    }

    // Función para manejar el cambio de los checkboxes
    const handleWorldChange = (event) => {
        const { name, checked } = event.target;

        // Actualiza el estado de los checkboxes seleccionados
        setSelectedWorlds(prevState => ({ ...prevState, [name]: checked }));

        // Muestra los servicios correspondientes
        if (checked) {
            switch (name) {
                case "Hombre":
                    setServices(prevServices => [...prevServices, ...ServiciosHombres]);
                    break;
                case "Mujer":
                    setServices(prevServices => [...prevServices, ...ServiciosMujeres]);
                    break;
                case "Mascota":
                    setServices(prevServices => [...prevServices, ...ServiciosMascotas]);
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case "Hombre":
                    setServices(prevServices => prevServices.filter(service => !ServiciosHombres.includes(service)));
                    break;
                case "Mujer":
                    setServices(prevServices => prevServices.filter(service => !ServiciosMujeres.includes(service)));
                    break;
                case "Mascota":
                    setServices(prevServices => prevServices.filter(service => !ServiciosMascotas.includes(service)));
                    break;
                default:
                    break;
            }
        }
    };

    const onSubmit = async (data) => {
        const { ...formData } = data;
        console.log(formData)

        // Convierte el objeto worlds a un array de strings
        const worldsAsArray = Object.keys(selectedWorlds).filter(selectedWorld => selectedWorlds[selectedWorld]);

        // Mapea selectedServices a un nuevo array de objetos
        const specialtysAsObjects = selectedServices.map((service, index) => ({
            name: service,
            description: data.specialtys[index].description,
            price: parseFloat(data.specialtys[index].price),
            time: data.specialtys[index].time
        }));
        const input = {
            // selectedWorlds,
            // selectedServices,
            world: worldsAsArray,
            specialtys: specialtysAsObjects.concat(user.specialtys),
        }
        console.log(input);

        try {
            // const { age, ...formData } = data;

            // console.log(formData, age)

            const { data } = await updateSpecialist({
                variables: {
                    id: user.id,
                    input: input,
                },
            });
            console.log(data);

            setSelectedServices([]);

            if (data.updateSpecialist.id) {
                toast({
                    title: "Success",
                    description: `El Especialista ${data.updateSpecialist.username} Ha sido Actualizado.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to update specialist.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <label htmlFor="world" className="text-primary font-semibold">Mundos</label>
            <div className='flex gap-4'>
                {worlds.map(world => (
                    <label className='flex gap-2' htmlFor={world} key={world}>
                        <input id={world} type="checkbox" name={world} checked={selectedWorlds[world]} onChange={handleWorldChange} />{world}
                    </label>
                ))}
            </div>
            <div className='flex flex-col'>
                <fieldset className='overflow-y-scroll h-[200px] w-full'>
                    <legend className='text-primary font-semibold'>Añadir Servicios</legend>
                    {services.map(service => (
                        <div key={service + uuidv4()}>
                            <label htmlFor={service}>
                                <input id={service} type="checkbox" value={service} checked={selectedServices.includes(service) ? true : false} onChange={handleServiceChange} />{service}
                            </label>
                        </div>
                    ))}
                </fieldset>
                <legend className='text-primary font-semibold'>Seleccionados</legend>
                <div className='overflow-y-scroll h-[200px] w-full'>
                    {selectedServices.map((service, index) => (
                        <div className='flex flex-col m-4 p-4 border rounded-lg' key={service + uuidv4()}>
                            <p className='text-primary font-bold text-xl'>{service}</p>
                            <label className='font-semibold' htmlFor={`${service}-description`}>Descripción:</label>
                            <input className='border p-1 rounded-md' id={`${service}-description`} type="text" {...register(`specialtys[${index}].description`)} />
                            <label className='font-semibold' htmlFor={`${service}-price`}>Precio:</label>
                            <input className='border p-1 rounded-md' id={`${service}-price`} type="number" {...register(`specialtys[${index}].price`)} />
                            <label className='font-semibold' htmlFor={`${service}-time`}>Duracion:</label>
                            <select className='border p-1 rounded-md' id={`${service}-time`} {...register(`specialtys[${index}].time`)}>
                                <option value="00:30">30 minutos</option>
                                <option value="01:00">1 hora</option>
                                <option value="01:30">1 hora con 30 minutos</option>
                                <option value="02:00">2 horas</option>
                                <option value="02:30">2 hora con 30 minutos</option>
                                <option value="03:00">3 horas</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-6">
                <input type="submit" value="Actualizar" className="p-2 bg-primary border border-white transition-all duration-500 hover:border-primary hover:bg-white hover hover:text-primary text-white rounded cursor-pointer w-full" />
            </div>
        </form>
    )
}