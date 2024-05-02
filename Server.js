require('dotenv').config()
const express = require('express')
const router = require('express')
const cors = require('cors')
// const uuid = require('uuid')
const bodyParser = require('body-parser')
const payPal = require('paypal-rest-sdk');
const ejs = require('ejs')
const mongoose = require('mongoose')
const DataModel = require('./DataModel')
const paymentModel = require('./PaymentData')
const connectToDb = require('./Database')
const paypal = require('./services/Paypal')


const app = express();

app.use(express.json({ extended: true }));
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/Routes', router);
connectToDb()

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
}


async function validarProduto(idProduto) {
    // pesquisar como validar um id no MONgoDB,vindo da chamada req.body.id
    const resultado = await DataModel.findById(idProduto)
        .then(userFound => {
            // console.log(userFound)
            return userFound ? true : false
        })
    return resultado
}

async function gravar(valorProduct) {
    //procurar rotina de inclusão de dados no MongoDB
    const payModel = await paymentModel.create(valorProduct)
    return payModel
}

app.post('/compra', async (req, res) => {
    try {
        // if (validarProduto(req.body.cardId)) {
        //     req.body.id = uuidv4();
        //     gravar(req.body)
        //     // gerarToken(req.body)
        //     res.status(200).json(req.body)
        //     console.log('passou')
        // }
    } catch (err) {
        console.log(err)
    }
})

app.get('/compra', async (req, res) => {
    try {
        const paydescription = await paymentModel.find({})
        res.status(200).json(paydescription)
    } catch (error) {
        res.status(500)
        console.log('deu ruim no get pay')
    }
})

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
        const { id } = req.params
        const dataModel = await DataModel.findByIdAndUpdate(id, req.body)
        if (!dataModel) {
            res.status(404).json({ message: ' não foi possivel fazer o delete' })
        }
        const updateDataModel = await DataModel.findById(id)
        res.status(200).json(updateDataModel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.delete('/DeletarDados', async (req, res) => {
    try {
        const { id } = req.params
        const dataModel = await DataModel.findByIdAndDelete(id)
        if (!dataModel) {
            res.status(404).json({ message: ' não foi possivel fazer o delete' })
        }
        res.status(200).json(dataModel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('entrou na porta 5000')
})


