// Inizializza l'oggetto in localstorage se non esiste
if (localStorage.getItem('utenti') == null) {
    utenti = [];
    utentiStr = JSON.stringify(utenti);
    localStorage.setItem('utenti', utentiStr);
}
// Inizializza l'oggetto in localstorage se non esiste
if (localStorage.getItem('recensioni') == null) {
    recensioni = [];
    recensioniStr = JSON.stringify(recensioni);
    localStorage.setItem('recensioni', recensioniStr);
}

// Controlla se l'utente è loggato
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

// Carico le varie sezioni della home
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

function mostraCarosello(ricetta) {
    var lista = document.getElementById('lista_carosello');
    var master = document.getElementById('master_carosello');
    var clone = master.cloneNode(true);
    clone.id = ricetta.meals[0].idMeal;
    clone.querySelector('img').setAttribute('src', ricetta.meals[0].strMealThumb);
    clone.querySelector('#title').innerHTML = ricetta.meals[0].strMeal;
    clone.querySelector('#subtitle').innerHTML = ricetta.meals[0].strCategory;
    clone.classList.remove('d-none');
    lista.appendChild(clone);

}

async function mostraBreakfast(breakfast, counter) {
    var lista = document.getElementById('section_breakfast');
    var master = document.getElementById('master_breakfast');
    var clone = master.cloneNode(true);
    clone.id = breakfast.meals[counter].idMeal;
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
    clone.id = pasta.meals[counter].idMeal;
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
    clone.id = dessert.meals[counter].idMeal;
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





//ACCOUNT

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
    currentUrl = window.location.href;
    window.location.href = currentUrl;
}

function logOut() {
    sessionStorage.removeItem('log')
    return true;
}

function salvaUtente() {
    nome = document.getElementById('name').value;
    cognome = document.getElementById('lastname').value;
    mail = document.getElementById('email').value;
    usern = document.getElementById('username').value;
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
    if (!isNonEmptyString(usern)) {
        alert('Insert a valid username!')
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
        username: usern,
        psw: psw1,
        ricettario: [],
        note: {},
    }


    utenti = JSON.parse(localStorage.getItem('utenti'));

    if (utenti.some(utente => utente.email == nuovoUtente.email)) {
        alert("User already exists.")
        return false;
    } else {
        utenti.push(nuovoUtente)
        localStorage.setItem('utenti', JSON.stringify(utenti))
        alert('Account created!')
    }
    return true;
}

function accountDel() {
    mail = sessionStorage.getItem('log');
    users = JSON.parse(localStorage.getItem('utenti'));
    reviews = JSON.parse(localStorage.getItem('recensioni'))


    users = users.filter(user => user.email !== mail);
    localStorage.setItem('utenti', JSON.stringify(users));
    sessionStorage.removeItem('log');

    reviews = reviews.filter(review => review.email !== mail);
    localStorage.setItem('recensioni', JSON.stringify(reviews));


    window.location.href = 'home.html';
    alert('User successfully deleted!')
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


//LISTA RICETTE

// Funzione per la prima sezione della home
function searchRecipesCountry(event) {
    var country = event.currentTarget.id
    encodedSearchValue = encodeURIComponent(country);
    window.location.href = `listaRicette.html?search=${encodedSearchValue}`;
}

// Funzione per ogni card di ricette
function searchRecipes(cat) {
    encodedSearchValue = encodeURIComponent(cat);
    window.location.href = `listaRicette.html?search=${encodedSearchValue}`;
}

// Se non ci sono parametri di ricerca, carica 8 ricette random
function randomList() {
    for (let i = 0; i < 8; i++) {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => response.json())
            .then(ricetta => caricaRicette1(ricetta))
    }
}

// Funzione per la ricerca di ricette che provengono dalla barra di ricerca
function mostraRicetteInside() {
    document.getElementById('lista_ricette').innerHTML = "";
    param = document.getElementById('barraRicerca').value;
    if (param == null || param == "") {
        randomList();
    } else {
        ricercaXNome(param);
        ricercaXIniziale(param);
        ricercaXIngrediente(param);
        ricercaXCategoria(param);
        ricercaXArea(param);
    }

}

// Funzione per la ricerca di ricette che provengono dall'url
function mostraRicetteOutside(param) {
    document.getElementById('lista_ricette').innerHTML = "";
    ricercaXNome(param);
    ricercaXIniziale(param);
    ricercaXIngrediente(param);
    ricercaXCategoria(param);
    ricercaXArea(param);
}

// Funzione per la ricerca di ricette che provengono dalla barra di ricerca di altre pagine --> url
function cercaRicette(event) {
    event.preventDefault();

    searchValue = document.getElementById('searchInput').value;
    let encodedSearchValue = encodeURIComponent(searchValue);

    window.location.href = `listaRicette.html?search=${encodedSearchValue}`;

    return false;
}

// combinazione di tutte le funzioni di ricerca
function ricercaXNome(param) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette1(ricette))

}
function ricercaXIniziale(param) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette1(ricette))

}
function ricercaXIngrediente(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette2(ricette))

}
function ricercaXCategoria(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette2(ricette))

}
function ricercaXArea(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => caricaRicette2(ricette))

}


// Distinzione tra 1 e 2 perchè la prima funzione carica le ricette direttamente, la seconda fa un'altra fetch per prendere le informazioni
function caricaRicette1(ricette) {
    recipes = ricette.meals;
    if (recipes == null) {
        return
    }
    var lista = document.getElementById('lista_ricette');
    var master = document.getElementById('master_recipe');

    recipes.forEach(recipe => {
        var clone = master.cloneNode(true);
        clone.id = recipe.idMeal;
        clone.querySelector('h5').innerHTML = recipe.strMeal;
        clone.querySelector('p').innerHTML = recipe.strInstructions.substring(0, 230) + "...";
        clone.querySelector('img').setAttribute('src', recipe.strMealThumb);
        clone.classList.remove('d-none');
        lista.appendChild(clone);
    });

}

// async per fare la fetch delle informazioni
async function caricaRicette2(ricette) {
    recipes = ricette.meals;

    if (!recipes) {
        return;
    }

    var lista = document.getElementById('lista_ricette');
    var master = document.getElementById('master_recipe');

    for (recipe of recipes) {
        clone = master.cloneNode(true);
        clone.id = recipe.idMeal;
        clone.querySelector('h5').innerHTML = recipe.strMeal;
        clone.querySelector('img').setAttribute('src', recipe.strMealThumb);

        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`;

        try {
            response = await fetch(url);
            if (!response.ok) {
                throw new Error('Fetch error');
            }
            infos = await response.json();

            if (infos.meals && infos.meals.length > 0) {
                instructions = infos.meals[0].strInstructions;
                clone.querySelector('p').innerHTML = instructions ? instructions.substring(0, 230) + "..." : "No instructions available.";
                clone.classList.remove('d-none');
            } else {
                console.error('No meal information available');
                clone.querySelector('p').innerHTML = "No instructions available.";
            }
        } catch (error) {
            console.error('Fetch error:', error);
            clone.querySelector('p').innerHTML = "Error loading instructions.";
        }

        lista.appendChild(clone);
    }
}




//RICETTA

function addToRecipeBook() {
    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);
    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');

        if (sessionStorage.getItem('log')) {
            // Se è impostato, recuperiamo il suo valore
            mail = sessionStorage.getItem('log');
        } else {
            alert('You must be logged before.');
            return;
        }
        users = JSON.parse(localStorage.getItem('utenti'));
        user = users.find(user => user.email === mail);

        ricettario = user.ricettario;
        ricettario.push(id);
        user.ricettario = ricettario;

        userIndex = users.findIndex(u => u.email === mail);
        users[userIndex] = user;
        localStorage.setItem('utenti', JSON.stringify(users));

        document.getElementById('btn_cuore').classList.add('d-none');
        document.getElementById('btn_remove_cuore').classList.remove('d-none');
    } else {
        console.log('Id not found');
    }

}

function removeFromRecipeBook() {
    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);
    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');

        if (sessionStorage.getItem('log')) {
            // Se è impostato, recuperiamo il suo valore
            mail = sessionStorage.getItem('log');
        } else {
            alert('You must be logged before.');
            return;
        }
        users = JSON.parse(localStorage.getItem('utenti'));
        user = users.find(user => user.email === mail);

        ricettario = user.ricettario;
        ricettario = ricettario.filter(item => item !== id);
        user.ricettario = ricettario;
        note = user.note;
        delete note[id];
        user.note = note;

        userIndex = users.findIndex(u => u.email === mail);
        users[userIndex] = user;
        localStorage.setItem('utenti', JSON.stringify(users));

        document.getElementById('btn_remove_cuore').classList.add('d-none');
        document.getElementById('btn_cuore').classList.remove('d-none');
    } else {
        console.log('Id not found');
    }

}

// Funzione per controllare se la ricetta caricata è già nel ricettario
function checkRicettario() {
    if (sessionStorage.getItem('log')) {
        // Se è impostato, recuperiamo il suo valore
        mail = sessionStorage.getItem('log');
    } else {
        return;
    }
    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);

    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');

        users = JSON.parse(localStorage.getItem('utenti'));
        user = users.find(user => user.email === mail);
        ricettario = user.ricettario;

        if (ricettario.includes(id)) {
            document.getElementById('btn_cuore').classList.add('d-none');
            document.getElementById('btn_remove_cuore').classList.remove('d-none');
        } else {
            document.getElementById('btn_remove_cuore').classList.add('d-none');
            document.getElementById('btn_cuore').classList.remove('d-none');
        }

    }
}

// loadRecipe() --> caricaRicetta() --> mostraRicetta()

// Funzione chiamata per aprire una nuova ricetta da una card
function loadRecipe(event) {
    var id = event.currentTarget.id
    encodedSearchValue = encodeURIComponent(id);
    window.location.href = `ricetta.html?search=${encodedSearchValue}`;
}

// funzione per caricare la ricetta cliccata in precedenza
function caricaRicetta() {
    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);

    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
            .then(response => response.json())
            .then(ricetta => mostraRicetta(ricetta))
            .catch(error => {
                console.error('Errore:', error);
            });
    } else {
        console.log('Id not found');
    }

}

function mostraRicetta(ricetta) {
    ricetta = ricetta.meals[0];

    document.getElementById('title').innerHTML = ricetta.strMeal;
    document.getElementById('category').innerHTML = ricetta.strCategory;
    document.getElementById('mainImg').src = ricetta.strMealThumb;

    if (ricetta.strArea != 'Unknown') {
        bandiera(ricetta.strArea)
    }

    ingrediente = 'example'
    counter = 1;
    var lista = document.getElementById('listaIngredient');
    var master = document.getElementById('ingredient');
    while (ingrediente != "") {
        ingrediente = 'strIngredient' + counter;
        quantita = 'strMeasure' + counter;
        var clone = master.cloneNode(true);
        clone.id = ingrediente;
        ingrediente = ricetta[ingrediente];
        quantita = ricetta[quantita];
        clone.innerHTML = '<strong>' + quantita + '</strong>&nbsp' + ingrediente;
        clone.classList.remove('d-none')
        lista.appendChild(clone);
        counter++;
    }

    var lista = document.getElementById('listaInstruction');
    var master = document.getElementById('instruction');
    instruction = '';
    text = ricetta.strInstructions;
    for (let char of text) {
        instruction += char;
        if (char == '.' || char == ';') {
            var clone = master.cloneNode(true);
            clone.innerHTML = instruction;
            clone.classList.remove('d-none')
            lista.appendChild(clone);
            instruction = "";
        }
    }

    impostaAltezza();
    ricercaXCategoria2(ricetta.strCategory)

}

function impostaAltezza() {
    var colIst = document.getElementById('listaInstruction');
    var colRec = document.getElementById('boxRecensioni');
    var colPiat = document.getElementById('listaPiatti');
    var colHeight = colIst.offsetHeight + colRec.offsetHeight + 20;
    colPiat.style.height = colHeight + 'px';
}

// Funzione per carica i piatti della stessa categoria nella pagina della ricetta
function ricercaXCategoria2(param) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=` + param;
    fetch(url)
        .then(response => response.json())
        .then(ricette => mostraPiatti(ricette))
        .catch(error => {
            console.error('Errore:', error);
        });
}

// Funzione per caricare i piatti della stessa categoria nella pagina della ricetta
async function mostraPiatti(ricette) {
    var lista = document.getElementById('listaPiatti');
    var master = document.getElementById('masterPiatto');
    ricette = ricette.meals
    ricette.forEach(meal => {
        var clone = master.cloneNode(true);
        clone.id = meal.idMeal;
        clone.querySelector('h5').innerHTML = meal.strMeal;
        clone.querySelector('img').setAttribute('src', meal.strMealThumb);
        clone.classList.remove('d-none');
        lista.appendChild(clone);
    });


}

// bandiere per l'origine della ricetta (corrispondenza per l'api flagsapi)
function bandiera(country) {
    switch (country) {
        case 'American':
            country = 'US'
            break;
        case 'British':
            country = 'GB'
            break;
        case 'Canadian':
            country = 'CA'
            break;
        case 'Chinese':
            country = 'CN'
            break;
        case 'Croatian':
            country = 'HR'
            break;
        case 'Dutch':
            country = 'NL'
            break;
        case 'Egyptian':
            country = 'EG'
            break;
        case 'Filipino':
            country = 'PH'
            break;
        case 'French':
            country = 'FR'
            break;
        case 'Greek':
            country = 'GR'
            break;
        case 'Indian':
            country = 'IN'
            break;
        case 'Irish':
            country = 'IE'
            break;
        case 'Italian':
            country = 'IT'
            break;
        case 'Jamaican':
            country = 'JM'
            break;
        case 'Japanese':
            country = 'JP'
            break;
        case 'Kenyan':
            country = 'KE'
            break;
        case 'Malaysian':
            country = 'MY'
            break;
        case 'Mexican':
            country = 'MX'
            break;
        case 'Moroccan':
            country = 'MA'
            break;
        case 'Polish':
            country = 'PL'
            break;
        case 'Portuguese':
            country = 'PT'
            break;
        case 'Russian':
            country = 'RU'
            break;
        case 'Spanish':
            country = 'ES'
            break;
        case 'Thai':
            country = 'TH'
            break;
        case 'Tunisian':
            country = 'TN'
            break;
        case 'Turkish':
            country = 'TR'
            break;
        case 'Ukrainian':
            country = 'UA'
            break;
        case 'Vietnamese':
            country = 'VN'
            break;
        default:
            break;
    }
    document.getElementById('flag').src = 'https://flagsapi.com/' + country + '/flat/64.png';
}


//RICETTARIO

function caricaRicettario() {
    mail = sessionStorage.getItem('log');
    users = JSON.parse(localStorage.getItem('utenti'));
    user = users.find(user => user.email === mail);

    ricettario = user.ricettario;
    if (ricettario.length > 0) {
        document.getElementById('ricettario_vuoto').classList.add("d-none");
        ricettario.forEach(id => {
            url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
            fetch(url)
                .then(response => response.json())
                .then(ricetta => mostraRicettario(ricetta, user))
        });
    }

}

function mostraRicettario(ricetta, user) {
    var lista = document.getElementById('lista_ricettario');
    var master = document.getElementById('master_ricettario');
    ricetta = ricetta.meals[0];
    var clone = master.cloneNode(true);
    clone.id = ricetta.idMeal;
    clone.querySelector('h2').innerHTML = ricetta.strMeal;
    // clone.querySelector('h3').innerHTML = ricetta.strCategory;
    clone.querySelector('img').setAttribute('src', ricetta.strMealThumb);
    buttons = clone.querySelectorAll('button');
    buttons[0].id = "btn_note_" + ricetta.idMeal;
    buttons[1].id = "btn_cancel_" + ricetta.idMeal;
    if (ricetta.idMeal in user.note) {
        clone.querySelector('ul').innerHTML = "";
        clone.querySelector('ul').classList.add('list-group-numbered');
        listaNote = user.note[ricetta.idMeal];
        listaNote.forEach(nota => {
            clone.querySelector('ul').innerHTML += "<li class='list-group-item'>" + nota + "</li>";
        });

    }
    clone.classList.remove('d-none');
    lista.appendChild(clone);
    document.getElementById("btn_note_" + ricetta.idMeal).addEventListener("click", handleButtonClick);
    document.getElementById("btn_cancel_" + ricetta.idMeal).addEventListener("click", handleButtonClick);
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

//modal per aggiungere note
function openNote(id) {
    sessionStorage.setItem('noteID', id);
    var modal1 = new bootstrap.Modal(document.getElementById('noteModal'));
    modal1.toggle();
}

function addNote() {
    id = sessionStorage.getItem('noteID');
    var nota = document.getElementById('textarea').value;

    mail = sessionStorage.getItem('log');
    users = JSON.parse(localStorage.getItem('utenti'));
    user = users.find(user => user.email === mail);
    if (id in user.note) {
        listaNote = user.note[id];
        listaNote.push(nota);
        user.note[id] = listaNote;
    } else {
        listaNote = [nota];
        user.note[id] = listaNote;
    }
    localStorage.setItem('utenti', JSON.stringify(users));

    sessionStorage.removeItem('noteID');
    currentUrl = window.location.href;
    window.location.href = currentUrl;
}

function removeRecipe(id) {
    users = JSON.parse(localStorage.getItem('utenti'));
    user = users.find(user => user.email === mail);

    ricettario = user.ricettario;
    ricettario = ricettario.filter(item => item !== id);
    user.ricettario = ricettario;
    note = user.note;
    delete note[id];
    user.note = note;

    userIndex = users.findIndex(u => u.email === mail);
    users[userIndex] = user;
    localStorage.setItem('utenti', JSON.stringify(users));
    let currentUrl = window.location.href;
    window.location.href = currentUrl;
}


//RECENSIONI

class Review {
    constructor(email, id, name, difficulty, taste, comment, date, meal) {
        this.email = email
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.taste = taste;
        this.comment = comment;
        this.date = date;
        this.meal = meal;
    }
}

function addReview() {
    data = document.getElementById('dataRecensione').value;
    commento = document.getElementById('commentoRecensione').value;
    difficolta = document.getElementById('difficoltaRecensione').value;
    gusto = document.getElementById('gustoRecensione').value;
    meal = document.getElementById('title').innerHTML;

    mail = sessionStorage.getItem('log');
    users = JSON.parse(localStorage.getItem('utenti'));
    user = users.find(user => user.email === mail);

    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);

    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');
    } else {
        alert('id not found');
        return;
    }

    let newReview = new Review(user.email, id, user.username, difficolta, gusto, commento, data, meal);

    reviews = JSON.parse(localStorage.getItem('recensioni'));
    reviews.push(newReview);
    localStorage.setItem('recensioni', JSON.stringify(reviews));

    currentUrl = window.location.href;
    window.location.href = currentUrl;
}

function showRecensioni() {

    var urlSearch = window.location.search;
    hasParams = /\?.+=/.test(urlSearch);

    if (hasParams) {
        urlParams = new URLSearchParams(urlSearch);
        id = urlParams.get('search');
    } else {
        alert('id not found');
        return;
    }

    var lista = document.getElementById('listaRecensioni');
    var master = document.getElementById('masterRecensioni');


    reviews = JSON.parse(localStorage.getItem('recensioni'));
    reviews.forEach(review => {
        if (review.id == id) {
            var clone = master.cloneNode(true);
            clone.querySelector('#usernameR').innerHTML = review.name;
            clone.querySelector('#commentR').innerHTML = review.comment;
            clone.querySelector('#dateR').innerHTML = '(' + review.date + ')';
            clone.querySelector('#difficultyR').innerHTML += " " + review.difficulty;
            clone.querySelector('#tasteR').innerHTML += " " + review.taste;
            clone.classList.remove('d-none');
            lista.appendChild(clone);
        }
    });
}

// Funzione per mostrare le recensioni dell'utente nella pagina account
function mostraRecensioniAccount(mail) {
    reviews = JSON.parse(localStorage.getItem('recensioni'));

    var lista = document.getElementById('listaRecensioni');
    var master = document.getElementById('masterRecensioni');

    reviews.forEach(review => {
        if (review.email == mail) {
            document.getElementById('noReviews').classList.add('d-none');
            document.getElementById('reviewTable').classList.remove('d-none');
            var clone = master.cloneNode(true);
            clone.querySelector('#nomeRicetta').innerHTML = review.meal;
            clone.querySelector('#dataRecensione').innerHTML = review.date;
            clone.querySelector('#commentoRecensione').innerHTML = review.comment.substring(0, 20) + "...";
            clone.classList.remove('d-none');
            lista.appendChild(clone);
        }
    });

}

// Funzione per rimuovere una recensione dalla pagina account
function removeReview(item) {
    mail = sessionStorage.getItem('log');
    users = JSON.parse(localStorage.getItem('utenti'));
    user = users.find(user => user.email === mail);

    commento = item.querySelector("#commentoRecensione").textContent;
    nome = item.querySelector("#nomeRicetta").textContent;
    data = item.querySelector("#dataRecensione").textContent;

    reviews = JSON.parse(localStorage.getItem('recensioni'));
    reviews = reviews.filter(review => (review.meal !== nome));
    localStorage.setItem('recensioni', JSON.stringify(reviews));

    currentUrl = window.location.href;
    window.location.href = currentUrl;
}

