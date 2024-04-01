import { useForm } from "react-hook-form";
import { InputFormField } from "./InputFormField";
import { AutocompleteInputField } from "./AutocompleteInputField";
import { useEffect, useState } from "react";
import { cities } from "../data/cities";
import { GET_SPECIALIST, UPDATE_SPECIALIST } from "../querys/querys";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export const AditionalDataForm = ({ user }) => {
    const toast = useToast();
    const [updateSpecialist, { data, loading, error }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: user.id } }] });

    // console.log(user);
    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { ...formData } = data;
        // console.log(formData)
        // const { ...formData } = data;
        // console.log(formData)
        const input = {
            ...formData,
        }
        // console.log(input);

        try {
            // const { age, ...formData } = data;

            // console.log(formData, age)

            const { data } = await updateSpecialist({
                variables: {
                    id: user.id,
                    input: input,
                },
            });
            // console.log(data);

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
            // console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            // setValue("age", user.age)
            // setValue("email", user.email)
            // setValue("username", user.username)
            // setValue("gender", user.gender)
            // setValue("phone", user.phone)
            // setValue("street", user.street)
            // setValue("role", user.role)
            setValue("serviceType", user.serviceType)
            setValue("accountNumber", user.accountNumber)
        }
    }, [user])

    // console.log(getValues())

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full xs:w-full sm:w-full px-8 py-10 flex flex-col gap-4">
            <label htmlFor="serviceType" className="font-light">Tipo de servicio</label>
            <select {...register("serviceType")} defaultValue={user.serviceType} className="p-2 border rounded">
                <option value="Domicilio">Domicilio</option>
                <option value="Local">Local</option>
                <option value="Mixto">Mixto</option>
            </select>
            <InputFormField defaultValue={user.accountNumber} register={register} label="Numero de Cuenta" id="accountNumber" placeholder="Numero de Cuenta" type="number" required={true} errors={errors} />

            <input type="submit" value="Actualizar" className="p-2 bg-primary border border-primary transition-all duration-500 hover:bg-white hover hover:text-primary text-white rounded cursor-pointer" />
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    )
}