document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [{
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ];
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    var juegos = 0;

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const mensajeDisplay = document.querySelector('#mensaje');

    //creando tablero
    function createBoard() {
        cardArray.sort(() => 0.5 - Math.random());

        for (var i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
            card.style.border = 'solid 1px black';
        }

        juegos++;
    }
    //Voltear carta
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        var cards = document.querySelectorAll('img');

        cards[cardId].removeEventListener('click', flipCard);

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
    //Verificar pares
    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            mensajeDisplay.textContent = 'Encontraste un par !';
            mensajeDisplay.style.color = "Blue";

            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            mensajeDisplay.textContent = 'Lo siento, intentalo de nuevo';
            mensajeDisplay.style.color = 'Red';

            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');

            cards[optionOneId].addEventListener('click', flipCard);
            cards[optionTwoId].addEventListener('click', flipCard);
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            mensajeDisplay.textContent = 'Felicidades! Encontraste todos los pares';
            mensajeDisplay.style.color = 'Green';
            document.querySelector('button').style.display = 'inline';
        }
    }

    function iniciar() {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        document.querySelector('button').style.display = 'none';

        if (juegos === 0) {
            createBoard();
        } else {
            var remove = document.querySelectorAll('img');

            for (var i = 0; i < cardArray.length; i++) {
                grid.removeChild(remove[i]);
            }
            createBoard();
        }
    }

    document.querySelector('#comenzar').addEventListener('click', iniciar);
})