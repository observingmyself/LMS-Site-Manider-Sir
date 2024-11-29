import mongose from "mongoose";
import { DB_Name } from "../constant.js"

const connection = async () => {
  try {
    const connect = await mongose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
    console.log("MongoDb connection has been establish successfully On DB Host! " + connect.connection.host);
  } catch (error) {
    console.log("MongoDb is Failed to setup Connection " + error);
    process.exit(1);
  }
}

export default connection;

