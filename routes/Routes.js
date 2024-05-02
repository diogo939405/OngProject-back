const express = require('express')
const router = express.Router()
const payPal = require('paypal-rest-sdk');
const paypalConfig =  require('../config/paypal')
const DataModel = require('./DataModel')

paypal.configure(paypalConfig)

const dataModel = await DataModel.find({})

// router.get('/pegar',(req,res) =>{
//     res.render('index', json(dataModel))
// })

router.get('/comprar',(req,res)=>{
    res.send({sucess:true})
})

router.get('/cancelar',(req,res)=>{
    res.send({sucess:true})
})

router.get('/sucess',(req,res)=>{
    console.log('sucess')
    res.send({sucess:true})
})


// router.get('/teste', (req, res) => {
//     res.render.json(('aaaaaaaaaaaaaaaaaaaaa'))
// });



module.exports = router
