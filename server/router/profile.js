const { PrismaClient } = require('@prisma/client');
const express = require('express')

const prisma = new PrismaClient()
const router = express.Router()

async function getAgent(userId){
        const agent = await prisma.agent.findUnique({
            where: {
                agent_id: userId
            },
            include: {
                agentBio: true
            }
        })
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

router.get('/:id', async (req, res) => {
    try {
        const agent = await getAgent(req.params.id)
        res.json(agent)
    } catch (err) {
        console.error(err)
        res.status(404).json({
            message: err
        })
    }
})

router.get('/:id/transactions', async (req, res) => {
    try {
        const transaction = await getTransaction(req.params.id)
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