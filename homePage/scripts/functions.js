const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzJhMDBlYTVlN2Y5MTFhOGVmNTZjYzZjMWFkZTIyNyIsIm5iZiI6MTcxMDQ1NDQ5OC4xNiwic3ViIjoiNjVmMzc2ZTJhMzEzYjgwMTg1MjVhY2Y0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Lsjdeb0ERjOM6appCahcJyb5tQCNiXHKIIgf5C7GEGs'
    }
  };

// ----------------------------------------
const showGenders = ()=>{
    boxGen.classList.remove('hide')
    boxGen.classList.add('show')
}

const hideGenders = ()=>{
    boxGen.classList.remove('show')
    boxGen.classList.add('hide')
}

const showOrdem = ()=>{
    boxOrder.classList.remove('hide')
    boxOrder.classList.add('show')
}

const hideOrdem = ()=>{
    boxOrder.classList.remove('show')
    boxOrder.classList.add('hide')
}

//show pesquisar

const showHide = ()=>{
    pesquisar.classList.toggle('showAnimation')
}

// pesquisar filmes 

const pesquisarFilme = ()=>{

    if(pesquisar.value !== ''){
        const search = `${BASE_URL}${query}${pesquisar.value}${API_KEY}&page=1`
        inserirFilme(search , pesquisar.value , "Resultado")

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
        boxGen.innerHTML += `<li id="${gen.id}" onclick='moviesGener(${gen.id}, "${gen.name}")' class="genero">${gen.name}</li>`
    })
})
.catch(error => {
    tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
})

const moviesGener = (genId , genName)=>{
        inserirFilme(API_URL + '&with_genres=' + genId + '&page=1' , genName , "Populares" , "Populares" , "Hoje")
        boxGen.classList.remove('show')
        boxGen.classList.add('hide')
}

// pesquisando por filmes mais votados ou outros

const moviesOrder = (orderId , orderValue)=>{
    inserirFilme(BASE_URL + '/discover/movie?sort_by='+ orderId + '&' + API_KEY + '&page=1' , orderValue , "Atualmente")
    boxOrder.classList.remove('show')
    boxOrder.classList.add('hide')
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

const inserirFilme = (url, titulo , subTitle)=>{
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
                        <p>${pos.release_date}</p>
                    </div>
                </div>`})
            console.log(data)
            movies = data.results
            tituloPesquisa.innerHTML = titulo
            subTitulo.innerHTML = subTitle
        })
        .catch(error => {
            tela.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
        })
        return url
}

inserirFilme(popular , "Os mais populares" , "Hoje")

//inserir filmes tendencias

const inserirTendencia = (url, op)=>{
        fetch(url , op)
        .then(response => response.json())
        .then(data => {
            data.results.length <= 0 ? tendencies.innerHTML = `<h1 class="error">Filme não encontrado</h1>` : data.results.map((pos)=>{tendencies.innerHTML += 
                `<div class="cardInicial" onclick="verify(${pos.id})">
                    <img src="https://image.tmdb.org/t/p/w500/${pos.poster_path}" alt="poster do filme" class="poster">
                    <div class="bottom-poster">
                        <div class="porcent-vote ${bordercolor(voteAverage(pos.vote_average))}">
                            <span class="num-votes">${voteAverage(pos.vote_average)}</span>
                        </div>
                        <p class="pos-title">${pos.title}</p>
                    </div>
                </div>`})
                data.results.forEach((newMovie)=>{
                    movies.push(newMovie)
                })
        })
        .catch(error => {
            // tendencies.innerHTML = `<h1 class="error">Filme não encontrado</h1>`
        })
}

inserirTendencia('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)

// verificar se o filme clicado e qual filme foi clicado

const verify = (val)=>{
    movies.forEach((mov)=>{
        if(mov.id === val){
            localStorage.setItem('idFilme', mov.id)
            window.location.href = '../moviePage/movie.html'
    }
})    
}

// paginação do site

const page = (num)=>{
    location.href = ("#nav")
    const urlAnterior = currentUrl.slice(0, currentUrl.length - 1)
    inserirFilme(`${urlAnterior}${num}` , "Página" , `${num}`)
    allTendencies.classList.add('hide')
}