const fs = require('fs');

class ProductsControllers {
    constructor () {
      this.fileLocation = 'src/files/products.json'
    }
    
    async getById (id) {
      try {
        if (!id) throw new Error('Desaparecida \'id\' parametro')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!readFile) throw new Error('El documento esta vacio')
  
        const data = JSON.parse(readFile).find(e => e.id === id)
        if (!data) throw new Error('Producto no encontrado')
        return { status: 'success', payload: data }
      } catch (err) {
        console.log(`Error de lectura de archivo: ${err.message}`)
        return { status: 'error', message: 'Producto no encontrado' }
      }
    }
  
    async save (product) {
      try {
        if (Object.keys(product).length === 0) throw new Error('Vacio \'product\' parametro!')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        let products = []
        let id = 1
  
        if (readFile) {
          products = JSON.parse(readFile)
          const Ids = products.map(product => product.id)
          const maxId = Math.max(...Ids)
          id = maxId + 1
          const productHas = products.find(e => e.name === product.name)
          if (productHas) throw new Error('El producto ya existe con el mismo nombre')
        }
        product.id = id
        products = [...products, product]
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(products, null, 2))
        return { status: 'success', payload: product }
      } catch (err) {
        console.log(`Error al guardar archivo: ${err.message}`)
        return { status: 'error', message: 'Erro al guardar el producto' }
      }
    }
  
    async updateById (id, product) {
      try {
        if (!id || Object.keys(product).length === 0) throw new Error('Vacio \'id\' o parametro')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!readFile) throw new Error('EL documento esta vacio')
  
        let products = JSON.parse(readFile)
        const productHas = products.find(e => e.name === product.name)
        if (productHas) throw new Error('El producto ya existe con el mismo nombre.')
        let productNew = products.find(p => p.id === id)
        if (!productNew) throw new Error('Producto no encontrado.')
        products = products.filter(p => p.id !== id)
  
        productNew = {
          ...productNew,
          name: product.name,
          description: product.description,
          price: product.price,
          code: product.code,
          stock: product.stock,
          timestamp: product.timestamp,
          picture: product.thumbnail
        }
  
        products = [...products, productNew]
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(products, null, 2))
        return { status: 'success', message: 'Producto actualizado con éxito.' }
      } catch (err) {
        console.log(`Save file error: ${err.message}`)
        return { status: 'error', message: 'Save product error.' }
      }
    }
    async deleteById (id) {
      try {
        if (!id) throw new Error('Vacio \'id\' parametro')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        let products = []
  
        if (readFile) products = JSON.parse(readFile)
        const idFound = products.find(e => e.id === id)
        if (!idFound) throw new Error(`ID '${id}' No encontrado en el documento.`)
        let newProducts = products.filter(e => e.id !== id)
        if (newProducts.length === 0) newProducts = ''
        else newProducts = JSON.stringify(newProducts)
  
        await fs.promises.writeFile(this.fileLocation, newProducts)
        return { status: 'success', message: 'Producto eliminado correctamente' }
      } catch (err) {
        console.log(`Error al guardar archivo: ${err.message}`)
        return { status: 'error', message: 'Error al borrar el producto' }
      }
    }
  
    async getAll () {
      try {
        const productsFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!productsFile) throw new Error('The document is empty!')
        return { status: 'success', payload: JSON.parse(productsFile) }
      } catch (err) {
        console.log(`Read file error: ${err.message}`)
        return { status: 'error', message: err.message }
      }
    }
  }

  module.exports =  ProductsControllers