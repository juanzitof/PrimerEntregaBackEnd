const fs = require('fs');

 class CartsControllers {
    constructor () {
      this.fileLocation = 'src/files/carts.json'
    }
  
    async create () {
      try {
        const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
        let carts = []
        const cart = {
          id: 1,
          timestamp: Date.now(),
          products: []
        }
  
        if (fileCarts) {
          carts = JSON.parse(fileCarts)
          const Ids = carts.map(e => e.id)
          const maxId = Math.max(...Ids)
          cart.id = maxId + 1
        }
  
        carts = [...carts, cart]
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
        return { status: 'success', message: `El carrito se ha creado correctamente con ID ${cart.id}` }
      } catch (err) {
        console.log(`Error al crear carrito: ${err.message}`)
        return { status: 'error', message: 'Error al crear carrito.' }
      }
    }
  
    async deleteCartById (cartId) {
      try {
        if (!cartId) throw new Error('Desaparecida \'id\' parametro')
        const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
        const carts = JSON.parse(fileCarts)
  
        const cartIdFound = carts.find(c => c.id === cartId)
        if (!cartIdFound) throw new Error(`CartId '${cartId}' not found.`)
  
        const cart = carts.filter(c => c.id !== cartId)
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2))
        return { status: 'success', message: 'El carrito se ha eliminado correctamente.' }
      } catch (err) {
        console.log(`Error al elimiar el carrito: ${err.message}`)
        return { status: 'error', message: 'Error al elimiar el carrito' }
      }
    }
  
    async getProductsByCartId (cartId) {
      try {
        if (!cartId) throw new Error('Vacio \'id\' parametro!')
  
        const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!fileCarts) throw new Error('El documento esta vacio')
  
        const cart = JSON.parse(fileCarts).find(c => c.id === cartId)
        if (!cart) throw new Error('Carrito no encontrado.')
        const products = cart.products
  
        return { status: 'success', payload: products }
      } catch (err) {
        console.log(`Error de carrito de lectura de productos ${err.message}`)
        return { status: 'error', message: err.message }
      }
    }
    
  
   
    async addProduct (cartId, productId) {
      try {
        if (!cartId || !productId) throw new Error('Desaparecida \'cartId\' or \'productId\' parametro')
        const productFile = await fs.promises.readFile('src/files/products.json', 'utf-8')
        if (!productFile) throw new Error('El documento esta vacio')
        const products = JSON.parse(productFile)
        const productToAdd = products.find(p => p.id === productId)
  
        const cartsFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!cartsFile) throw new Error('El documento esta vacio')
        const carts = JSON.parse(cartsFile).find(c => c.id === cartId)
        carts.products = [
          ...carts.products,
          productToAdd
        ]
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
        return { status: 'success', payload: 'El producto se ha agregado con éxito.' }
      } catch (err) {
        console.log(`Error al agregar el producto: ${err.message}`)
        return { status: 'error', message: 'Error al agregar el producto' }
      }
    }
  
    async deleteProduct (cartId, productId) {
      try {
        if (!cartId || !productId) throw new Error('Desaparecida \'cartId\' or \'productId\' parametro')
        const fileProducts = await fs.promises.readFile('src/files/products.json', 'utf-8')
        if (!fileProducts) throw new Error('The document is empty!')
        const products = JSON.parse(fileProducts).filter(p => p.id !== productId)
  
        const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!fileCarts) throw new Error('El documento esta vacio')
        const cart = JSON.parse(fileCarts).find(c => c.id === cartId)
        cart.products = products
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2))
        return { status: 'success', payload: 'El producto se ha eliminado correctamente.' }
      } catch (err) {
        console.log(`Error al agregar el producto: ${err.message}`)
        return { status: 'error', message: 'Error al agregar el producto' }
      }
    }
  }

  module.exports =  CartsControllers