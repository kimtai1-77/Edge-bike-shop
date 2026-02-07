

// Toggle mobile menu and overlay 

function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.icon-hamburger');
    const closeIcon = document.querySelector('.icon-close');
    const body = document.body;

    // toggle menu + overlay
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('lock-scroll'); // lock/unlock scroll

    // toggle icons
    if (menu.classList.contains('active')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// attach click listener to hamburger button
document.querySelector('.hamburger-btn').addEventListener('click', toggleMobileMenu);

// attach click listener to overlay (closes menu when background is clicked)
document.querySelector('.mobile-overlay').addEventListener('click', toggleMobileMenu);





// Toggle units
// Get both unit options
const unitOptions = document.querySelectorAll('.toggle-measurement-unit .unit-option');
const sizeRanges = document.querySelectorAll('.size-range');

unitOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active from both
        unitOptions.forEach(o => o.classList.remove('active'));
        // Add active to clicked one
        option.classList.add('active');

        // Update all size ranges based on selected unit
        const unit = option.dataset.unit;
        sizeRanges.forEach(range => {
            if (unit === 'cm') {
                range.textContent = range.dataset.cm + ' cm';
            } else {
                range.textContent = range.dataset.inches + ' in';
            }
        });
    });
});






// percentage discount calculator

// Discount calculation function
function updateAllDiscounts() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const cards = carousel.querySelectorAll(".card");

    cards.forEach(card => {
      const oldPriceEl = card.querySelector(".card-old-price");
      const newPriceEl = card.querySelector(".card-price");
      const discountEl = card.querySelector(".card-discount");

      // Skip cards without full price/discount structure
      if (!oldPriceEl || !newPriceEl || !discountEl) return;

      // Extract numeric values only
      const oldPrice = parseFloat(oldPriceEl.textContent.replace(/\D/g, ""));
      const newPrice = parseFloat(newPriceEl.textContent.replace(/\D/g, ""));

      if (oldPrice > newPrice) {
        const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
        discountEl.textContent = `${discount}% Off`;
        discountEl.style.display = "block";
        oldPriceEl.style.display = "inline"; // show old price
      } else {
        discountEl.style.display = "none";
        oldPriceEl.style.display = "none"; // hide old price if equal or less
      }
    });
  });
}

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
  updateAllDiscounts();

  // Set up MutationObserver to watch for price changes
  const observer = new MutationObserver(() => {
    updateAllDiscounts();
  });

  // Target: watch all carousels for changes in child nodes/text
  document.querySelectorAll(".carousel").forEach(carousel => {
    observer.observe(carousel, {
      subtree: true,       // watch all descendants
      childList: true,     // watch for added/removed nodes
      characterData: true, // watch for text changes
    });
  });
});



