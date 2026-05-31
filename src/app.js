const  express = require('express')
const cookies = require('cookie-parser')
require('dotenv').config()
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(cookies())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.text({type:'*/*'}))
app.use((req,res,next) => {
    if(typeof req.body === 'string' && req.body.trim()){
        try {
            req.body = JSON.parse(req.body)
        } catch (error) {
            return res.status(400).json({message:"Invalid JSON body"})
        }
    }
    next()
})
app.use("/api/auth",authRoutes)



module.exports = app
