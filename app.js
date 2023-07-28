const orderButton = document.getElementById('order-btn');
orderButton.addEventListener('click', () => {
  // Display greeting message
  alert('Thank you for your order! We appreciate your business.');

  // Reload the website
  location.reload();
});

// Sample data
const availableIngredients = [
  { name: 'Lettuce', price: 30, image: 'lettuce.png' },
  { name: 'Tomato', price: 15, image: 'tomato.png' },
  { name: 'Cheese', price: 20, image: 'cheese.png' },
  { name: 'Onion', price: 25, image: 'onion.png' },
  // Add more ingredients as needed
];

const selectedIngredients = [];

// Render the available ingredients
function renderIngredients() {
  const ingredientsContainer = document.getElementById('ingredient-list');
  ingredientsContainer.innerHTML = '';

  availableIngredients.forEach((ingredient) => {
    const ingredientItem = createIngredientItem(ingredient);
    ingredientsContainer.appendChild(ingredientItem);
  });
}

// Create an ingredient item element
function createIngredientItem(ingredient) {
  const { name, image } = ingredient;

  const ingredientItem = document.createElement('div');
  ingredientItem.classList.add('ingredient');
  ingredientItem.dataset.ingredient = name;

  const ingredientImage = createIngredientImage(image, name);
  const ingredientCount = createIngredientCount(name);
  const addButton = createAddButton(name);

  ingredientItem.appendChild(ingredientImage);
  ingredientItem.appendChild(ingredientCount);
  ingredientItem.appendChild(addButton);

  return ingredientItem;
}

// Create an ingredient image element
function createIngredientImage(image, alt) {
  const ingredientImage = document.createElement('img');
  ingredientImage.src = image;
  ingredientImage.alt = alt;
  ingredientImage.classList.add('ingredient-image');
  return ingredientImage;
}

// Create an ingredient count element
function createIngredientCount(name) {
  const ingredientCount = document.createElement('span');
  ingredientCount.textContent = '0';
  ingredientCount.classList.add('ingredient-count');
  ingredientCount.setAttribute('id', `${name}-count`);
  return ingredientCount;
}

// Create an add button
function createAddButton(name) {
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.classList.add('add-button');
  addButton.addEventListener('click', () => handleAddIngredient(name));
  return addButton;
}

// Handle ingredient addition
function handleAddIngredient(name) {
  const selectedIngredient = selectedIngredients.find((ingredient) => ingredient.name === name);

  if (selectedIngredient) {
    selectedIngredient.quantity++;
  } else {
    const ingredient = availableIngredients.find((ingredient) => ingredient.name === name);
    selectedIngredients.push({ ...ingredient, quantity: 1 });
  }

  updateIngredientCount(name);
  renderSelectedIngredients();
  updateTotalPrice();
}

// Render the selected ingredients
function renderSelectedIngredients() {
  const burgerContainer = document.getElementById('burger');
  burgerContainer.innerHTML = '';

  selectedIngredients.forEach((ingredient) => {
    const ingredientItem = createSelectedIngredientItem(ingredient);
    burgerContainer.appendChild(ingredientItem);
  });
}

// Create a selected ingredient item element
function createSelectedIngredientItem(ingredient) {
  const { name, image, quantity } = ingredient;

  const ingredientItem = document.createElement('div');
  ingredientItem.classList.add('selected-ingredient');

  const ingredientImage = createIngredientImage(image, name);
  const ingredientName = document.createElement('span');
  ingredientName.textContent = name;
  const ingredientCount = document.createElement('span');
  ingredientCount.textContent = `x ${quantity}`;
  const removeButton = createRemoveButton(name);

  ingredientItem.appendChild(ingredientImage);
  ingredientItem.appendChild(ingredientName);
  ingredientItem.appendChild(ingredientCount);
  ingredientItem.appendChild(removeButton);

  return ingredientItem;
}

// Create a remove button
function createRemoveButton(name) {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', () => handleRemoveIngredient(name));
  return removeButton;
}

// Handle ingredient removal
function handleRemoveIngredient(name) {
  const selectedIngredientIndex = selectedIngredients.findIndex((ingredient) => ingredient.name === name);

  if (selectedIngredientIndex !== -1) {
    const selectedIngredient = selectedIngredients[selectedIngredientIndex];
    selectedIngredient.quantity--;

    if (selectedIngredient.quantity === 0) {
      selectedIngredients.splice(selectedIngredientIndex, 1);
    }
  }

  updateIngredientCount(name);
  renderSelectedIngredients();
  updateTotalPrice();
}

// Update the ingredient count
function updateIngredientCount(name) {
  const ingredientCountElement = document.getElementById(`${name}-count`);
  const selectedIngredient = selectedIngredients.find((ingredient) => ingredient.name === name);

  if (selectedIngredient) {
    ingredientCountElement.textContent = `x ${selectedIngredient.quantity}`;
  } else {
    ingredientCountElement.textContent = '0';
  }
}

// Generate the burger image
function generateBurgerImage() {
  const burgerContainer = document.getElementById('burger');
  burgerContainer.innerHTML = '';

  const burgerImage = document.createElement('img');
  burgerImage.src = 'burger.png';
  burgerImage.alt = 'Burger';
  burgerImage.classList.add('burger-image');

  // Add CSS styles to fit the image within the container
  burgerImage.style.maxWidth = '100%';
  burgerImage.style.maxHeight = '100%';
  burgerImage.style.objectFit = 'contain';

  burgerContainer.appendChild(burgerImage);
}


// Calculate the total price of selected ingredients
function calculateTotalPrice() {
  const totalPrice = selectedIngredients.reduce((total, ingredient) => {
    return total + ingredient.price * ingredient.quantity;
  }, 0);

  return totalPrice.toFixed(2);
}

// Update the total price in the HTML document
function updateTotalPrice() {
  const totalPriceElement = document.getElementById('total-price');
  totalPriceElement.textContent = `Total Price: $${calculateTotalPrice()}`;
}

// Initialize the application
function initializeApp() {
  renderIngredients();
   updateTotalPrice();

  const createBurgerButton = document.getElementById('create-burger-btn');
  createBurgerButton.addEventListener('click', () => {
    generateBurgerImage();
    updateTotalPrice();
  });
}

// Call the initializeApp function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
