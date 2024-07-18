import express from 'express'
import cors from 'cors'
import http from 'http'
import 'dotenv/config'

// Routes root

import userRoute from '../router/userRoute'

const app = express()
export const httpServer = http.createServer(app)
const corsOption = {
    origin:process.env.CORS,
    method:'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cors(corsOption))

app.use("/api/user",userRoute)