const https = require("https")
const server = https.createServer()
const express = require("express")
const PORT = 8080
const app = express()
app.get('/', (req, res) => {
    res.send("Hello")
})
app.listen(PORT, () => console.log("http://localhost:" + PORT))