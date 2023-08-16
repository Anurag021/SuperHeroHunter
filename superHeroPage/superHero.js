var superHeroContainer = document.getElementById('superHeroContainer');
var localStorage = localStorage.getItem("superHeroPage");
var superHero = JSON.parse(localStorage.superHeroPage);

renderSuperHeroPage();

function renderSuperHeroPage() {
    console.log(superHero);
    superHeroContainer.innerHTML= "";
    addItemToList(superHero[0]);
}

function addItemToList(task) {
    
    const div = document.createElement('div');

    div.innerHTML =`
        <h2>${task.name}</h2>
        <img id="superHeroImage" src=${task.thumbnail.path}.jpg>
        <p id="Desc">Description:${task.description}</p>
        <ul id="Series">Series${seriesDetails(task.series.items)}</ul>
    `
    superHeroContainer.append(div);
}

function seriesDetails(task) {
    var li = "";
    task.forEach(e => {
       li = li.concat(`<li>${e.name}</li>`);
    });
    return li;
}