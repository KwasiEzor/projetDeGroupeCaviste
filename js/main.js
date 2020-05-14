// Définition des constantes et autres variables
const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php/api';
const picturesURL = 'http://localhost/projetDeGroupeCaviste/img/pics';
const winesApiUrl ='http://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines'; 
let wines;
window.onload = function(){
    const options = {
        'method':'GET',
        'async':true
    }
    // fetch(apiURL +'/wines',options.method)
    // .then(function(response){
    //     if(response.ok){
    //         response.json().then(function(data){
    //             wines = data;
    //             //Affichage des vins sous forme de liste
    //             loadWinesList(wines);
    //         });
    //     }
      
    // });
    const xhr = new XMLHttpRequest();
    xhr.open(options.method,winesApiUrl,options.async);
    xhr.onload = function(){
        if(this.status==200){
            let data = xhr.responseText;
            wines = JSON.parse(data);
            console.log(wines);
            // Afficher la liste des vins
            let listUL = document.getElementById('liste');
            console.log(listUL);
            let outputLIs = '';
           for(let index in wines){
            let idWine = index;
        
            outputLIs += '<li data-id="'+idWine+'" class="list-group-item">'+wines[index].name+'</li>';
           }
          
         listUL.innerHTML = outputLIs;
        
    // Récupération de tous les LIs
    let nodeLIs = listUL.getElementsByTagName('li');
    // Ajout d'un gestionnaire d'évènement sur chaque LI

    for(let li of nodeLIs){
        li.addEventListener('click',function(){
            getWine(this.dataset.id,wines);
        })
    }
            
        }
    }
    xhr.send();
    // Récupération de tous les boutons d'actions
    let btSearch = this.document.getElementById('inputSearch');
    console.log(btSearch);

}
 
function loadWinesList(wines){
    let listUL = document.getElementById('liste');
            console.log(listUL);
            let outputLIs = '';
           for(let index in wines){
            let idWine = index;
        
            outputLIs += '<li data-id="'+idWine+'" class="list-group-item">'+wines[index].name+'</li>';
           }
          
         listUL.innerHTML = outputLIs;
        
    // Récupération de tous les LIs
    let nodeLIs = listUL.getElementsByTagName('li');
    // Ajout d'un gestionnaire d'évènement sur chaque LI

    for(let li of nodeLIs){
        li.addEventListener('click',function(){
            getWine(this.dataset.id,wines);
        })
    }
}

function getWine(id,wines){
    let wine = wines.find(wine => wine.id== id);
    let input= document.getElementById('idWine');
    input.value = wine.id;

    input = document.getElementById('name');
    input.value = wine.name;

    input = document.getElementById('grapes');
    input.value = wine.grapes;

    input = document.getElementById('country');
    input.value = wine.country;

    input = document.getElementById('region');
    input.value = wine.region;

    input = document.getElementById('price');
    input.value = wine.price;

    input = document.getElementById('year');
    input.value = wine.year;

    input = document.getElementById('capacity');
    input.value = wine.capacity;

    input = document.getElementById('color');
    input.value = wine.color;

    input = document.getElementById('extra');
    input.value = wine.extra;

    let imgWine = document.getElementById('imgWine');
    imgWine.src = wine.picture != ''
     ? picturesURL + wine.picture
     : 'images/pics/No_picture_available.png';
     imgWine.alt = wine.picture;
}
// Rechercher du vin
function searchWine(){
    let searchInput = document.getElementById('inputSearch');
    let keyword = searchInput.value;
    const expression = new RegExp(keyword,'i');
    // let filteredWines = wines.filter(wine => wine.name && wine.name.search(expression) != -1);
    // loadWinesList(filteredWines);
}
let btSearchWines = document.getElementById('btSearchWine');
btSearchWines.onclick = function(){
    searchWine();
}
/**Charts JS **/
let chartBox = document.getElementById('chartBox');
let ctx = document.getElementById('draw').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});