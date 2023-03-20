const { PrismaClient } = require('@prisma/client');
const express = require('express')
const multer = require('multer')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()
const router = express.Router()
const upload = multer({
    dest: '../server/public/pp'
})

async function getAgent(userId) {
    const agent = await prisma.agent.findUnique({
        where: {
            agent_id: userId
        },
        include: {
            agentBio: true
        }
    })

    return agent
}

async function getTransaction(userId) {
    const data = await prisma.trans_data.findMany({
        where: {
            property_list: {
                agent: {
                    agent_id: userId
                }
            }
        }
    })
    return data
}

router.get('/profile', async(req, res) => {
    try {
        const agent = await getAgent(req.query.id)
        res.json(agent)
    } catch (err) {
        console.error(err)
        res.status(404).json({
            message: err
        })
    }
})

router.put('/profile', upload.single(), async(req, res) => {
    try {
        const body = req.body
        const agent = await prisma.agent.update({
            where: {
                agent_id: req.query.id
            },
            data: {
                full_name: body.lName ? body.fName + ' ' + body.lName : body.fName,
                agentBio: {
                    addr: body.addr,
                    city: body.city,
                    prov: body.prov,
                    phone: body.phone
                }
            },
            include: {
                agentBio: true
            }
        })
    } catch (err) {

    }
})

router.get('/profile/transactions', async(req, res) => {
    try {
        const transaction = await getTransaction(req.query.id)
        if (transaction === null) {
            res.status(404).json({
                message: 'No transactions found'
            })
        } else {
            res.json(transaction)
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({
            message: err
        })
    }
})

module.exports = router