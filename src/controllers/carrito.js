const carritoDAO = require('../daos/'+process.env.AMBIENTE+'/CarritosDAO')

    async function traerCarritos (req, res) {
        const carritos = await carritoDAO.traerCarritos()
        res.send(carritos)
    }

    async function agregarCarrito(req, res){
        const carritoGuardado = await carritoDAO.agregarCarrito(req.body)
        res.status(201).send(carritoGuardado)
    }

    async function agregarProductoACarrito(req, res){
        const carrito = await carritoDAO.agregarProductoACarrito(req.params.id, req.params.idCarrito)
        res.send(carrito)
    }

    async function eliminarProductoCarrito(req, res){
        const carrito = await carritoDAO.eliminarProductoCarrito(req.params.idCarrito, req.params.id)
        res.send(carrito)
    }

    async function eliminarCarrito(req, res){
        const eliminarCarrito = await carritoDAO.eliminarCarrito(req.params.id)
        res.send(eliminarCarrito)
    }


module.exports = {traerCarritos, agregarCarrito, agregarProductoACarrito, eliminarProductoCarrito, eliminarCarrito}