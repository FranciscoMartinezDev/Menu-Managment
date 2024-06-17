import React from "react";
import { Box, FormControl, FormLabel, Input, Button, ButtonGroup, Icon, Checkbox, useToast } from "@chakra-ui/react";
import ModalIngredients from "./Modals/ModalIngredients";
import ModalIncludes from "./Modals/ModalIncludes";
import ModalSize from "./Modals/ModalSizes";
import { FaFloppyDisk, FaRegSquarePlus, FaXmark, FaAngleLeft } from "react-icons/fa6";
import { useMenuContext } from "../Context/MenuContext";
import { AddCatalog } from '../Services/Menu.Service'
import './Menu.scss';

export default function MenuInfo() {
    const { catalog, handleCatalog,
        products, handleProductName, handleProductPrice, handleProductCustom,
        pushProduct, quitProduct,
        OpenIngredients, OpenSize, OpenInclude } = useMenuContext();
    const toast = useToast();


    const PushCatalog = () => {
        toast.promise(AddCatalog(catalog, products), {
            success: { title: '¡Bien Hecho!', description: 'Se agrego un nuevo catalogo.' },
            error: { title: '¡Ups! Algo salio mal', description: 'Revise nuevamente los datos' },
            loading: { title: 'Espere...', description: 'Un Momento por favor.' },
        })
    }


    return (
        <Box className="menu-info">
            <ModalIngredients />
            <ModalIncludes />
            <ModalSize />
            <header>
                <Button className="btn-back" onClick={() => { window.location.href = '/' }}>
                    <Icon as={FaAngleLeft} />
                </Button>
                <h1>Añadir Catalogo</h1>
                <ButtonGroup className="group-button">
                    <Button onClick={PushCatalog}>
                        <span>Guardar Catalogo</span>
                        <Icon as={FaFloppyDisk} />
                    </Button>
                </ButtonGroup>
            </header>
            <main>
                <Box className="catalog">
                    <FormControl>
                        <FormLabel>Catalogo</FormLabel>
                        <Input placeholder="Nombre..." value={catalog} onChange={handleCatalog} />
                    </FormControl>
                </Box>
                <Box className="products">
                    <Box className="add-product">
                        <Button onClick={pushProduct}>
                            <span>Añadir Articulo</span>
                            <Icon as={FaRegSquarePlus} />
                        </Button>
                    </Box>
                    <Box className="product-list">
                        {products.length > 0 ? products.map((prod, index) => {
                            return (
                                <Box className="product-item" key={index}>
                                    <Button className="btn-close" onClick={() => { quitProduct(index) }}>
                                        <Icon as={FaXmark} />
                                    </Button>
                                    <Input placeholder="Articulo..." value={prod.Name} onChange={(e) => { handleProductName(e, index) }} className="article" />
                                    <Button onClick={() => { OpenInclude(index) }}>
                                        <span>Incluye</span>
                                        <Icon as={FaRegSquarePlus} />
                                    </Button>
                                    <Button onClick={() => { OpenSize(index) }}>
                                        <span>Tamaños</span>
                                        <Icon as={FaRegSquarePlus} />
                                    </Button>
                                    <Button onClick={() => { OpenIngredients(index) }}>
                                        <span>Ingredientes</span>
                                        <Icon as={FaRegSquarePlus} />
                                    </Button>
                                    <Checkbox
                                        isChecked={prod.Custom}
                                        onChange={(e) => { handleProductCustom(e, index) }}
                                        className="custom">
                                        <span>A gusto del cliente</span>
                                    </Checkbox>
                                    <Input placeholder="Precio..." value={prod.Price} onChange={(e) => { handleProductPrice(e, index) }} className="price" />
                                </Box>
                            )
                        }) : null}
                    </Box>
                </Box>
            </main>
        </Box>
    )
}