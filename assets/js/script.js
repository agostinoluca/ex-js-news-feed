// creo un array di oggetti con i dati forniti, aggiungo gli attributi 'image', 'alt' e 'saved'
const articles = [
    {
        id: 1,
        title: "Scoperta di una nuova specie di papera di gomma",
        content: "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.",
        tags: ["geo", "tech"],
        author: "Diana Rossi",
        published: "2023-02-11",
        image: "./assets/img/rubber-duck.jpg",
        alt: "foto di una papera gigante",
        saved: false
    },
    {
        id: 2,
        title: "Viaggio culinario: alla ricerca dei sapori perduti",
        content: "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
        tags: ["cucina"],
        author: "Marta Bianchi",
        published: "2023-04-20",
        image: "./assets/img/kitchen-food.jpg",
        alt: "foto di un tavolo con un coltello, dei pomodori, olio e spezie",
        saved: false
    },
    {
        id: 3,
        title: "Esplorando le profondità marine: il mistero degli abissi",
        content: "Esplorando le profondità marine: il mistero degli abissi.",
        tags: ["viaggi", "geo"],
        author: "Fabio Mari",
        published: "2023-03-14",
        image: "./assets/img/deep-sea.jpg",
        alt: "foto di coralli marini",    
        saved: false
    },
    {
        id: 4,
        title: "Arte moderna: oltre i confini convenzionali",
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ["arte", "tech"],
        author: "Gabriele Neri",
        published: "2023-05-29",
        image: "./assets/img/modern-art.jpg",
        alt: "foto di murales in arte moderna",
        saved: false
    },
];

// inserisco una variabile con valore booleano falso
let newsAvailable = false;

// inserisco in una costante il container delle notizie
const containerEl = document.getElementById('site_main');

// inserisco il select in una costante
const news_selection = document.getElementById('news_selection');

// inserisco in costante il check-box
const checkBox = document.getElementById('savedNews');

// creo un array dedicata al menù select
const optionList = [];

// con un'iterazione stampo gli articoli in pagina
articles.forEach(article => {
    // richiamo la funzione per il markup
    const articleMarkup = createMarkup(article);
    // inserisco l'html creato nel containerEl in posizione beforeend
    containerEl.insertAdjacentHTML("beforeend", articleMarkup);
});

// itero per creare le opzioni dinamicamente
articles.forEach(article => {
    // itero gli attributi .tags
    article.tags.forEach(tag => {
        // applico la funzione createOption a ciascun tag
        createOption(tag);
    });

    // aggiungo altri tag che non sono associati a una notizia specifica
    const additionalTags = ["politica", "sport"];

    // itero gli attributi .tags
    additionalTags.forEach(tag => {
        // applico la funzione createOption a ciascun tag
        createOption(tag);
    });
});

// aggiungo un addEventListener('change') al select
news_selection.addEventListener('change', function(){

    // creo una variabile per leggere la value del select
    let valueType = news_selection.value;

    // svuoto l`html del container
    containerEl.innerHTML = '';

    // richiamo la variabile globale con valore booleano falso
    newsAvailable = false;
    
    // con un for loop creo un box per ogni oggetto della array
    articles.forEach(article => {
        
        // la condizione filtra i tags identici al select oppure il campo vuoto dell'opzione "Tutti i tags"
        if (valueType === '' || article.tags.includes(valueType)) {

            // richiamo la funzione per creare i box delle notizie selezionate dal select
            const articleMarkup = createMarkup(article);
            containerEl.insertAdjacentHTML("beforeend", articleMarkup);

            // se esistono notizie per il tag selezionato o se rimaniamo su "Tutti i tags", il valore della variabile diventa vera
            newsAvailable = true;
        };
    });
    
    // se nessuna notizia è disponibile, aggiungo la scritta "No News Available"
    if (!newsAvailable) {
        // inserisco un template literal preparato in HTML-CSS
        containerEl.insertAdjacentHTML("beforeend", `
            <div class="container mt-3 p-0">
                <span class="noNews">No News Available.</span>
            </div> 
        `);
    };
});


// con una funzione definisco il markup della news
function createMarkup(article) {   
    // creo un array di stringhe HTML per i badge dei tags, con un operatore ternario coloro i badge in base al testo contenuto
    const tagsMarkup = article.tags.map(tag => `
    <span class="badge ${
        tag === 'geo' ? 'bg-success' : 
        tag === 'tech' ? 'bg-primary' : 
        tag === 'cucina' ? 'bg-danger' : 
        tag === 'viaggi' ? 'bg-warning' : 
        tag === 'arte' ? 'bg-info' : 'bg-light'
    } p-2 fs-5">${tag}</span>`).join(''); // utilizzo il .join per eliminare le virgole della array generata dal ciclo map

    // return del template literal precedentemente creato in HTML/CSS
    return `
    <div class="container p-3 bg-light mt-4">
        <div class="news_head d-flex justify-content-between">
            <h2>${article.title}</h2>
            <i class="fa-regular fa-bookmark" data-id="${article.id}"></i>
        </div>
        <div class="news_body">
            <h5>${article.author}</h5>
            <h6>${article.published}</h6>
            <p>${article.content}</p>
        </div>
        <div class="news_img d-flex justify-content-center">
            <img src="${article.image}" alt="${article.alt}">
        </div>
        <div class="news_tags mt-3 d-flex gap-2">${tagsMarkup}</div>
    </div>
    `;
};

// funzione che crea le opzioni del select tramite i tag dei dati forniti
function createOption(tag) {
    // stabilisco se l'array non contiene già il tipo di tag
    if (!optionList.includes(tag)) {
        // se non lo contiene, pusho nell'array l'opzione
        optionList.push(tag);
        // creo l'opzione
        const optionNews = document.createElement("option");
        // scrivo dentro l'opzione
        optionNews.innerText = tag;
        // collego al mio select l'opzione appena creata
        news_selection.append(optionNews);
    };
};

/* 
Cambio il mio approccio all'esercizio: 
    -non utilizzo più una array per le notizie salvate;
    -aggiungo un attributo booleano agli oggetti della array di dati forniti;
    -creo funzione comune che gestisce i comportamenti di entrambi i filtri;
    -provo a snellire il codice creando piccole funzioni.
*/