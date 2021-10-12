// Declare handle to access the unordered list to display pokemon details
let datalist_row = document.getElementsByClassName('datatlist');

// assign pokemonRepository an IIFE
let pokemonRepository = (function(){
  // An array to store pokemon objects.
  let pokemonList = [];
  // adds pokemon object to the pokemonList array
  function add(pokemon){
    pokemonList.push(pokemon);
  }
  // returns pokemonList array
  function getAll(){
    return pokemonList;
  }
  // returns handle to add and getAll functions
  return {
    add: add,
    getAll: getAll
  };
})();
let pokemon1 = {name: "Squirtle", height: 0.5, weight: 9, types: ['water']};
let pokemon2 = {name: "Beedrill", height: 1, weight: 29.5, types: ['bug','poison']};
let pokemon3 = {name: "Nidoran", height: 0.5, weight: 9, types: ['poison']};
let pokemon4 = {name: "Venomoth", height: 1.5, weight: 12.5, types: ['bug','poison']};
let pokemon5 = {name: "Meganium", height: 1.8, weight: 100.5, types: ['grass']};
pokemonRepository.add(pokemon1);
pokemonRepository.add(pokemon2);
pokemonRepository.add(pokemon3);
pokemonRepository.add(pokemon4);
pokemonRepository.add(pokemon5);
console.log(pokemonRepository.getAll());
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

(pokemonRepository.getAll()).forEach(displayPokemonNames);
