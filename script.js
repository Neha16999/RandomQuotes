const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//To Show LoadingSpinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//To Hide LoadingSpinner and show quote
function showQuote(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://hidden-dawn-73318.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response=await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //If author is not known, we need to use anonymous.
        if (data.quoteAuthor === '')
        {
            authorText.innerText = 'Anonymous'
        }
        else
        {
            authorText.innerText = data.quoteAuthor;

        }
        // To reduce font size for longer statements
        if (data.quoteText.length > 120)
        {
            quoteText.classList.add('long-quote')
        }
        quoteText.innerText = data.quoteText;
        //Stop loader, show quote
        showQuote(); 


    }catch (error){
        getQuote();
        //console.log('Whoops, no quote', error);
    }
}

//TweetQuote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl, '_blank');
}    

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onload
getQuote();
