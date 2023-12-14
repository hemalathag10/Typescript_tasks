// Create users array and store users data in LocalStorage

// Your add.ts code here

let users: Array<{ user_name: string, id: number, email: string }> = [
  { "user_name": "hema", "id": 192, "email": "hema@example.com" },
  { "user_name": "abc", "id": 456, "email": "abc@example.com" },
];
localStorage.setItem("users", JSON.stringify(users));

// Retrieve users data and display user details
let stored_data = localStorage.getItem("users");
if (stored_data) {
  let UsersData: Array<{ user_name: string, id: number, email: string }> = JSON.parse(stored_data);
  console.log("All Users Data:", UsersData);
} else {
  console.log("No users data found in localStorage.");
}

// Add an item to existing Users data in localStorage
let new_user = { "user_name": "alice", "id": 789, "email": "alice@example.com" };
users.push(new_user);
localStorage.setItem("users", JSON.stringify(users));

// Search if a user exists for the given inputEmailId
let email = "hema@gmail.com";

let found :any= null;

for (const user of users) {
    if (user.email === email) {
        found = user;
        break;
    }
}

if (found) {
  console.log("User Found based on Email:", found);
} else {
  console.log("No user found for the given email.");
}

// Search based on multiple input fields
let inputUserName = "hema";
let inputId = 192;

let foundUser :any= null;

for (const user of users) {
    if (user.user_name === inputUserName && user.id === inputId) {
        foundUser = user;
        break;
    }
}

if (foundUser) {
  console.log("User Found based on Multiple Fields:", foundUser);
} else {
  console.log("No user found for the given input fields.");
}

// Search the data, if not matched print "Invalid Credentials", else store the matched in localStorage
let newUser = { "user_name": "abc", "id": 456, "email": "abc@example.com" };

let match :any= null;

for (const user of users) {
    if (user.user_name === newUser.user_name && user.id === newUser.id && user.email === newUser.email) {
        match = user;
        break;
    }
}

if (match) {
    localStorage.setItem("matchedUser", JSON.stringify(match));
    console.log("Matched User Stored in localStorage:", match);
} else {
    console.log("Invalid credentials");
}

const productForm = document.getElementById('productForm') as HTMLFormElement;
const productList = document.getElementById('productList') as HTMLUListElement;

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

function fetchProducts(): void {
  const products: Product[] = JSON.parse(localStorage.getItem('products')||'0') || [];
  displayProducts(products);
}

function displayProducts(products: Product[]): void {
  productList.innerHTML = products.map((product, index) => `
    <li>
      <strong>${product.name}</strong><br>
      <p><strong>$${product.price}</strong></p>
      <p>${product.description}</p>
      <img src="${product.image}" alt="${product.name}" width="100">
      <button onclick="editProduct(${index})">Edit</button>
      <button onclick="deleteProduct(${index})">Delete</button>
    </li>
  `).join('');
}

function addProduct(event: Event): void {
  event.preventDefault();
  const productName = (document.getElementById('productName') as HTMLInputElement).value;
  const productPrice = parseFloat((document.getElementById('productPrice') as HTMLInputElement).value);
  const productDescription = (document.getElementById('productDescription') as HTMLInputElement).value;
  const productImage = (document.getElementById('productImage') as HTMLInputElement).value;

  if (productName.trim() !== '' && !isNaN(productPrice) && productDescription.trim() !== '' && productImage.trim() !== '') {
    const products: Product[] = JSON.parse(localStorage.getItem('products')||'0') || [];
    products.push({
      name: productName,
      price: productPrice,
      description: productDescription,
      image: productImage
    });
    localStorage.setItem('products', JSON.stringify(products));
    fetchProducts();
    productForm.reset();
  } else {
    alert('Please fill in all fields correctly.');
  }
}

function editProduct(index: number): void {
  const products: Product[] = JSON.parse(localStorage.getItem('products')||'0') || [];
  const newName = prompt('Enter a new name for the product:', products[index].name);
  const newPriceString = prompt('Enter a new price for the product:', products[index].price.toString());
  const newPrice = parseFloat(newPriceString || '0'); // Use '0' as default if newPriceString is null
  const newDescription = prompt('Enter a new description for the product:', products[index].description);
  const newImage = prompt('Enter a new image URL for the product:', products[index].image);

  if (newName !== null && !isNaN(newPrice) && newDescription !== null && newImage !== null) {
    products[index] = {
      name: newName,
      price: newPrice,
      description: newDescription,
      image: newImage
    };
    localStorage.setItem('products', JSON.stringify(products));
    fetchProducts();
  }
}

function deleteProduct(index: number): void {
  const products: Product[] = JSON.parse(localStorage.getItem('products')|| '0') || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  fetchProducts();
}

productForm.addEventListener('submit', addProduct);
fetchProducts();
