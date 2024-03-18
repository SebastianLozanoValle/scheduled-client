import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const DeleteConfirmationDialogClient = ({ isOpen, onClose, cliente, deleteClient }) => {
    const cancelRef = useRef();
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const { data } = await deleteClient({
                variables: {
                    id: cliente.id
                }
            });

            if (data && data.deleteClient) {
                toast({
                    title: "Success",
                    description: `Specialist ${data.deleteClient.username} has been deleted.`,
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
                        Delete Client
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {`Are you sure you want to delete this client(${cliente.username})? This action is irreversible.`}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};