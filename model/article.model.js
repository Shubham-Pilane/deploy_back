const mongoose=require("mongoose")

const artSchema=mongoose.Schema({

title: String,
body: String,
user: String,
userID: String,
category: String,
live: Boolean,
},{
    versionKey:false
})

const ArtModel=mongoose.model("article",artSchema)

module.exports={
    ArtModel
}

//  {
//         "title":"Abc",
//         "body": "a",
//         "user":"no name",
//         "userID":"2",
//         "category":"comic",
//         "live":true
// }