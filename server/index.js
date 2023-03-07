//Importing dependencies
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const { PrismaClient } = require('@prisma/client')

const catalog = require('./router/catalog.js')
const product = require('./router/product.js')
const main = require('./router/main.js')
require('dotenv').config()

const app = express()
const photos = multer({ dest: 'photos/' })

const port = 3000
const prisma = new PrismaClient()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.listen(port, function (req, res) {
    console.log(`Server listening on port ${port}`);
})

app.use('/', main)
app.use('/catalog/', catalog)
app.use('/product', product)
