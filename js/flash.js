let flashProducts = [];

// Tambah Produk Flash
function addFlashProduct() {
  const product = {
    id: 'flash-' + Date.now(),
    name: document.getElementById('flash_name').value,
    price_normal: Number(document.getElementById('flash_price_normal').value),
    price_flash: Number(document.getElementById('flash_price_flash').value),
    stock: Number(document.getElementById('flash_stock').value),
    img: document.getElementById('flash_img').value,
    label: document.getElementById('flash_label').value,
    category: 'flash',
    flash_until: document.getElementById('flash_until').value
  };
  flashProducts.push(product);
  renderFlashTable();
}

// Render Tabel Flash
function renderFlashTable() {
  const tbody = document.querySelector('#flashTable tbody');
  tbody.innerHTML = '';
  flashProducts.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price_normal}</td>
      <td>${p.price_flash}</td>
      <td>${p.stock}</td>
      <td>${p.label}</td>
      <td>${p.flash_until}</td>
      <td>
        <button onclick="deleteFlashProduct(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Hapus Produk Flash
function deleteFlashProduct(index) {
  flashProducts.splice(index, 1);
  renderFlashTable();
}

// Import JSON Lokal Flash
function importFlashJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      try {
        flashProducts = JSON.parse(event.target.result);
        renderFlashTable();
      } catch(err) {
        alert('JSON tidak valid!');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Download JSON Flash
function downloadFlashJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flashProducts, null, 2));
  const a = document.createElement('a');
  a.href = dataStr;
  a.download = 'flash_products.json';
  a.click();
}
