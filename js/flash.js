/* ============================================================
   FLASH SALE — DATA & STORAGE
============================================================ */
let flashProducts = JSON.parse(localStorage.getItem("flashProducts") || "[]");

function saveFlashLocal() {
  localStorage.setItem("flashProducts", JSON.stringify(flashProducts));
}

/* ============================================================
   TAMBAH FLASH PRODUCT
============================================================ */
function addFlashProduct() {
  const name   = flash_name.value.trim();
  const normal = Number(flash_price_normal.value);
  const flash  = Number(flash_price_flash.value);
  const stock  = Number(flash_stock.value);
  const img    = flash_img.value.trim();
  const label  = flash_label.value.trim();
  const until  = flash_until.value;

  if (!name || !normal || !flash || !until) {
    alert("⚠ Lengkapi semua field wajib!");
    return;
  }

  flashProducts.push({
    id: "flash-" + Date.now(),
    name,
    price_normal: normal,
    price_flash: flash,
    stock,
    img,
    label,
    flash_until: until,
    category: "flash"
  });

  saveFlashLocal();
  renderFlashTable();
}

/* ============================================================
   RENDER TABLE FLASH
============================================================ */
function renderFlashTable() {
  const tbody = document.querySelector("#flashTable tbody");
  if (!tbody) return; // ← tambahkan pengecekan agar tidak error
  tbody.innerHTML = "";

  flashProducts.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td contenteditable onblur="flashCellBlur(event,'name',${index})">${p.name}</td>
      <td contenteditable onblur="flashCellBlur(event,'price_normal',${index})">${p.price_normal}</td>
      <td contenteditable onblur="flashCellBlur(event,'price_flash',${index})">${p.price_flash}</td>
      <td contenteditable onblur="flashCellBlur(event,'stock',${index})">${p.stock}</td>
      <td contenteditable onblur="flashCellBlur(event,'label',${index})">${p.label}</td>
      <td contenteditable onblur="flashCellBlur(event,'flash_until',${index})">${p.flash_until}</td>
      <td>
        <button onclick="deleteFlash(${index})">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================================
   EDIT CELL
============================================================ */
function flashCellBlur(ev, field, index) {
  let val = ev.target.textContent.trim();

  if (["price_normal", "price_flash", "stock"].includes(field)) {
    val = Number(val.replace(/[^0-9]/g, "")) || 0;
  }

  flashProducts[index][field] = val;
  saveFlashLocal();
}

/* ============================================================
   DELETE FLASH ITEM
============================================================ */
function deleteFlash(index) {
  const item = flashProducts[index];
  if (!item) return;

  const yakin = confirm(`Hapus flash sale "${item.name}"?`);
  if (!yakin) return;

  flashProducts.splice(index, 1);
  saveFlashLocal();
  renderFlashTable();
}

/* ============================================================
   IMPORT FILE
============================================================ */
function isValidFlashArray(data) {
  if (!Array.isArray(data)) return false;

  return data.every(item =>
    item.id &&
    item.name &&
    typeof item.price_normal === "number" &&
    typeof item.price_flash === "number" &&
    typeof item.stock === "number" &&
    item.img &&
    item.label &&
    item.category === "flash" &&
    item.flash_until
  );
}

function importFlashFromFile() {
  const input = document.getElementById("flashFileInput");
  if (!input.files.length) return alert("⚠ Pilih file dahulu.");

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);

      if (!isValidFlashArray(json)) return alert("⚠ Format JSON Flash salah!");

      flashProducts = json;
      saveFlashLocal();
      renderFlashTable();
      alert("✔ Import berhasil!");

    } catch {
      alert("⚠ JSON tidak valid!");
    }
  };

  reader.readAsText(input.files[0]);
}

/* ============================================================
   IMPORT TEXT
============================================================ */
function importFlashFromText() {
  const text = document.getElementById("flashJsonText").value.trim();
  if (!text) return alert("⚠ Kolom kosong.");

  try {
    const json = JSON.parse(text);

    if (!isValidFlashArray(json)) return alert("⚠ Format JSON Flash salah!");

    flashProducts = json;
    saveFlashLocal();
    renderFlashTable();
    alert("✔ Import berhasil!");

  } catch {
    alert("⚠ JSON tidak valid!");
  }
}

function clearFlashJson() {
  document.getElementById("flashJsonText").value = "";
}

/* ============================================================
   GENERATE JSON FLASH
============================================================ */
function generateFlashJSON() {
  document.getElementById("flashJsonOutput").textContent =
    JSON.stringify(flashProducts, null, 2);
}

function generateAndScrollFlashJSON() {
  generateFlashJSON();
  document.getElementById("flashJsonOutput").scrollIntoView({ behavior: "smooth" });
}

function scrollToFlashJSON() {
  document.getElementById("flashJsonText").scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   LOAD FLASH FROM REPO
============================================================ */
async function loadFlashFromRepo() {
  try {
    const token = (document.getElementById("githubToken")?.value || "").trim();
    if (!token) return alert("⚠ Masukkan GitHub Token dulu.");

    const owner = "WarungEmung";
    const repo  = "database";
    const path  = "flash_products.json";

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const res = await fetch(url, {
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (!res.ok) return alert("❌ Gagal mengambil flash_products.json!");

    const data = await res.json();
    const decoded = atob(data.content);
    const json = JSON.parse(decoded);

    flashProducts = json;
    saveFlashLocal();
    renderFlashTable();

    alert("✔ Flash Sale berhasil dimuat dari repo!");

  } catch (err) {
    console.error("ERROR LOAD FLASH:", err);
    alert("❌ Terjadi kesalahan saat memuat Flash dari repo.");
  }
}

/* ============================================================
   AUTO LOAD SAAT PERTAMA KALI MASUK
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  flashProducts = JSON.parse(localStorage.getItem("flashProducts") || "[]");
  renderFlashTable();
});

