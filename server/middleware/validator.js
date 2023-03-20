const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

const isAuthenticated = async (res, req, next) => {
    try {
        const hash = await prisma.agent.findFirstOrThrow({
            where: {
                email: req.body.email
            },
            select: {
                password: true
            }
        })

        console.log(hash);
        
        const match = bcrypt.compare(req.body.password, hash)

        if (match) {
            next()
        } else {
            throw new Error({ message: 'Invalid password' })
        }
    } catch (err) {
        throw new Error(err)
    }
}

const checkUser = async (req, res, next) => {
    // console.log(req.body.email);
    const user = await prisma.agent.findFirst({
        where: {
            email: req.body.email
        }
    })
    console.log(user);

    if(user){
        res.json({error: "User already exists"})
    } 
    else {
        next()
    }
}

const ensureAuthenticated = (req, res, next) => {
    if (req.user) { return next() }
    res.redirect('/login')
}

module.exports = { isAuthenticated, checkUser, ensureAuthenticated }