const { PrismaClient } = require('@prisma/client');
const express = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');
const { checkUser } = require('../middleware/validator.js')
const jwt = require("jsonwebtoken");

require('dotenv').config

const prisma = new PrismaClient()
const router = express.Router()

const hashingPw = async(password) => {
    const hashedPassword = bcrypt.genSalt(10, function(err, Salt) {

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

router.post('/login', async(req, res, next) => {
    let { email, password } = req.body

    let existingUser, pwCompare
    try {
        existingUser = await prisma.agent.findFirst({
            where: {
                email: email
            }
        })

        pwCompare = await bcrypt.compare(password, existingUser.password)
        console.log(pwCompare);
    } catch (err) {
        console.error(err);
        return next(err);
    }

    if (!existingUser || pwCompare === false) {
        return next(Error("Wrong Username / Password"))
    }

    let jwtToken
    try {
        jwtToken = jwt.sign(
            {
                userId: existingUser.agent_id,
                email: existingUser.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )
    } catch (error) {
        console.error(err);
        return next(err);
    }

    res.json({
        success: true,
        data: {
            userId: existingUser.agent_id,
            email: existingUser.email,
            token: jwtToken,
        }
    })
})

router.post('/login/newuser', checkUser, async(req, res) => {
    // console.log(req.body);
    try {
        const newUser = await prisma.agent.create({
            data: {
                email: req.body.email,
                password: hashingPw(req.body.password),
                full_name: !req.body.lname ? req.body.fname : req.body.fname + ' ' + req.body.lname,
                agentBio: {
                    create: {
                        addr: req.body.address,
                        city: req.body.city,
                        prov: req.body.prov,
                        phone: req.body.phone
                    }
                }
            }
        })

        res.json(newUser)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router