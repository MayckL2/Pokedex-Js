let pokemonName = document.querySelector('#nome')
let pokemonNumber = document.querySelector('#numero')
let pokemonImage = document.querySelector('#imgPokemon')
let pokemonTIpo = document.querySelector('#tipo')
let pokemonStats = document.querySelector('#stats')
let pokemonAltura = document.querySelector('#altura')
let pokemonLargura = document.querySelector('#largura')
let ambiente = document.querySelector("#ambiente")
let led = document.querySelector("#led .blue")

let form = document.querySelector('form')
let input = document.querySelector('#pesquisa')
let buttonPrev = document.querySelector('#prev')
let buttonNext = document.querySelector('#next')

let searchPokemon = 1

// chama as informaçoes da API
// ASYNC para funcoes assincronas(funcoes que demoram um tempo)
const fetchPokemon = async (pokemon) => {
    // AWAIT por ser assincrona o await espera ate as informacoes vierem
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        // converte para json() para ser tratado como objeto
        const data = await APIResponse.json()
        return data
    }
}

// renderiza os pokemons na tela
const renderPokemon = async (pokemon) => {

    // enquanto estiverem sendo carregados mostrara esse texto
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    // chama o numero ou nome do pokemon
    const data = await fetchPokemon(pokemon)

    // mostrara informaçoes do pokemon na tela
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonTIpo.innerHTML = data['types']['0']['type']['name']
        mudaAmbiente(data['types']['0']['type']['name'])
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        // pokemonImage.src = data['sprites']['other']['official-artwork']['front_default']
        pokemonStats.innerHTML = data['stats']['0']['base_stat']
        pokemonLargura.innerHTML = (data.weight / 10) + ' kg'
        pokemonAltura.innerHTML = (data.height / 10) + ' m'
        input.value = ''
        searchPokemon = data.id
        led.style.animation= 'pisca 1s infinite'
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''
        led.style.animation= ''
    }
}

// muda ambiente pelo tipo do pokemon
function mudaAmbiente(tipo) {
    switch (tipo) {
        case 'normal':
            ambiente.src = 'img/route.png'
            break
        case 'fighting':
            ambiente.src = 'img/city.png'
            break
        case 'dragon':
            ambiente.src = 'img/ice.png'
            break
        case 'ghost':
            ambiente.src = 'img/cave.png'
            break
        case 'ground':
            ambiente.src = 'img/desert.png'
            break
        case 'poison':
            ambiente.src = 'img/mug.png'
            break
        case 'grass':
            ambiente.src = 'img/grass.png'
            break
        case 'rock':
            ambiente.src = 'img/caveRocks.png'
            break
        case 'steel':
            ambiente.src = 'img/cave.png'
            break
        case 'psychic':
            ambiente.src = 'img/city.png'
            break
        case 'water':
            ambiente.src = 'img/sea.png'
            break
        case 'electric':
            ambiente.src = 'img/grass.png'
            break
        case 'dark':
            ambiente.src = 'img/cave.png'
            break
        case 'fire':
            ambiente.src = 'img/vulcano.png'
            break
        case 'bug':
            ambiente.src = 'img/mug.png'
            break
        case 'fairy':
            ambiente.src = 'img/city.png'
            break

    }
}

// adiciona evento quando clicar enter renderizar pokemon
form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

// adiciona evento para mostra pokemon anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

// adiciona evento para mostra pokemon posterior
buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1
        renderPokemon(searchPokemon)

    }
})

// renderiza o primeiro pokemon quando carregar a pagina
document.querySelector("body").addEventListener("load", renderPokemon(1))