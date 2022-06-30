require('dotenv').config()
const productoDAO = require('../daos/'+process.env.AMBIENTE+'/ProductosDAO')


    async function guardarProducto(req, res) {
        const productoAgregado = await productoDAO.guardarProducto(req.body)
        res.send(productoAgregado)
    }

    async function mostrarProductos(req, res){
        const productos = await productoDAO.listarProductos()
        res.send(productos)
    }
    
    async function mostrarProducto(req, res){
        const producto = await productoDAO.mostrarProducto(req.params.id)
        res.send(producto)
    }
    
    async function actualizarProducto(req, res){
        const producto = await productoDAO.actualizarProducto(req.body, req.params.id)
        res.send(producto)
    }

    async function eliminarProducto(req, res){
        const producto = await productoDAO.eliminarProducto(req.params.id)
        res.send(producto)
    }


module.exports = {guardarProducto, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto}