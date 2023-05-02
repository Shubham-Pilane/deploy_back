const fs=require("fs")
const tracker=(req,res,next)=>{
    const {ip,method,orignalUrl}=req
    const timestamp= new Date().toISOString();
    const msg=`${timestamp} --${ip} -- ${method} -- ${orignalUrl}\n`;

    fs.appendFile("logs.txt",msg,err=>{
        if(err)
        {
            console.log(err)
        }
    })
    next()
}

module.exports={
    tracker
}