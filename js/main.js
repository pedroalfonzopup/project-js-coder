
let carritoCompras = [];

const divContenedorProductos = document.getElementById("contenedorProductos")

const botonEliminarCarrito = document.querySelector("#borrarCarrito")
const divCarrito = document.getElementById("divCarrito")
const botonTerminarCompra = document.querySelector("#terminarCompra")

const renderCarrito = () => {
    divCarrito.innerHTML= ""

    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    const total = sacarTotal(carritoStorage)

    for (let element of carritoStorage) {
        const cardProducto = document.createElement("div")
        cardProducto.classList.add("videojuegos--tarjetas__carrito")

        const imageContainer = document.createElement("div")
        imageContainer.classList.add("videojuegos--contendorImagen")
        imageContainer.innerHTML = `
        <div class="videojuegos--contenedorImagen">
            <img src="${element.imagen}" alt="Portada de ${element.nombre}">
        </div>
        `
        const titleProducto = document.createElement("h4")
        titleProducto.textContent = element.nombre

        const priceProducto = document.createElement("h4")
        priceProducto.textContent = `Valor: $${element.precio}` 

        const borrarProducto = document.createElement("button")
        borrarProducto.classList.add("carrito--boton__borrar")
        borrarProducto.addEventListener("click", () => {
            let productoABorrar = carritoCompras.indexOf(element)
            carritoCompras.splice(productoABorrar - 1 , 1)

            localStorage.removeItem("carrito");
            localStorage.setItem("carrito", JSON.stringify(carritoCompras));
            const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
            

            renderCarrito()
        })
        borrarProducto.innerHTML= `
        <button id="borrar${element.id}" class="carrito--boton"><i class="fa-2x fas fa-trash-alt" style="color: #ff0000;" alt="Icono Basura"> </i>
        </button>
        ` 

        cardProducto.appendChild(imageContainer)
        cardProducto.appendChild(titleProducto)
        cardProducto.appendChild(priceProducto)
        cardProducto.appendChild(borrarProducto)


        divCarrito.appendChild(cardProducto)
    }

    const totalText = document.createElement("h2")
    totalText.classList.add("valorTotal")
    totalText.textContent = `Valor Total: $${total}`

    divCarrito.appendChild(totalText)
}

const renderProductos = (array) => {
    divContenedorProductos.innerHTML= ""

    for (let element of array) {
        const cardProducto = document.createElement("div")
        cardProducto.classList.add("videojuegos--tarjetas")

        const imageContainer = document.createElement("div")
        imageContainer.classList.add("videojuegos--contendorImagen")
        imageContainer.innerHTML = `
        <div class="videojuegos--contenedorImagen">
            <img src="${element.imagen}" alt="Portada de ${element.nombre}">
        </div>
        `

        const titleProducto = document.createElement("h4")
        titleProducto.textContent = element.nombre

        const priceProducto = document.createElement("h4")
        priceProducto.textContent = `Valor: $${element.precio}` 

        const buttonComprar = document.createElement("button")
        buttonComprar.classList.add("videojuegos--boton__carrito")
        buttonComprar.addEventListener("click", () => {

            carritoCompras.push(element)

            localStorage.removeItem("carrito");
            localStorage.setItem("carrito", JSON.stringify(carritoCompras));
            const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
            Toastify({
                text: "¡Se ha añadido al carrito con exito!",
                duration: 2000,
                close: false,
                gravity: "top",
                position: "left",
                style:{
                        background: "linear-gradient(to right, rgba(0,172,251,1), rgba(21,34,205,1))",
                    },
            }).showToast();

            renderCarrito()
        })
        buttonComprar.innerHTML= `
        <button id="btn${element.id}" class="videojuegos--boton"><i class="fa-2x fas fa-cart-plus" alt="Icono Carrito"></i>
        </button>
        ` 
    
    


        cardProducto.appendChild(imageContainer)
        cardProducto.appendChild(titleProducto)
        cardProducto.appendChild(priceProducto)
        cardProducto.appendChild(buttonComprar)
        

        divContenedorProductos.appendChild(cardProducto)
    }
}

async function traerDatos() { 
    const respuesta = await fetch('./js/productos.json')
    const productos = await respuesta.json()

    renderProductos(productos)
    renderCarrito()
}



traerDatos()



const agregarAlCarrito = (number) => {
    let juego = productos[number - 1]
    console.log(juego)
    carritoCompras.push(juego)
}

const sacarTotal = (array) => {
    if (array) {
    const total = array.reduce((tot, item) => tot + item.precio, 0)
    return total
    } else {
        return 0
    }
}

const borrarCarrito = () => {
    divCarrito.innerHTML= ""
    carritoCompras = []
    localStorage.removeItem("carrito");

}

botonEliminarCarrito.addEventListener("click", () => {
    borrarCarrito()


    let prueba = JSON.parse(localStorage.getItem("carrito"))
    console.log(prueba)
})

const terminarCompra = () => {
    if (carritoCompras.length === 0) {
        Toastify({
            text: "Tu carrito está vacio",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "left",
            style:{
                    background: "linear-gradient(90deg, rgba(255,107,107,1) 0%, rgba(182,0,10,1) 100%)",
                },
        }).showToast();
    } else {
        divCarrito.innerHTML= ""
        carritoCompras = []
        localStorage.removeItem("carrito");
        
        Toastify({
            text: "¡Tu compra se ha realizado con exito!",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "left",
            style:{
                    background: "linear-gradient(90deg, rgba(144,128,255,1) 0%, rgba(115,5,204,1) 100%)",
                },
        }).showToast();

        renderCarrito()
    }
}

botonTerminarCompra.addEventListener("click", () => {
    terminarCompra()
})

































// Codigo Viejo
// const botonNo = document.querySelector('#no')

// botonNo.addEventListener("click", () => {
//     Toastify({
//         text: "No.",
//         duration: 2000,
//         close: false,
//         style: {
//             background: "linear-gradient(to right, #eecda3, #ef629f)",
//         },
//     }).showToast();
// })

// const filtroProductos = (number) => {
//     if (number == 1) {
//         const filtrado = productos.filter((juego) => juego.consola == "Sony")
//         return filtrado
//     } else if (number == 2) {
//         const filtrado = productos.filter((juego) => juego.consola == "Nintendo")
//         return filtrado
//     } else if (number == 3) {
//         const filtrado = productos.filter((juego) => juego.consola == "Sega")
//         return filtrado
//     }
// };



// const menuContinuar = () => {
//     let menuAccion = ""
//     menuAccion += "Quieres realizar otra accion? \n" 
//     menuAccion += "1. Si \n"
//     menuAccion += "2. No \n"
//     let respuesta = parseInt(prompt(menuAccion))
//         switch (respuesta) {
//             case 1:
//                 menuInicio()
//                 break;
            
//             case 2:
//                 alert("Muchas gracias! vuelva pronto!")
//                 break;
        
//             default:
//                 alert("Porfavor ingrese una de las opciones validas del menu")
//                 menuContinuar()
//                 break;
//         }
// }

// const mostrarCarrito = () => {
//     let list = "";
//     let index = 1
//     list += "Estos son los productos que tienes guardados! \n"
//     const total = sacarTotal();
//     for (const item of carritoCompras) {
//         list += index++ + " - " + item.nombre + " - " + item.consola + " - " + item.precio + " USD\n"
//     }
//     list += "total: " + total
//     alert(list)
//     menuContinuar()
// }

// const eliminarProducto = () => {
//     let list = "";
//     let index = 1
//     list += "¿Cual es el producto que deseas eliminar? \n"
//     const total = sacarTotal();
//     for (const item of carritoCompras) {
//         list += index++ + " - " + item.nombre + " - " + item.consola + " - " + item.precio + " USD\n"
//     }
//     let seleccion = parseInt(prompt(list))
//     carritoCompras.splice(seleccion - 1, 1);
//     alert("El producto se elimino con exito!")
//     console.log(carritoCompras)
//     menuContinuar()
// } 

// const elegirProducto = () => {
//     let productos;
//     let seleccion;
//     let menu = ""
//         menu += "Selecciona una de nuestras categorias \n" 
//         menu += "1. Sony \n"
//         menu += "2. Nintendo \n"
//         menu += "3. Sega \n"
//         menu += "0. salir"
//         let respuesta = parseInt(prompt(menu))
//         let list = "Selecciona uno de nuestros productos \n";
//         switch (respuesta) {
//             case 1:
//                 productos = filtroProductos(1)
//                 for (const producto of productos) {
//                     list += producto.id + ' - ' + producto.nombre + " - " + producto.precio + ' USD \n';
//                 }
//                 seleccion = parseInt(prompt(list));
//                 switch (seleccion) {
//                     case 1:
//                         agregarAlCarrito(1)
//                         console.log(carritoCompras)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     case 2: 
//                         agregarAlCarrito(2)
//                         console.log(carritoCompras)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     default:
//                         alert("Porfavor, elige una opcion valida")
//                         elegirProducto();
//                         break
//                 }
//                 break;
            
//             case 2:
//                 productos = filtroProductos(2)
//                 for (const producto of productos) {
//                     list += producto.id + ' - ' + producto.nombre + " - " + producto.precio + ' USD \n';
//                 }
//                 seleccion = parseInt(prompt(list));
//                 switch (seleccion) {
//                     case 3:
//                         agregarAlCarrito(3)
//                         console.log(carritoCompras)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     case 4: 
//                         agregarAlCarrito(4)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     default:
//                         alert("Porfavor, elige una opcion valida")
//                         elegirProducto();
//                         break
//                 }
//                 break;
            
//             case 3:
//                 productos = filtroProductos(3)
//                 for (const producto of productos) {
//                     list += producto.id + ' - ' + producto.nombre + " - " + producto.precio + ' USD \n';
//                 }
//                 seleccion = parseInt(prompt(list));
//                 switch (seleccion) {
//                     case 5:
//                         agregarAlCarrito(5)
//                         console.log(carritoCompras)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     case 6: 
//                         agregarAlCarrito(6)
//                         console.log(carritoCompras)
//                         alert("El producto se guardo con exito!")
//                         menuContinuar()
//                         break
//                     default:
//                         alert("Porfavor, elige una opcion valida")
//                         elegirProducto();
//                         break
//                 }

//             case 0:
//                 alert("Muchas gracias! vuelva pronto!")
//                 break;
        
//             default:
//                 alert("Porfavor ingrese una de las opciones validas del menu")
//                 elegirProducto();
//                 break;
//         }
// }

// const menuInicio = () => {
//     let menu = ""
//         menu += "Hola! bienvenido a VideoForo. ¿Que accion quieres realizar? \n" 
//         menu += "1. Seleccionar Producto \n"
//         menu += "2. Mostrar carrito \n"
//         menu += "3. Eliminar producto de tu carrito \n"
//         menu += "0. salir"
//         let respuesta = parseInt(prompt(menu))
//         switch (respuesta) {
//             case 1:
//                 elegirProducto();
//                 break;
            
//             case 2:
//                 mostrarCarrito();
//                 break;

//             case 3:
//                 eliminarProducto();
//                 break

//             case 0:
//                 alert("Muchas gracias! vuelva pronto!")
//                 break;
        
//             default:
//                 alert("Porfavor ingrese una de las opciones validas del menu")
//                 menuInicio();
//                 break;
//         }
// }

// menuInicio();