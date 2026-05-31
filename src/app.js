const  express = require('express')
const cookies = require('cookie-parser')
require('dotenv').config()
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(cookies())

app.use(express.json())
app.use("/api/auth",authRoutes)



module.exports = app