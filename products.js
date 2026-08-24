// PopFuel product data.
// price / tagline are null where the client hasn't confirmed real data yet —
// the UI shows "Price TBD" / "tagline pending" for these. Do not fill in
// guessed numbers here; edit with real values once confirmed.

const PRODUCTS = [
  { slug: 'sea-salt-classic', name: 'Sea Salt Classic', price: null, tagline: null, category: 'Classic', protein: 10, fibre: 4 },
  { slug: 'chilli-lime', name: 'Chilli Lime', price: null, tagline: null, category: 'Spicy', protein: 10, fibre: 4 },
  { slug: 'peri-peri', name: 'Peri Peri', price: null, tagline: null, category: 'Spicy', protein: 10, fibre: 4 },
  { slug: 'choco-crunch', name: 'Choco Crunch', price: null, tagline: null, category: 'Sweet', protein: 10, fibre: 4 },
  { slug: 'pickle-tickle', name: 'Pickle Tickle', price: 8.99, tagline: 'Tangy dill crunch', category: 'Tangy', protein: 10, fibre: 4 },
  { slug: 'onion-cream-sour', name: 'Onion Cream & Sour', price: 8.49, tagline: 'Cool, creamy, sharp', category: 'Tangy', protein: 10, fibre: 4 },
  { slug: 'spicy-cheddar', name: 'Spicy Cheddar', price: 9.49, tagline: 'Sharp heat, real cheese', category: 'Spicy', protein: 10, fibre: 4 },
];

const CATEGORIES = ['Classic', 'Spicy', 'Sweet', 'Tangy'];

function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

function formatPrice(price) {
  return price != null ? `$${price.toFixed(2)}` : null;
}
