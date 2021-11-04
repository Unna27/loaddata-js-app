// function to display Pokemon details in a modal box
function showModal(pokemon) {
  let modalBody = document.querySelector('.modal-body');
  let modalTitle = document.querySelector('.modal-title');
  // empty the title and content
  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  let pkName = document.createElement('h1');
  pkName.innerText = pokemon.name;

  let pkHeight = document.createElement('p');
  pkHeight.innerText = 'Height: ' + pokemon.height;

  let pkWeight = document.createElement('p');
  pkWeight.innerText = 'Weight: ' + pokemon.weight;

  let pkImage = document.createElement('img');
  pkImage.src = pokemon.imageUrl;

  modalTitle.appendChild(pkName);
  modalBody.appendChild(pkHeight);
  modalBody.appendChild(pkWeight);
  modalBody.appendChild(pkImage);
}
