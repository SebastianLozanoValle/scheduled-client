import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const DeleteConfirmationDialogAppointment = ({ isOpen, onClose, appointmentId, cancelAppointment }) => {
    const cancelRef = useRef();
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const { data } = await cancelAppointment({
                variables: {
                    id: appointmentId
                }
            });

            if (data && data.cancelAppointment) {
                toast({
                    title: "Success",
                    description: `La Cita ${data.cancelAppointment.id} ha sido Cancelada.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to cancel the Appointment.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while canceling the Appointment.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        onClose();
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent mt='40vh'>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Specialist
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Esta segur@ de Cancelar  la cita? No se puede deshacer esta acción.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Atras
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Cancelar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};