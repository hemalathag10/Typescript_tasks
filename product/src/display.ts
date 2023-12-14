// display.ts
interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

document.addEventListener('DOMContentLoaded', function () {
  const addedProductList = document.getElementById('addedProductList') as HTMLUListElement;
  fetchProducts();

  function fetchProducts(): void {
    const storedData = localStorage.getItem('products') || '[]';
    const products: Product[] = JSON.parse(storedData);
    displayProducts(products);
  }

  function displayProducts(products: Product[]): void {
    addedProductList.innerHTML = ''; // Clear the existing content

    products.forEach((product, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <li class="product-item">
      <div class="product-info">
        <strong>${product.name}</strong>
        <p><strong>$${product.price}</strong></p>
      </div>
      <div class="product-actions">
        <img src="${product.image}" alt="${product.name}" class="product-image" width="100">
        <div class="button-card">
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </div>
      </div>
      <div class="product-description">
        <p>${product.description}</p>
      </div>
    </li>
  `;


      // Attach event listeners to dynamically created buttons
      const deleteButton = listItem.querySelector('.delete-btn') as HTMLButtonElement;
      deleteButton.addEventListener('click', () => deleteProduct(index));

      const editButton = listItem.querySelector('.edit-btn') as HTMLButtonElement;
      editButton.addEventListener('click', () => editProduct(index));

      addedProductList.appendChild(listItem);
    });
  }

  function editProduct(index: number): void {
    function editProduct(index: number): void {
      const storedData = localStorage.getItem('products') || '[]';
      const products: Product[] = JSON.parse(storedData);
    
      const newName: string | null = prompt('Enter a new name for the product:', products[index].name);
      const newPriceInput: string | null = prompt('Enter a new price for the product:', products[index].price.toString());
      const newPrice: number = newPriceInput === null ? NaN : parseFloat(newPriceInput);
      const newDescription: string | null = prompt('Enter a new description for the product:', products[index].description);
      const newImage: string | null = prompt('Enter a new image URL for the product:', products[index].image);
    
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

  function deleteProduct(index: number): void {
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Update the displayed list immediately
    fetchProducts();
  }
});
