import  express from "express";
import router from './routes/routes.js'
const app=express()
const port =8000


app.use(express.json())
app.use("/bank", router);

app.listen(port,()=>{
    console.log(`running on port : ${port}`);
})