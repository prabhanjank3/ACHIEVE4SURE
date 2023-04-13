import React from "react";
import "./styles.css";
import {Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, Button, ModalHeader} from "@chakra-ui/react";

export default function BasicUsage(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button colorScheme={'blue'} onClick={onOpen}>{props.buttontext}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }