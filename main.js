document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const posterAutos = [
        {
            id: 1,
            nombre: 'Poster Ford',
            precio: 6000.00,
            imagen: 'img/poster1.jpg'
        },
        {
            id: 2,
            nombre: 'Poster Mercedes',
            precio: 9500.00,
            imagen: 'img/poster2.jpg'
        },
        {
            id: 3,
            nombre: 'Poster Toyota',
            precio: 7500.00,
            imagen: 'img/poster3.jpg'
        },
        {
            id: 4,
            nombre: 'Poster Cupe',
            precio: 7700.00,
            imagen: 'img/poster4.jpg'
        },
        {
            id: 5,
            nombre: 'Poster Camaro',
            precio: 6100.00,
            imagen: 'img/poster5.jpg'
        },
        {
            id: 6,
            nombre: 'Poster Ferrari',
            precio: 9700.00,
            imagen: 'img/poster6.jpg'
        }

    ];

    let carrito = [];
    const moneda = '$';
    const items = document.querySelector('#items');
    const carr = document.querySelector('#carrito');
    const totalCompra = document.querySelector('#total');
    const botonBorrar = document.querySelector('#boton-vaciar');
    const guardado = window.localStorage;


    function productos1() {
        posterAutos.forEach((info) => {
            const nodo = document.createElement('div');
            nodo.classList.add('card', 'col-sm-4');
            const cuerpoAuto = document.createElement('div');
            cuerpoAuto.classList.add('card-body');
            const tituloAuto = document.createElement('h5');
            tituloAuto.classList.add('card-title');
            tituloAuto.textContent = info.nombre;
            const imagenesAutos = document.createElement('img');
            imagenesAutos.classList.add('img-fluid');
            imagenesAutos.setAttribute('src', info.imagen);
            const precioPosters = document.createElement('p');
            precioPosters.classList.add('card-text');
            precioPosters.textContent = `${moneda}${info.precio}`;
            const boton1 = document.createElement('button');
            boton1.classList.add('btn', 'btn-primary');
            boton1.textContent = 'Agregar';
            boton1.setAttribute('marcador', info.id);
            boton1.addEventListener('click', anyadirProductoAlCarrito);
            cuerpoAuto.appendChild(imagenesAutos);
            cuerpoAuto.appendChild(tituloAuto);
            cuerpoAuto.appendChild(precioPosters);
            cuerpoAuto.appendChild(boton1);
            nodo.appendChild(cuerpoAuto);
            items.appendChild(nodo);
        });
    }


    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        rendCarrito();
        guardarCarrito1();
    }


    function rendCarrito() {
        carr.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = posterAutos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {

                return itemId === item ? total += 1 : total;
            }, 0);

            const varBot = document.createElement('li');
            varBot.classList.add('list-group-item', 'text-right', 'mx-2');
            varBot.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${moneda}${miItem[0].precio}`;

            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarCarrito);

            varBot.appendChild(miBoton);
            carr.appendChild(varBot);
        });

        totalCompra.textContent = calcularTotal();
    }


    function borrarCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        rendCarrito();

        guardarCarrito1();

    }


    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = posterAutos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        carrito = [];
        rendCarrito();
        localStorage.clear();

    }

    function guardarCarrito1() {
        guardado.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarrito1() {
        if (guardado.getItem('carrito') !== null) {
            carrito = JSON.parse(guardado.getItem('carrito'));
        }
    }

    botonBorrar.addEventListener('click', vaciarCarrito);

    cargarCarrito1();
    productos1();
    rendCarrito();
});