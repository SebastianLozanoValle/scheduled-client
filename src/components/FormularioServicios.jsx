import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';
import { DeleteConfirmationDialogService } from "./DeleteConfirmationDialogService";
import { DELETE_SERVICE, GET_SPECIALIST, UPDATE_SPECIALIST } from "../querys/querys";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export const FormularioServicios = ({ user }) => {
    const toast = useToast();
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
    const [deleteService, { loading1, error1 }] = useMutation(DELETE_SERVICE,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: user.id } }] });
    const [updateSpecialist, { data, loading, error }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: user.id } }] });

    useEffect(() => {
        // Establece los valores predeterminados de las especialidades seleccionadas
        user.specialtys.forEach((specialty, index) => {
            setValue(`specialtys[${index}].name`, specialty.name);
            setValue(`specialtys[${index}].description`, specialty.description);
            setValue(`specialtys[${index}].price`, specialty.price);
            setValue(`specialtys[${index}].time`, specialty.time);
        });
    }, [user])

    const [openDialogId, setOpenDialogId] = useState(null);

    const onSubmit = async (data) => {
        // Realizar el parseInt en el precio de cada servicio
        const parsedData = {
            ...data,
            specialtys: data.specialtys.map(service => ({
                ...service,
                price: parseInt(service.price) // Convertir el precio a entero
            }))
        };

        try {
            const { data } = await updateSpecialist({
                variables: {
                    id: user.id,
                    input: parsedData,
                },
            });

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


    const handleOpenDialog = (id) => {
        setOpenDialogId(id);
    };

    const handleCloseDialog = () => {
        setOpenDialogId(null);
    };

    console.log("user", user.specialtys);

    return (
        <form className="relative" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-primary font-semibold">Servicios Actuales</h3>
            {user.specialtys.length > 0 ? user.specialtys.map((service, index) => (
                <div className='flex flex-col m-4 p-4 border rounded-lg relative' key={service.name + uuidv4()}>
                    <p className='text-primary font-bold text-xl'>{service.name}</p>
                    <label className='font-semibold' htmlFor={`${service.name}-description`}>Descripción:</label>
                    <input className='border p-1 rounded-md' id={`${service.name}-description`} type="text" {...register(`specialtys[${index}].description`)} />
                    <label className='font-semibold' htmlFor={`${service.name}-price`}>Precio:</label>
                    <input className='border p-1 rounded-md' id={`${service.name}-price`} type="number" {...register(`specialtys[${index}].price`)} />
                    <label className='font-semibold' htmlFor={`${service.name}-time`}>Duracion:</label>
                    <select className='border p-1 rounded-md' id={`${service.name}-time`} {...register(`specialtys[${index}].time`)}>
                        <option value="00:30">30 minutos</option>
                        <option value="01:00">1 hora</option>
                        <option value="01:30">1 hora con 30 minutos</option>
                        <option value="02:00">2 horas</option>
                        <option value="02:30">2 hora con 30 minutos</option>
                        <option value="03:00">3 horas</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                    <div className='px-6 py-4 whitespace-nowrap absolute top-0 right-0'>
                        <button
                            onClick={() => handleOpenDialog(service.name)}
                            className='text-gray-600 text-2xl hover:text-red-600'
                        >
                            <ImCross />
                        </button>
                        <DeleteConfirmationDialogService isOpen={openDialogId === service.name} onClose={handleCloseDialog} user={user} service={service} deleteService={deleteService} />
                    </div>
                </div>
            )) :
                <p className="text-[#ccc]">Aun no tiene servicios registrados, empiece ahora, registre el servicio y posteriormente adjunte imagenes relacionadas</p>
            }
            {
                user.specialtys.lenght > 0 &&
                <div className="px-6 sticky bottom-0">
                    <input type="submit" value="Actualizar" className="p-2 bg-primary border border-white transition-all duration-500 hover:border-primary hover:bg-white hover hover:text-primary text-white rounded cursor-pointer w-full" />
                </div>
            }
        </form>
    )
}