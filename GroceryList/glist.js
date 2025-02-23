let total = 0;
let sobra = 1000;
const totalElement = document.getElementById('total');
const sobraElement = document.getElementById('remaining');
const itens = [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-grocery');
  const itemInput = document.getElementById('item');
  const priceInput = document.getElementById('price');
  const errorMessage = document.getElementById('error-message');
  const list = document.getElementById('list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemValue = itemInput.value.trim();
    const priceValue = priceInput.value.trim();

    if (!itemValue || !priceValue) {
      errorMessage.textContent = 'Por favor, insira o nome e o preço do item.';
      return;
    }

    if (isNaN(parseFloat(priceValue))) {
      errorMessage.textContent = "Preço inválido!";
      return;
    }

    const item = {
      nome: itemValue,
      preco: parseFloat(priceValue)
    };

    itens.push(item);
    const precoFormatado = item.preco.toFixed(2);
    const listItem = criarListaItem(item, precoFormatado);
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-window-close');
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add('delete-button-show');

    const editButton = document.createElement('button');
    editButton.textContent = '';
    editButton.classList.add('fas', 'fa-edit');
    editButton.classList.add('edit-button-show');

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    deleteButton.addEventListener('click', () => {
      listItem.remove();
      total -= item.preco;
      sobra += item.preco;
      totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
      sobraElement.textContent = `Sobrando: R$ ${sobra.toFixed(2)}`;
      itens.splice(itens.indexOf(item), 1);
    });

    editButton.addEventListener('click', () => {
      const itemNameInput = document.createElement('input');
      itemNameInput.value = item.nome;
      const priceInput = document.createElement('input');
      priceInput.value = item.preco;
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Salvar';

      listItem.innerHTML = '';
      listItem.appendChild(itemNameInput);
      listItem.appendChild(document.createTextNode(' - R$'));
      listItem.appendChild(priceInput);
      listItem.appendChild(saveButton);

      saveButton.addEventListener('click', () => {
        item.nome = itemNameInput.value;
        item.preco = parseFloat(priceInput.value);
        listItem.innerHTML = `${item.nome} - R$ ${item.preco} <button class="edit-button">Editar</button>`;
        atualizarTotal();
      });
    });

    list.appendChild(listItem);
    itemInput.value = '';
    priceInput.value = '';
    errorMessage.textContent = '';
    total += item.preco;
    sobra -= item.preco;
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    sobraElement.textContent = `Sobrando: R$ ${sobra.toFixed(2)}`;
  });
});

function criarListaItem(item, precoFormatado) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${item.nome} - R$ ${precoFormatado}`;
  return listItem;
}

function atualizarTotal() {
  total = itens.reduce((total, item) => total + item.preco, 0);
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
  sobra = 1000 - total;
  sobraElement.textContent = `Sobrando: R$ ${sobra.toFixed(2)}`;
}