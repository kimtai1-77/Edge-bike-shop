
// ========================================
// COMPARE LIGHTBOX FUNCTIONALITY
// ========================================

/**

 * 
 * @param {Object} hostPageData - Data from the current/host page
 * @param {string} hostPageData.title - Product name/title
 * @param {HTMLElement} hostPageData.imgElement - Image element to clone
 * @param {HTMLElement} hostPageData.contentElement - Content wrapper to clone
 * 
 * @param {Object} targetPageData - Data from the page being compared
 * @param {string} targetPageData.title - Product name/title
 * @param {HTMLElement} targetPageData.imgElement - Image element to clone
 * @param {HTMLElement} targetPageData.contentElement - Content wrapper to clone
 */
function createCompareLightbox(hostPageData, targetPageData) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'compare-overlay';

  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.className = 'compare-lightbox';

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'compare-close-btn';
  closeBtn.setAttribute('aria-label', 'Close comparison');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });

  // Create title section
  const titleSection = document.createElement('div');
  titleSection.className = 'compare-title';
  titleSection.innerHTML = `<span>${hostPageData.title}</span> vs <span>${targetPageData.title}</span>`;

  // Create main comparison container (flex row or column depending on screen size)
  const compareContainer = document.createElement('div');
  compareContainer.className = 'compare-container';

  // --- LEFT SIDE / HOST PAGE ---
  const leftSide = document.createElement('div');
  leftSide.className = 'compare-side compare-side-left';

  // .compare-img section (left)
  const leftImgSection = document.createElement('div');
  leftImgSection.className = 'compare-img';
  const leftImg = hostPageData.imgElement.cloneNode(true);
  leftImgSection.appendChild(leftImg);
  leftSide.appendChild(leftImgSection);

  // .compare-content section (left)
  const leftContentSection = document.createElement('div');
  leftContentSection.className = 'compare-content';
  const leftContent = hostPageData.contentElement.cloneNode(true);
  leftContentSection.appendChild(leftContent);
  leftSide.appendChild(leftContentSection);

  compareContainer.appendChild(leftSide);

  // --- RIGHT SIDE / TARGET PAGE ---
  const rightSide = document.createElement('div');
  rightSide.className = 'compare-side compare-side-right';

  // .compare-img section (right)
  const rightImgSection = document.createElement('div');
  rightImgSection.className = 'compare-img';
  const rightImg = targetPageData.imgElement.cloneNode(true);
  rightImgSection.appendChild(rightImg);
  rightSide.appendChild(rightImgSection);

  // .compare-content section (right)
  const rightContentSection = document.createElement('div');
  rightContentSection.className = 'compare-content';
  const rightContent = targetPageData.contentElement.cloneNode(true);
  rightContentSection.appendChild(rightContent);
  rightSide.appendChild(rightContentSection);

  // Add divider
  const divider = document.createElement('div');
  divider.className = 'compare-divider';
  compareContainer.appendChild(divider);
  compareContainer.appendChild(rightSide);

  // Assemble lightbox
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(titleSection);
  lightbox.appendChild(compareContainer);

  // Assemble overlay
  overlay.appendChild(lightbox);

  // Add to page and show
  document.body.appendChild(overlay);

  // Optional: close on overlay click (outside lightbox)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

// --- Dynamic helper: fetch page and extract required elements ---
async function fetchPageDataFromUrl(url) {
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Failed to fetch target page');
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const titleEl = doc.querySelector('.name-box');
    const imgEl = doc.querySelector('.main-product-img-cont');
    // Try the more specific combined classes first, then fall back
    let contentEl = doc.querySelector('.wrapper.mid-section.dark-section');
    if (!contentEl) contentEl = doc.querySelector('.wrapper.mid-section');
    if (!contentEl) contentEl = doc.querySelector('.wrapper');

    return {
      title: titleEl ? titleEl.textContent.trim() : doc.title || '',
      imgElement: imgEl || document.createElement('div'),
      contentElement: contentEl || document.createElement('div')
    };
  } catch (err) {
    console.error('Error fetching page data:', err);
    throw err;
  }
}

// --- Build host data from current document ---
function gatherHostPageData() {
  const titleEl = document.querySelector('.name-box');
  const imgEl = document.querySelector('.main-product-img-cont');
  let contentEl = document.querySelector('.wrapper.mid-section.dark-section');
  if (!contentEl) contentEl = document.querySelector('.wrapper.mid-section');
  if (!contentEl) contentEl = document.querySelector('.wrapper');

  return {
    title: titleEl ? titleEl.textContent.trim() : document.title || '',
    imgElement: imgEl || document.createElement('div'),
    contentElement: contentEl || document.createElement('div')
  };
}

// --- Click handler for compare buttons ---
async function handleCompareButtonClick(event) {
  event.preventDefault();
  const btn = event.currentTarget;

  // Find closest anchor for the target URL (cards are wrapped in <a>)
  const cardAnchor = btn.closest('a');
  if (!cardAnchor) return console.warn('Compare button not inside a link/card');
  const href = cardAnchor.getAttribute('href');
  if (!href) return console.warn('No href found on card link');

  try {
    // Gather host data from the current page
    const hostData = gatherHostPageData();

    // Show loading indicator while fetching remote page
    showCompareLoader();

    // Fetch and gather target page data
    const targetData = await fetchPageDataFromUrl(href);
    // Open compare lightbox with gathered data
    createCompareLightbox(hostData, targetData);
    // hide loader after creating lightbox
    hideCompareLoader();
  } catch (err) {
    // Graceful fallback: show simple message
    hideCompareLoader();
    alert('Unable to open comparison. See console for details.');
  }
}

// --- Loading indicator helpers ---
function ensureCompareLoader() {
  if (document.querySelector('.compare-loader-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'compare-loader-overlay';
  overlay.innerHTML = `<div class="compare-loader"><div class="spinner"></div><div class="compare-loader-text">Loading comparison…</div></div>`;
  document.body.appendChild(overlay);
}

function showCompareLoader() {
  ensureCompareLoader();
  const el = document.querySelector('.compare-loader-overlay');
  if (el) el.style.display = 'flex';
}

function hideCompareLoader() {
  const el = document.querySelector('.compare-loader-overlay');
  if (el) el.style.display = 'none';
}

// Expose a global function so the compare behaviour can be attached via HTML `onclick`
// Usage in HTML: <button onclick="openCompare(this)">Compare</button>
// The function accepts either an Event or an HTMLElement (the clicked element).
window.openCompare = async function openCompare(elOrEvent) {
  let btn = elOrEvent;
  // If passed an Event, get the currentTarget or target
  if (btn && btn.currentTarget) btn = btn.currentTarget;
  if (btn && btn.target) btn = btn.target;

  // If a DOM element wrapper was passed (e.g. this from onclick), use it
  if (!(btn instanceof HTMLElement)) {
    console.warn('openCompare: expected an Event or HTMLElement');
    return;
  }

  // Find closest anchor for the target URL (cards are wrapped in <a>)
  const cardAnchor = btn.closest('a');
  if (!cardAnchor) return console.warn('Compare button not inside a link/card');
  const href = cardAnchor.getAttribute('href');
  if (!href) return console.warn('No href found on card link');

  try {
    const hostData = gatherHostPageData();
    showCompareLoader();
    const targetData = await fetchPageDataFromUrl(href);
    createCompareLightbox(hostData, targetData);
    hideCompareLoader();
  } catch (err) {
    hideCompareLoader();
    alert('Unable to open comparison. See console for details.');
  }
};