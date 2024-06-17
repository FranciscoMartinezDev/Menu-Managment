import axios from 'axios';

export async function GetMenu(catalog, products) {
    try {
        const url = import.meta.env.VITE_GET_MENU;
        const menu = await axios.get(url).then(res => res.data);

        return menu;
    } catch (e) {
        console.log(e);
    }
}

export async function AddCatalog(catalog, products) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = import.meta.env.VITE_ADD_CATALOG;
            const reqBody = {
                Catalog: catalog,
                Products: products,
            }
            const newCatalog = await axios.post(url, reqBody).then(res => res.status);
            resolve(newCatalog);
        } catch (e) {
            reject(e);
            console.log(e);
        }
    })
}

export async function DropCatalog(catalogId) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = import.meta.env.VITE_DELETE_CATALOG.replace('{id}', catalogId);
            await axios.delete(url).then(() => {
                resolve(200)
            }).catch(err => reject(err));
        } catch (e) {
            reject(e);
            console.log(e);
        }
    })
}