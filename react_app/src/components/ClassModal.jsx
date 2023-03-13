import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { APICall } from "../api";
import ConfirmationModal from "./ConfirmationModal";

function ClassModal(props) {

    const [name, setName] = useState();
    const [id, setId] = useState();




    useEffect(() => {
        if (props.class) {
            setName(props.class.name);
            setId(props.class.id);
        }
    }, []);

    const handleNameChange = (event) => setName(event.target.value)

    const handleSaveOnclick = (event) => {
        APICall.getStudentSummary();
        props.onClose()
    }



    return (
        <>

            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`Create or Modify A Class`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name of Class</FormLabel>
                            <Input placeholder='Class name' value={name} onChange={handleNameChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='facebook' mr={3} onClick={handleSaveOnclick}>
                            Save
                        </Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )

}

export default ClassModal;