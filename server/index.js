import express, { urlencoded } from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config();
const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}))

const port = process.env.PORT;


app.get('/',(req,res)=>{
    res.send("Welcome to the page")
})
app.listen(port,()=>{
    console.log(`listening on ${port}`.cyan)
})


