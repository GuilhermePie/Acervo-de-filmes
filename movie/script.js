const container = document.getElementById('container')
const idFilme = localStorage.getItem('idFilme')
const infosExtra = document.getElementById('infos-extra')
const castList = document.getElementById('cast-list')
const load = document.getElementById('pre-load')
const boxInfosExtra = document.getElementById('box-infos-extra')

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzJhMDBlYTVlN2Y5MTFhOGVmNTZjYzZjMWFkZTIyNyIsInN1YiI6IjY1ZjM3NmUyYTMxM2I4MDE4NTI1YWNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT1h9o4v5SstORl1rf8tY4LyjJYNFKpey__SfBfE6jY'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`, options)
    .then(response => response.json())
    .then(response => {
        createBanner(response) 
        console.log(response)})
    .catch(err => console.error(err));

const createBanner = (infos)=>{
    boxInfosExtra.style.display = 'none'
    load.style.display = 'flex'
    container.style.display ='none'

    setTimeout(()=>{
        load.style.display = 'none'
        container.style.display ='flex'
        boxInfosExtra.style.display = 'flex'
    },'1500')

    const generesArr = []

    infos.genres.forEach(genero => {
       generesArr.push(` ${genero.name}`) 
    });

    const converter = (minutos) => {
        const horas = Math.floor(minutos/ 60);          
        const min = minutos % 60;
        const textoHoras = (`0${horas}h`);
        const textoMinutos = (`0${min}`).slice(-2);
        
        return `${textoHoras }${textoMinutos}`;
      };
    
    const voteAverage = (votes)=>{
        const votesArr = votes.toString().split('')
        const porcent = votesArr[0] + votesArr[2]
        if(votesArr[0] && votesArr[2]){
            return porcent
        }else{
            return '0'
        }
    }

    const bordercolor = (porcent)=>{
        if(parseInt(porcent) > 69 ){
            return 'green'
        }else if(parseInt(porcent) <= 69 & parseInt(porcent) >= 50){
            return 'yellow'
        }else{
            return 'red'
        }  
    }
      
    const releaseDate = infos.release_date.substring(0,4)
    function reverseString(str) {
        return str.split('-').reverse().join('/');
    }

    const pictureCheck = (str)=>{
        if(str === null){
            return '../images/pessoas.png'
        }

        return `https://media.themoviedb.org/t/p/w138_and_h175_face${str}`
    }

    const cast = fetch(`https://api.themoviedb.org/3/movie/${infos.id}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.cast.forEach((cast)=>{
           castList.innerHTML += `<li class="cast-box">
                    <img class="cast-img" src="${pictureCheck(cast.profile_path)}">
                    <div class="cast-infos">
                        <p class="actor"><strong>${cast.name}</strong></p>
                        <p class="character">${cast.character}</p>
                    </div>
                </li>`
        })
    })
    .catch(err => console.error(err));

    document.title = `${infos.title} ${releaseDate}`
    container.innerHTML = 
    `<div id="box">
        <img id="poster-filme" src="https://image.tmdb.org/t/p/w500/${infos.poster_path}">
        <div id="sub-box">
            <section id="infos-filme">
                <h2 class="nome-filme">${infos.title} <span class="release-date">(${releaseDate})</span></h2>
                <ul class="sub-infos">
                    <li>Data: ${reverseString(infos.release_date)}</li>
                    <li>Gêneros: ${generesArr}</li>
                    <li>Duração: ${converter(infos.runtime)}</li>
                </ul>
                <h3 class="tagline">${infos.tagline}</h3>
                <div class='classificacao'>
                    <div class="porcent-vote ${bordercolor(voteAverage(infos.vote_average))}">
                        <span class="num-votes">${voteAverage(infos.vote_average)}</span>
                    </div>
                    <p class='geral'>Classificação geral dos espectadores</p>
                </div>
                <h4>Sinopse</h4>
                <p class="desc-filme">${infos.overview} </p>
            
            </section>
            <a class="homepage-btn" target="_blank" href="${infos.homepage}" >Home page</a>
        </div>
    </div>`

infosExtra.innerHTML = `
            <p class="p-box"><strong>Título original</strong> ${infos.original_title}</p>
            <p class="p-box"><strong>Estado</strong> ${infos.status}</p>
            <p class="p-box"><strong>Idioma</strong> ${infos.original_language}</p>
            <p class="p-box"><strong>Orçamento</strong>$${infos.budget}</p>
            <p class="p-box"><strong>Bilheteria</strong>$${infos.revenue}</p>
`
}