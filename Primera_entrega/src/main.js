const express = require('express')
const app = express()

app.use('/api', express.static('static'))

const routerProd = require('./routes/routerProd')
const routerCart = require('./routes/routerCart')
/*------------------------------*/

app.use('/productos', routerProd)
app.use('/cart', routerCart)

/*-------------------------------------*/

app.use((req, res) =>{
    res.status(404).json({error: -2, description: 'ruta no implementada!'})
})

/*----------------------------*/

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}`)
})
server.on('error!', err => console.log(`Error en servidor ${err}`))