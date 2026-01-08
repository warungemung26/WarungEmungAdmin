// ================= ELEMENTS.JS =================

// --- Produk & Keranjang ---
export const listEl = document.getElementById('produk-list');
export const searchEl = document.getElementById('search');
export const searchBtn = document.getElementById('search-btn');
export const cartCountEl = document.getElementById('cart-count');
export const cartModal = document.getElementById('cart-modal');
export const cartItemsEl = document.getElementById('cart-items');
export const cartTotalEl = document.getElementById('cart-total');
export const waCartBtn = document.getElementById('wa-cart');
export const clearCartBtn = document.getElementById('clear-cart');
export const cartBadge = document.getElementById('cart-badge');
export const navCartBtn = document.getElementById('nav-cart');

// --- Kategori ---
export const catBackdrop = document.getElementById('cat-modal-backdrop');
export const catModal = document.getElementById('cat-modal');
export const closeCatBtn = document.getElementById('close-cat');
export const catOptions = document.getElementById('cat-options');
export const navCatBtn = document.getElementById('nav-cat');

// --- Toast & Suara ---
export const toastEl = document.getElementById('toast');
export const ding = new Audio('sounds/ding.mp3');

// --- Register Modal ---
export const registerBackdrop = document.getElementById('register-backdrop');
export const registerModal = document.getElementById('register-modal');
export const regStep1 = document.getElementById('reg-step1');
export const regStep2 = document.getElementById('reg-step2');
export const btnRegisterNow = document.getElementById('btn-register-now');
export const btnRegisterLater = document.getElementById('btn-register-later');
export const btnBackRegister = document.getElementById('btn-back-register');
export const btnSaveRegister = document.getElementById('btn-save-register');
export const registerHint = document.getElementById('register-hint');

// --- Account Modal ---
export const accBackdrop = document.getElementById("account-backdrop");
export const accModal = document.getElementById('account-modal');
export const navAccount = document.getElementById("nav-account");
const navAccount = document.getElementById('nav-account');
export const accNama = document.getElementById("acc-nama");
export const accAlamat = document.getElementById("acc-alamat");
export const accRT = document.getElementById("acc-rt");
export const accHP = document.getElementById("acc-hp");
export const accSave = document.getElementById("acc-save-btn");
export const accClose = document.getElementById("acc-close-btn");

// --- Profil / Foto ---
export const ppInput = document.getElementById("pp-input");
export const btnUbahPP = document.getElementById("btn-ubah-pp");
export const ppPreview = document.getElementById("pp-preview");

// --- Tab & Riwayat ---
export const tabButtons = document.querySelectorAll(".tab-btn");
export const tabContents = document.querySelectorAll(".tab-content");
export const riwayatList = document.getElementById("riwayat-list");

// --- Hero / CTA ---
export const waHeroBtn = document.getElementById('wa-hero-cta');

// --- Floating lama (jika ada) ---
export const oldFloat = document.querySelector('.floating-cart');
