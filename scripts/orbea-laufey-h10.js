

// swap out main product images on homepage

document.addEventListener('DOMContentLoaded', () => {
  const mainImg = document.querySelector('.main-product-img');
  const scrollImgs = document.querySelectorAll('.scroll-img');

  scrollImgs.forEach(scrollImg => {
    scrollImg.style.cursor = 'pointer';

    scrollImg.addEventListener('click', () => {
      // fade out main image
      mainImg.classList.add('fade-out');

      // wait for fade-out to finish
      mainImg.addEventListener('transitionend', function handler() {
        // swap src + alt
        const tempSrc = mainImg.src;
        const tempAlt = mainImg.alt;
        mainImg.src = scrollImg.src;
        mainImg.alt = scrollImg.alt;
        scrollImg.src = tempSrc;
        scrollImg.alt = tempAlt;

        // remove fade-out, trigger fade-in
        mainImg.classList.remove('fade-out');
        mainImg.classList.add('fade-in');

        // clean up listener
        mainImg.removeEventListener('transitionend', handler);

        // remove fade-in class after animation completes
        setTimeout(() => {
          mainImg.classList.remove('fade-in');
        }, 300);
      });
    });
  });
});




// swap bikes by colour

document.addEventListener('DOMContentLoaded', () => {
  const mainImg = document.querySelector('.main-product-img');
  const colorDots = document.querySelectorAll('.color');

  const copperSrc = '../images/Orbea_Laufey_H10_copper_cropped.webp';
  const silverSrc = '../images/Orbea_Laufey_H10_silver_cropped.webp';

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      // remove active from all dots
      colorDots.forEach(c => c.classList.remove('active'));
      dot.classList.add('active');

      // fade out
      mainImg.style.opacity = 0;

      // after fade-out completes, swap src and fade back in
      setTimeout(() => {
        if (dot.classList.contains('copper')) {
          mainImg.src = copperSrc;
        } else if (dot.classList.contains('silver')) {
          mainImg.src = silverSrc;
        }

        // wait for the new image to load before fading in
        mainImg.onload = () => {
          mainImg.style.opacity = 1;
        };
      }, 300); // matches your CSS transition duration
    });
  });
});




// update availablity on size selection

document.addEventListener('DOMContentLoaded', () => {
  const sizeBoxes = document.querySelectorAll('.size-box');
  const availabilityBlock = document.querySelector('.availability');
  const info = availabilityBlock.querySelector('.availability-info');
  const notifyDropdown = document.querySelector('.notify-dropdown');
  const preOrderDropdown = document.querySelector('.pre-order-dropdown');
  const notifyYes = document.querySelector('.notify-yes');
  const notifyCancel = document.querySelector('.notify-cancel');

  // Hide availability block initially
  availabilityBlock.classList.add('transparent');

  sizeBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const size = box.textContent.trim();

      // reset availability and dropdown every time
      availabilityBlock.className = 'availability';
      notifyDropdown.classList.remove('open');
      preOrderDropdown.classList.remove('open');

      if (size === 'S') {
        availabilityBlock.classList.add('orange');
        info.textContent = 'Available for pre-order - will be ready for pickup or delivery in 2 weeks. (pre-orders get 10% off)';
        preOrderDropdown.classList.add('open'); 
      } else if (size === 'M') {
        availabilityBlock.classList.add('red');
        info.textContent = 'Less than 3 bikes remaining';
      } else if (size === 'L') {
        availabilityBlock.classList.add('gray');
        info.textContent = 'Out of stock';
        notifyDropdown.classList.add('open'); // smooth slide down
      } else if (size === 'XL') {
        availabilityBlock.classList.add('orange');
        info.textContent = 'Few bikes remaining';
      }
    });
  });

  notifyYes.addEventListener('click', () => {
    alert('This feature is not available in the demo version');
    notifyDropdown.classList.remove('open');
  });

  notifyCancel.addEventListener('click', () => {
    notifyDropdown.classList.remove('open'); // smooth slide up
  });

  preOrderDropdown.querySelector('.pre-order-yes').addEventListener('click', () => {
    alert('This feature is not available in the demo version');
    preOrderDropdown.classList.remove('open');
  });

  preOrderDropdown.querySelector('.pre-order-cancel').addEventListener('click', () => {
    preOrderDropdown.classList.remove('open'); // smooth slide up
  });
});













