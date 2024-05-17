
let pokemones = [];
let pokemonesSecond = [];
let contador = 0;

document.getElementById('leyenda').style.display = 'none';
document.getElementById('desocultar').style.display = 'none';

/* ----------------------------------------------------------------------------------- btnReset ------------ */

function remove(){
    document.getElementById('ocultar').style.display = 'block';
    document.getElementById('leyenda').style.display = 'none';
    document.getElementById('desocultar').style.display = 'none';

    document.getElementById('pokemon-container').innerHTML ='';
    pokemones = [];
    contador = 0;
}

/* ----------------------------------------------------------------------------------- resetSprite ------------ */

function removeOne(){
    document.getElementById('pokemon-container').removeChild(this);
}

/* ----------------------------------------------------------------------------------- btnBuscar ------------ */

function btnBuscar(){
    contador++;

    if(contador <= 3){
        const pokemonName = document.getElementById('poke').value;
        displayPokemon(pokemonName);
    } else {
        document.getElementById('ocultar').style.display = 'none';
        document.getElementById('leyenda').style.display = 'block';
        document.getElementById('desocultar').style.display = 'block';
        swal('¡Equipo completo!', 'Dale reset para agregar más (?)', 'info');
    }
}

function mostrarPokemon(){
    const removeee = document.getElementById('regreat');
    removeee.onclick = remove;

    const container = document.getElementById('pokemon-container');
    const element = document.createElement('div');
    element.onclick = removeOne;
    element.classList.add('flexo');

    pokemones.forEach((pokemon) => {
        element.innerHTML += `
        <div>
            <div>
                <img src=${pokemon.sprites.front_default}>
            <div>
        <div>
        `;
        container.appendChild(element);
    });
}

async function displayPokemon(pokemonName){
    const pokemon = await getPokemon(pokemonName);
    pokemones.push(pokemon);
    pokemonesSecond.push(pokemon);
    mostrarPokemon(pokemon);
}

/* ----------------------------------------------------------------------------------- btnHistorial ------------ */

function btnBuscar2(){
    const pokemonName2 = document.getElementById('poke').value;
    displayPokemon2(pokemonName2);
}

function mostrarHistorial(){
    const container2 = document.getElementById('historial-container');
    
    const element2 = document.createElement('div');
    element2.classList.add('pokemones-historial-contenedor');

    pokemonesSecond.forEach((pokemon) => {
        element2.innerHTML += `
            <strong>Nombre:</strong> ${pokemon.name}
            <img src=${pokemon.sprites.front_default}>
            <strong>ㅤ</strong>
        `;
        container2.appendChild(element2);
    });
}

async function displayPokemon2(pokemonName2){
    const pokemon2 = await getPokemon(pokemonName2);
    mostrarHistorial(pokemon2);
}

/* ----------------------------------------------------------------------------------- json ------------ */

async function getPokemon(pokemonName){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.json();
}