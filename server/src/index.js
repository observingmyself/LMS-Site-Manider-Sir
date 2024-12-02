import dotenv from 'dotenv';
import { app } from "./app.js";
dotenv.config();
import connection from "./connection/Db.js"
const port = process.env.PORT || 5000;
connection().then(() => {
    app.on("ERROR", (Err) => {
        console.log(`ERROR :- Express is failed to Connected with MONGODB`)
        throw Err;
    })
    app.listen(port, () => {
        console.log("Server is listen at PORT NO :- ", port)
    })
}).catch((err) => {
    console.log("MongoDb connection failed", err)
})



