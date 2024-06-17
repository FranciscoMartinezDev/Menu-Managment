import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Button, Icon, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useMenuContext } from "../../Context/MenuContext";
import { FaRegRectangleXmark } from "react-icons/fa6";
import './Modals.scss';

export default function ModalIncludes() {
    const { include, showIncludes, pushInclude, quitInclude, CloseInclude } = useMenuContext();
    const [filter, setFilter] = useState('');
    const [itemList, setItemList] = useState([]);
    const listRef = useRef(null);
    const data = ['Milanesa', 'Banana Split', 'Pollo', 'Papas Fritas', 'Ensalada de papas', 'Ensalada de rusa', 'Ensalada común'];

    const [selectedIndex, setSelectedIndex] = useState(0);

    const writeFilter = (e) => {
        const value = e.target.value;
        setFilter(value);
    }

    const filterList = () => {
        if (filter == '') {
            setItemList([])
        } else {
            const list = data.filter(x => x.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
            setItemList(list)
        }
    }

    const navigation = (e) => {
        const lastIndex = itemList.length - 1;

        if (e.key == 'ArrowDown') {
            const nextIndex = selectedIndex < lastIndex ? selectedIndex + 1 : 0;
            setSelectedIndex(nextIndex);
        }
        if (e.key == 'ArrowUp') {
            const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : lastIndex;
            setSelectedIndex(prevIndex);
        }
        if (e.key == 'Enter') {
            pushInclude(itemList[selectedIndex]);
            setFilter('')
        }
    }

    const selectItem = (item) => {
        pushInclude(item);
        setFilter('')
    }

    useEffect(() => {
        filterList();
    }, [filter])

    return (
        <Modal isOpen={showIncludes} onClose={showIncludes}>
            <ModalOverlay />
            <ModalContent className="modal-includes">
                <ModalHeader>
                    <h1>Incluye</h1>
                </ModalHeader>
                <ModalBody className="body">
                    <Box className="search">
                        <Input placeholder="Buscar..." onKeyDown={navigation} value={filter} onChange={writeFilter} list="search" />
                        {filter != '' ?
                            <ul className="data-list" ref={listRef}>
                                {itemList.length > 0 ? itemList.map((item, key) => {
                                    return (<li className={selectedIndex == key ? 'active' : ''} onClick={() => { selectItem(item) }} key={key}><span>{item}</span></li>)
                                }) : <li><span>No se encontro producto</span></li>}
                            </ul>
                            : null}
                    </Box>
                    <Box className="include-list">
                        {include.length > 0 ? include.map((item, index) => {
                            return (
                                <Flex className="include-item" key={index}>
                                    <span>{item.Name}</span>
                                    <Button onClick={() => { quitInclude(index) }}>
                                        <Icon as={FaRegRectangleXmark} />
                                    </Button>
                                </Flex>
                            )
                        }) : null}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={CloseInclude}>Aplicar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}