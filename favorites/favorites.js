var favoriteDataList = document.getElementById('favoriteDataList');

var localStorage = localStorage.getItem("favArray");
var favorites = JSON.parse(localStorage.favArray);

renderFavorateList();


function renderFavorateList() {
    favoriteDataList.innerHTML= "";

    favorites.forEach((task)=>{
        addItemToFav(task[0]);
    }) 
}

function addItemToFav(task) {
    const li = document.createElement('li');
    li.setAttribute("class", "listData")

    li.innerHTML =`
        <h3>${task.name}</h3>
        <div>
            <img id=${task.name} class="superImage" src=${task.thumbnail.path}.jpg>   
        </div>
    `
    favoriteDataList.append(li);
}

