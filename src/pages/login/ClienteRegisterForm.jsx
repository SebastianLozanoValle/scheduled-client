import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutocompleteInputField } from '../../components/AutocompleteInputField';
import { cities } from '../../data/cities';
import logo from '../../assets/imagenes/logo.png'
import { InputFormField } from '../../components/InputFormField';
import { Link } from 'react-router-dom';
import { CREATE_CLIENT } from '../../querys/querys';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

export const ClientRegisterForm = () => {
    const navigate = useNavigate();
    const [createClient, { data, loading, error }] = useMutation(CREATE_CLIENT);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [cityValue, setCityValue] = useState('');

    const onSubmit = async (data) => {
        try {
            const { confirmpassword, age, ...formData } = data;

            // Convierte age a un número
            const ageAsNumber = parseInt(age, 10);

            const response = await createClient({ variables: { input: { ...formData, email: formData.email.toLowerCase(), age: age } } });
            console.log(response);

            if (response.data.createClient.id) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const password = watch("password", "");

    useEffect(() => {
        setValue("role", "client");
    }, [setValue]);

    return (
        <div className="p-10 min-h-[100vh] flex items-center justify-center">
            <div className="bg-white shadow-lg overflow-hidden rounded-xl w-full sm:w-full md:w-[70%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] h-auto sm:h-auto md:h-auto lg:h-auto xl:h-auto 2xl:h-auto mx-auto">
                <div className="flex sm:gap-4 items-center h-full">

                    <form onSubmit={handleSubmit(onSubmit)} className="xl:w-[50%] xs:w-full sm:w-full px-8 py-10 flex flex-col gap-4">
                        <div>
                            <Link to='/' className="text-2xl text-[#caa776]">Scheduled</Link>

                            <p className="text-[12px] text-gray-600">
                                Suministre los datos requeridos para registrarse.
                            </p>
                        </div>
                        <div className=" mb-3">
                            <span className="text-[12px] text-gray-600">
                                Si desea registrarse como especialista entre{' '}
                                <Link
                                    to={'/signup-especialistas'}
                                    className="text-[12px] text-blue-500 hover:text-blue-700 font-bold"
                                >
                                    aquí
                                </Link>
                            </span>
                        </div>
                        <InputFormField mitad={false} defaultValue={watch().email} register={register} label="Correo" id="email" placeholder="Correo" type='email' required={true} errors={errors} />
                        <InputFormField mitad={false} defaultValue={watch().password} register={register} label="Contraseña" id="password" placeholder="Contraseña" type="password" required={true} errors={errors} />
                        <InputFormField mitad={false} defaultValue={watch().confirmpassword} register={register} label="Confirme Contraseña" id="confirmpassword" placeholder="Confirme Contraseña" type="password" required={true} errors={errors} validation={{ required: true, validate: value => value === password || "The passwords do not match" }} />
                        <div className='flex flex-wrap justify-between'>
                            <InputFormField mitad={false} defaultValue={watch().username} register={register} label="Nombre" id="username" placeholder="Nombre" required={true} errors={errors} />
                            <InputFormField mitad={false} defaultValue={watch().phone} register={register} label="Celular" id="phone" placeholder="Celular" type='number' errors={errors} />
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <InputFormField mitad={false} defaultValue={watch().age} register={register} label="Fecha Nacimiento" id="age" placeholder="Fecha Nacimiento" type="date" errors={errors} />
                            <InputFormField mitad={false} defaultValue={watch().street} register={register} label="Direccion" id="street" placeholder="Direccion" errors={errors} />
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

                        <label htmlFor='gender'>Genero</label>
                        <select {...register("gender", { validate: value => value !== "" || "Debe seleccionar una respuesta valida en este campo" })} className="p-2 border rounded">
                            <option value="">Seleccione...</option>
                            <option value="male">Mujer</option>
                            <option value="female">Hombre</option>
                            <option value="other">Otro</option>
                        </select>
                        {errors["gender"] && <p className="text-red-500">{errors["gender"].message}</p>}

                        <input {...register("role")} type="hidden" />

                        <input type="submit" className="p-2 bg-blue-500 text-white rounded cursor-pointer" />
                        {error && <p className="text-red-500">{error.message}</p>}
                    </form>
                    <div className="flex items-center justify-center h-full w-0 xl:w-1/2">
                        {/* Aquí puedes poner tu imagen */}
                        <img src={logo} className='w-[330px] mx-auto rounded-full bg-[#caa776]' alt="Descripción de la imagen" />
                    </div>
                </div>
            </div>
        </div>
    );
}

