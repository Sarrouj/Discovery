let languageToggleBtn = document.querySelector('.languageToggle');
let languageMenu = document.querySelector('.languageMenu');
let menuIcon = document.querySelector('.menuIcon');
let menuContainer = document.querySelector('.menuContainer');
let trailersContainer = document.querySelector('.swwr3');
let trailerContainer = document.querySelector('.trailerContainer');

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

let exclusiveVideosUrl =  'https://api.themoviedb.org/3/movie/upcoming?api_key=354ac65aebc36d1585a2fe5d1a303b27';

fetch(exclusiveVideosUrl)
.then(Response => Response.json())
.then(data => {
    for(let i=0; i<data.results.length ; i++){
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

        let title = document.createElement('h3');
        title.className = 'sc3swTitle';
        title.textContent = data.results[i].title;

        imageContainer.addEventListener('click', ()=>{
            console.log('yes')
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

        swDiv.appendChild(imageContainer);
        swDiv.appendChild(title);
        trailersContainer.appendChild(swDiv);
    }
});
