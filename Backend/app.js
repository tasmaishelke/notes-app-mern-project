require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const rootRouter = require('./routes/root')
const connectDB = require('./config/dbConnect')
const { logger } = require('./middlewares/logger')
const  errorHandler  = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOptions' )


const port = process.env.PORT 


//middleswares
app.use(logger)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'Public')))


//routes
app.use('/', rootRouter)

app.all('*', (req, res) =>
    {
        res.status(404).sendFile(path.join(__dirname, '.','Public','html','error404.html'))
    })

app.use(errorHandler)

const start = async () =>
{
    try 
    {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to MongoDB database');  
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } 
    catch (error) 
    {
        console.log(error)
    }
}
start()
