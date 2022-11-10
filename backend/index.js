const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const myconn = require('express-myconnection')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

app.use(require('./routes/routes'))
app.use(cors())
app.use(myconn(mysql, {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Kennetu44$'
}))

const port = process.env.PORT

app.listen(port || 80, () => {
  console.log(`listening on http://localhost:${port || 80}`)
})