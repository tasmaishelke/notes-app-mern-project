require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const rootRouter = require('./Routes/root')

const port = process.env.PORT 


//middleswares
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'Public')))


//routes
app.use('/', rootRouter)

app.all('*', rootRouter)

app.listen(port, ()=>
{
    console.log(`Server is listening on port ${port}`);
})