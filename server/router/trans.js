const { PrismaClient } = require('@prisma/client');
const express = require('express')

const prisma = new PrismaClient()
const router = express.Router()

router.post('/:propID', async (req, res) => {
    if (req.query.confirm === true) {
        const newTrans = prisma.trans_data.create({
            data: {
                prop_id:  req.params.id,
                buyer_name: req.body.buyer_name,
                buyer_phone: req.body.buyer_phone,
                buyer_addr: req.body.buyer_addr,
                total_price: req.body.total_price,
                property_list: {
                    connect: { id: req.params.id }
                }
            }
        })

        res.json(newTrans)
    }
})