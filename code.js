if (localStorage.getItem('utenti') == null) {
    utenti = [];
    utentiStr = JSON.stringify(utenti);
    localStorage.setItem('utenti', utentiStr);
}

function checkLog() {
    if (sessionStorage.getItem('log') == null) {
        document.getElementById('menuLogo').classList.add('d-none');
        document.getElementById('accountLogo').classList.remove('d-none');
    } else {
        document.getElementById('menuLogo').classList.remove('d-none');
        document.getElementById('accountLogo').classList.add('d-none');
    }
}




//HOME
counter = 0;

function carica_contenutiHome() {


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

async function mostraBreakfast(breakfast, counter) {
    var lista = document.getElementById('section_breakfast');
    var master = document.getElementById('master_breakfast');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + breakfast.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = breakfast.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', breakfast.meals[counter].strMealThumb);
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + breakfast.meals[counter].idMeal;
    await fetch(url)
        .then(response => response.json())
        .then(infos => {
            data = infos;
            clone.querySelector('p').innerHTML = infos.meals[0].strArea;
            clone.classList.remove('d-none');
        })
    lista.appendChild(clone);
}

async function mostraPasta(pasta, counter) {
    var lista = document.getElementById('section_pasta');
    var master = document.getElementById('master_pasta');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + pasta.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = pasta.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', pasta.meals[counter].strMealThumb);
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + pasta.meals[counter].idMeal;
    await fetch(url)
        .then(response => response.json())
        .then(infos => {
            data = infos;
            clone.querySelector('p').innerHTML = infos.meals[0].strArea;
            clone.classList.remove('d-none');
        })
    lista.appendChild(clone);
}
async function mostraDessert(dessert, counter) {
    var lista = document.getElementById('section_dessert');
    var master = document.getElementById('master_dessert');
    var clone = master.cloneNode(true);
    clone.id = 'card-' + dessert.meals[counter].idMeal;
    clone.querySelector('h5').innerHTML = dessert.meals[counter].strMeal;
    clone.querySelector('img').setAttribute('src', dessert.meals[counter].strMealThumb);
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + dessert.meals[counter].idMeal;
    await fetch(url)
        .then(response => response.json())
        .then(infos => {
            data = infos;
            clone.querySelector('p').innerHTML = infos.meals[0].strArea;
            clone.classList.remove('d-none');
        })
    lista.appendChild(clone);
}





//LOGGING

function logIn() {
    utenti = JSON.parse(localStorage.getItem('utenti'));

    mail = document.getElementById('email').value;
    password = document.getElementById('password').value;

    nuovoUtente = {
        email: mail,
        psw: password
    }

    trovato = utenti.find(utente => utente.email == nuovoUtente.email && utente.psw == nuovoUtente.psw)
    if (trovato != undefined) {
        sessionStorage.setItem('log', mail)
    } else {
        alert('Password o email errate.')
        return false;
    }
    return true;
}

function salvaUtente() {
    nome = document.getElementById('name').value;
    cognome = document.getElementById('lastname').value;
    mail = document.getElementById('email').value;
    psw1 = document.getElementById('password1').value;
    psw2 = document.getElementById('password2').value;

    if (!isNonEmptyString(nome)) {
        alert('Insert a valid name!')
        return false;
    }
    if (!isNonEmptyString(cognome)) {
        alert('Insert a valid lastname!')
        return false;
    }
    if (!isValidEmail(mail)) {
        alert('Insert a valid email!')
        return false;
    }
    if (!isValidPsw(psw1)) {
        alert('Insert a valid password!')
        return false;
    }
    if (psw1 !== psw2) {
        alert('The passwords don\'t match.')
        return false;
    }

    nuovoUtente = {
        name: nome,
        lastname: cognome,
        email: mail,
        psw: psw1,
        ricettario: [],
        note: [],
    }


    utenti = JSON.parse(localStorage.getItem('utenti'));

    if (utenti.some(utente => utente.email == nuovoUtente.email)) {
        alert("User already exists.")
        return false;
    } else {
        utenti.push(nuovoUtente)
        localStorage.setItem('utenti', JSON.stringify(utenti))
        sessionStorage.setItem('log', email)
        alert('Account created!')
    }
    return true;
}

function isNonEmptyString(str) {
    return /^.+$/.test(str);
}

function isValidEmail(email) {
    const emailRegex = /^[\w\.\-]+@[a-zA-Z\d\.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidPsw(str) {
    const regex = /^(?=.*\d).{8,}$/;
    return regex.test(str);
}


//RICETTE

function mostraRicetteInside() {
    document.getElementById('lista_ricette').innerHTML = "";
    param = document.getElementById('barraRicerca').value;
    ricercaXNome(param);
    ricercaXIniziale(param);
    ricercaXIngrediente(param);
    ricercaXCategoria(param);
    ricercaXArea(param);
}

function mostraRicetteOutside(param) {
    document.getElementById('lista_ricette').innerHTML = "";
    ricercaXNome(param);
    ricercaXIniziale(param);
    ricercaXIngrediente(param);
    ricercaXCategoria(param);
    ricercaXArea(param);
}

function ricercaXNome(param) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}
function ricercaXIniziale(param) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}
function ricercaXIngrediente(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}
function ricercaXCategoria(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}
function ricercaXArea(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}

function caricaRicette(ricette) {
    recipes = ricette.meals;
    var lista = document.getElementById('lista_ricette');
    var master = document.getElementById('master_recipe');

    recipes.forEach(recipe => {
        var clone = master.cloneNode(true);
        clone.id = 'card-' + recipe.idMeal;
        clone.querySelector('h5').innerHTML = recipe.strMeal;
        clone.querySelector('p').innerHTML = recipe.strInstructions.substring(0, 230) + "...";
        clone.querySelector('img').setAttribute('src', recipe.strMealThumb);
        clone.classList.remove('d-none');
        lista.appendChild(clone);
    });

}