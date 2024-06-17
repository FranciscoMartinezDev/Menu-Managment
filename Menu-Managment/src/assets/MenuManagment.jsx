import React, { useState } from "react";
import { Box, Button, ButtonGroup, Icon, Flex, Checkbox, Badge } from "@chakra-ui/react";
import { FaRegSquarePlus, FaRegRectangleXmark, FaAngleDown, FaBowlFood } from "react-icons/fa6";
import { useMenuContext } from "../Context/MenuContext";
import './Menu.scss';
import { ModalSecureQuestion } from "./Modals/ModalSecureQuestion";

export default function MenuManagment() {
    const { menu, SecureQuestion } = useMenuContext()
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeCatalog, setActiveCatalog] = useState(false);

    const dropDownCatalog = (index) => {
        if (selectedItem != index) {
            setActiveCatalog(true)
            setSelectedItem(index)
        } else {
            setActiveCatalog(false)
            setSelectedItem()
        }
    }

    return (
        <Box className="menu-managment">
            <ModalSecureQuestion />
            <header>
                <h1>Menú</h1>
                <ButtonGroup className="group-button">
                    <Button onClick={() => { window.location.href = '/Add' }}>
                        <span>Añadir Catalogo</span>
                        <Icon as={FaRegSquarePlus} />
                    </Button>
                    <Button onClick={() => { window.open('/Menu') }}>
                        <span>Ver Menú</span>
                        <Icon as={FaBowlFood} />
                    </Button>
                </ButtonGroup>
            </header>
            <main>
                {menu.length > 0 ? menu.map((item, key) => {
                    return (
                        <Box className={`menu-item ${selectedItem == key && activeCatalog == true ? 'active' : ''}`} key={key}>
                            <Flex className="catalog">
                                <h3>{item.Name}</h3>
                                <ButtonGroup className="button-collect">
                                    <Button onClick={() => { SecureQuestion(item.IdProductGroup) }}>
                                        <Icon as={FaRegRectangleXmark} />
                                    </Button>
                                    <Button onClick={() => { dropDownCatalog(key) }}>
                                        <Icon as={FaAngleDown} />
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                            <ul className="products">
                                {item.Products.map((li, liKey) => {
                                    return (
                                        <li key={liKey}>
                                            <span>{li.Name}</span>
                                            <Box className="product-data">
                                                <span>{`${li.Price} $`}</span>
                                                <Checkbox isChecked={li.Availability}>
                                                    <Badge className={`available ${li.Availability ? 'Yes' : 'No'}`}>
                                                        {li.Availability ? 'Disponible' : 'Agotado'}
                                                    </Badge>
                                                </Checkbox>
                                            </Box>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Box>
                    )
                }) : <h2>No hay catalogos para mostrar</h2>}
            </main >
        </Box >
    )
}