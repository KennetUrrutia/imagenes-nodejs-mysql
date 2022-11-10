const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()


//Configuracion del middleware
const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() +'-monkeywit-'+file.originalname) //Nombre del archivo
  }
})

const fileUpload = multer({
  storage: diskStorage
}).single('image') //mismo nombre de formData.append('image', file) en el frontend

router.get('/', (req, res) => {
  res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload,(req, res) => {
  console.log(req.file)
  res.send('image saved!')
})

module.exports = router