import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";

function ConfirmationModal(props) {


    const handleYes = (event) => {
        props.onClick();
    }


    const onClose = () => {
        props.onClose()
    }


    return <>

        <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Are you sure you want to do this?`}</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='facebook' mr={3} onClick={handleYes}>
                        Yes
                    </Button>
                    <Button onClick={onClose}>No</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
export default ConfirmationModal;