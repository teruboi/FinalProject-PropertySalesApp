//Importing dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { PrismaClient } = require('@prisma/client')

const catalog = require('./router/catalog.js')
const product = require('./router/product.js')
const profile = require('./router/profile.js')
const main = require('./router/main.js')
require('dotenv').config()

const app = express()

const port = 3000
const prisma = new PrismaClient()

app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))

app.listen(port, function(req, res) {
    console.log(`Server listening on port ${port}`);
})

app.use('/', catalog)
app.use('/', product)
app.use('/', profile)
app.use('/', main)