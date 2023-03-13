import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClassAPI } from "../api/classAPI";


function ClassModal(props) {

    const [name, setName] = useState();

    const navigate = useNavigate();



    useEffect(() => {
        if (props.class) {
            setName(props.class.name);
        }

    }, [props]);

    const handleNameChange = (event) => setName(event.target.value)

    const handleSaveOnclick = (event) => {
        //If props.class is present, it is an edit
        if (!props.class) ClassAPI.addClass(name);
        else ClassAPI.editClass(name, props.class.id)
        props.onClose()
        navigate("/class")
        window.location.reload(false)
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
                        <Button colorScheme='facebook' mr={3} onClick={handleSaveOnclick} isDisabled={!name}>
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