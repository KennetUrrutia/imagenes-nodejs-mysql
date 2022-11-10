const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const path = require('path')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

app.use(myconn(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'images_db'
}))

app.use(cors()) 
app.use(require('./routes/routes'))
app.use(express.static(path.join(__dirname, 'dbimages')))

const port = process.env.PORT

app.listen(port || 80, () => {
  console.log(`listening on http://localhost:${port || 80}`)
})