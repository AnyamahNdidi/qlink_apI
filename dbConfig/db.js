const mongoose = require('mongoose')
const url_online  = "mongodb+srv://gideon:NTp46J2P7Efieni@cluster0.7rupp.mongodb.net/QlinkDataDB?retryWrites=true&w=majority"
const url_offline = "mongodb://localhost/qlinkLocalDB"

mongoose.connect(url_online).then(()=>{
    console.log('Database connected successfully...')
}).catch((error)=>{
    console.log(error)
})