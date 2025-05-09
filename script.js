const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
closeCart.addEventListener("click", () => cart.classList.remove("active"));

const cartContent = document.querySelector(".cart-content");

const addToCart = (productcard) => {
    const prodImg = productcard.querySelector("img").src;
    const productName = productcard.querySelector(".prodname").textContent;
    const productPrice = productcard.querySelector(".price").textContent;

    const CartItems = cartContent.querySelectorAll(".product-title");
    for (let item of CartItems) {
        if (item.textContent === productName) {
            alert("Product already in cart");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${prodImg}" alt="cart-img">
        <div class="cart-detail">
            <h2 class="product-title">${productName}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-delete"></i>
    `;

    cartContent.appendChild(cartBox);
};

// Now attach listeners after the DOM is ready and function is defined
const addCart = document.querySelectorAll(".add-cart");
addCart.forEach(button => {
    button.addEventListener("click", event => {
        const productcard = event.target.closest(".menu-card");
        addToCart(productcard);
    });
});
