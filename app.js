
// Login modal elements
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const loginClose = document.getElementById("loginClose");
const phoneInput = document.getElementById("phoneInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

// Address modal elements
const addressModal = document.getElementById("addressModal");
const addressClose = document.getElementById("addressClose");
const saveAddressBtn = document.getElementById("saveAddressBtn");

let USER = JSON.parse(localStorage.getItem("user") || "null");
let ADDRESS = JSON.parse(localStorage.getItem("address") || "null");

// Login flow
loginBtn.onclick = () => {
  loginModal.classList.remove("hidden");
};
loginClose.onclick = () => loginModal.classList.add("hidden");

sendOtpBtn.onclick = () => {
  if (!phoneInput.value.trim()) return showToast("Enter phone");
  otpInput.style.display = "block";
  verifyOtpBtn.classList.remove("hidden");
  showToast("OTP sent (demo: 1234)");
};

verifyOtpBtn.onclick = () => {
  if (otpInput.value.trim() === "1234") {
    USER = { phone: phoneInput.value.trim() };
    localStorage.setItem("user", JSON.stringify(USER));
    showToast("Logged in");
    loginModal.classList.add("hidden");
    loginBtn.textContent = USER.phone;
  } else {
    showToast("Invalid OTP");
  }
};

// Address flow
document.getElementById("checkoutBtn").onclick = () => {
  if (!USER) { showToast("Please login first"); loginModal.classList.remove("hidden"); return; }
  if (!ADDRESS) { addressModal.classList.remove("hidden"); return; }
  placeOrder();
};

addressClose.onclick = () => addressModal.classList.add("hidden");

saveAddressBtn.onclick = () => {
  ADDRESS = {
    name: document.getElementById("addrName").value.trim(),
    phone: document.getElementById("addrPhone").value.trim(),
    line: document.getElementById("addrLine").value.trim(),
    pin: document.getElementById("addrPin").value.trim(),
    city: document.getElementById("addrCity").value.trim()
  };
  localStorage.setItem("address", JSON.stringify(ADDRESS));
  addressModal.classList.add("hidden");
  placeOrder();
};

// Place order
function placeOrder() {
  const orderId = "IF" + Date.now();
 
  state.cart = [];
  saveCart();
  closeCart();
}
// Page load par user check
const savedUser = JSON.parse(localStorage.getItem("user") || "null");
if (savedUser && savedUser.phone) {
  const loginBtnEl = document.getElementById("loginBtn");
  if (loginBtnEl) loginBtnEl.textContent = savedUser.phone;
}
const addVideoBtn = document.getElementById("addVideoBtn");
console = document.getElementById("customVideo");

addVideoBtn.onclick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/mp4,video/webm";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      customVideo.src = url;
      videoPreview.classList.remove("hidden");
    }
  };
  input.click();
};
const addVideoBtn = document.getElementById("addVideoBtn");
const videoPreview = document.getElementById("videoPreview");
const customVideo = document.getElementById("customVideo");

if (addVideoBtn) {
  addVideoBtn.onclick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/mp4,video/webm";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        customVideo.src = url;
        videoPreview.classList.remove("hidden");
      }
    };
    input.click();
  };
}
const addVideoBtn = document.getElementById("addVideoBtn");
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop — Insta Fashion</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    body { background:#0b0b0b; color:#fff; font-family:Inter,sans-serif; margin:0; }
    header.shop-header {
      padding:1rem 2rem; display:flex; justify-content:space-between; align-items:center;
      background:#111; border-bottom:1px solid #222;
    }
    header.shop-header h1 { font-size:1.4rem; margin:0; }
    .filters { display:flex; gap:.5rem; flex-wrap:wrap; padding:1rem 2rem; background:#0f0f0f; border-bottom:1px solid #222; }
    .filters select, .filters input { background:#111; border:1px solid #333; color:#fff; padding:.5rem; border-radius:.4rem; }
    .product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem; padding:1rem 2rem; }
    .product-card { background:#121212; border:1px solid #222; border-radius:.6rem; overflow:hidden; display:flex; flex-direction:column; transition:transform .2s ease; cursor:pointer; }
    .product-card:hover { transform:translateY(-4px); border-color:#00e0a4; }
    .product-card img { width:100%; height:260px; object-fit:cover; }
    .badge { position:absolute; top:.5rem; left:.5rem; background:#00e0a4; color:#00130d; padding:.2rem .5rem; border-radius:.4rem; font-size:.75rem; font-weight:600; }
    .product-info { padding:.8rem; flex:1; display:flex; flex-direction:column; }
    .product-info h4 { margin:.2rem 0; font-size:1rem; }
    .product-info p { margin:0; color:#9aa0a6; font-size:.85rem; }
    .price-row { margin-top:auto; display:flex; justify-content:space-between; align-items:center; }
    .price { font-weight:700; color:#00e0a4; }
    .add-btn { background:#00e0a4; color:#00130d; border:0; padding:.4rem .8rem; border-radius:.4rem; cursor:pointer; font-weight:600; }
    /* Modal */
    .modal { position:fixed; inset:0; background:rgba(0,0,0,.6); display:none; align-items:center; justify-content:center; z-index:100; }
    .modal-content { background:#121212; border-radius:.6rem; max-width:800px; width:95%; overflow:hidden; display:flex; flex-wrap:wrap; }
    .modal img { width:50%; object-fit:cover; }
    .modal-details { padding:1rem; flex:1; display:flex; flex-direction:column; }
    .size-row { display:flex; gap:.4rem; margin:.6rem 0; }
    .size { border:1px solid #333; padding:.4rem .7rem; border-radius:.4rem; cursor:pointer; }
    .size.active { background:#1c1c1c; }
    /* Cart Drawer */
    .drawer { position:fixed; top:0; right:-400px; width:380px; height:100%; background:#121212; border-left:1px solid #222; z-index:200; display:flex; flex-direction:column; transition:right .3s ease; }
    .drawer.open { right:0; }
    .drawer-header { padding:1rem; border-bottom:1px solid #222; display:flex; justify-content:space-between; align-items:center; }
    .drawer-body { flex:1; overflow:auto; padding:1rem; display:flex; flex-direction:column; gap:.8rem; }
    .cart-item { display:flex; gap:.6rem; border:1px solid #222; border-radius:.4rem; padding:.5rem; }
    .cart-item img { width:64px; height:64px; object-fit:cover; border-radius:.4rem; }
    .drawer-footer { border-top:1px solid #222; padding:1rem; }
    .primary { background:#00e0a4; color:#00130d; border:0; padding:.6rem; border-radius:.4rem; font-weight:700; cursor:pointer; width:100%; }
  </style>
</head>
<body>

<header class="shop-header">
  <h1>🛍 Insta Fashion Premium Shop</h1>
  <div>
    <button id="cartBtn" class="ghost">🛒 Cart (<span id="cartCount">0</span>)</button>
    <a href="index.html" class="ghost">⬅ Back</a>
  </div>
</header>

<div class="filters">
  <input type="text" id="searchBox" placeholder="Search products...">
  <select id="sortSelect">
    <option value="popularity">Sort by Popularity</option>
    <option value="priceAsc">Price: Low to High</option>
    <option value="priceDesc">Price: High to Low</option>
    <option value="newest">Newest</option>
  </select>
</div>

<main class="product-grid" id="productGrid"></main>

<!-- Quick View Modal -->
<div class="modal" id="quickModal">
  <div class="modal-content">
    <img id="modalImg" src="" alt="">
    <div class="modal-details">
      <h2 id="modalTitle"></h2>
      <p id="modalBrand" class="muted"></p>
      <div class="price-row">
        <span id="modalPrice" class="price"></span>
      </div>
      <div class="size-row" id="sizeRow"></div>
      <button id="addToCartBtn" class="primary">Add to Cart</button>
      <button id="closeModal" class="ghost" style="margin-top:.5rem">Close</button>
    </div>
  </div>
</div>

<!-- Cart Drawer -->
<div class="drawer" id="cartDrawer">
  <div class="drawer-header">
    <h3>Your Cart</h3>
    <button id="closeCart" class="ghost">✕</button>
  </div>
  <div class="drawer-body" id="cartItems"></div>
  <div class="drawer-footer">
    <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
      <span>Total</span><b id="cartTotal">₹0</b>
    </div>
    <button class="primary">Checkout</button>
  </div>
</div>

<script>
  const PRODUCTS = [
    {id:1,title:"Premium Cotton T‑Shirt",brand:"Insta Basics",price:699,img:"assets/placeholder.jpg",sizes:["S","M","L"],popularity:98,createdAt:Date.now()-86400000*6},
    {id:2,title:"Slim Fit Denim",brand:"BlueForge",price:1499,img:"assets/placeholder.jpg",sizes:["30","32","34"],popularity:92,createdAt:Date.now()-86400000*4},
    {id:3,title:"Floral Summer Dress",brand:"Lush",price:1299,img:"assets/placeholder.jpg",sizes:["S","M","L"],popularity:95,createdAt:Date.now()-86400000*3},
    {id:4,title:"Athletic Running Shoes",brand:"SwiftStep",price:1999,img:"assets/placeholder.jpg",sizes:["7","8","9"],popularity:90,createdAt:Date.now()-86400000*8}
  ];

  let cart = [];
  const grid = document.getElementById("productGrid");
  const searchBox = document.getElementById("searchBox");
  const sortSelect = document.getElementById("sortSelect");
  const modal = document.getElementById("quickModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalBrand = document.getElementById("modalBrand");
  const modalPrice = document.getElementById("modalPrice");
  const sizeRow = document.getElementById("sizeRow");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const cartBtn
const PRODUCTS = [
  {id:1,title:"Premium Cotton T‑Shirt",brand:"Insta Basics",price:699,img:"assets/placeholder.jpg",sizes:["S","M","L"],popularity:98,createdAt:Date.now()-86400000*6},
  {id:2,title:"Slim Fit Denim",brand:"BlueForge",price:1499,img:"assets/placeholder.jpg",sizes:["30","32","34"],popularity:92,createdAt:Date.now()-86400000*4},
  {id:3,title:"Floral Summer Dress",brand:"Lush",price:1299,img:"assets/placeholder.jpg",sizes:["S","M","L"],popularity:95,createdAt:Date.now()-86400000*3},
  {id:4,title:"Athletic Running Shoes",brand:"SwiftStep",price:1999,img:"assets/placeholder.jpg",sizes:["7","8","9"],popularity:90,createdAt:Date.now()-86400000*8},
  // 👇 Ye do naye products add karo
  {id:5,title:"Silver Analog Watch",brand:"EdgeTime",price:1699,img:"assets/placeholder.jpg",sizes:[],popularity:88,createdAt:Date.now()-86400000*2},
  {id:6,title:"Kurta Set",brand:"Raipur Royale",price:1599,img:"assets/placeholder.jpg",sizes:["M","L","XL"],popularity:86,createdAt:Date.now()-86400000*1}
];
const PRODUCTS = [
  {
    id: 1,
    title: "Premium Cotton T‑Shirt",
    brand: "Insta Basics",
    price: 699,
    img: "assets/placeholder.jpg",
    rating: 4.5,
    delivery: "30 min delivery"
  },
  {
    id: 2,
    title: "Slim Fit Denim",
    brand: "BlueForge",
    price: 1499,
    img: "assets/placeholder.jpg",
    rating: 4.2,
    delivery: "Express shipping"
  }
];

const grid = document.getElementById("productGrid");

function renderProducts() {
  grid.innerHTML = "";
  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="product-info">
        <h4>${p.title}</h4>
        <p>${p.brand}</p>
        <div class="price">₹${p.price}</div>
        <div class="rating">⭐ ${p.rating}</div>
        <div class="delivery">${p.delivery}</div>
        <button class="card-btn" onclick="openProduct(${p.id})">View</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  alert(Opening product: ${product.title});
  // Yahan tum modal ya cart drawer trigger kar sakte ho
}

renderProducts();
document.getElementById("shopNowBtn").onclick = (e) => {
  e.preventDefault();
  window.location.href = "shop.html";
}
card.innerHTML = `
  <img src="${p.img}" alt="${p.title}">
  <div class="info">
    <h4>${p.title}</h4>
    <p>${p.brand}</p>
    <div class="price">₹${p.price}</div>
    <div class="rating">⭐ ${p.rating}</div>
    <div class="delivery">${p.delivery}</div>
    <a href="product.html?id=${p.id}" class="view-btn">Show</a>
  </div>
`;
