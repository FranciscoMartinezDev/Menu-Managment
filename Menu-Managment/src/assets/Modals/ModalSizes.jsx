import React from "react";
import { Button, Icon, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useMenuContext } from "../../Context/MenuContext";
import { FaXmark } from "react-icons/fa6";
import './Modals.scss';


export default function ModalSize() {
    const { sizes, showSizes, pushSize, CloseSize } = useMenuContext();

    return (
        <Modal isOpen={showSizes} onClose={showSizes}>
            <ModalOverlay className="background" />
            <ModalContent className="modal-sizes">
                <ModalHeader>
                    <h1>Tamaños</h1>
                </ModalHeader>
                <ModalBody className="body">
                    {sizes.length > 0 ? sizes.map((item, index) => {
                        return (
                            <FormControl className="size" key={index}>
                                <Button className="btn-close"><Icon as={FaXmark} /></Button>
                                <FormLabel>Tamaño</FormLabel>
                                <Input placeholder=". . ." value={item.Size} onChange={(e) => { pushSize(e, index) }} />
                            </FormControl>
                        )
                    }) : null}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={CloseSize}>Aplicar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}