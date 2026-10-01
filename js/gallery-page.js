// =====================================================================
//  HALAMAN GALERI: foto polaroid + lightbox
// =====================================================================

const POLAROID_TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];

function renderGallery() {
  queryOne("#polaroid-list").innerHTML = GALLERY_PHOTOS.map(
    (photo, index) => `
    <figure class="po" style="--r:${
      POLAROID_TILTS[index % POLAROID_TILTS.length]
    }deg">
      ${createImageTag(photo.image, "")}
      <b>${photo.caption}</b>
      <small>${photo.tag}</small>
    </figure>`
  ).join("");
}

function setupLightbox() {
  const lightbox = queryOne("#lightbox");

  queryOne("#polaroid-list").addEventListener("click", (event) => {
    const photo = event.target.closest(".po img");
    if (!photo) return;
    lightbox.innerHTML = createImageTag(photo.getAttribute("src"), "");
    lightbox.classList.add("show");
  });

  lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
}

renderGallery();
setupLightbox();
