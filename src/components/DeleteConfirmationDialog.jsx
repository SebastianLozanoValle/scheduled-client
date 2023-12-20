import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const DeleteConfirmationDialog = ({ isOpen, onClose, especialista, deleteSpecialist }) => {
    const cancelRef = useRef();
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const { data } = await deleteSpecialist({
                variables: {
                    id: especialista.id
                }
            });

            if (data && data.deleteSpecialist) {
                toast({
                    title: "Success",
                    description: `Specialist ${data.deleteSpecialist.username} has been deleted.`,
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
            ml='265px'
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Specialist
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to delete this specialist? This action is irreversible.
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