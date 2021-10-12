// Declare handle to access unordered list
let datalist_row = document.getElementsByClassName('datatlist');
// An array to store the pokemon objects. Each object has certain set of pokemon properties
let pokemonList = [];
let pokemon1 = {name: "Squirtle", height: 0.5, weight: 9, types: ['water']};
let pokemon2 = {name: "Beedrill", height: 1, weight: 29.5, types: ['bug','poison']};
let pokemon3 = {name: "Nidoran", height: 0.5, weight: 9, types: ['poison']};
let pokemon4 = {name: "Venomoth", height: 1.5, weight: 12.5, types: ['bug','poison']};
let pokemon5 = {name: "Meganium", height: 1.8, weight: 100.5, types: ['grass']};
pokemonList = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5];

console.log(pokemonList);
// function to display all the Pokemon names that accepts two args (pokemon obj and its index in the array)
function displayPokemonNames(pokemon, i) {
  let li=document.createElement('li');
  // if height is greater than 1.5, set it as special pokemon
  if(pokemon.height > 1.5){
    li.innerHTML = (i + 1) + '. '+ pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!';
    li.setAttribute("class","spl_pokemon");
  } else {
    li.innerHTML = (i +1 ) + '. '+ pokemon.name + ' (height: ' + pokemon.height + ')';
  }
  datalist_row[0].appendChild(li);
}
// for each element in the pokemonlist invoke displayPokemonNames function to display its details
pokemonList.forEach(displayPokemonNames);
