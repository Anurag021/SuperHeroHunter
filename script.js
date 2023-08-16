// var MD5 = require("crypto-js/md5"); --> not working in browser
let searchData =[];
let favorites =[];
var displayItemList = document.getElementById('displayItem');
var search = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var searchParam ="";

document.addEventListener('click', clickHandler);

// ClickHandler Function
function clickHandler(e) {
    const target = e.target;

    if(target.className == "favImg"){
        addTofavorites(target.id);
    }

    if (target.className == "superImage") {
        forSuperHeropage(target.id);
    }
}
// On click event for search Button
searchBtn.addEventListener('click', ()=>{
    searchParam = "name="+search.value+"&";
    fetchSuperHeorData();
})

// updating data into local storage for Favorite Page
function addTofavorites(name) {
    const data = searchData.data.results;
    var filterData = data.filter(function (task) {
        return task.name.includes(name);
    })
    
    //giving error on the first run in web page (hence eleminated)
    // localStorage = localStorage.getItem("favArray");
    // favorites = JSON.parse(localStorage.favArray);

    favorites.push(filterData);
    localStorage.setItem("favArray", JSON.stringify(favorites));

    
}



// Main Page Functions
function renderList() {
    displayItemList.innerHTML = "";
    searchData.data.results.forEach((task)=>{
        addItemToList(task);
    })
}

function fetchSuperHeorData() {
    const url = getHashedUrl();

    fetch(url)
    .then(res => res.json())
    .then(data =>{

        searchData = data;
        renderList();
    })
    .catch(err =>{
        console.log("Got Error fetching Marvel Data ",err);
        return;
    })
}

function addItemToList(task) {
    const li = document.createElement('li');
    li.setAttribute("class", "listData")

    li.innerHTML =`
        <h3>${task.name}</h3>
        <div>
        <a href="/superHeroPage/superHero.html">
            <img id=${task.name} class="superImage" src=${task.thumbnail.path}.jpg>
        </a>    
            <img id=${task.name} class="favImg" src="./Images/favIcon.png">
        </div>
    `
    displayItemList.append(li);
}

function getHashedUrl() {

    const url = "https://gateway.marvel.com:443/v1/public/characters"
    const publicKey ="283e21e3c6ab9f0094af1ce2f9c6f21a"

    const hashKey = '73ec1c6db1c2cf36af08fe25f2e708bb';
    const newUrl = `${url}?${searchParam}ts=1&apikey=${publicKey}&hash=${hashKey}`
    return newUrl;
}

// updating data into local storage for super-heropage
function forSuperHeropage(name) {
    const data = searchData.data.results;
    var filterData = data.filter(function (task) {
        return task.name.includes(name);
    })
    localStorage.setItem("superHeroPage", JSON.stringify(filterData));
}

fetchSuperHeorData();