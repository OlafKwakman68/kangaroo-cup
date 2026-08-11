const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "program.html", label: "2026 Program" },
  { href: "results.html", label: "Rankings" },
  { href: "history.html", label: "History" }
  ];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const page = currentPage();
  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="${l.href === page ? "active" : ""}">${l.label}</a>`
    ).join("");

mount.innerHTML = `
<header class="site-header">
<div class="nav-row">
<a href="index.html" class="brand">
<img src="assets/img/crest-nav.png" alt="Kangaroo Cup crest">
<span class="brand-text">Kangaroo Cup<small>PERTH, WESTERN AUSTRALIA</small></span>
</a>
<button class="nav-toggle" aria-label="Menu">&#9776;</button>
<nav class="main-nav">${links}</nav>
</div>
<div class="install-banner" id="install-banner">
Add Kangaroo Cup to your home screen for one-tap access
<button id="install-btn">Install</button>
</div>
</header>
`;

const toggle = mount.querySelector(".nav-toggle");
  const nav = mount.querySelector(".main-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
  <footer>
  <div>&copy; ${year} Kangaroo Cup &middot; Ulterius Tendere Quam Ingenium</div>
  </footer>
  `;
}

let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const banner = document.getElementById("install-banner");
  if (banner) banner.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "install-btn" && deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(() => {
      deferredInstallPrompt = null;
      const banner = document.getElementById("install-banner");
      if (banner) banner.classList.remove("show");
    });
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
