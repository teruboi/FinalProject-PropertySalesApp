const express = require('express');
const { PrismaClient } = require('@prisma/client')

const router = express.Router();
const prisma = new PrismaClient();

async function getCatalog(sort, filter, pageNumber) {

    const catalog = await prisma.property_list.aggregate({
        where: filter,
        include: {
            prop_detail: {
                select: {
                    lb: true,
                    lt: true,
                    km: true,
                    kt: true,
                }
            }
        },
        orderBy: sort,
        skip: (pageNumber*10),
        take: 10
    })
    return catalog
}

const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        let filter = []
        let pageNumber = 0
        let sort = {}

        filter.push({agent_id: req.params.id}, {available: true})

        if(req.query.sortBy && req.query.orderBy) {
            sort = {[req.query.sortBy]: req.query.orderBy}
        }
        
        if (req.query.keyword) {
            filter.push({ prop_name: {
                search: new RegExp(req.query.keyword, 'i') }
            })
        }
        if (req.query.saleType) {
            filter.push({ prop_detail: { prop_sale: req.query.saleType } })
        }
        if (req.query.p) {
            pageNumber = parseInt(req.query.p)
        }
        if (req.query.minPrice || req.query.maxPrice) {
            filter.push({ price: {
                lt: parseInt(req.query.maxPrice), gt: parseInt(req.query.minPrice)
            }})
        }
        if (req.query.propType) {
            filter.push({ prop_detail: {
                prop_type: req.query.propType
            }})
        }
        if (req.query.city) {
            filter.push({ prop_city: req.query.city})
        }
        if (req.query.prov) {
            filter.push({ prop_prov: req.query.prov})
        }

        console.log(filter, sort, pageNumber);

        const data = await getCatalog(sort, filter, pageNumber)
        res.json(data);
    } catch (err) {
        console.error(err)
        res.sendStatus(404)
    }
});

module.exports = router