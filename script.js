const API_KEY = "7016e13976c444e58d47d62de5f855ff";
const URL1 = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews('India'));

async function fetchNews(query) {
    const res = await fetch(`${URL1} ${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
function reload(){
    window.location.reload();

}

function bindData(articles) {
    console.log("bindData called");
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    // Reset the container to remove previous cards
    cardsContainer.innerHTML = '';

    articles.forEach(element => {
        if (!element.urlToImage)
            return;//if there are no images then do not show

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, element);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsAddress = cardClone.querySelector("#news-address");
    const newsImage = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImage.src = article.urlToImage;
    // newsAddress.href=article.url;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.innerHTML = `${article.source.name} . ${date} `;
    cardClone.querySelector("#card").addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let currSelectedNav=null;
function navItemSearch(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');



}


function searchText(){
    const searchInput=document.getElementById("search-input");
    if(!searchInput.value) return;
    fetchNews(searchInput.value);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;
}