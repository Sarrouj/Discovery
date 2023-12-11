let sw1Container = document.querySelector('.swwr1');
let sw2Container = document.querySelector('.swwr2');
let trailersContainer = document.querySelector('.swwr3');
let sc1Titlte = document.querySelector('.sc1Title');
let scOverview = document.querySelector('.scOverview');
let yearSpan = document.querySelector('.yearSpan');
let genreSpan = document.querySelector('.genreValue');
let sc1swiper = document.querySelector('.sc1swiper');
let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let trailerContainer = document.querySelector('.trailerContainer');

// Favoraite 
let fav = [];

// Swiper
var swiper = new Swiper(".swiperContainer", {
    slidesPerView: 4,
    spaceBetween: 5,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 5
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 5
        }
      }
  });

var scswiper = new Swiper(".sc1", {
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
});

// Get Data From API
let topRatedAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=354ac65aebc36d1585a2fe5d1a303b27';
fetch(topRatedAPI)
.then(Response => Response.json())
.then(data => {
    for(let i=0; i<10; i++){
        fetch('https://api.themoviedb.org/3/movie/'+data.results[i].id+'?language=en-US&api_key=354ac65aebc36d1585a2fe5d1a303b27')
    .then(response=>response.json()).then(detailsData =>{
        let movieDiv = document.createElement('div');
        movieDiv.setAttribute('class', 'movie swiper-slide');

        let screenWidth = window.screen.width;
        if(screenWidth > 500){
            movieDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.results[i].backdrop_path}')`;
        }else{
            movieDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.results[i].poster_path}')`;
        }

        let overlayDiv = document.createElement('div');
        overlayDiv.setAttribute('class', 'overlay')
        let divContainer = document.createElement('div');
        divContainer.className = 'container';
        let descContainer = document.createElement('div');
        descContainer.setAttribute('class', 'descriptionContainer flexColumn');
        
        let h1 = document.createElement('h1');
        h1.className = 'sc1Title';

        if(data.results[i].title.length > 100){
            h1.textContent = data.results[i].title.slice(0, 100) + '...';
        }else{
            h1.textContent = data.results[i].title;
        }
        let p = document.createElement('p');
        p.className = 'scOverview';

        if(data.results[i].overview.length > 300){
            p.textContent = data.results[i].overview.slice(0, 300) + '...';
        }else{
            p.textContent = data.results[i].overview;
        }

        let divinfo1 = document.createElement('div');
        divinfo1.className = 'info1';
        let spanyear = document.createElement('span');
        spanyear.className = 'yearSpan';

        let releaseDate = new Date(data.results[i].release_date);
        let releaseYear = releaseDate.getFullYear();
        spanyear.textContent = `${releaseYear} |`;

        let spanAge = document.createElement('span');
        spanAge.className = 'age';
        spanAge.textContent = ' +16';

        let spanMovie = document.createElement('span');
        spanMovie.textContent = ' | Movie';

        divinfo1.appendChild(spanyear);
        divinfo1.appendChild(spanAge);
        divinfo1.appendChild(spanMovie);

        let info2 = document.createElement('div');
        info2.setAttribute('class', 'info2 flexRow');

        let starDiv = document.createElement('div');
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-star');
        let starNumber = document.createElement('span');
        starNumber.className = 'starNumber';
        starNumber.textContent = ` ${data.results[i].vote_average.toFixed(1)}`;

        starDiv.appendChild(icon);
        starDiv.appendChild(starNumber);

        info2.appendChild(starDiv);

        let GenreDiv = document.createElement('div');
        GenreDiv.className = 'Genre';
        GenreDiv.textContent = 'Genre : ';
        let genreSpan = document.createElement('span');
        genreSpan.className = 'genreValue';
        genreSpan.textContent = detailsData.genres[0].name;

        GenreDiv.appendChild(genreSpan);
        info2.appendChild(GenreDiv);

        let btnDiv = document.createElement('button');
        btnDiv.className = 'trailerBtn';

        let playIcon = document.createElement('i');
        playIcon.setAttribute('class', 'fa-solid fa-play');
        btnDiv.appendChild(playIcon);

        let btnContent = document.createTextNode('WASH TRAILER');
        btnDiv.appendChild(btnContent);

        btnDiv.addEventListener('click', ()=>{
        console.log('done');
            let trailerAPI = `https://api.themoviedb.org/3/movie/${data.results[i].id}/videos?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
            fetch(trailerAPI)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(data => {
                   if(trailerContainer.children.length >= 1){
                    trailerContainer.children.remove();
                   }else{
                    if(data.name == 'Official Trailer'){
                        vdKey = data.key;
                        let overlay = document.createElement('div');
                        overlay.className = 'overlaytr';
                        let iframe = document.createElement('iframe');
                        iframe.setAttribute('src', `https://www.youtube.com/embed/${vdKey}?autoplay=1`);
                        iframe.setAttribute('allow', 'autoplay; encrypted-media');
                        overlay.appendChild(iframe);
                        trailerContainer.appendChild(overlay);
                        // Remove Trailer
                        let overlaytr = document.querySelector('.overlaytr');
                        overlaytr.addEventListener('click', function(){
                           overlaytr.remove();
                        })
                    }
                   }
                });
            })
        })

        descContainer.appendChild(h1);
        descContainer.appendChild(p);
        descContainer.appendChild(divinfo1);
        descContainer.appendChild(info2);
        descContainer.appendChild(btnDiv);

        divContainer.appendChild(descContainer);

        movieDiv.appendChild(overlayDiv);
        movieDiv.appendChild(divContainer);
        sc1swiper.appendChild(movieDiv);
    })}
    scswiper.update();
})

setInterval(() => {
    scswiper.slideNext(); // Go to the next slide
}, 4000);


let popularUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=354ac65aebc36d1585a2fe5d1a303b27';
fetch(popularUrl)
.then(Response => Response.json())
.then(data => {
    for(let i=1; i < 10; i++){
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
        sw2Container.appendChild(swDiv);
    }
});

let NewArrivalUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=354ac65aebc36d1585a2fe5d1a303b27';
fetch(NewArrivalUrl)
.then(Response => Response.json())
.then(data => {
    for(let i=1; i < 10; i++){
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw swiper-slide');
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
        sw1Container.appendChild(swDiv);
    }
});

let exclusiveVideosUrl =  'https://api.themoviedb.org/3/movie/upcoming?api_key=354ac65aebc36d1585a2fe5d1a303b27';

fetch(exclusiveVideosUrl)
.then(Response => Response.json())
.then(data => {
    for(let i=1; i<10 ; i++){
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw swiper-slide');
        let imageContainer = document.createElement('div');
        imageContainer.className ='imageContainer';
        let img = document.createElement('img');
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`);
        imageContainer.appendChild(img);
        let overlay = document.createElement('div');
        overlay.className = 'overlay';
        imageContainer.appendChild(overlay);
        let divicon = document.createElement('div');
        divicon.setAttribute('class', 'iconPlay flexColumn');
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-play');

        imageContainer.addEventListener('click', ()=>{
            let trailerAPI = `https://api.themoviedb.org/3/movie/${data.results[i].id}/videos?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
            fetch(trailerAPI)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(data => {
                   if(trailerContainer.children.length >= 1){
                    trailerContainer.children.remove();
                   }else{
                    if(data.name == 'Official Trailer'){
                        vdKey = data.key;
                        let overlay = document.createElement('div');
                        overlay.className = 'overlaytr';
                        let iframe = document.createElement('iframe');
                        iframe.setAttribute('src', `https://www.youtube.com/embed/${vdKey}?autoplay=1`);
                        iframe.setAttribute('allow', 'autoplay; encrypted-media');
                        overlay.appendChild(iframe);
                        trailerContainer.appendChild(overlay);
                        // Remove Trailer
                        let overlaytr = document.querySelector('.overlaytr');
                        overlaytr.addEventListener('click', function(){
                           overlaytr.remove();
                        })
                    }
                   }
                });
            })
        })

        divicon.appendChild(icon);
        imageContainer.appendChild(divicon);

        let title = document.createElement('h3');
        title.className = 'sc3swTitle';
        title.textContent = data.results[i].title;

        swDiv.appendChild(imageContainer);
        swDiv.appendChild(title);
        trailersContainer.appendChild(swDiv);
    }
});

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
