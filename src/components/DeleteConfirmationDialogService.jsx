import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const DeleteConfirmationDialogService = ({ isOpen, onClose, user, service, deleteService }) => {
    const cancelRef = useRef();
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const { data } = await deleteService({
                variables: {
                    id: user.id,
                    serviceName:  service.name
                }
            });

            if (data && data.deleteService) {
                toast({
                    title: "Success",
                    description: `Specialist ${data.deleteService.username} has been deleted.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete specialist.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while deleting the specialist.",
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
            bg='#fff'
        >
            <AlertDialogOverlay>
                <AlertDialogContent mt='40vh'>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Borrar Servicio
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {`Esta seguro de borrar este servicio(${service.name})? Esta accion es irreversible.`}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Borrar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};