

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





// Toggle bike size units
// Get both unit options
const unitOptions = document.querySelectorAll('.toggle-measurement-unit .unit-option');
const sizeRanges = document.querySelectorAll('.size-range');

unitOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active from both
        unitOptions.forEach(currentItem => currentItem.classList.remove('active'));
        // Add active to clicked one
        option.classList.add('active');

        // Update all size ranges based on selected unit
        const unit = option.dataset.unit;
        sizeRanges.forEach(range => {
            if (unit === 'cm') {
                range.textContent = range.dataset.cm + ' cm';
            } else {
                range.textContent = range.dataset.feet;
            }
        });
    });
});





// make selected frame size box active
const sizeBoxes = document.querySelectorAll('.size-box');

sizeBoxes.forEach(currentItem => {
    currentItem.addEventListener('click', () => {
        // remove active from all boxes
        sizeBoxes.forEach(sizeBox => sizeBox.classList.remove('active'));
        // add active to clicked size box
        currentItem.classList.add('active');
    });
});





// percentage discount calculator

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



// increment / decrement quantity

document.addEventListener('DOMContentLoaded', () => {
  // quantity increment/decrement
  document.querySelectorAll('.quantity-box').forEach(box => {
    const input = box.querySelector('.quantity');
    const increment = box.querySelector('.increment');
    const decrement = box.querySelector('.decrement');

    increment.addEventListener('click', () => {
      input.value = parseInt(input.value, 10) + 1;
    });

    decrement.addEventListener('click', () => {
      input.value = Math.max(parseInt(input.value, 10) - 1, parseInt(input.min, 10));
    });
  });

  // make selected size box active
  const sizeBoxes = document.querySelectorAll('.size-box');
  sizeBoxes.forEach(currentItem => {
    currentItem.addEventListener('click', () => {
      sizeBoxes.forEach(sizeBox => sizeBox.classList.remove('active'));
      currentItem.classList.add('active');
    });
  });

  // open sizing-menu
  const sizingGuide = document.querySelector('.sizing-guide');
  const sizingMenu = document.querySelector('.sizing-menu');
  const arrows = sizingGuide.querySelectorAll('svg');
  const arrowDown = arrows[0]; // 
  const arrowUp = arrows[1];   // 

  sizingGuide.addEventListener('click', () => {
    const isOpen = sizingMenu.classList.toggle('open');

    if (isOpen) {
      arrowDown.style.display = 'none';
      arrowUp.style.display = 'inline';
    } else {
      arrowDown.style.display = 'inline';
      arrowUp.style.display = 'none';
    }
  });
});



// open sizing-menu
const sizingGuide = document.querySelector('.sizing-guide');
const sizingMenu = document.querySelector('.sizing-menu');
const arrows = sizingGuide.querySelectorAll('svg');
const arrowDown = arrows[0]; // first SVG
const arrowUp = arrows[1];   // second SVG

sizingGuide.addEventListener('click', () => {
    const isOpen = sizingMenu.classList.toggle('.open');

    if (isOpen) {
        arrowDown.style.display = 'none';
        arrowUp.style.display = 'inline';
    } else {
        arrowDown.style.display = 'inline';
        arrowUp.style.display = 'none';
    }
});



