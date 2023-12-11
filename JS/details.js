let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let movieTitle = document.querySelector('.movieTitle');
let year = document.querySelector('.year');
let movieImg = document.querySelector('.movieImg');
let rateNumber = document.querySelector('.rateNumber');
let description = document.querySelector('.description');
let genres = document.querySelector('.genreValue');
let statusValue = document.querySelector('.statusValue');
let language = document.querySelector('.languageValue');
let relatedContainer = document.querySelector('.swwr2');
let trailerContainer = document.querySelector('.trailerContainer');
let play = document.querySelector('.play');
let time = document.querySelector('.time');
let proValue = document.querySelector('.proValue');

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


let DetailsID = localStorage.getItem('details');
console.log(DetailsID)
let detailsAPI = `https://api.themoviedb.org/3/movie/${DetailsID}?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
fetch(detailsAPI)
.then(response => response.json())
.then(data => {
  console.log(data);
  // top Side
  let runTime = data.runtime;
  let getHour = Math.floor(runTime/60);
  let getMinutes = runTime%60;
  time.textContent = `${getHour}h ${getMinutes}min |`;
  
  movieTitle.textContent =  data.title;
  let releaseDate = new Date(data.release_date);
  let releaseYear = releaseDate.getFullYear();
  year.textContent = `${releaseYear} | `;
  movieImg.setAttribute('src', `https://image.tmdb.org/t/p/original${data.poster_path}`)
  rateNumber.textContent = data.vote_average.toFixed(1);
  description.textContent = data.overview;
  genres.textContent = data.genres.length > 2 ? `${data.genres[0].name}, ${data.genres[1].name}, ${data.genres[2].name}` : data.genres.length > 1 ? `${data.genres[0].name}, ${data.genres[1].name}` : data.genres[0].name;
  statusValue.textContent = data.status;
  language.textContent = data.spoken_languages[0].name;
  proValue.textContent = data.production_countries[0].name
})


let similarAPI = `https://api.themoviedb.org/3/movie/${DetailsID}/similar?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
fetch(similarAPI)
.then(Response => Response.json())
.then(data => {
    for(let i=1; i < similarAPI.length; i++){
        if(data.results[i].poster_path !== null){
        let swDiv = document.createElement('div');
        swDiv.setAttribute('class', 'sw swiper-slide');
        let swImageContainer = document.createElement('div');
        swImageContainer.className = 'imgContainer';
        let swImage = document.createElement('img');
        swImage.setAttribute('src', `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`);
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
        relatedContainer.appendChild(swDiv);
        }
    }
});

// trailer
play.addEventListener('click', ()=>{
  let trailerAPI = `https://api.themoviedb.org/3/movie/${DetailsID}/videos?api_key=354ac65aebc36d1585a2fe5d1a303b27`;
  fetch(trailerAPI)
  .then(response => response.json())
  .then(data => {
      data.results.forEach(data => {
         if(trailerContainer.children.length >= 1){
          trailerContainer.children.remove();
         }else{
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
      });
  })
})
