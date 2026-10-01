// =====================================================================
//  HALAMAN MENU: promo, filter kategori, pencarian, kartu menu
// =====================================================================

let selectedCategory = "Semua";
let searchKeyword = "";

// ---------- Promo ----------

function renderPromos() {
  queryOne("#promo-list").innerHTML = PROMOS.map(
    (promo) => `
    <div class="glass" style="--r:${promo.rotation}">
      ${createImageTag(promo.image, "promo-photo")}
      <span class="tag">${promo.label}</span>
      <h3>${promo.name}</h3>
      <p>${promo.description}</p>
      <s>${formatRupiah(promo.normalPrice)}</s>
      <div class="pr">${formatRupiah(promo.promoPrice)}</div>
      <button class="add" data-promo-id="${promo.id}">PESAN PROMO</button>
    </div>`
  ).join("");
}

// ---------- Filter kategori ----------

function renderCategoryChips() {
  const categories = [
    "Semua",
    ...new Set(MENU_ITEMS.map((item) => item.category)),
  ];
  queryOne("#category-chips").innerHTML = categories
    .map(
      (category) =>
        `<button class="chip ${
          category === selectedCategory ? "on" : ""
        }">${category}</button>`
    )
    .join("");
}

// ---------- Kartu menu ----------

function matchesFilter(item) {
  const inCategory =
    selectedCategory === "Semua" || item.category === selectedCategory;
  const searchableText = (
    item.name +
    " " +
    item.description +
    " " +
    item.category
  ).toLowerCase();
  return inCategory && searchableText.includes(searchKeyword);
}

function createMenuCard(item) {
  const badge = item.isNew ? "NEW" : item.isFavorite ? "FAVORIT" : "";
  const variantSelect = item.variants
    ? `<select>${item.variants
        .map(
          (variant, index) =>
            `<option value="${index}">${variant.label}</option>`
        )
        .join("")}</select>`
    : "";

  return `
    <article class="card" data-item-id="${item.id}">
      ${badge ? `<span class="badge">${badge}</span>` : ""}
      ${createImageTag(item.image, "pic")}
      <h3>${item.name}</h3>
      <p class="d">${item.description}</p>
      ${variantSelect}
      <div class="row">
        <span class="price">${formatRupiah(item.price)}</span>
        <button class="add">PESAN</button>
      </div>
    </article>`;
}

function renderMenuCards() {
  const visibleItems = MENU_ITEMS.filter(matchesFilter);
  const noteHtml = CATEGORY_NOTES[selectedCategory]
    ? `<div class="note" style="grid-column:1/-1">${CATEGORY_NOTES[selectedCategory]}</div>`
    : "";
  const cardsHtml = visibleItems.length
    ? visibleItems.map(createMenuCard).join("")
    : '<p class="empty">Menu tidak ditemukan. Coba kata kunci lain.</p>';

  queryOne("#menu-list").innerHTML = noteHtml + cardsHtml;
}

// ---------- Event ----------

function setupMenuEvents() {
  // Klik tombol kategori
  queryOne("#category-chips").addEventListener("click", (event) => {
    if (!event.target.classList.contains("chip")) return;
    selectedCategory = event.target.textContent;
    renderCategoryChips();
    renderMenuCards();
  });

  // Mengetik di kolom pencarian
  const searchInput = queryOne("#search-input");
  searchInput.addEventListener("input", () => {
    searchKeyword = searchInput.value.trim().toLowerCase();
    searchInput.parentElement.classList.toggle("filled", searchKeyword !== "");
    renderMenuCards();
  });

  // Klik "PESAN" pada kartu menu, atau ganti pilihan varian
  const menuList = queryOne("#menu-list");
  menuList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("add")) return;
    const card = event.target.closest(".card");
    const item = MENU_ITEMS.find(
      (menuItem) => menuItem.id === card.dataset.itemId
    );
    const variantSelect = card.querySelector("select");

    if (variantSelect) {
      const variant = item.variants[variantSelect.value];
      addToCart(
        item.id + "-" + variant.label,
        `${item.name} (${variant.label})`,
        variant.price
      );
    } else {
      addToCart(item.id, item.name, item.price);
    }
  });
  menuList.addEventListener("change", (event) => {
    if (event.target.tagName !== "SELECT") return;
    const card = event.target.closest(".card");
    const item = MENU_ITEMS.find(
      (menuItem) => menuItem.id === card.dataset.itemId
    );
    card.querySelector(".price").textContent = formatRupiah(
      item.variants[event.target.value].price
    );
  });

  // Klik "PESAN PROMO"
  queryOne("#promo-list").addEventListener("click", (event) => {
    if (!event.target.classList.contains("add")) return;
    const promo = PROMOS.find(
      (promoItem) => promoItem.id === event.target.dataset.promoId
    );
    addToCart(promo.id, promo.name, promo.promoPrice);
  });
}

renderPromos();
renderCategoryChips();
renderMenuCards();
setupMenuEvents();
