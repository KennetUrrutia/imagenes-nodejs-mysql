const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const fs = require('fs')

//Configuracion del middleware
const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-monkeywit-' + file.originalname) //Nombre del archivo
  }
})

const fileUpload = multer({
  storage: diskStorage
}).single('image') //mismo nombre de formData.append('image', file) en el frontend

router.get('/', (req, res) => {
  res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload, (req, res) => {

  req.getConnection((err, conn) => {
    if (err) return res.status(500).send('Server Error')

    const { mimetype: type, originalname: name} = req.file

    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

    conn.query('INSERT INTO images_db.images_tbl set ?', [{type, name, data}], (err, rows) => {
      if (err) return res.status(500).send('Server Error')
      res.send('image saved!')
    })

  })
  
})

module.exports = router