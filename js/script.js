// assign pokemonRepository an IIFE
let pokemonRepository = (function(){
  // input pokemonList
  let pokemon1 = {name: "Squirtle", height: 0.5, weight: 9, types: ['water']};
  let pokemon2 = {name: "Beedrill", height: 1, weight: 29.5, types: ['bug','poison']};
  let pokemon3 = {name: "Nidoran", height: 0.5, weight: 9, types: ['poison']};
  let pokemon4 = {name: "Venomoth", height: 1.5, weight: 12.5, types: ['bug','poison']};
  let pokemon5 = {name: "Meganium", height: 1.8, weight: 100.5, types: ['grass']};
  // An array to store pokemon objects.
  let pokemonList = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5];
  // adds pokemon object to the pokemonList array
  function add(pokemon){
    // check if its an object and has all the required properties/keys
    if(typeof(pokemon) === 'object'){
      if(("name" in pokemon) && ("height" in pokemon) && ("weight" in pokemon) && ("types" in pokemon)) {
        pokemonList.push(pokemon);
        return 'pokemon details added successfully';
      }else {
        return 'pokemon details not added, as some properties are missing';
      }
    }else {
      return  'provide pokemon details as an object';
    }
  }
  // returns pokemonList array
  function getAll(){
    return pokemonList;
  }
  // function to display all the Pokemon names in an unordered list
  function addListItem(pokemon){
    // Declare handle to access the unordered list
    let pokemonList = document.querySelector('.pokemon-list');
    let listitempokemon = document.createElement('li');
    let pokemonbutton = document.createElement('button');
    pokemonbutton.classList.add('btn-pokemon');
    // if height is greater than 1.5, set it as special pokemon
    if(pokemon.height > 1.5){
      pokemonbutton.innerText = pokemon.name + '- Wow, that\'s big!';
      pokemonbutton.classList.add('spl_pokemon');
    } else {
      pokemonbutton.innerText = pokemon.name;
    }
    listitempokemon.appendChild(pokemonbutton);
    pokemonList.appendChild(listitempokemon);
    // call function to add eventlistener
    addEvents(pokemonbutton, pokemon);
  }
  // function to show pokemon details
  function showDetails(pokemon){
    console.log(pokemon);
  }
  // function to add eventlisteners
  function addEvents(element, arg){
    element.addEventListener('click', function(event) {
      showDetails(arg);
    });
  }
  // returns handle to add and getAll functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
//add an object to pokemon repository
alert(pokemonRepository.add({name: "Sunflora", height: 0.8, weight: 8.5, types: ['grass']}));
// Display pokemonRepository inside unorderedlist
console.log(pokemonRepository.getAll());
(pokemonRepository.getAll()).forEach(pokemonRepository.addListItem);
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
  // Declare handle to access the seach field name
  let searchName = document.getElementById('search_name');
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
