// =====================================================================
//  DATA MENU
// =====================================================================
//
//  Field tiap menu:
//    id          : kode unik (tidak boleh sama dengan menu lain)
//    category    : nama kategori (dipakai untuk tombol filter)
//    name        : nama menu
//    price       : harga
//    description : deskripsi singkat
//    image       : path gambar. Ganti DEFAULT_IMAGE dengan mis. "img/menu/crispy-chicken.png"
//    variants    : (opsional) pilihan varian + harga masing-masing
//    isNew       : (opsional) true = tampil badge NEW
//    isFavorite  : (opsional) true = tampil badge FAVORIT
// =====================================================================

// Catatan pilihan carbs & saus, tampil saat kategori dipilih
const CATEGORY_NOTES = {
  Crispy:
    "Carbs: Fries / Mashed Potato +4K / Pasta +4K  •  Sauce: Blackpepper / Mushroom / Brown",
  Grill:
    "Carbs: Fries / Mashed Potato +4K / Pasta +4K  •  Sauce: Blackpepper / Mushroom / Barbeque / Brown / Spicy BBQ",
  Prime:
    "Carbs: Mashed Potato / Fries / Pasta  •  Sauce: Blackpepper / Mushroom / Barbeque / Brown / Spicy BBQ",
  Salad: "Salad Sauce: Roasted Sesame / Lemon Mayo",
  Rice: "Carbs: Rice / Mashed Potato +4K / Pasta +4K  •  Sauce: Blackpepper / Mushroom / Barbeque / Brown / Spicy BBQ",
};

const MENU_ITEMS = [
  // ---------- CRISPY SERIES ----------
  {
    id: "crispy-chicken",
    category: "Crispy",
    name: "Crispy Chicken",
    price: 28,
    description:
      "Ayam pilihan dibalut tepung berbumbu khas, digoreng hingga renyah keemasan.",
    image: "img/menu/crispy-chicken.jpg",
    variants: [
      { label: "Single", price: 28 },
      { label: "Double", price: 39 },
    ],
  },

  {
    id: "crispy-beef",
    category: "Crispy",
    name: "Crispy Beef",
    price: 38,
    description:
      "Irisan daging sapi pilihan dibalut tepung berbumbu, digoreng hingga gurih.",
    image: "img/menu/crispy-beef.jpg",
    variants: [
      { label: "Single", price: 38 },
      { label: "Double", price: 50 },
    ],
  },

  {
    id: "chicken-schnitzel",
    category: "Crispy",
    name: "Chicken Schnitzel",
    price: 39,
    description:
      "Dada ayam fillet pilihan dibalut tepung renyah, crispy di luar dan juicy di dalam. (2 pcs)",
    image: "img/menu/chicken-schnitzel.jpg",
  },

  {
    id: "fish-n-chips",
    category: "Crispy",
    name: "Fish N' Chips",
    price: 39,
    description:
      "Fillet ikan segar berbalut tepung renyah, disajikan dengan kentang goreng tebal serta saus tartar khas.",
    image: "img/menu/fish-n-chips.jpg",
    isFavorite: true,
  },

  {
    id: "chicken-cordon-bleu",
    category: "Crispy",
    name: "Chicken Cordon Bleu",
    price: 37,
    description:
      "Dada ayam isi smoked beef dan keju, dibalut tepung roti lalu digoreng hingga keemasan. (Rice/Fries)",
    image: "img/menu/chicken-cordon-bleu.jpg",
    isFavorite: true,
  },

  // ---------- GRILL SERIES ----------
  {
    id: "wagyu-delight",
    category: "Grill",
    name: "Wagyu Delight",
    price: 95,
    description:
      "Irisan daging wagyu pilihan, menghasilkan tekstur lembut dan cita rasa gurih yang mewah.",
    image: "img/menu/wagyu-delight.jpg",
    isFavorite: true,
    variants: [
      { label: "Tenderloin", price: 95 },
      { label: "Sirloin", price: 95 },
    ],
  },

  {
    id: "aus-sirloin-grill",
    category: "Grill",
    name: "Aus Sirloin Grill",
    price: 59,
    description:
      "Potongan has luar sapi Australia, dipanggang sempurna, juicy dan empuk.",
    image: "img/menu/aus-sirloin-grill.jpg",
  },

  {
    id: "cheezy-hamburg-steak",
    category: "Grill",
    name: "Cheezy Hamburg Steak",
    price: 56,
    description:
      "Daging cincang premium dipanggang hingga juicy, disiram saus gurih dan lelehan keju. (Rice/Fries)",
    image: "img/menu/cheezy-hamburg-steak.jpg",
    isFavorite: true,
  },

  {
    id: "grill-chicken",
    category: "Grill",
    name: "Grill Chicken",
    price: 40,
    description:
      "Dada ayam pilihan dipanggang dengan bumbu khas, juicy dan smokey.",
    image: "img/menu/grill-chicken.jpg",
  },

  // ---------- PRIME SERIES ----------
  {
    id: "australian-prime-tenderloin",
    category: "Prime",
    name: "Australian Prime Tenderloin",
    price: 125,
    description:
      "Tenderloin premium Australia dengan tekstur lembut dan juicy, kaya rasa dan elegan di setiap gigitan.",
    image: "img/menu/australian-prime-tenderloin.jpg",
    isNew: true,
    isFavorite: true,
  },

  {
    id: "australian-prime-sirloin",
    category: "Prime",
    name: "Australian Prime Sirloin",
    price: 115,
    description:
      "Sirloin premium Australia dengan keseimbangan sempurna antara kelembutan dan cita rasa daging yang empuk.",
    image: "img/menu/australian-prime-sirloin.jpg",
    isNew: true,
    isFavorite: true,
  },

  {
    id: "grill-salmon-steak",
    category: "Prime",
    name: "Grill Salmon Steak",
    price: 115,
    description:
      "Potongan salmon tebal dipanggang hingga bagian luar lightly crispy dan bagian dalam tetap lembut serta juicy.",
    image: "img/menu/grill-salmon-steak.jpg",
    isNew: true,
    isFavorite: true,
  },

  // ---------- SALAD SERIES ----------
  {
    id: "chicken-salad",
    category: "Salad",
    name: "Chicken Salad",
    price: 40,
    description:
      "Potongan ayam juicy dengan sayuran segar dan crouton gurih, dengan dressing ringan yang menyegarkan.",
    image: "img/menu/chicken-salad.jpg",
    isNew: true,
    isFavorite: true,
  },

  {
    id: "salmon-salad",
    category: "Salad",
    name: "Salmon Salad",
    price: 68,
    description:
      "Salmon lembut dipadukan sayuran segar dan renyah, kombinasi gurih alami dan kesegaran yang seimbang.",
    image: "img/menu/salmon-salad.jpg",
    isNew: true,
    isFavorite: true,
  },

  // ---------- RICE SERIES ----------
  {
    id: "crispy-chicken-rice",
    category: "Rice",
    name: "Crispy Chicken Rice",
    price: 28,
    description:
      "Fillet ayam berbalut tepung renyah, disajikan dengan nasi dan saus istimewa.",
    image: "img/menu/crispy-chicken-rice.jpg",
  },

  {
    id: "crispy-beef-rice",
    category: "Rice",
    name: "Crispy Beef Rice",
    price: 38,
    description:
      "Irisan daging sapi pilihan digoreng renyah dengan bumbu khas.",
    image: "img/menu/crispy-beef-rice.jpg",
  },

  {
    id: "beef-frankfurter-sausage",
    category: "Rice",
    name: "Beef Frankfurter Sausage",
    price: 30,
    description:
      "Sosis sapi premium dengan tekstur lembut dan cita rasa smoky.",
    image: "img/menu/beef-frankfurter-sausage.jpg",
  },

  {
    id: "saikoro-wagyu-rice",
    category: "Rice",
    name: "Saikoro Wagyu Rice",
    price: 38,
    description:
      "Daging wagyu premium dipotong dadu, dipanggang hingga juicy dan caramelized.",
    image: "img/menu/saikoro-wagyu-rice.jpg",
  },

  // ---------- PASTA SERIES ----------
  {
    id: "spicy-pasta",
    category: "Pasta",
    name: "Spicy Pasta",
    price: 35,
    description:
      "Pasta lembut dengan saus pedas gurih, disajikan dengan potongan ayam crispy.",
    image: "img/menu/spicy-pasta.jpg",
  },

  {
    id: "mushroom-pasta",
    category: "Pasta",
    name: "Mushroom Pasta",
    price: 35,
    description:
      "Pasta creamy dengan saus jamur gurih, dipadukan dengan potongan ayam crispy.",
    image: "img/menu/mushroom-pasta.jpg",
    isFavorite: true,
  },

  // ---------- LIGHT BITES ----------
  {
    id: "garlic-bread",
    category: "Light Bites",
    name: "Garlic Bread",
    price: 18,
    description:
      // "Roti panggang berlapis mentega bawang putih yang harum dan renyah.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque.",
    image: "img/menu/garlic-bread.jpg",
  },

  {
    id: "onion-ring",
    category: "Light Bites",
    name: "Onion Ring",
    price: 20,
    description:
      "Bawang bombay berbalut tepung renyah, digoreng hingga keemasan.",
    image: "img/menu/onion-ring.jpg",
    isFavorite: true,
  },

  {
    id: "crinkle-fries",
    category: "Light Bites",
    name: "Crinkle Fries",
    price: 20,
    description:
      "Kentang goreng bergelombang yang renyah di luar dan lembut di dalam.",
    image: "img/menu/crinkle-fries.jpg",
  },

  {
    id: "chicken-popcorn",
    category: "Light Bites",
    name: "Chicken Popcorn",
    price: 22,
    description:
      "Potongan ayam kecil berbalut tepung renyah, pas untuk camilan.",
    image: "img/menu/chicken-popcorn.jpg",
  },

  {
    id: "fried-mac-n-cheese",
    category: "Light Bites",
    name: "Fried Mac N' Cheese",
    price: 25,
    description: "Bola makaroni keju yang digoreng renyah dengan isian lumer.",
    image: "img/menu/fried-mac-n-cheese.jpg",
    isFavorite: true,
  },

  {
    id: "nashville-chicken-pop",
    category: "Light Bites",
    name: "Nashville Chicken Pop",
    price: 28,
    description: "Ayam crispy dengan bumbu pedas khas Nashville.",
    image: "img/menu/nashville-chicken-pop.jpg",
    isNew: true,
  },

  {
    id: "cream-soup",
    category: "Light Bites",
    name: "Cream Soup",
    price: 12,
    description:
      "Sup krim hangat dengan tekstur lembut dan rasa gurih yang disajikan dengan sayuran pilihan.",
    image: "img/menu/cream-soup.jpg",
    isFavorite: true,
  },

  // ---------- KIDS MENU ----------
  {
    id: "kids-meal",
    category: "Kids",
    name: "Kids Meal",
    price: 27,
    description:
      "Paket spesial untuk si kecil: ayam crispy gurih, nasi lembut, sayuran segar dan potongan buah. (Chicken)",
    image: "img/menu/kids-meal.jpg",
    isFavorite: true,
  },

  // ---------- DESSERT ----------
  {
    id: "ximilu",
    category: "Dessert",
    name: "Ximilu",
    price: 15,
    description:
      "Perpaduan buah segar dan jelly kenyal dalam kuah creamy yang menyegarkan.",
    image: "img/menu/ximilu.jpg",
    isFavorite: true,
  },

  {
    id: "mixed-fruit",
    category: "Dessert",
    name: "Mixed Fruit",
    price: 20,
    description:
      "Perpaduan buah tropis segar dari semangka, melon dan jeruk sunkist yang menyegarkan.",
    image: "img/menu/mixed-fruit.jpg",
  },

  {
    id: "chocolate-pudding",
    category: "Dessert",
    name: "Chocolate Pudding",
    price: 10,
    description:
      "Puding cokelat lembut dengan fla creamy dan taburan Regal renyah.",
    image: "img/menu/chocolate-pudding.jpg",
  },

  // ---------- DRINK ----------
  {
    id: "rosechee-tea",
    category: "Drink",
    name: "Roséchee Tea",
    price: 18,
    description: "Teh segar beraroma mawar dan leci yang manis menyegarkan.",
    image: "img/menu/rosechee-tea.jpg",
  },

  {
    id: "milk-tea",
    category: "Drink",
    name: "Milk Tea",
    price: 15,
    description: "Teh susu yang creamy dan lembut.",
    image: "img/menu/milk-tea.jpg",
  },

  {
    id: "chocolate-milkshake",
    category: "Drink",
    name: "Chocolate Milkshake",
    price: 23,
    description: "Milkshake cokelat kental dengan topping whipped cream.",
    image: "img/menu/chocolate-milkshake.jpg",
  },

  {
    id: "strawberry-milkshake",
    category: "Drink",
    name: "Strawberry Milkshake",
    price: 23,
    description: "Milkshake stroberi manis segar dengan topping whipped cream.",
    image: "img/menu/strawberry-milkshake.jpg",
  },

  {
    id: "cookies-n-cream-milkshake",
    category: "Drink",
    name: "Cookies N' Cream Milkshake",
    price: 23,
    description: "Milkshake dengan remahan biskuit cokelat dan whipped cream.",
    image: "img/menu/cookies-n-cream-milkshake.jpg",
  },

  {
    id: "mineral-water",
    category: "Drink",
    name: "Mineral",
    price: 7,
    description: "Air mineral.",
    image: DEFAULT_IMAGE,
  },

  {
    id: "ice-tea",
    category: "Drink",
    name: "Ice Tea",
    price: 7,
    description: "Teh manis dingin yang menyegarkan.",
    image: "img/menu/ice-tea.jpg",
  },

  {
    id: "lemon-tea",
    category: "Drink",
    name: "Lemon Tea",
    price: 8,
    description: "Teh dengan perasan lemon, segar dan sedikit asam.",
    image: "img/menu/lemon-tea.jpg",
  },

  {
    id: "orange-juice",
    category: "Drink",
    name: "Orange Juice",
    price: 9,
    description: "Jus jeruk segar.",
    image: DEFAULT_IMAGE,
  },

  {
    id: "soda",
    category: "Drink",
    name: "Coca Cola / Sprite / Fanta",
    price: 10,
    description: "Minuman soda dingin. Pilih Regular atau Float.",
    image: DEFAULT_IMAGE,
    variants: [
      { label: "Regular", price: 10 },
      { label: "Float", price: 15 },
    ],
  },

  // ---------- EXTRA ----------
  {
    id: "extra-egg",
    category: "Extra",
    name: "Egg",
    price: 5,
    description: "Tambahan telur.",
    image: DEFAULT_IMAGE,
  },

  {
    id: "extra-mixed-vegetables",
    category: "Extra",
    name: "Mixed Vegetables",
    price: 6,
    description: "Tambahan sayuran campur.",
    image: DEFAULT_IMAGE,
  },

  {
    id: "extra-rice",
    category: "Extra",
    name: "Rice",
    price: 6,
    description: "Tambahan nasi.",
    image: "img/menu/extra-rice.jpg",
  },

  {
    id: "extra-pasta",
    category: "Extra",
    name: "Pasta",
    price: 9,
    description: "Tambahan pasta.",
    image: DEFAULT_IMAGE,
    isNew: true,
  },

  {
    id: "extra-sauce",
    category: "Extra",
    name: "Additional Sauce",
    price: 7,
    description:
      "Blackpepper, Mushroom, Barbeque, Brown, Spicy BBQ atau Nashville (baru).",
    image: "img/menu/extra-sauce.jpg",
  },

  {
    id: "extra-sausage",
    category: "Extra",
    name: "Sausage",
    price: 12,
    description: "Tambahan sosis.",
    image: "img/menu/extra-sausage.jpg",
  },

  {
    id: "extra-mashed-potato",
    category: "Extra",
    name: "Mashed Potato",
    price: 9,
    description: "Tambahan kentang tumbuk.",
    image: DEFAULT_IMAGE,
    isNew: true,
  },

  {
    id: "extra-crinkle-fries",
    category: "Extra",
    name: "Crinkle Fries",
    price: 12,
    description: "Tambahan kentang goreng bergelombang.",
    image: "img/menu/extra-crinkle-fries.jpg",
  },
];
