// Declare handles to access the unordered list and seach field name
let datalist_row = document.getElementsByClassName('datatlist');
let searchName = document.getElementById('search_name');

// assign pokemonRepository an IIFE
let pokemonRepository = (function(){
  // An array to store pokemon objects.
  let pokemonList = [];
  let validkeys = {name: "Pokemonname", height: 0.0, weight: 0, types: []};
  // adds pokemon object to the pokemonList array
  function add(pokemon){
    // check if its an object and has all the required properties/keys
    if(typeof(pokemon) === 'object'){
      if(Object.keys(validkeys).every((property) => property in pokemon )) {
        pokemonList.push(pokemon);
        return 'success';
      }else {
        return 'property_failure';
      }
    }else {
      return  'type_failure';
    }
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

// function to display all the Pokemon names that accepts two args (pokemon obj and its index in the array)
function displayPokemonNames(pokemon, i) {
  let li=document.createElement('li');
  // if height is greater than 1.5, set it as special pokemon
  if(pokemon.height > 1.5){
    li.innerHTML = (i + 1) + '. '+ pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!';
    li.setAttribute("class","spl_pokemon");
  } else {
    li.innerHTML = (i + 1) + '. '+ pokemon.name + ' (height: ' + pokemon.height + ')';
  }
  datalist_row[0].appendChild(li);
}

// function to check if a specific pokemon is in the pokemon repository by providing only its name
function checkPokemonByName(pokemonList,name){
  return pokemonList.filter(function(pokemon) {
    if(pokemon.name.toLowerCase() === name.toLowerCase()) {
          return pokemon;
      }
  });
}
// invoke checkPokemonByName with search query
function searchPokemon() {
  if(searchName.value === ""){
    alert('Please enter a Pokemon name to be searched.');
  }else {
    let searchResult = checkPokemonByName(pokemonRepository.getAll(),searchName.value);
    console.log(searchResult);
    if(searchResult.length === 0){
      alert('Pokemon ' + searchName.value + ' not found');
    }else {
      alert('Pokemon ' + searchName.value + ' found');
    }
  }
}
// input pokemonList
let pokemon1 = {name: "Squirtle", height: 0.5, weight: 9, types: ['water']};
let pokemon2 = {name: "Beedrill", height: 1, weight: 29.5, types: ['bug','poison']};
let pokemon3 = {name: "Nidoran", height: 0.5, weight: 9, types: ['poison']};
let pokemon4 = {name: "Venomoth", height: 1.5, weight: 12.5, types: ['bug','poison']};
let pokemon5 = {name: "Meganium", height: 1.8, weight: 100.5, types: ['grass']};
let inputPokemonList = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, "test"];
let success_index = [];
let property_failure_index = [];
let type_failure_index = [];
// add pokemonList to the repository array
for (let i = 0; i < 6; i++){
  let captureMessage = pokemonRepository.add(inputPokemonList[i]);
  if (captureMessage === "success") {
    success_index.push(i);
  } else if (captureMessage === "property_failure") {
    property_failure_index.push(i);
  }
  else {
    type_failure_index.push(i);
  }
}
// display alert message to tell the status of pokemon addition to the repository from the input list
if(success_index.length !== 0){
  alert("Pokemons at the following indexes are added successfully.\n" + success_index);
}
if(property_failure_index.length !== 0){
  alert("Pokemons at the following indexes are not added due to some of the missing properties.\n" + property_failure_index);
}
if(type_failure_index.length !== 0){
  alert("Pokemons at the following indexes are not added as its not an object.\n" + type_failure_index);
}
// for each element in the pokemonlist invoke displayPokemonNames function to display its details
//console.log(pokemonRepository.getAll());
(pokemonRepository.getAll()).forEach(displayPokemonNames);
