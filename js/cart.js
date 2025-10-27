document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart-button");

  function showToast(message) {
    const toast = document.getElementById("cart-toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.getAttribute("data-name");
      const price = product.getAttribute("data-price");
      const image = product.getAttribute("data-image");  
      const sizeSelect = product.querySelector("select");
      const size = sizeSelect ? sizeSelect.value : "N/A";

      if (size === "Please select size") {
        showToast("Please select a size before adding to cart.");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({ name, price, size, image });

      localStorage.setItem("cart", JSON.stringify(cart));

      showToast(`${name} (Size: ${size}) added to cart!`);
    });
  });
});
// js/cart.js

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count display
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  cartCountElement.textContent = itemCount;
  cartCountElement.classList.toggle('active', itemCount > 0); // Show/hide badge
}

// Function to show toast notification
function showToast(message) {
  const toast = document.getElementById('cart-toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount(); // Initialize cart count on page load

  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productElement = button.closest('.product');
      const productName = productElement.dataset.name;
      const productPrice = parseFloat(productElement.dataset.price);
      const productImage = productElement.dataset.image;
      const sizeSelect = productElement.querySelector('.size-select');
      const selectedSize = sizeSelect ? sizeSelect.value : null;

      // Validate size selection for products that require it
      if (sizeSelect && selectedSize === 'Please select size') {
        showToast('Please select a size!');
        return;
      }

      // Check if product already exists in cart
      const existingItem = cart.find(item => item.name === productName && (!selectedSize || item.size === selectedSize));
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          image: productImage,
          size: selectedSize,
          quantity: 1
        });
      }

      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update cart count and show toast
      updateCartCount();
      showToast('Item added to cart!');
    });
  });
});