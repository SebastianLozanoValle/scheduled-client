import { useForm } from "react-hook-form";
import { InputFormField } from "./InputFormField";
import { AutocompleteInputField } from "./AutocompleteInputField";
import { useEffect, useState } from "react";
import { cities } from "../data/cities";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { GET_CLIENT, GET_SPECIALIST, UPDATE_CLIENT, UPDATE_SPECIALIST } from "../querys/querys";
import { useUserStore } from "../store/userStore";

export const UserForm = ({ user }) => {
    const toast = useToast();

    // console.log(user);
    const { userId, userRole, setUser } = useUserStore();


    const [updateSpecialist, { errorSpecialist }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALIST, variables: { id: user.id } }] });
    const [updateClient, { errorClient }] = useMutation(UPDATE_CLIENT,
        { refetchQueries: [{ query: GET_CLIENT, variables: { id: user.id } }] });
    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm();
    const [cityValue, setCityValue] = useState('');

    const onSubmit = async (data) => {
        const { ...formData } = data;
        // console.log(formData)
        const input = {
            ...formData,
            email: formData.email.toLowerCase(),
            city: cityValue,
        }
        // console.log(input);

        try {
            // const { age, ...formData } = data;

            // console.log(formData, age)

            if (userRole == 'specialist') {
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
                        description: "Failed to update client.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } else if (userRole == 'client') {
                // console.log({
                //     id: user.id,
                //     Input: input
                // })
                const { data } = await updateClient({
                    variables: {
                        updateClientId: user.id,
                        input: input,
                    },
                });
                // console.log(data);

                if (data.updateClient.id) {
                    toast({
                        title: "Success",
                        description: `El Cliente ${data.updateClient.username} Ha sido Actualizado.`,
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
            }
        } catch (error) {
            // console.error(error);
        }
    };

    const [gender, setGender] = useState("");

    useEffect(() => {
        if (user.gender) {
            setGender(user.gender);
        }
    }, [user.gender, gender]);

    useEffect(() => {
        if (user.city) {
            setCityValue(user.city);
        }
    }, [user.city])

    useEffect(() => {
        if (user) {
            // setValue("age", user.age)
            setValue("email", user.email)
            setValue("username", user.username)
            // setValue("gender", user.gender)
            setValue("phone", user.phone)
            setValue("street", user.street)
            // setValue("role", user.role)

            setUser(userId, user.username, userRole)
        }
    }, [user])

    // console.log(getValues())

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full xs:w-full sm:w-full px-8 py-10 flex flex-col gap-4">
            <div className='flex flex-wrap justify-between'>
                <InputFormField defaultValue={user.username} register={register} label="Usuario" id="username" placeholder="Usuario" required={true} errors={errors} />
                <InputFormField defaultValue={user.email} register={register} label="Correo" id="email" placeholder="Correo" type='email' required={true} errors={errors} />
            </div>
            <div className='flex flex-wrap justify-between'>
                <InputFormField defaultValue={user.phone} register={register} label="Celular" id="phone" placeholder="Celular" type='number' errors={errors} />
                <InputFormField defaultValue={user.street} register={register} label="Direccion" id="street" placeholder="Direccion" errors={errors} />
            </div>
            <AutocompleteInputField
                label='Distrito'
                name="city"
                register={register}
                setValue={setValue}
                required={true}
                errors={errors}
                options={cities}
                className="p-2 border rounded"
                inputValue={cityValue}
                setInputValue={setCityValue}
            />

            {/* <label htmlFor='gender'>Genero</label>
            <select {...register("gender")} defaultValue={gender} className="p-2 border rounded">
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <input {...register("role")} type="hidden" /> */}

            <input type="submit" value="Actualizar" className="p-2 bg-primary border border-primary transition-all duration-500 hover:bg-white hover hover:text-primary text-white rounded cursor-pointer" />
            {errorSpecialist && <p className="text-red-500">{errorSpecialist.message}</p>}
            {errorClient && <p className="text-red-500">{errorClient.message}</p>}
        </form>
    )
}