//funcion anonima que nos permite proteger nuestro codigo 
(() => {
    'use strict'
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;


    //Referencias Html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo')

    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntosHtml = document.querySelectorAll('small');
 
       

    const crearDeck = () => {
        //reinicializar el deck
        deck = []

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }

        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }

        }

        // console.log(deck);
        // deck = _.shuffle(deck);
        // console.log(deck);
        // return deck;
        return _.shuffle(deck); 

    };

    //  //Esta funcion inicializa el deck
    //  const inicializarJuego = () => {
    //     deck = crearDeck();
    // }
    //esta funcion me permite tomar 1 carta
    crearDeck();

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'no hay cartas';
        }

        // const carta = deck.pop()

        // // console.log(deck);
        // // console.log(carta);

        // return carta;
        return deck.pop();

    }


    pedirCarta()

    const valorCarta = (carta) => {

         const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))
            ? (valor === 'A') ? 11 : 10
            : valor * 1;
        // let puntos = 0;
        // console.log({valor})
        // if(isNaN(valor)){

        //     puntos = (valor === 'A') ? 11 : 10;

        // }else{
        //     puntos = valor * 1;
        // }
        // console.log(typeof puntos);


    }

    //  const valor = valorCarta(pedirCarta())


    //turno computadora 

    const turnoComputadora = (puntosMinimos) => {

        do {

            const carta = pedirCarta();
            console.log(carta);
            puntosComputadora = puntosComputadora + valorCarta(carta)
            puntosHtml[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            //agregarle estilo css 
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }


        }, 50);

    }

    //  Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        console.log(carta);
        puntosJugador = puntosJugador + valorCarta(carta)
        puntosHtml[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        //agregarle estilo css 
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Perdida la Jugada');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21 Genial!');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    //   turnoComputadora( 12 )

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    })

    btnNuevo.addEventListener('click', () => {
        //Limpiar la consola
        console.clear();
   

        deck =[]
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })

})();


