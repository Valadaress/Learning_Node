const express = require('express')
const { readFile } = require('fs')
const { request } = require('http')

const app = express()

app.get('/', (req, res) => {
    readFile('./programs/home.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(`<html><body><h1>Sorry, out of order.</h1><h3>${err}</h3></body><html>`)
        }
        // console.log(data)
        res.send(data)
    })
})


app.listen(process.env.PORT || 3000, console.log(`App is available on http://localhost:3000`))