/* eslint-disable no-console */
// assign pokemonRepository an IIFE
const pokemonRepository = (function() {
  // An array to store pokemon objects.
  const pokemonList = [];
  // fetch API url
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // adds pokemon object to the pokemonList array
  function add(pokemon) {
    // check if its an object and has all the required properties/keys
    if (typeof pokemon === 'object') {
      if ('name' in pokemon && 'detailsUrl' in pokemon) {
        pokemonList.push(pokemon);
        return 'pokemon details added successfully';
      } else {
        return 'pokemon details not added, as some properties are missing';
      }
    } else {
      return 'provide pokemon details as an object';
    }
  }

  // returns pokemonList array
  function getAll() {
    return pokemonList;
  }

  // function to display all the Pokemon names in an unordered list
  function addListItem(pokemon) {
    // Declare handle to access the unordered list
    const pokemonList = document.querySelector('.list');
    const listitempokemon = document.createElement('li');
    const pokemonbutton = document.createElement('button');
    listitempokemon.classList.add('list-group-item');
    pokemonbutton.classList.add(
      'pokemon-namebtn',
      'btn',
      'btn-primary',
      'list-group-item-action'
    );
    pokemonbutton.innerText = pokemon.name;
    // set attribute to access the modal
    pokemonbutton.setAttribute('data-toggle', 'modal');
    pokemonbutton.setAttribute('data-target', '#pokemonModal');
    listitempokemon.appendChild(pokemonbutton);
    pokemonList.appendChild(listitempokemon);

    // call function to add eventlistener
    addEvents(pokemonbutton, pokemon);
  }

  // function to fetch the list from api
  async function loadList() {
    showLoadingMessage();
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // function to load the details of pokemon based on the detailsUrl
  async function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    try {
      const response = await fetch(url);
      const jsondetails = await response.json();
      // Now add the details to the pokemon item
      item.imageUrl = jsondetails.sprites.front_default;
      item.height = jsondetails.height;
      item.weight = jsondetails.weight;
      item.types = jsondetails.types;
    } catch (e) {
      console.error(e);
    }
  }

  // function to show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then(function() {
        hideLoadingMessage();
        //call showModal function in modal.js file
        showModal(pokemon);
        //console.log(pokemon);
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // function to add eventlisteners
  function addEvents(element, arg) {
    element.addEventListener('click', function() {
      showDetails(arg);
    });
  }

  // returns handle to add and getAll functions
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails
  };
})();

// function to display a loading message
let displayMsg = document.querySelector('p');
function showLoadingMessage() {
  displayMsg.classList.remove('hidden');
}

function hideLoadingMessage() {
  displayMsg.classList.add('hidden');
}

// invoke the loadList function, then cretae a DOM to display them in the page by calling addListItem function
pokemonRepository
  .loadList()
  .then(function() {
    // Now the pokemondatalist will be loaded
    hideLoadingMessage();
    //let searchList = new List('search-list');
    pokemonRepository.getAll().forEach(function(pokemonitem) {
      pokemonRepository.addListItem(pokemonitem);
    });
  })
  .catch(function(e) {
    hideLoadingMessage();
    console.error(e);
  });
$('.list').sortable(); // added to make list items sortable based on mouse events
