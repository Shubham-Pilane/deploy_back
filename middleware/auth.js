const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization

    if(token)
    {
        try {
            
            const decoded=jwt.verify(token,"shubham")
            if(decoded)
            {
                req.body.userID=decoded.userID
                req.body.user=decoded.user
                next()
            }
            else{
                res.status(200).send({"msg":"Plaese login first !"})
            }
        } catch (err) {
            res.status(400).send({"err":err.message})
        }
    }
}

module.exports={
    auth
}