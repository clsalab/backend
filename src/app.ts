import "dotenv/config"
import express from "express"
import cors from "cors"
import dbConnectNoSql from "./config/mongo"
import { router } from "./routes"

const app= express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

/* Inciciamos las Rutas */
/* localhot/api/ */
app.use(router );

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`))

dbConnectNoSql();