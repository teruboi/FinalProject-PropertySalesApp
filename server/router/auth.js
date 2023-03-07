const express = require('express')

const passport = require('passport')

require('../middleware/authGoogle.js')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

router.get('/', (req, res) => {
    res.send("<a href='/auth/google'>Authenticate with Google</a>")
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', { 
        successRedirect: '/',
        failureRedirect: '/auth/failure' 
    })
)

router.get('/auth/failure', (req, res) => {
    res.send("something went wrong")
})

router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`)
})

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy()
        res.send("Goodbye")
    })
})