const { PrismaClient } = require('@prisma/client');
const express = require('express')
const { isLoggedIn } = require('../middleware/isLoggedIn.js');

const passport = require('passport')

require('../middleware/authGoogle.js')

const prisma = new PrismaClient()
const router = express.Router()

const checkUser = async () => {
    const user = await prisma.agent.findFirst({
        where: {
            email: req.user.email
        }
    })
}

router.post('/createagent', [isLoggedIn, ], async (req, res) => {

})

module.exports = router