// assign pokemonRepository an IIFE
let pokemonRepository = (function(){
  // An array to store pokemon objects.
  let pokemonList = [];
  // fetch API url
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // adds pokemon object to the pokemonList array
  function add(pokemon){
    // check if its an object and has all the required properties/keys
    if(typeof(pokemon) === 'object'){
      if(("name" in pokemon) && ("detailsUrl" in pokemon)) {
        pokemonList.push(pokemon);
        return 'pokemon details added successfully';
      }else {
        return 'pokemon details not added, as some properties are missing';
      }
    }else {
      return 'provide pokemon details as an object';
    }
  }

  // returns pokemonList array
  function getAll(){
    return pokemonList;
  }

  // function to display all the Pokemon names in an unordered list
  function addListItem(pokemon){
    // Declare handle to access the unordered list
    let pokemonList = document.querySelector('.list');
    let listitempokemon = document.createElement('li');
    let pokemonbutton = document.createElement('button');
    pokemonbutton.classList.add('pokemon-namebtn');
    pokemonbutton.innerText = pokemon.name;
    listitempokemon.appendChild(pokemonbutton);
    pokemonList.appendChild(listitempokemon);
    // call function to add eventlistener
    addEvents(pokemonbutton, pokemon);
  }

  // function to fetch the list from api
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  // function to load the details of pokemon based on the detailsUrl
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (jsondetails) {
      // Now add the details to the pokemon item
      item.imageUrl = jsondetails.sprites.front_default;
      item.height = jsondetails.height;
      item.weight = jsondetails.weight;
      item.types = jsondetails.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // function to display the imageUrl
  function displayImg(imgUrl){
    let img = new Image();
    let divcontainer = document.getElementById('display');
    img.onload = function() {
      divcontainer.innerHTML += '<img src="'+img.src+'" />';
    };
    img.src=imgUrl;
  }
  
  // function to show pokemon details
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      hideLoadingMessage();
      displayImg(pokemon.imageUrl);
      console.log(pokemon.imageUrl);
      console.log(pokemon);
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // function to add eventlisteners
  function addEvents(element, arg){
    element.addEventListener('click', function (event) {
      showDetails(arg);
    });
  }

  // returns handle to add and getAll functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Search feature -- provide the class name of the pokemonbutton, as the list will be searched by pokemon names
// item specifies a default placeholder of how the list looks before initialization
let options = {
  valueNames: [ 'pokemon-namebtn' ],
  item: '<li><button class="pokemon-namebtn"></button></li>'
};

// function to display a loading message
let displayMsg = document.querySelector('p');
function showLoadingMessage() {
  displayMsg.classList.remove('hidden');
}
function hideLoadingMessage() {
  displayMsg.classList.add('hidden');
}

// invoke the loadList function, then cretae a DOM to display them in the page by calling addListItem function
pokemonRepository.loadList().then(function () {
  // Now the pokemondatalist will be loaded
  hideLoadingMessage();
  //let searchList = new List('search-list');
  pokemonRepository.getAll().forEach(function (pokemonitem) {
    pokemonRepository.addListItem(pokemonitem);
  });
  let searchPokemonList = new List('search-list', options);
}).catch(function (e) {
  hideLoadingMessage();
  console.error(e);
})
console.log(pokemonRepository.getAll());
