const { PrismaClient } = require('@prisma/client');
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const { checkUser } = require('../middleware/validator.js')

require('dotenv').config

const prisma = new PrismaClient()
const router = express.Router()

const hashingPw = async(password) => {
    const hashedPassword = bcrypt.genSalt(10, function (err, Salt) {
  
        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {
      
            if (err) {
                return console.log('Cannot encrypt');
            }
      
            hashedPassword = hash;
        })
    })
  
    return hashedPassword
}

router.post('/login/newuser', [checkUser, passport.authenticate()], async (req, res) => {
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