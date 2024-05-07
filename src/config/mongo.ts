import "dotenv/config";
import { connect } from "mongoose";


async function dbConnectNoSql(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI;

    try {
        await connect(DB_URI);
        console.log("****CONEXIÓN EXITOSA BASE DE DATOS NoSQL ****");
    } catch (error) {
        console.error("****ERROR AL CONECTAR A LA BASE DE DATOS NoSQL:", error+"****");
    }
}

export default dbConnectNoSql;