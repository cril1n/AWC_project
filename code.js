//HOME
counter = 0;

function carica_contenuti() {


    for (let i = 0; i < 8; i++) {

        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => response.json())
            .then(ricetta => mostraCarosello(ricetta, i))

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`)
            .then(response => response.json())
            .then(breakfast => mostraBreakfast(breakfast, i))

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta`)
            .then(response => response.json())
            .then(pasta => mostraPasta(pasta, i))

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`)
            .then(response => response.json())
            .then(dessert => mostraDessert(dessert, i))
    }
}

function mostraCarosello(ricetta, counter) {
    var lista = document.getElementById('lista_carosello');
    var master = document.getElementById('master_carosello');
    var clone = master.cloneNode(true);
    clone.id = 'carosello-' + ricetta.idMeal;
    clone.querySelector('img').setAttribute('src', ricetta.meals[0].strMealThumb);
    clone.querySelector('h3').innerHTML = ricetta.meals[0].strMeal;
    clone.querySelector('p').innerHTML = ricetta.meals[0].strCategory;
    imagine = clone.querySelector('img').getAttribute('src');
    clone.classList.remove('d-none');
    clone.classList.add('carousel-item');
    if (counter == 0) {
        clone.classList.add('active');
    }
    lista.appendChild(clone);

}

function mostraBreakfast(breakfast, counter) {
    var lista = document.getElementById('section_breakfast');
    var master = document.getElementById('master_breakfast');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + breakfast.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = breakfast.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', breakfast.meals[counter].strMealThumb);
    clone.classList.remove('d-none');
    lista.appendChild(clone);
}

function mostraPasta(pasta, counter) {
    var lista = document.getElementById('section_pasta');
    var master = document.getElementById('master_pasta');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + pasta.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = pasta.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', pasta.meals[counter].strMealThumb);
    clone.classList.remove('d-none');
    lista.appendChild(clone);
}
function mostraDessert(dessert, counter) {
    var lista = document.getElementById('section_dessert');
    var master = document.getElementById('master_dessert');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + dessert.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = dessert.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', dessert.meals[counter].strMealThumb);
    clone.classList.remove('d-none');
    lista.appendChild(clone);
}

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    .then(response => response.json())
    .then(paesi => mostraCountries(paesi))

async function mostraCountries(paesi) {
    var lista = document.getElementById('section_countries');
    var master = document.getElementById('master_countries');

    for (let i = 0; i < 10; i++) {
        var clone = master.cloneNode(true);
        paese = paesi.meals[i].strArea;
        clone.id = 'card-' + paese;
        clone.querySelector('h5').innerHTML = paese;
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${paese}`)
            .then(response => response.json())
            .then(piatti => {
                const meal = piatti
                clone.querySelector('p').innerHTML = meal.meals[0].strMeal;
                clone.querySelector('img').setAttribute('src', meal.meals[0].strMealThumb);
                clone.classList.remove('d-none');

            });
        lista.appendChild(clone);
    }
}



//LOGGING

