# PopFuel — Static Storefront (Plain HTML/CSS/JS)

No build step, no npm, no framework. Open `index.html` directly in a browser, or upload the
whole folder to any hosting (FireFunnels, Hostinger, Netlify drag-drop, GitHub Pages, etc.).

## Files
```
index.html               Homepage — all 12 sections
shop.html                All flavours + category filter (?category=spicy etc.)
product.html              Product detail (?slug=pickle-tickle etc.)
cart.html                 Cart — quantity controls, subtotal
checkout.html              Shipping form + order placement
order-confirmation.html    Order confirmed + tracking UI (?id=PF12345678)
css/style.css              All styles — brand colors/fonts as CSS variables at the top
js/products.js             Product data (edit prices/taglines here)
js/cart.js                 Cart + wishlist logic (localStorage — no backend needed)
js/main.js                 Mobile nav, scroll animations, product card rendering
```

## How the cart works
Pure `localStorage` — no server needed. Add to Cart on any page, it persists across pages
and page reloads on the same browser. Checkout currently **simulates** placing an order
(generates an order ID, clears the cart, redirects to the confirmation page) — it does not
yet email/log the order anywhere. Wire `checkout.html`'s `handleCheckoutSubmit()` function to
a real endpoint (e.g. a Google Apps Script web app posting to a Sheet, matching your usual
form → WhatsApp/Sheets pattern) when ready.

## Editing product data
Open `js/products.js`. Each product is one object:
```js
{ slug: 'pickle-tickle', name: 'Pickle Tickle', price: 8.99, tagline: 'Tangy dill crunch', category: 'Tangy', protein: 10, fibre: 4 }
```
`price: null` and `tagline: null` show as "Price TBD" / "tagline pending" on every page
automatically — fill in the real value once confirmed and it updates everywhere (homepage,
shop, product page) since all pages read from this one file.

## What's real vs. placeholder (do not treat as final)
- **Prices/taglines**: only Pickle Tickle ($8.99), Onion Cream & Sour ($8.49), and Spicy
  Cheddar ($9.49) are real. The other 4 flavours show TBD everywhere — nothing was invented.
- **Photography/logo**: none provided yet — every image is a dashed "photo pending" placeholder.
  Once you have real images, replace the `.img-placeholder` divs with `<img src="...">` tags.
- **Customer reviews**: empty dashed slots, no fabricated testimonials.
- **Marketplace logos** (Amazon/Flipkart/etc. in the "Available On" strip): illustrative
  placeholder list — confirm actual listings before publishing.

## Deploy
Just upload the folder as-is to any static host — no build/install step required:
- **FireFunnels / your usual hosting**: upload all files, keep the folder structure
  (`css/`, `js/` subfolders must stay next to the `.html` files).
- **Netlify**: drag the whole folder onto app.netlify.com/drop.
- **GitHub Pages**: push the folder to a repo, enable Pages in Settings — this works fine
  now since there's no server-side code, just plain files.
