const express = require("express");
const products = require("./src/routes/products.js");
const carts = require("./src/routes/carts.js");

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  const message = `| Server listen on port ${PORT} |`;
  const link = `| - http://localhost:${PORT}    |`;
  console.log(message)
  console.log(link)

});
server.on('error', (error) => console.error(`Error server: ${error}`))

/// Middleware ///

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



///   Routers  ///

app.use('/api/products', products)
app.use('/api/carts', carts)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API')
})


app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} Not found.`)
  res.status(404).json({ status: 'error', message: 'Not found' })
})
