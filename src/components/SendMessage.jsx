import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useUserStore } from "../store/userStore";
import { useToast } from '@chakra-ui/react';

export const SendMessage = ({ isOpen, onClose, recipient, tipo, sendNotification, toggleReject }) => {
    const toast = useToast();
    const { userId } = useUserStore();
    const [description, setDescription] = useState('');

    const handleSendNotification = async () => {
        console.log({
            sender: userId,
            recipient: recipient,
            tipo: tipo,
            message: description
        })
        const input = {
            sender: userId,
            recipient: recipient,
            tipo: tipo,
            message: description
        }
        try {
            const data = await sendNotification({ variables: { input: input } });
            const cambio = await toggleReject({ variables: { id: recipient }
            });
            if (data && data.data.sendNotification && cambio && cambio.data.toggleReject) {
                toast({
                    title: "Success",
                    description: `Mensaje enviado exitosamente`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Algo ha fallado",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Un error ha ocurrido durante la ejecucion.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Rechazo:
                        </Dialog.Title>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Motivo de la modificación"
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={handleSendNotification}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};