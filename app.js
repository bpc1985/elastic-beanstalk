require('dotenv').config()
const express = require('express')
const http = require('http')
const dns = require('dns')

const app = express()
const connectToDatabase = require('./db')
const Note = require('./Note')

app.get('/', async (req, res) => {
    await connectToDatabase()
    const notes = await Note.find()
    res.send({ v: 3, notes, dns: dns.getServers() })
})

http.createServer(app).listen(process.env.PORT || 8000)
