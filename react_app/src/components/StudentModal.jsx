import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentAPI } from "../api/studentAPI";

function StudentModal(props) {

    const [name, setName] = useState();


    const navigate = useNavigate();


    useEffect(() => {
        if (props.student) {
            setName(props.student.name);
        }

    }, [props]);

    const handleNameChange = (event) => setName(event.target.value)

    const handleSaveOnclick = (event) => {
        //If props.student is present, it is an edit
        if (!props.student) StudentAPI.addStudent(name);
        else StudentAPI.editStudent(name, props.class.id)
        props.onClose()
        navigate("/student")
        window.location.reload(false)
    }



    return (
        <>

            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`Create or Modify A Student`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name of Student</FormLabel>
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

export default StudentModal;