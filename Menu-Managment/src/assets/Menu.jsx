import React from "react";
import { Box, Badge } from '@chakra-ui/react';
import { useMenuContext } from '../Context/MenuContext';
import restaurant from './Footage/Restaurant.jpg';
import ModalItemMenu from "./Modals/ModalItemMenu";

export default function Menu() {
    const { menu, OpenMenuItem } = useMenuContext()

    return (
        <Box className="menu">
            <ModalItemMenu />
            <header>
                <Box className="front-page">
                    <img src={restaurant} alt="" />
                </Box>
            </header>
            <main>
                {menu.length > 0 ? menu.map((item, index) => {
                    return (
                        <Box className="menu-item" key={index}>
                            <Box className="catalog">
                                <h2>{item.Name}</h2>
                            </Box>
                            <ul className="products">
                                {item.Products.map((prod, key) => {
                                    return (
                                        <li key={key} onClick={() => { OpenMenuItem(index, key) }}>
                                            <span className="name">{prod.Name}</span>
                                            <Box className="product-data">
                                                <Badge className={`available ${prod.Availability ? 'Yes' : 'No'}`}>
                                                    {prod.Availability ? 'disponible' : 'No Disponible'}
                                                </Badge>
                                                <span className="price">{`${prod.Price} $`}</span>
                                            </Box>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Box>
                    )
                }) : <h1>No hay articulos para mostrar</h1>}
            </main>
        </Box>
    )
}