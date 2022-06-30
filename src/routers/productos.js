const {guardarProducto, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto} = require('../controllers/productos')
const { Router } = require('express')

const route = Router()

route.post('/', guardarProducto)
route.get('/', mostrarProductos)
route.get('/:id', mostrarProducto)
route.put('/:id', actualizarProducto)
route.delete('/:id', eliminarProducto)


module.exports = route;