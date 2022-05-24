const jwt = require("jsonwebtoken")

const generateToken = (user) =>{
    return jwt.sign({user}, process.env.JWT_SECRETE, {
      expiresIn:"1d"
    })
}

module.exports = {
  generateToken
}