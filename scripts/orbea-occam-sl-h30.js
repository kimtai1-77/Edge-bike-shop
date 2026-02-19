

// swap bikes by colour

document.addEventListener('DOMContentLoaded', () => {
  const mainImg = document.querySelector('.main-product-img');
  const colorDots = document.querySelectorAll('.color');

  const copperSrc = '../images/Orbea_Occam_SL_H30_cropped.webp';
  const greenSrc = '../images/Orbea_Occam_SL_H30_spaceship_green_cropped.webp';

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
        } else if (dot.classList.contains('spaceship-green')) {
          mainImg.src = greenSrc;
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
        availabilityBlock.classList.add('blue');
        info.textContent = 'Available';
      } else if (size === 'L') {
        availabilityBlock.classList.add('gray');
        info.textContent = 'Out of Stock';
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