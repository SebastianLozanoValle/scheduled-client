import { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { CustomAccordionItem } from './CustomAccordionItem';
import { Accordion } from '@chakra-ui/react';
import { Dialog } from '@headlessui/react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useToast } from "@chakra-ui/react";
import { GET_SPECIALISTS } from '../pages/dashboard/Especialistas';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';

const CREATE_SPECIALIST = gql`
mutation($input: SpecialistInput!) {createSpecialist(input: $input) {
    username
}}
`;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SpecialistForm = ({ isModalOpen, setIsModalOpen }) => {
    const [createSpecialist, { data, loading, error }] = useMutation(CREATE_SPECIALIST,
        {refetchQueries: [{ query: GET_SPECIALISTS }]});
    const toast = useToast();
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

    const onSubmit = async (data) => {
        
        data.role = "specialist";
        data.active = true
        data.age = parseInt(data.age);
        data.specialtys = specialtys;

        try {
          const { data: response } = await createSpecialist({ variables: { input: data } });
        //   throw new Error(response);
          toast({
            title: "Success",
            description: "Specialist created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "An error occurred.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
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
                                <InputField name="username" placeholder="Username" register={register} required={true} errors={errors} />
                                <InputField name="password" placeholder="Password" register={register} required={true} errors={errors} type="password" />
                            </div>
                            
                            <div className="flex gap-4">
                                <InputField name="age" placeholder="Age" register={register} required={true} errors={errors} type="number" />
                                <InputField name="gender" placeholder="Gender" register={register} required={true} errors={errors} />
                            </div>
                            
                            <div className="flex w-full gap-4">
                                <InputField name="phone" placeholder="Phone" register={register} required={true} errors={errors} />
                            </div>
                            
                            <div className="flex w-full gap-4">
                                <InputField name="email" placeholder="Email" register={register} required={true} errors={errors} />
                            </div>
                            
                            <div className="flex gap-4">
                                <InputField name="city" placeholder="City" register={register} required={true} errors={errors} />
                                <InputField name="street" placeholder="Street" register={register} required={true} errors={errors} />
                            </div>
    
                            <div className="flex gap-4">
                                <SelectField name="world" options={["", "Hombre", "Mujer", "Mascota"]} register={register} required={true} errors={errors} />
                                <SelectField name="paymentOption" options={["", "weekly", "biweekly", "monthly"]} register={register} required={true} errors={errors} />
                            </div>
                            
                            {/* Weekly Schedule fields */}
                            <Accordion allowToggle>
                                <CustomAccordionItem title="Horario de Atención" children={
                                    daysOfWeek.map((day, index) => (
                                        <div key={index}>
                                            <h3 className='p-4 font-bold m-auto bg-orange-400 rounded-xl'>{day}</h3>
                                            {fieldArrayOperations[day].fields.map((field, index) => (
                                                <div key={field.id} className='m-4'>
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.start`)} placeholder="Start time" />
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.end`)} placeholder="End time" />
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
                                            <CheckboxField key={index} name={specialty} register={register} onChange={handleSpecialtyChange} />
                                        ))}
                                    </div>
                                }/>
                            </Accordion>
                            
                            <CheckboxField name="highlighted" register={register} />
                            
                            <input type="submit" value="Crear" className="w-full mt-4 p-2 text-white bg-blue-500 rounded shadow-sm hover:bg-blue-700" />
                        </form>
    
                        <button onClick={() => setIsModalOpen(false)} className="w-full mt-4 p-2 text-white bg-red-500 rounded shadow-sm hover:bg-red-700">Close</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}