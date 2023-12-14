document.addEventListener('DOMContentLoaded', function () {
    var addedProductList = document.getElementById('addedProductList');
    fetchProducts();
    function fetchProducts() {
        var storedData = localStorage.getItem('products') || '[]';
        var products = JSON.parse(storedData);
        displayProducts(products);
    }
    function displayProducts(products) {
        addedProductList.innerHTML = ''; // Clear the existing content
        products.forEach(function (product, index) {
            var listItem = document.createElement('li');
            listItem.innerHTML = "\n      <li class=\"product-item\">\n      <div class=\"product-info\">\n        <strong>".concat(product.name, "</strong>\n        <p><strong>$").concat(product.price, "</strong></p>\n      </div>\n      <div class=\"product-actions\">\n        <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\" class=\"product-image\" width=\"100\">\n        <div class=\"button-card\">\n          <button class=\"edit-btn\" onclick=\"editProduct(").concat(index, ")\">Edit</button>\n          <button class=\"delete-btn\" onclick=\"deleteProduct(").concat(index, ")\">Delete</button>\n        </div>\n      </div>\n      <div class=\"product-description\">\n        <p>").concat(product.description, "</p>\n      </div>\n    </li>\n  ");
            // Attach event listeners to dynamically created buttons
            var deleteButton = listItem.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function () { return deleteProduct(index); });
            var editButton = listItem.querySelector('.edit-btn');
            editButton.addEventListener('click', function () { return editProduct(index); });
            addedProductList.appendChild(listItem);
        });
    }
    function editProduct(index) {
        function editProduct(index) {
            var storedData = localStorage.getItem('products') || '[]';
            var products = JSON.parse(storedData);
            var newName = prompt('Enter a new name for the product:', products[index].name);
            var newPriceInput = prompt('Enter a new price for the product:', products[index].price.toString());
            var newPrice = newPriceInput === null ? NaN : parseFloat(newPriceInput);
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
            }
        }
        fetchProducts();
    }
    function deleteProduct(index) {
        var products = JSON.parse(localStorage.getItem('products') || '[]');
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        // Update the displayed list immediately
        fetchProducts();
    }
});
