let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let moviesContainer = document.querySelector('.swwr1');
let searchInput = document.getElementById('search');
let genresSelect = document.getElementById('type');
let searchContainer = document.querySelector('.searchContainer');
console.log(searchContainer)

// Favoraite 
let fav = [];

// Toggle Language Menu
languageToggleBtn.addEventListener('click', function(){
    if(languageMenu.classList.contains('active')){
        languageMenu.classList.remove('active')
    }else{
        languageMenu.classList.add('active')
    }
})

// Toggle Menu
menuIcon.addEventListener('click', ()=>{
    if(menuIcon.classList.contains('displayMenu')){
        menuIcon.classList.remove('displayMenu');
    }else{
        menuIcon.classList.add('displayMenu');
    }

    if(menuContainer.classList.contains('display')){
        menuContainer.classList.remove('display');
    }else{
        menuContainer.classList.add('display');
    }
})


searchInput.addEventListener('keyup', function(){
    if(moviesContainer.children.length > 0){
        let movies = document.querySelectorAll('.sw');
        movies.forEach((movie)=>{
            movie.remove();
        })
        display();
    }else{
        display();
    }
})

// request function
function display(){
    let searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=354ac65aebc36d1585a2fe5d1a303b27';
    let movieTitle = searchInput.value;
    let requestAPI = `${searchAPI}&query=${movieTitle}`;
    fetch(requestAPI)
    .then(Response => Response.json())
    .then(data =>{
        for(let i=0; i < data.results.length; i++){
            if(data.results[i].poster_path !== null){
            let swDiv = document.createElement('div');
            swDiv.setAttribute('class', 'sw swiper-slide');
            let swImageContainer = document.createElement('div');
            swImageContainer.className = 'imgContainer';
            let swImage = document.createElement('img');
            swImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);
            let fvDiv = document.createElement('div');
            fvDiv.setAttribute('class', 'favorate flexColumn');
            let fvIcon = document.createElement('i');
            fvIcon.setAttribute('class', 'fa-regular fa-heart yes');
            fvIcon.setAttribute('id', data.results[i].id);
            fvDiv.appendChild(fvIcon);
    
            // IF there's Data in Local Storage make icon fa-solid
            let LocalData = localStorage.getItem('Favorit');
            if(LocalData){
                d = JSON.parse(LocalData)
                d.forEach((ID)=>{
                    if(fvIcon.id == ID){
                        fvIcon.classList.remove('fa-regular', 'fa-heart', 'yes');
                        fvIcon.classList.add('fa-solid', 'fa-heart', 'no');
                        fav.push(ID);
                    }
                })
            }
    
            // Fav Icon Toggle
            fvIcon.addEventListener('click', function(e){
                let FavId = e.target.id;
                console.log(FavId)
                if(fvIcon.classList.contains('yes')){
                    fvIcon.classList.remove('fa-regular', 'fa-heart', 'yes');
                    fvIcon.classList.add('fa-solid', 'fa-heart', 'no');
                    fav.push(FavId);
                    localStorage.setItem('Favorit', JSON.stringify(fav))
                } else if(fvIcon.classList.contains('no')){
                    fvIcon.classList.remove('fa-solid', 'fa-heart', 'no');
                    fvIcon.classList.add('fa-regular', 'fa-heart', 'yes');
                    fav.forEach((data)=>{
                        if(data == FavId){
                            fav = fav.filter(num => num !== data);
                            localStorage.setItem('Favorit', fav)
                        }
                    })
                }
            })
            swImageContainer.appendChild(swImage);
            swImageContainer.appendChild(fvDiv);
            swDiv.appendChild(swImageContainer);
    
            let desContainer = document.createElement('div');
            desContainer.className ='descreptionContainer';
            let yearp = document.createElement('p');
            yearp.className = 'year'
            let releaseDate = new Date(data.results[i].release_date);
            let releaseYear = releaseDate.getFullYear();
            yearp.textContent = releaseYear;
            desContainer.appendChild(yearp);
    
            let swTitle = document.createElement('p');
            swTitle.textContent = data.results[i].title;
            desContainer.appendChild(swTitle);
    
            let detailsLink = document.createElement('a');
            detailsLink.setAttribute('href', '../details.html');
            detailsLink.addEventListener('click', function(){
                localStorage.setItem('details', data.results[i].id);
            })
            detailsLink.className = 'detailsBtn';
            detailsLink.textContent = 'View Details'
            desContainer.appendChild(detailsLink);
    
            swDiv.appendChild(desContainer)
            moviesContainer.appendChild(swDiv);
            }
        }
    })
}
// Display Genre
let genresApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=354ac65aebc36d1585a2fe5d1a303b27';
fetch(genresApi)
.then(Response => Response.json())
.then(data => {
    let genrsIDs = [];
    for(let i=0; i < data.genres.length; i++){
        let option = document.createElement('option');
        option.setAttribute('id', data.genres[i].id);
        option.setAttribute('value', data.genres[i].id);
        option.textContent = data.genres[i].name;
        genresSelect.appendChild(option);
        genrsIDs.push(data.genres[i].id);
    }

    if(genresSelect.value == 'all'){
        genrsIDs.forEach((id)=>{
            displayByGenre(id)
        })
    }

    searchInput.addEventListener('keyup', function(){
        if(searchInput.value == ''){
            genrsIDs.forEach((id)=>{
                displayByGenre(id)
            })
        }
    })

    genresSelect.addEventListener('change', function(){
        if(moviesContainer.children.length > 0){
            let movies = document.querySelectorAll('.sw');
            movies.forEach((movie)=>{
                movie.remove();
            })
            if(genresSelect.value == 'all'){
                genrsIDs.forEach((id)=>{
                    displayByGenre(id)
                })
            }else{
                displayByGenre(genresSelect.value);
            }
        }else{
            displayByGenre(genresSelect.value);
        }
    })
})

function displayByGenre(id){
    let selectedGenreId = id;
    let moviesByGenreAPI = `https://api.themoviedb.org/3/discover/movie?api_key=354ac65aebc36d1585a2fe5d1a303b27&with_genres=${selectedGenreId}`;

    fetch(moviesByGenreAPI)
    .then(response => response.json())
    .then(data => {
   for(let i=0; i < data.results.length; i++){
        if(data.results[i].poster_path !== null){
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw swiper-slide');
        let swImageContainer = document.createElement('div');
        swImageContainer.className = 'imgContainer';
        let swImage = document.createElement('img');
        swImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);
        let fvDiv = document.createElement('div');
        fvDiv.setAttribute('class', 'favorate flexColumn');
        let fvIcon = document.createElement('i');
        fvIcon.setAttribute('class', 'fa-regular fa-heart yes');
        fvIcon.setAttribute('id', data.results[i].id);
        fvDiv.appendChild(fvIcon);

        // IF there's Data in Local Storage make icon fa-solid
        let LocalData = localStorage.getItem('Favorit');
        if(LocalData){
            d = JSON.parse(LocalData)
            d.forEach((ID)=>{
                if(fvIcon.id == ID){
                    fvIcon.classList.remove('fa-regular', 'fa-heart', 'yes');
                    fvIcon.classList.add('fa-solid', 'fa-heart', 'no');
                    fav.push(ID);
                }
            })
        }

        // Fav Icon Toggle
        fvIcon.addEventListener('click', function(e){
            let FavId = e.target.id;
            console.log(FavId)
            if(fvIcon.classList.contains('yes')){
                fvIcon.classList.remove('fa-regular', 'fa-heart', 'yes');
                fvIcon.classList.add('fa-solid', 'fa-heart', 'no');
                fav.push(FavId);
                localStorage.setItem('Favorit', JSON.stringify(fav))
            } else if(fvIcon.classList.contains('no')){
                fvIcon.classList.remove('fa-solid', 'fa-heart', 'no');
                fvIcon.classList.add('fa-regular', 'fa-heart', 'yes');
                fav.forEach((data)=>{
                    if(data == FavId){
                        fav = fav.filter(num => num !== data);
                        localStorage.setItem('Favorit', fav)
                    }
                })
            }
        })
        swImageContainer.appendChild(swImage);
        swImageContainer.appendChild(fvDiv);
        swDiv.appendChild(swImageContainer);

        let desContainer = document.createElement('div');
        desContainer.className ='descreptionContainer';
        let yearp = document.createElement('p');
        yearp.className = 'year'
        let releaseDate = new Date(data.results[i].release_date);
        let releaseYear = releaseDate.getFullYear();
        yearp.textContent = releaseYear;
        desContainer.appendChild(yearp);

        let swTitle = document.createElement('p');
        swTitle.textContent = data.results[i].title;
        desContainer.appendChild(swTitle);

        let detailsLink = document.createElement('a');
        detailsLink.setAttribute('href', '../details.html');
        detailsLink.addEventListener('click', function(){
            localStorage.setItem('details', data.results[i].id);
        })
        detailsLink.className = 'detailsBtn';
        detailsLink.textContent = 'View Details'
        desContainer.appendChild(detailsLink);

        swDiv.appendChild(desContainer)
        moviesContainer.appendChild(swDiv);
        }
    }
})
}



// Display Section Image
let searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=354ac65aebc36d1585a2fe5d1a303b27';
let movieTitle = searchInput.value;
let requestAPI = `${searchAPI}&query=${movieTitle}`;
fetch(requestAPI)
.then(Response => Response.json())
.then(data =>{
    console.log(data.results)
})