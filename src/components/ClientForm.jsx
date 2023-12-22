import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Dialog } from '@headlessui/react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useToast } from "@chakra-ui/react";
import { GET_CLIENTS } from '../pages/dashboard/Clientes'; // replace with your actual query
import { InputField } from './InputField';
import { SelectField } from './SelectField';

const CREATE_CLIENT = gql`
mutation($input: ClientInput!) {
  createClient(input: $input) {
    username
  }
}`;

export const ClientForm = ({ isModalOpen, setIsModalOpen }) => {
  const [createClient, { data, loading, error }] = useMutation(CREATE_CLIENT,
    {refetchQueries: [{ query: GET_CLIENTS }]}); // replace GET_CLIENTS with your actual query
  const toast = useToast();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.role = "client";
    data.active = true;
    data.age = parseInt(data.age);

    try {
      const { data: response } = await createClient({ variables: { input: data } });
      toast({
        title: "Success",
        description: "Client created successfully",
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
            <Dialog.Title className="text-lg font-medium text-gray-900">Client Form</Dialog.Title>

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

              <input type="submit" value="Crear" className="w-full mt-4 p-2 text-white bg-blue-500 rounded shadow-sm hover:bg-blue-700" />
            </form>

            <button onClick={() => setIsModalOpen(false)} className="w-full mt-4 p-2 text-white bg-red-500 rounded shadow-sm hover:bg-red-700">Close</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};