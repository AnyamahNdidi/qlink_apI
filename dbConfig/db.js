const mongoose = require('mongoose')
const url_online  = process.env.MONGODB_URI
const url_offline = "mongodb://localhost/qlinkLocalDB"

mongoose.connect(url_online).then(()=>{
    console.log('Database connected successfully...')
}).catch((error)=>{
    console.log(error)
})