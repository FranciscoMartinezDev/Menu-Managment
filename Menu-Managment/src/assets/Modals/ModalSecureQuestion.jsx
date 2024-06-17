import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { useMenuContext } from '../../Context/MenuContext';
import './Modals.scss';
import { DropCatalog } from "../../Services/Menu.Service";

export function ModalSecureQuestion() {
    const { selectedCatalog, showSecureModal, SecureQuestion } = useMenuContext();
    const toast = useToast();

    const DropingCatalog = () => {
        SecureQuestion(selectedCatalog);
        toast.promise(DropCatalog(selectedCatalog), {
            success: { title: '¡Bien Hecho!', description: 'Se Elimino este catalogo de forma exitosa' },
            error: { title: '¡Ups! Algo salio mal', description: 'Hubo un problema a la hora de eliminar este catalogo.' },
            loading: { title: 'Espere...', description: 'Un Momento por favor...' },
        })
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    return (
        <Modal isOpen={showSecureModal} onClose={showSecureModal}>
            <ModalOverlay />
            <ModalContent className="modal-secure-question">
                <ModalHeader>
                    <h2>Un Momento...</h2>
                </ModalHeader>
                <ModalBody className="body">
                    <p>¿Está segur@ de que desea eliminar este catalogo?</p>
                    <p>Todos los productos se eliminaran</p>
                    <ButtonGroup className="button-group">
                        <Button onClick={SecureQuestion}>No</Button>
                        <Button onClick={DropingCatalog}>Si</Button>
                    </ButtonGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}