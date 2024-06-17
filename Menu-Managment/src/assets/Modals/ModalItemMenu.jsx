import { Box, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import React from "react";
import { useMenuContext } from "../../Context/MenuContext";
import Food from '../Footage/Food.jpg';
import './Modals.scss';

export default function ModalItemMenu() {
    const { menuArticle, showMenuItem, CloseMenuItem } = useMenuContext();

    return (
        <Modal isOpen={showMenuItem} onClose={showMenuItem}>
            <ModalOverlay />
            <ModalContent className="modal-menu-item">
                <ModalCloseButton onClick={CloseMenuItem} color={'white'} />
                <ModalHeader>
                    <img src={Food} alt="" />
                </ModalHeader>
                <ModalBody className="body">
                    {menuArticle != null ?
                        <>
                            <Box className="name-price">
                                <h2>{menuArticle.Name}</h2>
                                <p>{menuArticle.Price} $</p>
                            </Box>
                            {menuArticle.Include.length > 0 ?
                                <Box className="includes">
                                    <h2>Esta compra Incluye:</h2>
                                    <p>{menuArticle.Include.map((inc, key) => {
                                        return (<span key={key}>{inc.Name}</span>)
                                    })}</p>
                                </Box>
                                : null}
                            {menuArticle.Ingredients.length > 0 ?
                                <Box className="detail">
                                    {menuArticle.Ingredients.map((ing, key) => {
                                        const lastIndex = menuArticle.Ingredients.length - 1;
                                        return (<span key={key}>{`${ing.Name}${lastIndex !== key ? ', ' : ''} `}</span>);
                                    })}
                                </Box>
                                : null}
                            {menuArticle.Size.length > 0 ?
                                <Box className="sizes">
                                    {menuArticle.Size.map((size, key) => {
                                        return (<Button key={key}>{size.Size}</Button>)
                                    })}
                                </Box>
                                : null}
                        </>
                        : null}
                </ModalBody>
                <ModalFooter>
                    <Box className="sizes">

                    </Box>
                    <Button>Adquirir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}