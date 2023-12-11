let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let moviesContainer = document.querySelector('.swwr1');

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


// Get Local Storage Data
let localStorageData = JSON.parse(localStorage.getItem('Favorit'));

if(localStorageData){
    localStorageData.forEach(ID => {
        let API = `https://api.themoviedb.org/3/movie/${ID}?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
        fetch(API)
        .then(respone => respone.json())
        .then(data => {
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw');
        let swImageContainer = document.createElement('div');
        swImageContainer.className = 'imgContainer';
        let swImage = document.createElement('img');
        swImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
        let fvDiv = document.createElement('div');
        fvDiv.setAttribute('class', 'favorate flexColumn');
        let fvIcon = document.createElement('i');
        fvIcon.setAttribute('id', data.id);
        fvIcon.setAttribute('class', 'fa-solid fa-heart no');
        fvDiv.appendChild(fvIcon);
        
        // Fav Icon Toggle
        fvIcon.addEventListener('click', function(e){
            let FavId = e.target.id;
            if(fvIcon.classList.contains('no')){
                localStorageData = localStorageData.filter(num => num !== FavId);
                localStorage.setItem('Favorit', JSON.stringify(localStorageData));
                window.location.reload();
            } 
        })
        swImageContainer.appendChild(swImage);
        swImageContainer.appendChild(fvDiv);
        swDiv.appendChild(swImageContainer);

        let desContainer = document.createElement('div');
        desContainer.className ='descreptionContainer';
        let yearp = document.createElement('p');
        yearp.className = 'year'
        let releaseDate = new Date(data.release_date);
        let releaseYear = releaseDate.getFullYear();
        yearp.textContent = releaseYear;
        desContainer.appendChild(yearp);

        let swTitle = document.createElement('h3');
        swTitle.textContent = data.title;
        desContainer.appendChild(swTitle);

        let detailsLink = document.createElement('a');
        detailsLink.setAttribute('href', '../details.html');
        detailsLink.addEventListener('click', function(){
            localStorage.setItem('details', data.id);
        })
        detailsLink.className = 'detailsBtn';
        detailsLink.textContent = 'View Details'
        desContainer.appendChild(detailsLink);

        swDiv.appendChild(desContainer)
        moviesContainer.appendChild(swDiv);
        })
    });
}else{
    console.log('empty')
    let p = document.createElement('p');
    p.textContent = 'No favorite items to display.';
    moviesContainer.appendChild(p);
}

if(localStorageData.length == 0){
    console.log('empty')
    let p = document.createElement('p');
    p.setAttribute('class', 'empty')
    p.textContent = 'No favorite items to display ...';
    moviesContainer.appendChild(p);
}