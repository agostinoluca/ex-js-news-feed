/* 
Step 1: struttura dei dati.
Partendo dai dati forniti crea le strutture dati necessarie sfruttando array e oggetti facendo attenzione agli attributi che caratterizzano ciascuna news.

Alcune note:
●	nel definire una immagine servirà un url e non dimenticare di valorizzare l’attributo alt;
●	modificare/aggiungere dati a vostro piacimento per arricchire l’esperienza.


Step 2 - Stampa dei dati in pagina.
Stampa in pagina le news del nostro feed utilizzando JavaScript.

Alcune note:
●	creare un secondo array in cui conservare la lista degli elementi salvati;
●	per l’icona di salvataggio utilizzare FontAwesome o un semplice file svg;
●	agganciare l’evento al tasto bookmark;
●	ogni volta che elimini un elemento dal DOM tutti gli eventi ad esso associati vengono rimossi, trova un modo per riagganciarli;
●	una volta salvata una news non è più possibile rimuoverla o cliccare nuovamente sull’icona.


#Tools:
-console.log();
-const
-forEach
-.insertAdjacentHTML("beforeend",)
-function
-append
-innerHTML , innerText
-.addEventListener(change)
*/

// creo un array di oggetti con i dati forniti, aggiungo gli attributi 'image' e 'alt'
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
},
];

// console.log(articles);
// console.log(articles[3].title, articles[0].content);

// inserisco in una costante il container delle notizie
const containerEl = document.getElementById('site_main');

// con un'iterazione stampo gli articoli in pagina
articles.forEach(article => {
    const articleMarkup = createMarkup(article);
    containerEl.insertAdjacentHTML("beforeend", articleMarkup);
});

// con una funzione definisco il markup della news
function createMarkup(article) {
    
    // creo un array di stringhe HTML per i badge dei tags, con un operatore ternario coloro i badge in base al testo contenuto
    const tagsMarkup = article.tags.map(tag => `
    <span class="badge ${
        tag === 'geo' ? 'bg-primary' : 
        tag === 'tech' ? 'bg-info' : 
        tag === 'cucina' ? 'bg-success' : 
        tag === 'viaggi' ? 'bg-warning' : 
        tag === 'arte' ? 'bg-secondary' : 'bg-danger'
    } p-2 fs-5">${tag}</span>`).join(''); // utilizzo il .join per eliminare le virgole della array generata dal ciclo map

    // return del template literal precedentemente creato in HTML/CSS
    return `
    <div class="container p-3 bg-light mt-4">
        <div class="news_head d-flex justify-content-between">
            <h2>${article.title}</h2>
            <i class="fa-regular fa-bookmark"></i>
        </div>
        <div class="news_body">
            <h5>${article.author}</h5>
            <h6>${article.published}</h6>
            <p>${article.content}</p>
        </div>
        <div class="news_img d-flex justify-content-center">
            <img src="${article.image}" alt="${article.alt}">
        </div>
        <div class="news_tags mt-3 d-flex gap-2">
        ${tagsMarkup}
        </div>
    </div>
    `
};


// inserisco il select in una costante
const news_selection = document.getElementById('news_selection');

// aggiungo un addEventListener('change') al select
news_selection.addEventListener('change', function(){

	// creo una variabile per leggere la value del select
	let valueType = news_selection.value;

	// svuoto l`html del container
	containerEl.innerHTML = '';
	
	// con un for loop creo un box per ogni oggetto della array
	articles.forEach(article => {
		
		// la condizione filtra i tags identici al select oppure il campo vuoto dell'opzione "Tutti i tags"
		if (valueType === '' || article.tags.includes(valueType)) {

			// richiamo la funzione per creare i box delle notizie selezionate dal select
			const articleMarkup = createMarkup(article);
			containerEl.insertAdjacentHTML("beforeend", articleMarkup);
		}
	});
	
});

// creo un array dedicata al menù select
let optionList = [];

// itero per creare le opzioni
articles.forEach(article => {
		
	// itero attraverso l'array di tag per creare un'opzione separata per ciascun tag
	article.tags.forEach(tag => {
		// creo una condizione con valore booleano opposto per stabilire se l`array contiene o meno il tipo di tag 
		if (!optionList.includes(tag)) {
			// se non lo contiene pusha nella array l'opzione
			optionList.push(tag);
			// creo l'opzione
			const optionNews = document.createElement("option");
			// scrivo dentro l'opzione
			optionNews.innerText = tag;
			// collego al mio html l'opzione appena creata
			news_selection.append(optionNews);
		}
	});
	
    // Aggiungo altri tag che non sono associati a una notizia specifica
    const additionalTags = ["politica", "sport"];

	// itero attraverso l'array di tag per creare un'opzione separata per ciascun tag
    additionalTags.forEach(tag => {
        // se non è già incluso nella array principale di opzioni dinamiche
        if (!optionList.includes(tag)) {
            // pusho la nuova opzione
            optionList.push(tag);
            // creo l'opzione
            const optionNews = document.createElement("option");
            // scrivo dentro l'opzione
            optionNews.innerText = tag;
			// collego al mio html l'opzione appena creata
            news_selection.append(optionNews);
        }
    });
});


