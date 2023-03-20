const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')

const router = express.Router();
const prisma = new PrismaClient();

require('dotenv').config

async function getCatalog(sort, filter, pageNumber) {

    const catalog = await prisma.property_list.findMany({
        where: filter,
        include: {
            prop_detail: {
                select: {
                    lb: true,
                    lt: true,
                    km: true,
                    kt: true,
                    prop_sale: true,
                    prop_type: true
                }
            },
            photos: true
        },
        orderBy: sort,
        skip: (pageNumber*20),
        take: 20
    })
    return catalog
}

router.get('/catalog', async(req, res) => {
    try {
        const agent = await prisma.agent.findFirst({
            where: { 
                email: {
                    contains: req.query.username
                } 
            },
        })

        let filter = Prisma.UserWhereInput
        let pageNumber = req.query.p
        let orderBy = ''
        let sortBy = ''
        let sort = Prisma.UserOrderByInput

        filter = {
            agent_id: agent.agent_id,
            available: true,
            prop_name: {
                search: req.body.keyword ? req.body.keyword : undefined
            },
            price: {
                lte: req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined,
                gte: req.query.minPrice ? parseInt(req.query.minPrice) : undefined
            },
            prop_city: {
                search: req.query.city ? req.query.city : undefined
            },
            prop_prov: {
                search: req.query.prov ? req.query.prov : undefined
            },
            prop_detail: {
                prop_sale: req.query.saleType ? req.query.saleType : undefined,
                prop_type: req.query.propType ? req.query.propType : undefined
            }
        }

        if(!req.query.orderBy){
            orderBy = 'desc'
        } else orderBy = req.query.orderBy

        if(!req.query.sortBy){
            sortBy = 'dateAdded'
        } else sortBy = req.query.sortBy

        if(!req.query.p){
            pageNumber = 0
        } else pageNumber = req.query.p

        sort = {[sortBy]: orderBy}

        const data = await getCatalog(sort, filter, pageNumber)

        console.log(data);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.json({ error: err })
    }
});

module.exports = router