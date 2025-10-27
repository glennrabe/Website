const cartContainer = document.getElementById("cart-items");
const subtotalSpan  = document.getElementById("subtotal");
const clearCartBtn  = document.getElementById("clear-cart-btn");
const checkoutBtn   = document.getElementById("checkout-btn");
const cartToast     = document.getElementById("cart-toast");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(item => {
  if (typeof item.quantity !== "number" || item.quantity < 1) {
    return { ...item, quantity: 1 };
  }
  return item;
});

localStorage.setItem("cart", JSON.stringify(cart));

let subtotal = 0;

function showToast(message) {
  cartToast.textContent = message;
  cartToast.style.display = "block";
  setTimeout(() => {
    cartToast.style.display = "none";
  }, 2000);
}

function renderCart() {
  cartContainer.innerHTML = "";
  subtotal = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p><center>Your cart is empty.</center></p>";
    document.querySelector(".cart-summary").style.display = "none";
    return;
  }

  document.querySelector(".cart-summary").style.display = "block";

  cart.forEach((item, index) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[₱,]/g, "")) || 0;
    const lineTotal = numericPrice * item.quantity;
    subtotal += lineTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-items";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <div class="cart-item-details">
        <p><strong>${item.name}</strong></p>
        <p>Size: ${item.size}</p>
        <p>Unit Price: ${item.price}</p>
      </div>

      <div class="quantity-adjuster">
        <button class="decrement-btn" data-index="${index}">–</button>
        <span class="quantity-value">${item.quantity}</span>
        <button class="increment-btn" data-index="${index}">+</button>
      </div>

      <div class="line-price">
        <strong>${lineTotal.toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP"
        })}</strong>
      </div>

      <button class="remove-item-btn" data-index="${index}">×</button>
    `;

    cartContainer.appendChild(itemDiv);
  });

  subtotalSpan.textContent = subtotal.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP"
  });

  attachItemEventListeners();
}


function attachItemEventListeners() {
  document.querySelectorAll(".increment-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      cart[idx].quantity += 1;
      saveCartAndRerender();
    });
  });

  document.querySelectorAll(".decrement-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
        saveCartAndRerender();
      }
    });
  });

  document.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      cart.splice(idx, 1);
      saveCartAndRerender();
    });
  });
}

function saveCartAndRerender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearEntireCart() {
  cart = [];
  localStorage.removeItem("cart");
  saveCartAndRerender();
  showToast("Cart has been cleared.");
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is already empty.");
    return;
  }

  showToast("Thank You For Your Patronage!");
  setTimeout(() => {
    localStorage.removeItem("cart");
    window.location.href = "ty.html"; 
  }, 2000);
}

clearCartBtn.addEventListener("click", clearEntireCart);
checkoutBtn.addEventListener("click", checkout);

renderCart();

/*
function checkout() {
  const cartDetails = cart.map(item => {
    return `Product: ${item.name}\nPrice: ${item.price}\nSize: ${item.size}`;
  }).join('\n\n');

  const templateParams = {
    cart: cartDetails,
    subtotal: subtotal.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP"
    }),
  };

  emailjs.send("service_0vtm2ng", "template_dru3ll5", templateParams)
    .then(function(response) {
      console.log("Email sent successfully!", response.status, response.text);
      showToast("Thank You For Your Patronage!");
      setTimeout(() => {
        localStorage.removeItem("cart");
        window.location.href = "ty.html";
      }, 2000);
    }, function(error) {
      console.error("Failed to send email:", error);
      alert("Failed to send order email. Please try again.");
    });
}
*/