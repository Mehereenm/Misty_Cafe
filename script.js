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
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-delete"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-delete").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
        updateCount(-1);
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector(".decrement");
        let quantity = numberElement.textContent;

        if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
            if (quantity == 1) {
                decrementButton.computedStyleMap.color = "#999";
            }
        } else if (event.target.classList.contains("increment")) {
            quantity++;
            decrementButton.computedStyleMap.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
}

const addCart = document.querySelectorAll(".add-cart");
addCart.forEach(button => {
    button.addEventListener("click", event => {
        const productcard = event.target.closest(".menu-card");
        addToCart(productcard);
    });
});

let CartItemCount = 0;
const updateCount = change => {
    const cartCount = document.querySelector("#cart-count");
    CartItemCount += change;
    if (CartItemCount > 0) {
        cartCount.textContent = CartItemCount;
        cartCount.style.visibility = "visible";
    } else {
        cartCount.style.visibility = "hidden";
        cartCount.textContent = "";
    }
}

const buyButton = document.querySelector(".btn-buy");
buyButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    CartItemCount = 0;
    updateCount(0);

    //cartContent.innerHTML = "";
    updateTotalPrice();
    alert("Thank you for your purchase!");
    //updateCount(-CartItemCount);
});

function myFunction() {
    const nav = document.getElementById("topnav");
    nav.classList.toggle("responsive");
}
