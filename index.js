const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {auth}=require("./middleware/auth")
const{artRouter}=require("./routes/article.route")
const {limiter}=require("./middleware/rate_limiter")
const{tracker}=require("./middleware/tracker")
const app=express()
app.use(express.json())
app.use(limiter)
app.use(tracker)


app.use("/users",userRouter)

app.use(auth)
app.use("/articles",artRouter)




app.listen(process.env.port,async()=>{
try {
    await connection
    console.log("Connected to Database !!")

} catch (error) {
   console.log(error)
}
console.log(`Server is running at ${process.env.port}`)
})