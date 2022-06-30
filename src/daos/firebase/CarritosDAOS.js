const ContenedorFirebase = require('../../contenedor/ContenedorFirebase')

class CarritosDAO extends ContenedorFirebase{
    constructor(){
        super()
    }

    async agregarCarrito(products){
        const newCart = {products}
        
        newCart.timestamp = Date().toString();
        
        await this.dbf.collection('carritos').add(newCart).then(function(docRef) {
            newCart.id = docRef.id;
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
        return newCart;
    }

    async traerCarritos(){
        let docs = await super.listar('carritos')
        return docs
    }

    async agregarProductoACarrito(idProducto, idCarrito){
        const producto = await super.mostrarElemento('productos', idProducto)
        const carrito = await this.dbf.collection('carritos').doc(idCarrito).collection('productos').doc(idProducto).set(producto)
        return carrito
    }

    async eliminarProductoCarrito(idCarrito, idProducto){
        const carrito = await this.dbf.collection('carritos').doc(idCarrito).collection('productos').doc(idProducto).delete()
        return carrito
    }


    async eliminarCarrito(id){
        const carrito = await super.eliminar('carritos', id)
        return carrito
    }

}

module.exports = new CarritosDAO()