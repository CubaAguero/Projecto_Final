const fs = require('fs')

class Cart {
    constructor(name) {
        this.name = name,
        this.createFile()
    }

    async createFile(){
        try{
            if( await fs.existsSync(this.name)) return
            await fs.promises.writeFile(this.name, '')
        }
        catch(err){
            console.log('Error, No se pudo crear', err)
        }
    }

    async createCart(){
        try{
            let res = await fs.promises.readFile(this.name, "utf-8")
            let cartFile = []
            if( res != '') {
                cartFile = JSON.parse(res)
            }
            let cart = {
                id: cartFile.length + 1,
                productos: [],
                timestamp: Date.now().toLocaleString()
            }
            cartFile.push(cart)
            await fs.promises.writeFile(this.name, JSON.stringify(cartFile, null, 2))
            return {id: `${cart.id}`}
        }
        catch(err){
            console.log("Error, No se pudo crear Cart!", err)
        }
    }

    async Save(id, item){
        try{
            let res = await fs.promises.readFile(this.name, "utf-8")
            if( res == '') return {err: `No existe el carrito ${id}`}

            let data = JSON.parse(res)
            let cart = data.find(elm => elm.id === id)
            if( cart === undefined) return {err: `No se encontro el carrito ${id}`}

            let index = data.findIndex(elm => elm.id === id)
            cart.productos.push(item)
            data[index] = cart
            await fs.promises.writeFile(this.name, JSON.stringify(data, null, 2))
            return {message: "producto agregado al carrito"}
        }
        catch(err){
            console.log("Error, No se pudo guardar!", err)
        }
    }

    async deleteCart(id){
        try{
            let res = await fs.promises.readFile(this.name, 'utf-8')
            if (res == '') return {err: `No existe carrito ${id}`}
            let data = JSON.parse(res)

            let cart = data.find(elm => elm.id === id)
            if ( cart === undefined ) return {err: `No se encontro cart ${id}`}

            let dataFile = data.filter(elm => elm.id != id)
            await fs.promises.writeFile(this.name, JSON.stringify(dataFile, null, 2))
            return { message: "Se elimino Cart"}
        }
        catch(err){
            console.log("Error, No se pudo eliminar!", err)
        }
    }

    async deleteItem(id, itemId){
        try{
            let res = await fs.promises.readFile(this.name, 'utf-8')
            if (res == '') return {err: "No hay carritos"}
            let data = JSON.parse(res)

            let cart = data.find(elm => elm.id === id)
            if ( cart === undefined) return {err: `No existe cart ${id}`}
            let index = data.findIndex(elm => elm.id === id)

            let item = cart.productos.find(elm => elm.id === itemId)
            if ( item === undefined ) return {err: `No se encontro el item ${itemId}`}

            let updateCart = cart.productos.filter(elm => elm.id != itemId)
            cart.productos = updateCart
            data[index] = cart

            await fs.promises.writeFile(this.name, JSON.stringify(data, null, 2))
            return {message: "Se elimino el item", cart: {id: `${id}`, item: {id: `${itemId}`}}}
        }
        catch(err){
            console.log('Error! no se pudo eliminar el item', err)
        }
    }

    async getCart(id){
        try{
            let res = await fs.promises.readFile(this.name, 'utf-8')
            if ( res == '' ) return {err: "No hay carritos!"}
            
            let data = JSON.parse(res)
            let cart = data.find(elm => elm.id === id)

            if( cart == undefined ) return { err: `No se encontro Cart ${id}`}
            return cart
        }
        catch(err){
            console.log('Error!, No se pudo obtener Cart', err)
        }
    }
}

module.exports = Cart