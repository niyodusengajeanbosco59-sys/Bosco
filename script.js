const products = [
    {
        id: 1,
        name: "Smart Phone",
        price: 250,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },

    {
        id: 2,
        name: "Laptop",
        price: 700,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },

    {
        id: 3,
        name: "Smart Watch",
        price: 80,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 4,
        name: "Headphones",
        price: 50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
];

let cart = [];

const productsContainer = document.getElementById("products");

function displayProducts(list = products) {

    productsContainer.innerHTML = "";

    list.forEach(product => {

        productsContainer.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="price">$${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <span>
                    $${item.price * item.quantity}
                    <button onclick="removeFromCart(${item.id})">
                        ❌
                    </button>
                </span>

            </div>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2);

    document.getElementById("cart-count").textContent = count;
}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

function showCart() {

    document.getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];

    updateCart();
}

document.getElementById("search").addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filtered);
});

displayProducts();
updateCart();
