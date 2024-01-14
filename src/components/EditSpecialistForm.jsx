import { CustomAccordionItem } from './CustomAccordionItem';
import { Accordion, Box, Text, VStack } from '@chakra-ui/react';
import { Dialog } from '@headlessui/react';
import { gql } from '@apollo/client';
import { GET_SPECIALISTS } from '../pages/dashboard/Especialistas';
import { InputField } from './InputField';
import { CheckboxField } from './CheckboxField';
import { cities } from '../data/cities';
import { AutocompleteInputField } from './AutocompleteInputField';
import { useForm, useFieldArray } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const UPDATE_SPECIALIST = gql`
mutation($id: ID!, $input: UpdateSpecialistInput!) {
    updateSpecialist(id: $id, input: $input) {
        username
    }
}
`;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const EditSpecialistForm = ({ specialist, onClose, isFormOpen }) => {
    const [updateSpecialist, { data, loadaing, error }] = useMutation(UPDATE_SPECIALIST,
        { refetchQueries: [{ query: GET_SPECIALISTS }] });
    const toast = useToast();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            username: specialist.username,
            city: specialist.city,
            street: specialist.street,
            gender: specialist.gender,
            role: specialist.role,
            highlighted: specialist.highlighted,
            specialtys: specialist.specialtys,
            weeklySchedule: specialist.weeklySchedule
        }
    });

    console.log(register);

    const [specialtys, setSpecialtys] = useState([]);

    useEffect(() => {
        setSpecialtys(specialist.specialtys);
    }, [specialist, setValue]);

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
        data.active = true;
        data.specialtys = specialtys;
        const updatedSpecialist = {
            username: data.username,
            gender: data.gender,
            city: data.city,
            street: data.street,
            highlighted: data.highlighted,
            role: data.role,
            active: data.active,
            specialtys: data.specialtys,
            weeklySchedule: data.weeklySchedule
        };

        console.log(updatedSpecialist)

        try {
            await updateSpecialist({ variables: { id: specialist.id, input: updatedSpecialist } });
            toast({
                title: "Specialist updated.",
                description: "Specialist has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            console.log('Form submitted successfully. Closing form...');
            onClose();
        } catch (err) {
            toast({
                title: "An error occurred.",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isFormOpen);
    }, [isFormOpen]);

    console.log('Rendering EditSpecialistForm. isModalOpen:', isModalOpen);

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
            onClose={() => {
                console.log('Closing form due to Dialog onClose...');
                setIsModalOpen(false)
            }}
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
                                <InputField label='Nombre' name="username" placeholder="Username" register={register} required={false} errors={errors} />
                                {/* <InputField label='Contraseña' name="password" placeholder="Password" register={register} required={true} errors={errors} type="password" /> */}
                            </div>
                            
                            <div className="flex gap-4">
                                {/* <InputField label='Edad' name="age" placeholder="Age" register={register} required={false} errors={errors} type="number" /> */}
                                <InputField label='Sexo' name="gender" placeholder="Gender" register={register} required={false} errors={errors} />
                            </div>
                            
                            <div className="flex w-full gap-4">
                                <AutocompleteInputField label='Distrito' name="city" options={cities} register={register} setValue={setValue} required={false} errors={errors} />
                                {/* <InputField label='Distrito' name="city" placeholder="Distrito" register={register} required={false} errors={errors} /> */}
                                <InputField label='Calle' name="street" placeholder="Street" register={register} required={false} errors={errors} />
                            </div>
    
                            {/* Optional fields */}
                            <CheckboxField label='Destacado' name="highlighted" register={register} errors={errors} />
    
                            <div className="flex flex-wrap gap-4">
                                {specialtyOptions.map(specialty => (
                                    <CheckboxField key={specialty} label={specialty} name="specialtys" value={specialty} register={register} errors={errors} onChange={handleSpecialtyChange} />
                                ))}
                            </div>
    
                            <Accordion allowToggle>
                                <CustomAccordionItem title="Horario de Atención" children={
                                    daysOfWeek.map((day, index) => (
                                        <div key={index}>
                                            <h3 className='p-4 font-bold m-auto bg-orange-400 rounded-xl'>{day}</h3>
                                            {fieldArrayOperations[day].fields.map((field, index) => (
                                                <div key={field.id} className='m-4'>
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.start`)} defaultValue={field.start} placeholder="Start time" />
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.end`)} defaultValue={field.end} placeholder="End time" />
                                                    <button className='rounded-md bg-red-600 p-1' type="button" onClick={() => fieldArrayOperations[day].remove(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <button className='m-4 p-1 bg-green-600 rounded-md' type="button" onClick={() => fieldArrayOperations[day].append({ start: "", end: "" })}>Add Time Slot</button>
                                        </div>
                                    ))
                                }/>
                            </Accordion>
    
                            <button type="submit" className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                            </button>
                        </form>
                        <button onClick={() => onClose()} className="w-full mt-4 p-2 text-white bg-red-500 rounded shadow-sm hover:bg-red-700">Close</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};