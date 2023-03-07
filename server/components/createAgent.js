const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function hashingPw(password) {
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

async function main(full_name, pw, email) {

  const password = await hashingPw(pw)
  await prisma.agent.create({
      data: {
        email: email,
        password: password,
        full_name: full_name,
      },
    })
  
    const allUsers = await prisma.agent.findMany()

    console.dir(allUsers, { depth: null })
  }

module.exports = main()