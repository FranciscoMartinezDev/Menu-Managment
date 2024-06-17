const app = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/Get/Menu', async (req, res) => {
    try {
        const menu = await prisma.productGroups.findMany({
            include: { Products: true }
        })
        res.status(200).json(menu)
    } catch (e) {
        res.status(500).json({ error: e });
        console.log(e);
    }
})

app.post('/Add/New-Catalog', async (req, res) => {
    try {
        const { Catalog, Products } = req.body;

        const productGroup = await prisma.productGroups.create({
            data: {
                Name: Catalog
            }
        })

        await Promise.all(Products.map(async (prod) => {

            const ingredients = prod.Ingredients.filter(x => x.Name !== '');
            const sizes = prod.Sizes.filter(x => x.Size !== '');

            await prisma.products.create({
                data: {
                    Availability: prod.Availability,
                    Customizable: prod.Custom,
                    Size: sizes,
                    Ingredients: ingredients,
                    Include: prod.Include,
                    Price: parseFloat(prod.Price),
                    Name: prod.Name,
                    productGroupsId: productGroup.IdProductGroup
                }
            })
        }))
        res.status(200).json({ message: 'Excellent' });
    } catch (e) {
        res.status(500).json({ error: e });
        console.log(e);
    }
})


app.delete('/Delete/Catalog/:id', async (req, res) => {
    try {
        const catalogId = parseInt(req.params.id);

        const catalog = await prisma.productGroups.findFirst({
            where: {
                IdProductGroup: catalogId,
            },
            include: { Products: true }
        });

        await Promise.all(catalog.Products.map(async (prod) => {
            await prisma.products.delete({
                where: {
                    IdProduct: prod.IdProduct
                }
            })
        }))

        await prisma.productGroups.delete({
            where: {
                IdProductGroup: catalogId
            }
        })
        
        res.status(200).json(catalog);

    } catch (e) {
        res.status(500).json({ error: e });
    }
})

module.exports = app;