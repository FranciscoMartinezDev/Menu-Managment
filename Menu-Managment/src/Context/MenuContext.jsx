import { createContext, useContext, useEffect, useState } from 'react';
import { ProductModel } from '../Models/ProductModel';
import { IncludeModel } from '../Models/IncludeModel';
import { SizeModel } from '../Models/SizeModel';
import { IngredientModel } from '../Models/IngredientModel';
import { GetMenu } from '../Services/Menu.Service';

const MenuContext = createContext();

export const useMenuContext = () => {
    return useContext(MenuContext);
}


export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [catalog, setCatalog] = useState('');

    const [products, setProducts] = useState([]);

    const [sizes, setSizes] = useState([]);
    const [include, setInclude] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [showIngredients, setShowIngredients] = useState(false);
    const [showSizes, setShowSizes] = useState(false);
    const [showIncludes, setShowIncludes] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const [showMenuItem, setShowMenuItem] = useState(false);
    const [menuArticle, setMenuArticle] = useState(null);

    const [showSecureModal, setShowSecureModal] = useState(false);
    const [selectedCatalog, setSelectedCatalog] = useState(null);

    const handleCatalog = (e) => {
        const value = e.target.value;
        setCatalog(value);
    }

    const handleProductName = (e, index) => {
        const value = e.target.value;
        setProducts(item => {
            const itemList = [...item];
            itemList[index].Name = value;
            return itemList;
        })
    }

    const handleProductPrice = (e, index) => {
        const value = e.target.value;
        setProducts(item => {
            const itemList = [...item];
            itemList[index].Price = value;
            return itemList;
        })
    }

    const handleProductCustom = (e, index) => {
        const checked = e.target.checked;
        setProducts(item => {
            const itemList = [...item];
            itemList[index].Custom = checked;
            return itemList;
        })
    }
    const pushProduct = () => {
        setProducts(item => {
            const itemList = [...item];
            const itemIngredient = new IngredientModel('', '');
            const itemSize = new SizeModel('');
            const newItem = new ProductModel('', '', [], [itemIngredient], [itemSize], true, false);
            itemList.push(newItem);
            return itemList;
        })
    }
    const quitProduct = (index) => {
        setProducts(item => {
            const itemList = [...item];
            itemList.splice(index, 1);
            return itemList;
        })
    }

    const OpenInclude = (prodIndex) => {
        const prodIncludes = products[prodIndex].Include;
        setInclude(prodIncludes);
        setShowIncludes(true);
        if (prodIndex != selectedItem) {
            setSelectedItem(prodIndex);
        }
    }
    const pushInclude = (include) => {
        setInclude(item => {
            const itemList = [...item];
            const newItem = new IncludeModel(include);
            itemList.push(newItem);
            return itemList;
        })
    }
    const quitInclude = (index) => {
        setInclude(item => {
            const itemList = [...item];
            itemList.splice(index, 1);
            return itemList;
        })
    }
    const CloseInclude = () => {
        setProducts(item => {
            const itemList = [...item];
            itemList[selectedItem].Include = include;
            return itemList;
        })
        setShowIncludes(false);
    }

    const OpenSize = (prodIndex) => {
        const prodSizes = products[prodIndex].Sizes;
        setSizes(prodSizes);
        setShowSizes(true);
        if (prodIndex != selectedItem) {
            setSelectedItem(prodIndex);
        }
    }
    const pushSize = (e, index) => {
        const size = e.target.value;
        setSizes(item => {
            const itemList = [...item];
            itemList[index].Size = size;
            const lastItem = itemList.length - 1;
            if (lastItem == index) {
                const newItem = new SizeModel('');
                itemList.push(newItem);
            }
            return itemList;
        })
    }
    const CloseSize = () => {
        setProducts(item => {
            const itemList = [...item];
            itemList[selectedItem].Sizes = sizes;
            return itemList;
        })
        setShowSizes(false);
    }


    const OpenIngredients = (prodIndex) => {
        const prodIngredients = products[prodIndex].Ingredients;
        setIngredients(prodIngredients);
        setShowIngredients(true);
        if (prodIndex != selectedItem) {
            setSelectedItem(prodIndex);
        }
    }
    const pushIngredient = (e, index) => {
        const ingredient = e.target.value;
        setIngredients(item => {
            const itemList = [...item];
            itemList[index].Name = ingredient;
            const lastItem = itemList.length - 1;
            if (lastItem == index) {
                const newItem = new IngredientModel('', '');
                itemList.push(newItem);
            }
            return itemList;
        })
    }
    const handleIngredientReplace = (e, index) => {
        const replace = e.target.value;
        setIngredients(item => {
            const itemList = [...item];
            itemList[index].Replace = replace;
            return itemList;
        })
    }
    const CloseIngredients = () => {
        setProducts(item => {
            const itemList = [...item];
            itemList[selectedItem].Ingredients = ingredients;
            return itemList;
        })
        setShowIngredients(false);
    }


    const OpenMenuItem = (cat, prod) => {
        setShowMenuItem(true);
        const article = menu[cat].Products[prod]
        setMenuArticle(article);
    }
    const CloseMenuItem = () => {
        setMenuArticle(null);
        setShowMenuItem(false);
    }

    const SecureQuestion = (catalogId) => {
        if (showSecureModal) {
            setShowSecureModal(false);
        } else {
            setShowSecureModal(true);
        }
        setSelectedCatalog(catalogId);
    }


    // CALLS ====================================================================================================
    const GetMenuData = async () => {
        const data = await GetMenu();
        setMenu(data);
    }

    useEffect(() => {
        GetMenuData();
    }, [])

    return (
        <MenuContext.Provider value={{
            menu,
            catalog, handleCatalog,
            products, handleProductName, handleProductPrice, handleProductCustom, pushProduct, quitProduct,
            ingredients, showIngredients, OpenIngredients, pushIngredient, handleIngredientReplace, CloseIngredients,
            sizes, showSizes, OpenSize, pushSize, CloseSize,
            include, showIncludes, OpenInclude, pushInclude, quitInclude, CloseInclude,
            menuArticle, showMenuItem, OpenMenuItem, CloseMenuItem,
            selectedCatalog, showSecureModal, SecureQuestion
        }}>
            {children}
        </MenuContext.Provider>
    )
}