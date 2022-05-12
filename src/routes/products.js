const express = require("express");
const ProductsControllers = require("../classes/ProductsControllers.js");
const productsControllers = new ProductsControllers()
const products = express.Router()
const isAdministrator = false

products.get('/', (req, res) => {
  productsControllers.getAll().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id/products', (req, res) => {
  const id = Number(req.params.id)
  productsControllers.getById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', (req, res) => {
  if (isAdministrator) {
    const file = req.file
    const product = req.body
    product.picture = `${req.protocol}://${req.hostname}:8080/upload/${file.filename}`
    productsControllers.save(product).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

products.put('/:id', (req, res) => {
  if (isAdministrator) {
    const id = Number(req.params.id)
    const product = req.body
    productsControllers.updateById(id, product).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

products.delete('/:id', (req, res) => {
  if (isAdministrator) {
    const id = Number(req.params.id)
    productsControllers.deleteById(id).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

module.exports = products;

