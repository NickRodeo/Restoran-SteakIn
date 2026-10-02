// =====================================================================
//  Kode untuk mengatur navbar, footer, keranjang, popup
// =====================================================================

const CART_STORAGE_KEY = "steakin_cart";
const currentPage = document.body.dataset.page;

const NAV_LINKS = [
  { href: "index.html", label: "Beranda", page: "home" },
  { href: "menu.html", label: "Menu", page: "menu" },
  { href: "gallery.html", label: "Galeri", page: "gallery" },
];

// ---------- Helper ----------
function formatRupiah(priceInThousands) {
  return "Rp " + (priceInThousands * 1000).toLocaleString("id-ID");
}

function createImageTag(imagePath, cssClass) {
  const path = imagePath || DEFAULT_IMAGE;
  return `<img class="${cssClass}" src="${path}" alt="" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'">`;
}

function createAnimatedLetters(text, startIndex) {
  return [...text]
    .map(
      (letter, offset) =>
        `<span style="--i:${startIndex + offset}">${
          letter === " " ? "&nbsp;" : letter
        }</span>`
    )
    .join("");
}

function queryOne(selector) {
  return document.querySelector(selector);
}

// ---------- Keranjang ----------
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {}
}

let cartItems = loadCart(); // { key, name, price, quantity }

function calculateCartTotal() {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function addToCart(key, name, price) {
  const existingItem = cartItems.find((item) => item.key === key);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ key, name, price, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast("✓ " + name + " masuk keranjang");
}

function changeCartQuantity(key, change) {
  const item = cartItems.find((cartItem) => cartItem.key === key);
  if (!item) return;
  item.quantity += change;
  if (item.quantity < 1) {
    cartItems = cartItems.filter((cartItem) => cartItem !== item);
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  queryOne("#cart-count").textContent = totalQuantity;
  queryOne("#cart-total").textContent = formatRupiah(calculateCartTotal());

  if (cartItems.length === 0) {
    queryOne("#cart-items").innerHTML =
      '<p class="empty" style="padding:40px 0">Keranjang masih kosong.</p>';
    return;
  }

  queryOne("#cart-items").innerHTML = cartItems
    .map(
      (item) => `
    <div class="it">
      <div>${item.name}<br><small>${formatRupiah(item.price)}</small></div>
      <div class="q">
        <button data-cart-action="decrease" data-key="${item.key}">−</button>
        ${item.quantity}
        <button data-cart-action="increase" data-key="${item.key}">+</button>
      </div>
    </div>`
    )
    .join("");
}

// ---------- Pembayaran (simulasi) ----------
const PAY_ANIMATION_DURATION_MS = 3000;
let isPaymentInProgress = false;

function payCart() {
  if (isPaymentInProgress) return;
  if (cartItems.length === 0) {
    showToast("Keranjang masih kosong");
    return;
  }
  isPaymentInProgress = true;
  const payButton = queryOne("#pay-button");
  const orderNumber = "#SI" + Math.floor(1000 + Math.random() * 9000);
  const totalPaid = calculateCartTotal();

  payButton.classList.add("is-paying");

  setTimeout(() => {
    queryOne(
      "#success-detail"
    ).innerHTML = `No. Pesanan <b>${orderNumber}</b> • Total <b>${formatRupiah(
      totalPaid
    )}</b>`;
    cartItems = [];
    saveCart();
    renderCart();
    setCartDrawerOpen(false);
    queryOne("#success-modal").classList.add("show");
    payButton.classList.remove("is-paying");
    isPaymentInProgress = false;
  }, PAY_ANIMATION_DURATION_MS);
}

// ---------- Popup & drawer ----------
function setCartDrawerOpen(isOpen) {
  queryOne("#cart-drawer").classList.toggle("show", isOpen);
  queryOne("#overlay").classList.toggle("show", isOpen);
}

let toastTimer;
function showToast(message) {
  const toast = queryOne("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

// ---------- Layout (navbar + footer + keranjang) ----------
function renderNavbar() {
  const linksHtml = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}" class="${
        link.page === currentPage ? "on" : ""
      }">${link.label}</a>`
  ).join("");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <header class="nav"><div class="wrap">
      <a href="index.html"><img class="lg" src="img/logo.png" alt="Steak In"></a>
      <nav class="links">${linksHtml}</nav>
      <button class="cartbtn" id="cart-button">KERANJANG<b id="cart-count">0</b></button>
    </div></header>`
  );
}

function renderFooterAndCartUi() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <footer>
      <img src="img/logo.png" alt=""><br>
      Jalan Ahmad Yani No.17 • Jalan M. Sohor No. 57<br>
      @steak_in.official • 100% Halal<br>
      <small>Website demo — Made by Raihan</small>
    </footer>

    <div class="ov" id="overlay"></div>

    <aside class="drawer" id="cart-drawer">
      <h2>Pesanan Anda<button class="x" id="cart-close">×</button></h2>
      <div class="items" id="cart-items"></div>
      <div class="tot"><span>Total</span><span id="cart-total"></span></div>
      <button class="pay" id="pay-button">
        <div class="outline"></div>
        <div class="state state--default">
          <div class="icon">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g style="filter: url(#shadow)">
              <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor"></path>
              <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor"></path>
            </g>
            <defs><filter id="shadow"><fedropshadow dx="0" dy="1" stdDeviation="0.6" flood-opacity="0.5"></fedropshadow></filter></defs>
          </svg>
          </div>
          <p id="pay-label"></p>
        </div>
        <div class="state state--sent">
          <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" stroke-width="0.5px" stroke="black">
            <g style="filter: url(#shadow)">
              <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"></path>
              <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"></path>
            </g>
          </svg>
          </div>
          <p id="pay-sent-label"></p>
        </div>
      </button>
    </aside>

    <div class="modal" id="success-modal"><div class="mb">
      <svg viewBox="0 0 100 100" fill="none" stroke="#d0a97e" stroke-width="5" stroke-linecap="round">
        <circle cx="50" cy="50" r="30"/><path d="M38 51l9 9 17-19"/>
      </svg>
      <h2>Pembayaran Berhasil!</h2>
      <p id="success-detail"></p>
      <p style="margin:10px 0 20px">Terima kasih telah memesan di <b class="logo-font" style="font-weight:400">Steak In</b>. Pesanan Anda sedang disiapkan.</p>
      <button class="btn solid" id="success-close">Tutup</button>
    </div></div>

    <div class="toast" id="toast"></div>`
  );

  queryOne("#pay-label").innerHTML = createAnimatedLetters("Bayar Sekarang", 0);
  queryOne("#pay-sent-label").innerHTML = createAnimatedLetters("Sukses", 5);
}

function setupCartEvents() {
  queryOne("#cart-button").addEventListener("click", () =>
    setCartDrawerOpen(true)
  );
  queryOne("#cart-close").addEventListener("click", () =>
    setCartDrawerOpen(false)
  );
  queryOne("#overlay").addEventListener("click", () =>
    setCartDrawerOpen(false)
  );
  queryOne("#pay-button").addEventListener("click", payCart);
  queryOne("#success-close").addEventListener("click", () =>
    queryOne("#success-modal").classList.remove("show")
  );
  queryOne("#cart-items").addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const change = button.dataset.cartAction === "increase" ? 1 : -1;
    changeCartQuantity(button.dataset.key, change);
  });
}

renderNavbar();
renderFooterAndCartUi();
setupCartEvents();
renderCart();
