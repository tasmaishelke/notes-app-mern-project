const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..','Public','html','index.html'))
})

router.get('*', (req, res) =>
{
    res.status(404).sendFile(path.join(__dirname, '..','Public','html','error404.html'))
})

module.exports = router