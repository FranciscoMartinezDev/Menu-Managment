import { Box, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMenuContext } from "../../Context/MenuContext";
import { FaArrowRightArrowLeft, FaXmark } from "react-icons/fa6";
import './Modals.scss';

export default function ModalIngredients() {
    const { ingredients, showIngredients, pushIngredient, handleIngredientReplace, CloseIngredients } = useMenuContext();
    const [slide, setSlide] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const changeReplace = (index) => {
        if (selectedIngredient !== index) {
            setSelectedIngredient(index)
        }
        if (slide) {
            setSlide(false)
        } else {
            setSlide(true)
        }
    }

    return (
        <Modal isOpen={showIngredients} onClose={showIngredients}>
            <ModalOverlay />
            <ModalContent className="modal-ingredients">
                <ModalHeader>
                    <h1>Ingredientes</h1>
                </ModalHeader>
                <ModalBody className="body">
                    {ingredients.length > 0 ? ingredients.map((item, index) => {
                        return (
                            <FormControl className="ingredient" key={index}>
                                <FormLabel>
                                    {slide && selectedIngredient == index ? 'Reemplazar por' : 'Ingrediente'}
                                </FormLabel>
                                <Box className={`input-content ${slide && selectedIngredient == index ? 'active' : ''}`}>
                                    <InputGroup>
                                        <Input
                                            placeholder=". . ."
                                            value={item.Name}
                                            onChange={(e) => { pushIngredient(e, index) }} />
                                        <InputRightElement>
                                            <Button onClick={() => { changeReplace(index) }}>
                                                <Icon as={FaArrowRightArrowLeft} />
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <InputGroup>
                                        <Input
                                            placeholder=". . ."
                                            value={item.Replace}
                                            onChange={(e) => { handleIngredientReplace(e, index) }} />
                                        <InputRightElement>
                                            <Button onClick={() => { changeReplace(index) }}>
                                                <Icon as={FaArrowRightArrowLeft} />
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Box>
                            </FormControl>
                        )
                    }) : null}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={CloseIngredients}>Aplicar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}