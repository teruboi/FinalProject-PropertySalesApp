const { PrismaClient } = require('@prisma/client');
const { PrismaClientValidationError } = require("@prisma/client/runtime");
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

const hashingPw = async(password) => {
    let hashedPassword = bcrypt.genSalt(10, function(err, Salt) {

        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function(err, hash) {

            if (err) {
                return console.log('Cannot encrypt');
            }

            hashedPassword = hash;
        })
    })

    return hashedPassword
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
        const password = hashingPw(body.password)

        const agent = await prisma.agent.update({
            where: {
                agent_id: req.query.id
            },
            data: {
                full_name: body.lName ? body.fName + ' ' + body.lName : body.fName,
                email: body.email,
                password: password,
                agentBio: {
                    update: {
                        addr: body.addr,
                        city: body.city,
                        prov: body.prov,
                        phone: body.phone
                    }
                }
            },
            include: {
                agentBio: true
            }
        })

        res.json(agent)
    } catch (err) {
        if (err instanceof PrismaClientValidationError) 
        res.json(handleQueryError(err.message)); // sending the error message directly
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