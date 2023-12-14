// Create users array and store users data in LocalStorage
// Your add.ts code here
var users = [
    { "user_name": "hema", "id": 192, "email": "hema@example.com" },
    { "user_name": "abc", "id": 456, "email": "abc@example.com" },
];
localStorage.setItem("users", JSON.stringify(users));
// Retrieve users data and display user details
var stored_data = localStorage.getItem("users");
if (stored_data) {
    var UsersData = JSON.parse(stored_data);
    console.log("All Users Data:", UsersData);
}
else {
    console.log("No users data found in localStorage.");
}
// Add an item to existing Users data in localStorage
var new_user = { "user_name": "alice", "id": 789, "email": "alice@example.com" };
users.push(new_user);
localStorage.setItem("users", JSON.stringify(users));
// Search if a user exists for the given inputEmailId
var email = "hema@gmail.com";
var found = null;
for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
    var user = users_1[_i];
    if (user.email === email) {
        found = user;
        break;
    }
}
if (found) {
    console.log("User Found based on Email:", found);
}
else {
    console.log("No user found for the given email.");
}
// Search based on multiple input fields
var inputUserName = "hema";
var inputId = 192;
var foundUser = null;
for (var _a = 0, users_2 = users; _a < users_2.length; _a++) {
    var user = users_2[_a];
    if (user.user_name === inputUserName && user.id === inputId) {
        foundUser = user;
        break;
    }
}
if (foundUser) {
    console.log("User Found based on Multiple Fields:", foundUser);
}
else {
    console.log("No user found for the given input fields.");
}
// Search the data, if not matched print "Invalid Credentials", else store the matched in localStorage
var newUser = { "user_name": "abc", "id": 456, "email": "abc@example.com" };
var match = null;
for (var _b = 0, users_3 = users; _b < users_3.length; _b++) {
    var user = users_3[_b];
    if (user.user_name === newUser.user_name && user.id === newUser.id && user.email === newUser.email) {
        match = user;
        break;
    }
}
if (match) {
    localStorage.setItem("matchedUser", JSON.stringify(match));
    console.log("Matched User Stored in localStorage:", match);
}
else {
    console.log("Invalid credentials");
}
var productForm = document.getElementById('productForm');
var productList = document.getElementById('productList');
function fetchProducts() {
    var products = JSON.parse(localStorage.getItem('products') || '0') || [];
    displayProducts(products);
}
function displayProducts(products) {
    productList.innerHTML = products.map(function (product, index) { return "\n    <li>\n      <strong>".concat(product.name, "</strong><br>\n      <p><strong>$").concat(product.price, "</strong></p>\n      <p>").concat(product.description, "</p>\n      <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\" width=\"100\">\n      <button onclick=\"editProduct(").concat(index, ")\">Edit</button>\n      <button onclick=\"deleteProduct(").concat(index, ")\">Delete</button>\n    </li>\n  "); }).join('');
}
function addProduct(event) {
    event.preventDefault();
    var productName = document.getElementById('productName').value;
    var productPrice = parseFloat(document.getElementById('productPrice').value);
    var productDescription = document.getElementById('productDescription').value;
    var productImage = document.getElementById('productImage').value;
    if (productName.trim() !== '' && !isNaN(productPrice) && productDescription.trim() !== '' && productImage.trim() !== '') {
        var products = JSON.parse(localStorage.getItem('products') || '0') || [];
        products.push({
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage
        });
        localStorage.setItem('products', JSON.stringify(products));
        fetchProducts();
        productForm.reset();
    }
    else {
        alert('Please fill in all fields correctly.');
    }
}
function editProduct(index) {
    var products = JSON.parse(localStorage.getItem('products') || '0') || [];
    var newName = prompt('Enter a new name for the product:', products[index].name);
    var newPriceString = prompt('Enter a new price for the product:', products[index].price.toString());
    var newPrice = parseFloat(newPriceString || '0'); // Use '0' as default if newPriceString is null
    var newDescription = prompt('Enter a new description for the product:', products[index].description);
    var newImage = prompt('Enter a new image URL for the product:', products[index].image);
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
function deleteProduct(index) {
    var products = JSON.parse(localStorage.getItem('products') || '0') || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    fetchProducts();
}
productForm.addEventListener('submit', addProduct);
fetchProducts();
