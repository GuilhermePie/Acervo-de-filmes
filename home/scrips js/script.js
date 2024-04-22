const tela = document.getElementById('box')
const footer = document.getElementById('footer')
const boxGen = document.getElementById('gender-list')
const boxAllGeneres = document.getElementById('box-all-generes')
const pesquisar = document.getElementById('pesquisar')
const textGender = document.getElementById('text-gender')
const pre = document.getElementById('pre-load')

const popular = 'https://api.themoviedb.org/3/movie/popular?api_key=3c2a00ea5e7f911a8ef56cc6c1ade227&page=1';
const API_KEY = "&api_key=3c2a00ea5e7f911a8ef56cc6c1ade227"
const BASE_URL =  'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const query = '/search/movie?query='
const searchList = BASE_URL + '/genre/movie/list?' + API_KEY

const generoSelecionado = []

var movies = []
var currentUrl = ''

footer.innerHTML = 
    `<ul class="list-buttons">
        <li class="item" onclick='page(1)'>1</li>
        <li class="item" onclick='page(2)'>2</li>
        <li class="item" onclick='page(3)'>3</li>
        <li class="item" onclick='page(4)'>4</li>
        <li class="item" onclick='page(5)'>5</li>
    </ul>` 

