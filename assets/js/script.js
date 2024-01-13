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

// con un'iterazione stampo gli articoli all'avvio della pagina
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

// aggiungo un event listener ('change') al select ed al checkbox con la medesima funzione
news_selection.addEventListener('change', filterArticles);
checkBox.addEventListener('change', filterArticles);

// aggiungo un listener sulle icone del bookmark
containerEl.addEventListener('click', function (event) {
    // recupero il click con target
    const clickedElement = event.target;
    console.log(clickedElement);

    // verifico se l'elemento cliccato è un icona fa-bookmark
    if (clickedElement.classList.contains('fa-bookmark')) {
        // recupero l'id dell'elemento cliccato
        const articleId = clickedElement.getAttribute('data-id');
        // con il metodo find itero in articles fino a trovare coincidenza tra l'id recuperato e quello della array 
        const article = articles.find(article => article.id.toString() === articleId);

        if (article) {
            // inverto il valore booleano di saved
            article.saved = !article.saved;

            // con un operatore ternario modifico la classe della I in condizione con il valore saved
            editBookmarkClass(clickedElement, article.saved);
        };
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

// funzione che gestisce il filtro per il select e il checkbox
function filterArticles() {
    // creo una variabile per leggere il valore del select
    const valueType = news_selection.value;

    // creo una variabile per verificare se il checkbox è selezionato
    const checkboxChecked = checkBox.checked;

    // svuoto l'HTML del container
    containerEl.innerHTML = '';

    // richiamo la variabile globale con valore booleano falso
    let newsAvailable = false;

    // itero per ogni articolo nell'array
    articles.forEach(article => {
        // verifico se l'articolo deve essere visualizzato dopo la selezione del select
        const selectCondition = valueType === '' || article.tags.includes(valueType);
        // con checkbox selezionato visualizzo solo article.saved true, altrimenti saranno tutti true
        const checkboxCondition = checkboxChecked ? article.saved : true;
        console.log(checkboxCondition);

        // se entrambe le condizioni sono vere, creo il markup dell'articolo
        if (selectCondition && checkboxCondition) {
            const articleMarkup = createMarkup(article);
            containerEl.insertAdjacentHTML("beforeend", articleMarkup);

            // aggiorno dinamicamente la classe dell'icona del bookmark per mantenerne la memoria durante le operazioni in pagina
            const bookmarkIcon = containerEl.querySelector(`[data-id="${article.id}"]`);
            if (bookmarkIcon) {
                // richiamo la funzione per modificare le classi delle icone del bookmark
                editBookmarkClass(bookmarkIcon, article.saved);
            };

            // se ci sono notizie per il tag selezionato o se rimaniamo su "Tutti i tags", il valore della variabile diventa vera
            newsAvailable = true;
        };
    });


    // se nessuna notizia è disponibile, aggiungo la scritta "No News Available"
    if (!newsAvailable) {
        // Inserisco un template literal preparato in HTML-CSS
        containerEl.insertAdjacentHTML("beforeend", `
            <div class="container mt-3 p-0">
                <span class="noNews">No News Available.</span>
            </div> 
        `);
    };
};

// funzione utile a modificare le classi delle icone di bookmark
function editBookmarkClass(element, saved) {
    const regularClass = 'fa-regular fa-bookmark';
    const solidClass = 'fa-solid fa-bookmark';

    element.classList.value = saved ? solidClass : regularClass;
};
