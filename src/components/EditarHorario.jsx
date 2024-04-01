import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GET_SPECIALIST, UPDATE_SPECIALIST } from "../querys/querys";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export const EditarHorario = ({ specialist }) => {
    const toast = useToast();
    const [updateSpecialist, { data, loading, error }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: specialist.id } }] });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            weeklySchedule: specialist.weeklySchedule
        }
    });

    const onSubmit = async (data) => {
        const { ...formData } = data;
        console.log(formData)
        // const { ...formData } = data;
        // console.log(formData)
        const input = {
            ...formData,
        }
        console.log(input);

        try {
            // const { age, ...formData } = data;

            // console.log(formData, age)

            const { data } = await updateSpecialist({
                variables: {
                    id: specialist.id,
                    input: input,
                },
            });
            console.log(data);

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

    const fieldArrayOperations = daysOfWeek.reduce((acc, day) => {
        acc[day] = useFieldArray({
            control,
            name: `weeklySchedule.${day}`
        });
        return acc;
    }, {});

    console.log(getValues());

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            {
                daysOfWeek.map((day, index) => (
                    <div key={index}>
                        <h3 className='px-4 font-bold m-auto bg-primary rounded-xl w-full py-2 text-black'>{day}</h3>
                        {fieldArrayOperations[day].fields.map((field, index) => (
                            <div key={field.id} className='m-4 border flex flex-wrap items-center justify-center'>
                                <input type='time' className='m-2 text-black' {...register(`weeklySchedule.${day}.${index}.start`)} defaultValue={field.start} placeholder="Start time" />
                                <input type='time' className='m-2 text-black' {...register(`weeklySchedule.${day}.${index}.end`)} defaultValue={field.end} placeholder="End time" />
                                <button className='transition-all duration-500 border border-red-600 hover:bg-white hover:text-red-600 rounded-md bg-red-600 p-1' type="button" onClick={() => fieldArrayOperations[day].remove(index)}>Eliminar</button>
                            </div>
                        ))}
                        <button className='transition-all duration-500 border border-green-600 hover:bg-white hover:text-green-600 m-4 p-1 bg-green-600 rounded-md' type="button" onClick={() => fieldArrayOperations[day].append({ start: "", end: "" })}>Agregar</button>
                    </div>
                ))
            }
            <input type="submit" value="Actualizar" className="p-2 bg-primary border border-white transition-all duration-500 hover:border-primary hover:bg-white hover hover:text-primary text-white rounded cursor-pointer w-full sticky bottom-0 left-0" />
        </form>

    )
}