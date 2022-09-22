const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader=document.getElementById('loader');
let apiQuotes=[];
// loader
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;

}
//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;


}
//show new quotes
function newQuote() {
    loading();
    //pick a random  quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//if author is blank 
if(!quote.author){
    authorText.textContent= 'Unknown';
}
else
    {
        authorText.textContent = quote.author;
    }
//quotenlength is long

if (quote.text.length>100) {
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
//set hide quote
complete();
quoteText.textContent=quote.text;
}
//get quote from api
async function getQuotes(){
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    loading();
try {
const response =await fetch(apiUrl);
apiQuotes=await response.json();
newQuote();
} 
catch(error){
    //Catch Error Here 
}
}
//tweet quote
function tweetQuote() {
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}
//button function event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load 
getQuotes();
