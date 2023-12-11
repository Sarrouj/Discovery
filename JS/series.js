let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let moviesContainer = document.querySelector('.swwr1');

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

let NewArrivalUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=354ac65aebc36d1585a2fe5d1a303b27';
fetch(NewArrivalUrl)
.then(Response => Response.json())
.then(data => {
    console.log(data)
    for(let i=1; i < data.results.length; i++){
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw');
        let swImageContainer = document.createElement('div');
        swImageContainer.className = 'imgContainer';
        let swImage = document.createElement('img');
        swImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);
        let fvDiv = document.createElement('div');
        fvDiv.setAttribute('class', 'favorate flexColumn');
        let fvIcon = document.createElement('i');
        fvIcon.setAttribute('id', data.results[i].id);
        fvIcon.setAttribute('class', 'fa-regular fa-heart yes');
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
            console.log('y')
            if(fvIcon.classList.contains('yes')){
                fvIcon.classList.remove('fa-regular', 'fa-heart', 'yes');
                fvIcon.classList.add('fa-solid', 'fa-heart', 'no');
                fav.push(FavId);
                localStorage.setItem('Favorit', JSON.stringify(fav))
            } else if(fvIcon.classList.contains('no')){
                fvIcon.classList.remove('fa-solid', 'fa-heart', 'no');
                fvIcon.classList.add('fa-regular', 'fa-heart', 'yes');
                console.log('yep')
                console.log(fav)
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
        let releaseDate = new Date(data.results[i].first_air_date);
        let releaseYear = releaseDate.getFullYear();
        yearp.textContent = releaseYear;
        desContainer.appendChild(yearp);

        let swTitle = document.createElement('h3');
        swTitle.textContent = data.results[i].name;
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
});
