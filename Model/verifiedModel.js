const mongoose = require("mongoose")

const verifiesSchema = mongoose.Schema({

    token:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },

},
{timestamps:true}
)
module.exports = mongoose.model("verifies", verifiesSchema)