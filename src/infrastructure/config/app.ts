import express from 'express'

import http from 'http'

// Routes root

import userRoute from '../router/userRoute'

const app = express()
export const httpServer = http.createServer(app)

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))

app.use("/api/user",userRoute)