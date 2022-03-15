// SELECTORS
const nameInput = document.querySelector(".name-input");
const priceInput = document.querySelector(".price-input");
const addButton = document.querySelector(".add-button");
const shoppingList = document.querySelector(".shopping-list");
const totalEl = document.querySelector(".total");



//VARIABLES
let shoppingCart;
let shoppingTotal = 0;

const DELETE = "delete", EDIT = "edit";
const editButton = `<i class="fa-solid fa-pen-to-square"></i>`;
const deleteButton = '<i class="fa-solid fa-trash"></i>';

//LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
updateUI();


//EVENT LISTENERS
addButton.addEventListener("click", addItem);
shoppingList.addEventListener("click", deleteOrEdit);


//FUNCTIONS
function addItem() {
    if (!nameInput.value || !priceInput.value) return;

    let addingElement = {
        name: nameInput.value,
        price: parseFloat(priceInput.value),
    };

    shoppingCart.push(addingElement);
    updateUI();
    clearInput([nameInput, priceInput]);
}

function showBuy(list, id, titleValue, priceValue) {
    const entry = `<div class="buy">
                        <li id = "${id}" class="itemName">${titleValue} - ${priceValue} ₽
                        <button id="edit">${editButton}</button>
                        <button id="delete">${deleteButton}</button>
                        </li>
                    </div>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function updateUI() {
    shoppingTotal = calculateTotal(shoppingCart);

    totalEl.innerHTML = `<h2>Total: ${shoppingTotal} ₽</h2>`;

    clearElements([shoppingList]);

    shoppingCart.forEach((entry, index) => {
        showBuy(shoppingList, index, entry.name, entry.price);
    });

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function clearInput(inputsArray) {
    inputsArray.forEach(input => {
        input.value = "";
    });

}

function clearElements(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    });


}

function calculateTotal(shoppingCart) {
    let sum = 0;

    shoppingCart.forEach(item => {
        sum += item.price
    });

    return sum;
}



function deleteOrEdit(event) {
    const item = event.target;
    const entry = item.parentNode;


    if (item.id == DELETE) {
        deleteItem(entry);
    } else if (item.id == EDIT) {
        editItem(entry);
    }


}

function deleteItem(entry) {
    shoppingCart.splice(entry.id, 1);
    updateUI();
}

function editItem(entry) {
    let ENTRY = shoppingCart[entry.id];

    nameInput.value = ENTRY.name;
    priceInput.value = ENTRY.price;

    deleteItem(entry);
}

