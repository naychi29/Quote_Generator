const quoteHTML = document.getElementById('quote');
// console.log(quoteHTML)
const quoteAuthor = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');

let quoteData = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
const dataShow = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
let randomQuote = () => {
    loading();
    const quote = quoteData[Math.floor(Math.random() * quoteData.length)];
    // console.log(quote);
    quoteHTML.textContent = quote.text;

    if(!quote.author){
        quoteAuthor.textContent = "Anonymous";
    }else{
        quoteAuthor.textContent = quote.author;
    }
    if(quote.text.length >= 50){
        quoteHTML.classList.add('long-quote');
    }else{
        quoteHTML.classList.remove('long-quote');
    }
    dataShow();
}

newQuote.addEventListener('click', randomQuote)

async function quoteGenerator(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        quoteData = await response.json();
        console.log(quoteData);
        randomQuote();

    }catch(error){
        console.log(error);
    }
    dataShow();
}

quoteGenerator();