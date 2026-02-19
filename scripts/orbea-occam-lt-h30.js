

// swap bikes by colour

document.addEventListener('DOMContentLoaded', () => {
  const mainImg = document.querySelector('.main-product-img');
  const colorDots = document.querySelectorAll('.color');

  const blackSrc = '../images/Orbea_OCCAM_LT_H30_black_cropped.webp';
  const copperSrc = '../images/Orbea_OCCAM_LT_H30_copper_cropped.webp';


  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      // remove active from all dots
      colorDots.forEach(c => c.classList.remove('active'));
      dot.classList.add('active');

      // fade out
      mainImg.style.opacity = 0;

      // after fade-out completes, swap src and fade back in
      setTimeout(() => {
        if (dot.classList.contains('lavender')) {
          mainImg.src = lavenderSrc;
        } else if (dot.classList.contains('jet-black')) {
          mainImg.src = blackSrc;
        } else if (dot.classList.contains('copper')) {
          mainImg.src = copperSrc;
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
        availabilityBlock.classList.add('blue');
        info.textContent = 'Available';
        preOrderDropdown.classList.add('open'); 
      } else if (size === 'M') {
        availabilityBlock.classList.add('blue');
        info.textContent = 'Available';
      } else if (size === 'L') {
        availabilityBlock.classList.add('gray');
        info.textContent = 'Out of stock';
        notifyDropdown.classList.add('open'); // smooth slide down
      } else if (size === 'XL') {
        availabilityBlock.classList.add('blue');
        info.textContent = 'Available';
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