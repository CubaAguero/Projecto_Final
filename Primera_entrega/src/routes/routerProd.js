const express = require('express')
const routerProd = express.Router()

/*--------------------------------------------*/

const Container = require('../../container/container')
const container1 = new Container('productos.txt')
//container1.createFile()

/*---------------------------------------------------*/

routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))

/*---------------------------*/

const validarAdmin = (req, res, next) => {
    if(req.headers.admin){
        next()
    }
    else {
        res.json({ err: -1, ruta: "", metodo: "public", message: "No Autorizado"})
    }
}

const validarCampos = (req, res, next) => {
    if( JSON.stringify(req.body) == "{}" || 
        req.body.title == undefined || 
        req.body.price == undefined || 
        req.body.thumbnail == undefined || 
        req.body.codigo == undefined || 
        req.body.stock == undefined 
        )
        {
            res.json({ err: "Falta un campo"})
        }
    else{
        next()
    }
}

///////////////////////////////

routerProd.get('/:id?', async (req, res) => {
    if( req.params.id ){
        let item = await container1.getById(parseInt(req.params.id))
        res.json(item)
    }
    else{
        let data = await container1.getAll()
        res.json(data)
    }
})

routerProd.post('/', validarAdmin, validarCampos, async (req, res) => {
    let id = await container1.save(req.body)
    res.json(id)
})

routerProd.put('/:id', validarAdmin, validarCampos, async (req, res) => {
    let response = await container1.put(parseInt(req.params.id), req.body)
    res.json(response)
})

routerProd.delete('/:id', validarAdmin, async (req, res) => {
    let response = await container1.deleteById(parseInt(req.params.id))
    res.json(response)
})

/*----------------------------------------------------*/

module.exports = routerProd