const express = require("express");
const CartsControllers = require ('../classes/CartsControllers.js');
const cartscontrollers = new CartsControllers()

const carts = express.Router()

carts.post('/',(req,res)=>{
  cartscontrollers.create().then(result =>{
    if(result.status === 'success')res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id', (req, res) => {
  const idCart = Number(req.params.id)
  cartscontrollers.deleteCartById(idCart).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.get('/:id/products', (req, res) => {
  const idCart = Number(req.params.id)
  cartscontrollers.getProductsByCartId(idCart).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.post('/:id/products/:productId', (req, res) => {
  const idCart = Number(req.params.id)
  const productId = Number(req.params.productId)
  cartscontrollers.addProduct(idCart, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

carts.delete('/:id/products/:productId', (req, res) => {
  const idCart = Number(req.params.id)
  const productId = Number(req.params.productId)
  cartscontrollers.deleteProduct(idCart, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

module.export = carts;
