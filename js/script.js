// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Shopping Cart
let cart = [];

// Mobile menu handler
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mobile-menu-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      menu.classList.toggle("hidden");
    });
  }
});

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shadow-xl");
  } else {
    navbar.classList.remove("shadow-xl");
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      document.getElementById("mobile-menu").classList.add("hidden");
    }
  });
});

// Scroll to Products
function scrollToProducts() {
  document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
}

// Play Promo Video (Simulation)
function playPromoVideo() {
  showToast("Video promo akan segera tersedia!");
}

// Filter Products
function filterProducts(category) {
  const products = document.querySelectorAll(".product-card");
  const buttons = document.querySelectorAll(".category-btn");

  // Update button styles
  buttons.forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Filter products
  products.forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
      product.classList.add("animate-fade-in");
    } else {
      product.style.display = "none";
    }
  });
}

// Initialize category buttons
document.addEventListener("DOMContentLoaded", function () {
  filterProducts("all");
});

// Add to Cart
function addToCart(productName, price) {
  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1,
    });
  }

  updateCartUI();
  showToast(`${productName} ditambahkan ke keranjang!`);
}

// Update Cart UI
function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-gray-500 text-center">Keranjang kosong</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm text-gray-600">Rp ${item.price.toLocaleString(
                      "id-ID"
                    )} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart('${
                  item.name
                }')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
      )
      .join("");
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Rp ${total.toLocaleString("id-ID")}`;
}

// Remove from Cart
function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  updateCartUI();
  showToast("Produk dihapus dari keranjang");
}

// FUNGSI YANG KEMARIN ERROR, PASTIKAN ADA DI SINI
// Open Cart Modal
function openCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
}

// Close Cart Modal
function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    showToast("Keranjang belanja kosong!");
    return;
  }

  showToast("Memproses checkout...");
  setTimeout(() => {
    cart = [];
    updateCartUI();
    closeCart();
    showToast("Pesanan berhasil! Terima kasih telah berbelanja.");
  }, 2000);
}

// Contact Form Submit (Kirim ke WhatsApp)
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const phone = "6285808750161"; // Nomor WhatsApp kamu tanpa 0 di depan
    const text = `Halo, saya ${name} (${email}).%0A%0A${message}`;

    // Buka WhatsApp dengan pesan
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

    // Tampilkan notifikasi (kalau kamu sudah punya fungsi showToast)
    showToast("Pesan Anda berhasil dikirim ke WhatsApp!");

    // Reset form
    this.reset();
  });

// Open Social Media
function openSocial(platform) {
  const urls = {
    instagram: "https://instagram.com/geraldhinoa",
    whatsapp: "https://wa.me/6285808750161",
    shopee: "https://shopee.co.id",
    facebook: "https://facebook.com",
  };

  showToast(`Membuka ${platform}...`);
  // In real implementation, you would open the actual URL
  // window.open(urls[platform], '_blank');
}

// Show Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.remove("translate-y-full");

  setTimeout(() => {
    toast.classList.add("translate-y-full");
  }, 3000);
}

// Add some initial animations
document.addEventListener("DOMContentLoaded", function () {
  // Animate elements on load
  const heroElements = document.querySelectorAll("#home > div > div > div");
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease";

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    }, index * 200);
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-gradient");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Close modal when clicking outside
document.getElementById("cart-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeCart();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCart();
  }
});
