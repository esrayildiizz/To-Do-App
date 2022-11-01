//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


//load items
loadItems();


//call event listener
//bütün eventleri çağırıyoruz.
eventListeners();




//fonksiyon tanımlayalım.
function eventListeners() {
  //submit event
  form.addEventListener('submit', addNewItem);

  //delete an item (tek bişeyi silme)
  taskList.addEventListener('click', deleteItem);


  //delete all items (delete all butonuna basınca tamamını silme)
  btnDeleteAll.addEventListener('click', deleteAllItems);
}


function loadItems() {

  items = getItemsFromLS(); //Local storage den elemanı alalım demek.

  items.forEach(function(item) {
    createItem(item);
  })
}


//get items from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem('items') === null) {
    items = []; //gelen item ları diziye çevir.
  }
  else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}


//set item to Local Storage
//local storage ye item ekleme.
function setItemToLS(text) {
  items = getItemsFromLS(); //kayıt olan listeyı ilk başta elimize alalım.
  items.push(text);
  localStorage.setItem('items', JSON.stringify(items));

}


//delete item from Local Storage
function deleteItemFromLS(text) {
  items = getItemsFromLS(); //kayıt olan listeyı ilk başta elimize alalım.
  items.forEach(function(item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
  //create li
  const li = document.createElement('li');
  li.className = 'list-group-item list-group-item-secondary';
  li.appendChild(document.createTextNode(text));

  //create a
  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href', '#');
  a.innerHTML = ' <i class="fas fa-times"> </i>';

  //li ve a yı ilişkilendirmemiz gerekiyor.
  //add a to li 
  li.appendChild(a);

  //add li to ul
  taskList.appendChild(li);

}


//add new item
function addNewItem(e) {
  if (input.value == '') {
    alert('add new Item')
  }

  //create item
  createItem(input.value);

  //save to Local Storage
  setItemToLS(input.value);

  //clear input
  input.value = '';


  e.preventDefault();
}

//delete an item
function deleteItem(e) {
  if (e.target.className === 'fas fa-times') {
    if (confirm('are you sure?')) {
      // çarpıya basıp tek tek silme
      e.target.parentElement.parentElement.remove();

      //delete item from Local Storage
      //local storage dan eleman silme.
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}


//delete all items
function deleteAllItems(e) {
  if (confirm('are you sure?')) { //silme işlemi yapmadan önce emin misiniz sorusu önümüze gelir.
    //taskList.innerHTML=''; //bu şekilde butona basınca girilen değerlerinin tamamını siler.
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }

  e.preventDefault();
}