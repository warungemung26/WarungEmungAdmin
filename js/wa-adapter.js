/**
 * WA ADAPTER
 * Menjembatani kode lama ke WA_CONFIG (config.json)
 */

window.sendWA = function({ template, text, data }) {
  // PRIORITAS 1: pakai template terpusat
  if (template && window.openWA) {
    return openWA(template, data || {});
  }

  // PRIORITAS 2: text mentah (legacy)
  if (text && window.WA_CONFIG) {
    const url =
      `https://wa.me/${WA_CONFIG.number}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  }
};
