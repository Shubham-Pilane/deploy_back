const express=require("express")

const artRouter=express.Router()

const{ArtModel}=require("../model/article.model")

//get all the articles
artRouter.get("/",async(req,res)=>{
    try {
        const article= await ArtModel.find()
        res.send(article)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
 
})

//create the article

artRouter.post("/add",async(req,res)=>{

    try { 

        const article= new ArtModel(req.body)
        await article.save()
        res.status(200).send({"msg":"New article is added to database"})
        
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

// with id return a specific article
artRouter.patch("/:id",async(req,res)=>{
    try {
        const {id}= req.params
        const article=await ArtModel.find({_id:id})
        res.send(article)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


//patch or update the article

artRouter.patch("/edit/:id",async(req,res)=>{
    const {id}= req.params
    const article=await ArtModel.findOne({_id:id})

    try {
        if(req.body.userID!==article.userID)
        {
            res.status(200).send({"msg":"You are not the owner of Article"})
        }
        else{
            await ArtModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":`The article with id :${id} has been updated`})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

//delete the article

artRouter.patch("/rem/:id",async(req,res)=>{
    const {id}= req.params
    const article=await ArtModel.findOne({_id:id})

    try {
        if(req.body.userID!==article.userID)
        {
            res.status(200).send({"msg":"You are not the owner of Article"})
        }
        else{
            await ArtModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":`The article with id :${id} has been Deleted`})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


module.exports={
    ArtModel,
    artRouter
}