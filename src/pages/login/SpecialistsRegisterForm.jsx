import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AutocompleteInputField } from '../../components/AutocompleteInputField';
import { cities } from '../../data/cities';
import logo from '../../assets/imagenes/logo.png'
import { InputFormField } from '../../components/InputFormField';
import { Link } from 'react-router-dom';
import { CREATE_CLIENT } from '../../querys/querys';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import InputDropZone from '../../components/InputDropZone';
import { StepOne } from './steps/StepOne';

export const SpecialistsRegisterForm = () => {
    const navigate = useNavigate();
    const [createClient, { data, loading, error }] = useMutation(CREATE_CLIENT);
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
    const [step, setStep] = useState(1); // Nuevo estado para el paso actual
    const [services, setServices] = useState([]);
    const servicesHombre = ["Servicio 1", "Servicio 2", "Servicio 3"];
    const servicesMujeres = ["Servicio 4", "Servicio 5", "Servicio 6"];
    const servicesMascotas = ["Servicio 7", "Servicio 8", "Servicio 9"];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const fieldArrayOperations = daysOfWeek.reduce((acc, day) => {
        acc[day] = useFieldArray({
            control,
            name: `weeklySchedule.${day}`
        });
        return acc;
    }, {});

    const handleWorldChange = (event) => {
        switch (event.target.value) {
            case "hombre":
                setServices(servicesHombre);
                break;
            case "mujer":
                setServices(servicesMujeres);
                break;
            case "mascota":
                setServices(servicesMascotas);
                break;
            default:
                setServices([]);
        }
    };

    const onSubmit = async (data) => {
        try {
            const { confirmpassword, age, ...formData } = data;

            // Convierte age a un número
            const ageAsNumber = parseInt(age, 10);

            const response = await createClient({ variables: { input: { ...formData, age: ageAsNumber } } });
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

    // Función para avanzar al siguiente paso
    const nextStep = () => {
        if (step < 5) {
            setStep(prevStep => prevStep + 1);
        }
    };

    // Función para retroceder al paso anterior
    const prevStep = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    };

    return (
        <div className="p-10 min-h-[100vh] flex items-center justify-center">
            <div className="bg-white shadow-lg overflow-hidden rounded-xl w-full sm:w-full md:w-[70%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] h-auto sm:h-[80vh] mx-auto">
                <div className="flex flex-col sm:flex-row sm:gap-4 items-center h-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="xl:w-[50%] xs:w-full sm:w-full px-8 py-10 flex flex-col gap-4">
                        {/* ... */}

                        <div>
                            <Link to='/' className="text-2xl text-[#caa776]">Qurux</Link>

                            <p className="text-[12px] text-gray-600">
                                Suministre los datos requeridos para registrarse.
                            </p>
                            <p className="text-[12px] text-gray-600">
                                Sus datos seran verificados tras su registro para habilitar su perfil.
                            </p>
                        </div>
                        <div>
                            {step === 1 && (
                                <>
                                    <StepOne cities={cities} errors={errors} register={register} setValue={setValue} />
                                    {/* <InputFormField register={register} label="Username" id="username" placeholder="Username" required={true} errors={errors} />
                                    <div className='flex flex-wrap justify-between'>
                                        <InputFormField register={register} label="Password" id="password" placeholder="Password" type="password" required={true} errors={errors} />
                                        <InputFormField register={register} label="ConfirmPassword" id="confirmpassword" placeholder="ConfirmPassword" type="password" required={true} errors={errors} validation={{ required: true, validate: value => value === password || "The passwords do not match" }} />
                                    </div>
                                    <div className='flex flex-wrap justify-between'>
                                        <InputFormField register={register} label="Email" id="email" placeholder="Email" type='email' required={true} errors={errors} />
                                        <InputFormField register={register} label="Phone" id="phone" placeholder="Phone" type='number' errors={errors} />
                                    </div>
                                    <div className='flex flex-wrap justify-between'>
                                        <InputFormField register={register} label="Age" id="age" placeholder="Age" type="number" errors={errors} />
                                        <InputFormField register={register} label="Street" id="street" placeholder="Street" errors={errors} />
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
                                    />

                                    <select {...register("gender")} className="p-2 border rounded">
                                        <option value="">Select...</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <input {...register("role")} type="hidden" /> */}
                                </>
                            )}
                            {step === 2 && (
                                <div className='flex flex-col gap-4'>
                                    <label htmlFor="serviceType" className="font-light">Tipo de servicio</label>
                                    <select {...register("serviceType")} className="p-2 border rounded">
                                        <option value="">Select...</option>
                                        <option value="service1">Domicilio</option>
                                        <option value="service2">Presencial</option>
                                        <option value="service3">Mixto</option>
                                    </select>
                                    <p className='text-[#ccc] font-extralight text-sm'>
                                        Como especialista de Qurux puedes ofrecer tus servicios en tu local o asistir al domicilio de tus clientes si lo prefieres y ellos tambien.
                                    </p>
                                    <label htmlFor="paymentOption" className="font-light">Tipo de servicio</label>
                                    <select {...register("paymentOption")} className="p-2 border rounded">
                                        <option value="">Select...</option>
                                        <option value="service1">Pago presencial</option>
                                        <option value="service2">Pago quincenal</option>
                                        <option value="service3">Pago mensual</option>
                                    </select>
                                    <p className='text-[#ccc] font-extralight text-sm'>
                                        Tu dinero esta seguro con nosotros, elije la fecha en que quieres que sea girado a tu cuenta adscrita.
                                    </p>
                                </div>
                            )}
                            {step === 3 && (
                                <>
                                    <label htmlFor="world" className="font-light">Mundo</label>
                                    <select {...register("world")} className="p-2 border rounded" onChange={handleWorldChange}>
                                        <option value="">Select...</option>
                                        <option value="hombre">Hombre</option>
                                        <option value="mujer">Mujer</option>
                                        <option value="mascota">Mascota</option>
                                    </select>
                                    <fieldset>
                                        <legend>Servicios</legend>
                                        {services.map(service => (
                                            <div key={service}>
                                                <input type="checkbox" value={service} {...register("services")} />
                                                <label htmlFor={service}>{service}</label>
                                            </div>
                                        ))}
                                    </fieldset>
                                </>
                            )}
                            {step === 4 && (

                                <InputDropZone fileName='Profile picture' tipo='profilePic' recomendedSize='400x400' />
                            )}
                            {step === 5 && (
                                <div className='h-full overflow-y-scroll'>
                                    <label htmlFor="weeklySchedule" className="font-light">Horario semanal</label>
                                    {daysOfWeek.map(day => (
                                        <div key={day}>
                                            <h3 className='p-2 font-bold m-auto bg-[#caa766] rounded-xl text-white'>{day}</h3>
                                            {fieldArrayOperations[day].fields.map((field, index) => (
                                                <div key={field.id}>
                                                    <input type='time' {...register(`weeklySchedule.${day}.${index}.start`)} placeholder="Start time" />
                                                    <input type='time' {...register(`weeklySchedule.${day}.${index}.end`)} placeholder="End time" />
                                                    <button type="button" onClick={() => fieldArrayOperations[day].remove(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => fieldArrayOperations[day].append({ start: "", end: "" })}>Add Time Slot</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* ... */}
                        <div className="flex justify-center space-x-4 mb-4"> {/* Contenedor para el control del stepper */}
                            <button type="button" onClick={prevStep}>Back</button>
                            {[1, 2, 3, 4, 5].map((stepNumber) => (
                                <div
                                    key={stepNumber}
                                    className='hidden sm:block'
                                >
                                    <button className={`w-8 h-8 rounded-full flex items-center justify-center ${stepNumber === step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`} onClick={() => setStep(stepNumber)}>{stepNumber}</button>
                                </div>
                            ))}
                            <button type="button" onClick={nextStep}>Next</button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center h-full w-0 xl:w-1/2">
                        {/* Aquí puedes poner tu imagen */}
                        <img src={logo} className='w-[330px] mx-auto' alt="Descripción de la imagen" />
                    </div>
                </div>
            </div>
        </div>
    );
}