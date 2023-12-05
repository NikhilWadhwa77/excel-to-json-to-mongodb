const express = require('express')
const getData = require('./excelData/getData')
const DB = require('./db/connection')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const reader = require('xlsx')

const app = express()

app.use(express.json());
app.set('view engine', 'ejs')

DB.connectToMongo()

app.post('/home', (req, res) => {
    const { name } = req.body
    let data = {
        name: name
    }
    res.render('home', { data: data })
})

app.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    const file = reader.readFile('./uploads/' + req.file.filename)

    // console.log(file)
    // res.send({ msg: "got it" })

    getData.getExcelData(file).then(() => {
        res.json({ message: 'File uploaded successfully!' });
    }).catch((err) => {
        res.json({ err: 'Failed!' });
    })
});


app.listen(4000, () => {
    console.log('server started at 4000')
})