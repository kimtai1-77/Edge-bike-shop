

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








// make selected size box active
const sizeBoxes = document.querySelectorAll('.size-box');

sizeBoxes.forEach(currentItem => {
    currentItem.addEventListener('click', () => {
        // remove active from all boxes
        sizeBoxes.forEach(sizeBox => sizeBox.classList.remove('active'));
        // add active to clicked size box
        currentItem.classList.add('active');
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

  const copperSrc = './images/LAUFEY_copper_main_cropped.png';
  const silverSrc = './images/Laufey_silver_main_2_cropped.png';

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
  const notifyYes = document.querySelector('.notify-yes');
  const notifyCancel = document.querySelector('.notify-cancel');

  // Hide availability block initially
  availabilityBlock.classList.add('transparent');

  sizeBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const size = box.textContent.trim();

      // reset availability and dropdown every time
      availabilityBlock.className = 'availability';
      notifyDropdown.classList.remove('open'); // collapse dropdown

      if (size === 'S') {
        availabilityBlock.classList.add('blue');
        info.textContent = 'Available';
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
});











