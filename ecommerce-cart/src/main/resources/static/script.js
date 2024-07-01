const apiBaseUrl = 'http://localhost:8080/api/cart';

// displaying of cart items
function fetchCartItems() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(items => {
            const cartItemsDiv = document.getElementById('cart-items');
            cartItemsDiv.innerHTML = '';

            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p>Product ID: ${item.productId}</p>
                    <p>Product Name: ${item.productName}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <button onclick="confirmAndRemoveItem('${item.productId}')">Remove</button>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching cart items:', error));
}

// Adding an item to the cart
document.getElementById('add-item-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const productName = document.getElementById('product-name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, productName, quantity, price })
    })
        .then(response => {
            if (response.ok) {
                fetchCartItems();
                document.getElementById('add-item-form').reset();
            } else {
                console.error('Error adding item:', response);
            }
        })
        .catch(error => console.error('Error adding item:', error));
});

// Removing an item from the cart with confirmation
function confirmAndRemoveItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        removeItem(productId);
    }
}

// Removing an item from the cart
function removeItem(productId) {
    fetch(`${apiBaseUrl}/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                fetchCartItems();
            } else {
                console.error('Error removing item:', response);
            }
        })
        .catch(error => console.error('Error removing item:', error));
}

fetchCartItems();
