const express = require('express')
const routerCart = express.Router()

//////////////////

const Cart = require('../../container/cartContainer')
const cart1 = new Cart('cart1')

////////////

routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))

routerCart.post('/', async (req, res) => {
    let id = await cart1.createCart()
    res.json(id)
})

routerCart.delete('/:id', async (req, res) => {
    let data = await cart1.deleteCart(parseInt(req.params.id))
    res.json(data)
})

routerCart.get('/:id/productos', async (req, res) => {
    let cart = await cart1.getCart(parseInt(req.params.id))
    res.json(cart)
})

routerCart.post('/:id/productos', async (req, res) => {
    let data = await cart1.Save(parseInt(req.params.id), req.body)
    res.json(data)
})

routerCart.delete('/:id/productos/:itemId', async (req, res) => {
    let data = await cart1.deleteItem(parseInt(req.params.id), parseInt(req.params.itemId))
    res.json(data)
})

/////////////////////

module.exports = routerCart