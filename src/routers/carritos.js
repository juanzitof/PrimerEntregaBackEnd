const {traerCarritos, agregarCarrito, agregarProductoACarrito, eliminarProductoCarrito, eliminarCarrito} = require('../controllers/carrito')
const { Router } = require('express')

const route = Router()

route.get('/', traerCarritos)
route.post('/', agregarCarrito)
route.post('/:idCarrito/producto/:id', agregarProductoACarrito)
route.delete('/:idCarrito/producto/:id', eliminarProductoCarrito)
route.delete('/:id', eliminarCarrito)


module.exports = route;