import { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { CustomAccordionItem } from './CustomAccordionItem';
import { Accordion } from '@chakra-ui/react';
import { Dialog } from '@headlessui/react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SpecialistForm = ({ isModalOpen, setIsModalOpen }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [specialtys, setSpecialtys] = useState([]);
    const fieldArrayOperations = daysOfWeek.reduce((acc, day) => {
        acc[day] = useFieldArray({
            control,
            name: `weeklySchedule.${day}`
        });
        return acc;
    }, {});

    const specialtyOptions = ['Peluqueria', 'Manicura', 'Pedicura']; // Hardcoded array of specialties

    const onSubmit = data => {
      data.specialtys = specialtys;
      console.log(data);
    };

    const handleSpecialtyChange = (event) => {
      if (event.target.checked) {
        setSpecialtys([...specialtys, event.target.value]);
      } else {
        setSpecialtys(specialtys.filter(specialty => specialty !== event.target.value));
      }
    };

    return (
        <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="fixed z-20 inset-0 overflow-y-auto top-0 flex justify-end"
        >
            <Dialog.Overlay className="fixed z-30 inset-0 bg-gray-500 bg-opacity-50" />
            <div className="flex rounded z-40">
                <div className="max-w-md mx-auto ">
                    <div className="rounded space-y-4 p-6 shadow-xl bg-white">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Specialist Form</Dialog.Title>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white rounded shadow-md text-black">
                        {/* Required fields */}
                            <div className='flex gap-4'>
                                <label className="text-left w-full">
                                    Username*
                                    <input name="username" placeholder="Username" {...register('username', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.username && <span className="text-red-500">This field is required</span>}
                                </label>
                                
                                <label className="text-left w-full">
                                    Password*
                                    <input name="password" type="password" placeholder="Password" {...register('password', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.password && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>
                            
                            <div className="flex gap-4">
                                <label className="text-left w-full">
                                    Age*
                                    <input name="age" type="number" placeholder="Age" {...register('age', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.age && <span className="text-red-500">This field is required</span>}
                                </label>
                                
                                <label className="text-left w-full">
                                    Gender*
                                    <input name="gender" placeholder="Gender" {...register('gender', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.gender && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>
                            
                            <div className="flex w-full gap-4">
                                <label className="text-left w-full">
                                    Phone*
                                    <input name="phone" placeholder="Phone" {...register('phone', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.phone && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>
                            
                            <div className="flex w-full gap-4">
                                <label className="text-left w-full">
                                    Email*
                                    <input name="email" placeholder="Email" {...register('email', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.email && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>
                            
                            <div className="flex gap-4">
                                <label className="text-left w-full">
                                    City*
                                    <input name="city" placeholder="City" {...register('city', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.city && <span className="text-red-500">This field is required</span>}
                                </label>
                                
                                <label className="text-left w-full">
                                    Street*
                                    <input name="street" placeholder="Street" {...register('street', { required: true })} className="w-full p-2 border rounded shadow-sm" />
                                    {errors.street && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <label className="text-left w-full">
                                    World*
                                    <select name="world" {...register('world', { required: true })} className="w-full p-2 border rounded shadow-sm">
                                        <option value="">Select World</option>
                                        <option value="Mundo Hombre">Mundo Hombre</option>
                                        <option value="Mundo Mujer">Mundo Mujer</option>
                                        <option value="Mundo Mascota">Mundo Mascota</option>
                                    </select>
                                    {errors.world && <span className="text-red-500">This field is required</span>}
                                </label>
                                
                                <label className="text-left w-full">
                                    Payment Option*
                                    <select name="paymentOption" {...register('paymentOption', { required: true })} className="w-full p-2 border rounded shadow-sm">
                                        <option value="">Seleccionar Opción de Pago</option>
                                        <option value="weekly">Semanal</option>
                                        <option value="biweekly">Quincenal</option>
                                        <option value="monthly">Mensual</option>
                                    </select>
                                    {errors.paymentOption && <span className="text-red-500">This field is required</span>}
                                </label>
                            </div>
                            
                            {/* Weekly Schedule fields */}
                            <Accordion allowToggle>
                                <CustomAccordionItem title="Horario de Atención" children={
                                    daysOfWeek.map((day, index) => (
                                        <div key={index}>
                                            <h3 className='p-4 font-bold m-auto bg-orange-400 rounded-xl'>{day}</h3>
                                            {fieldArrayOperations[day].fields.map((field, index) => (
                                                <div key={field.id} className='m-4'>
                                                    <input type='datetime-local' className='m-2' {...register(`weeklySchedule.${day}.${index}.start`)} placeholder="Start time" />
                                                    <input type='datetime-local' className='m-2' {...register(`weeklySchedule.${day}.${index}.end`)} placeholder="End time" />
                                                    <button className='rounded-md bg-red-600 p-1' type="button" onClick={() => fieldArrayOperations[day].remove(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <button className='m-4 p-1 bg-green-600 rounded-md' type="button" onClick={() => fieldArrayOperations[day].append({ start: "", end: "" })}>Add Time Slot</button>
                                        </div>
                                    ))
                                }/>
                                <CustomAccordionItem title="Servicios que Ofrece" children={
                                    <div>
                                        {specialtyOptions.map((specialty, index) => (
                                        <label key={index} className='p-4'>
                                            <input className="mr-2" type="checkbox" value={specialty} onChange={handleSpecialtyChange} />
                                            {specialty}
                                        </label>
                                        ))}
                                    </div>
                                }/>
                            </Accordion>
                            
                            <label>
                                <input type="checkbox" {...register('highlighted')} className="mr-2" />
                                Destacado
                            </label>
                            
                            <input type="submit" value="Crear" className="w-full mt-4 p-2 text-white bg-blue-500 rounded shadow-sm hover:bg-blue-700" />
                        </form>

                        <button onClick={() => setIsModalOpen(false)} className="w-full mt-4 p-2 text-white bg-red-500 rounded shadow-sm hover:bg-red-700">Close</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}