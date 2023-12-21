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

console.log(articles);
console.log(articles[3].title, articles[0].content);

// inserisco in una costante il container delle notizie
const containerEl = document.getElementById('site_main');

// con un'iterazione stampo gli articoli in pagina
articles.forEach(article => {
    const articleMarkup = createMarkup(article);
    containerEl.insertAdjacentHTML("beforeend", articleMarkup);
});

// con una funzione definisco il markup della news
function createMarkup(article) {
    // return del template literal precedentemente preparato
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
            <span class="badge text-bg-success p-2 fs-5">${article.tags}</span>
        </div>
    </div>
    `
    // problema imprevisto con i tags
};
