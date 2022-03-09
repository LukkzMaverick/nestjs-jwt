const bcrypt = require('bcrypt')
const saltRound = 10
const password = process.argv.slice(2)[0]

bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    })
})