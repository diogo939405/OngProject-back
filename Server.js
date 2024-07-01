require('dotenv').config()
const express = require('express')
const router = require('express')
const cors = require('cors')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const DataModel = require('./DataModel')
const connectToDb = require('./Database')


const app = express();

app.use(express.json({ extended: true }));
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/Routes', router);
connectToDb()



app.get('/todosDados', async (req, res) => {
    try {
        const dataModel = await DataModel.find({})
        res.status(200).json(dataModel)
    } catch (error) {
        res.status(500)
        console.log('o get todosDados deu erro')
    }
})

app.get('/Todosdados/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataModel = await DataModel.findById(id)
        res.status(200).json(dataModel)
    } catch (error) {
        console.log('errado no get/id')
        res.status(500).json({ message: error.message })
    }

})

app.post('/PostarDados', async (req, res) => {
    try {
        const dataModel = await DataModel.create(req.body)
        res.status(200).json(dataModel)
        // res.json({ message: "o post funciounou, AQUI" })
    } catch (error) {
        console.log('error no Post')
        res.status(500).json({ message: error.message })
    }
})

app.put('/AtualizarDados', async (req, res) => {
    try {
        const  id = req.body._id
        const dataModel = await DataModel.findByIdAndUpdate(id, req.body)
        if (!dataModel) {
            res.status(404).json({ message: ' não foi possivel fazer o update' })
        }
        const updateDataModel = await DataModel.findById(id)
        res.status(200).json(updateDataModel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params.id
        const dataModel = await DataModel.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
        if (!dataModel) {
            res.status(404).json({ message: ' não foi possivel fazer o delete' })
        }
        res.status(200).json(dataModel)
        res.send('apagou')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('entrou na porta 5000')
})


