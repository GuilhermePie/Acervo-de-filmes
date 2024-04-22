// ----------------------------------------
const showGenders = ()=>{
    boxGen.classList.remove('hide')
    boxGen.classList.add('show')
}

const hideGenders = ()=>{
    boxGen.classList.remove('show')
    boxGen.classList.add('hide')
}

//show pesquisar

const showHide = ()=>{
    pesquisar.classList.toggle('showAnimation')
}

// pesquisar filmes 

const pesquisarFilme = ()=>{

    if(pesquisar.value !== ''){
        const search = `${BASE_URL}${query}${pesquisar.value}${API_KEY}&page=1`
        inserirFilme(search)
        pesquisar.value=''
    }else{
        tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
        pesquisar.value=''
    }
    
}

// criação da lista de gêneros e chamada caso um gênero seja clicado

const generos = fetch(searchList).then(response => response.json())
.then(data => {
    data.genres.forEach((gen)=>{
        boxGen.innerHTML += `<li id="${gen.id}" onclick='moviesGener(${gen.id})' class="genero">${gen.name}</li>`
    })
})
.catch(error => {
    tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
})

const moviesGener = (genId)=>{
        inserirFilme(API_URL + '&with_genres=' + genId + '&page=1')
        boxGen.classList.remove('show')
        boxGen.classList.add('hide')

}

// tranformando numeros em "porcentagens"

const voteAverage = (votes)=>{
    const votesArr = votes.toString().split('')
    const porcent = votesArr[0] + votesArr[2]
    if(votesArr[0] && votesArr[2]){
        return porcent
    }else{
        return '0'
    }
}

// verificando "porcentagem" e alterando cor 
    
const bordercolor = (porcent)=>{
    if(parseInt(porcent) > 69 ){
        return 'green'
    }else if(parseInt(porcent) <= 69 & parseInt(porcent) >= 50){
        return 'yellow'
    }else{
        return 'red'
    }  
}

// função que insere os filmes 

const inserirFilme = (url)=>{
    pre.style.display = 'grid'
    tela.style.display='none'
    setTimeout(()=>{
        tela.style.display='grid'
        pre.style.display = 'none'
    },'1000')
        currentUrl = url;
        tela.innerHTML = "";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.length <= 0 ? tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>` : data.results.map((pos)=>{tela.innerHTML += 
                `<div class="card" onclick="verify(${pos.id})">
                    <img src="https://image.tmdb.org/t/p/w500/${pos.poster_path}" alt="poster do filme" class="poster">
                    <div class="bottom-poster">
                        <div class="porcent-vote ${bordercolor(voteAverage(pos.vote_average))}">
                            <span class="num-votes">${voteAverage(pos.vote_average)}</span>
                        </div>
                        <p class="pos-title">${pos.title}</p>
                    </div>
                </div>`})
            console.log(data)
            movies = data.results
            
        })
        .catch(error => {
            tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
        })
        return url
}

inserirFilme(popular)

// verificar se o filme clicado e qual filme foi clicado

const verify = (val)=>{
    movies.forEach((mov)=>{
        if(mov.id === val){
            localStorage.setItem('idFilme', mov.id)
            window.location.href = '../movie/movie.html'
    }
})    
}

// paginação do site

const page = (num)=>{
    location.href = ("#nav")
    const urlAnterior = currentUrl.slice(0, currentUrl.length - 1)
    inserirFilme(`${urlAnterior}${num}`)
}