// Shared behaviors used across every page: mobile nav toggle, scroll-reveal
// animations, and the product-card HTML generator (so product markup stays
// consistent between the homepage, shop page, combo page, etc.)

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

function wishlistIconSvg(saved) {
  return saved ? '♥' : '♡';
}

// Returns the HTML for one product card. `wishlistToggle` wires the heart button.
function productCardHTML(product) {
  const wished = getWishlist().includes(product.slug);
  const priceHtml = product.price != null
    ? `<span class="price">$${product.price.toFixed(2)}</span>`
    : `<span class="price-tbd">Price TBD</span>`;
  const taglineHtml = product.tagline
    ? product.tagline
    : `<span class="tbd-text">tagline pending</span>`;

  return `
    <div class="product-card">
      <a href="product.html?slug=${product.slug}" style="position:relative; display:block;">
        <div class="img-placeholder ratio-square">
          ${product.name}<br><small>photo pending</small>
        </div>
        <button class="wishlist-btn ${wished ? 'saved' : ''}" onclick="event.preventDefault(); handleWishlistClick(this,'${product.slug}')" aria-label="Toggle wishlist">
          ${wishlistIconSvg(wished)}
        </button>
      </a>
      <div class="product-card-body">
        <a href="product.html?slug=${product.slug}"><h3>${product.name}</h3></a>
        <p class="product-card-tagline">${taglineHtml}</p>
        <div class="product-card-footer">
          ${priceHtml}
          <button class="add-to-cart-btn" ${product.price == null ? 'disabled' : ''} onclick="handleAddToCartClick(this,'${product.slug}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function handleWishlistClick(btn, slug) {
  const saved = toggleWishlist(slug);
  btn.classList.toggle('saved', saved);
  btn.textContent = wishlistIconSvg(saved);
}

function handleAddToCartClick(btn, slug) {
  addToCart(slug, 1);
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  setTimeout(() => { btn.textContent = original; }, 1200);
}

function renderProductGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(productCardHTML).join('');
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
