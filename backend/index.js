const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const myconn = require('express-myconnection')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const con = mysql.createConnection({
  host: 'localhost',
  user: 'kennet',
  password: 'Kennetu44$',
  database: 'images'
})

con.connect(function(err){
  if(err) throw err
  else console.log('Database connection established')
})

app.use(cors()) 
app.use(require('./routes/routes'))

const port = process.env.PORT

app.listen(port || 80, () => {
  console.log(`listening on http://localhost:${port || 80}`)
})