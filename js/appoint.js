function showToast(message) {
  const toast = document.getElementById("cart-toast"); // Gets toast element by ID
  if (!toast) return; // Exits if toast element is not found

  toast.textContent = message; // Sets toast message
  toast.style.display = "block"; // Shows toast

  setTimeout(() => {
    toast.style.display = "none"; // Hides toast after 3 seconds
  }, 3000);
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents default form submission

  showToast("Thank You For Booking an Appointment With Us!"); // Displays thank you message

  setTimeout(() => {
    window.location.href = "ty2.html"; // Redirects to thank you page after 2.5 seconds
  }, 2500);
});