// PopFuel cart — plain localStorage, no build step needed.
// Works across all pages since they all load this file.

const CART_KEY = 'popfuel_cart_v1';
const WISHLIST_KEY = 'popfuel_wishlist_v1';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
}

function addToCart(slug, qty = 1) {
  const product = getProductBySlug(slug);
  if (!product || product.price == null) return;
  const items = getCart();
  const existing = items.find((i) => i.slug === slug);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ slug: product.slug, name: product.name, price: product.price, qty });
  }
  saveCart(items);
}

function updateCartQty(slug, qty) {
  let items = getCart();
  if (qty <= 0) {
    items = items.filter((i) => i.slug !== slug);
  } else {
    items = items.map((i) => (i.slug === slug ? { ...i, qty } : i));
  }
  saveCart(items);
}

function removeFromCart(slug) {
  saveCart(getCart().filter((i) => i.slug !== slug));
}

function clearCart() {
  saveCart([]);
}

function cartSubtotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ---------- Wishlist ---------- */
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(slug) {
  let list = getWishlist();
  list = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return list.includes(slug);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
