const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("currentUser") || "null"); }
  catch { return null; }
}

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const opened = menu.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(opened));
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  }));
  const page = location.pathname.split("/").pop() || "index.html";
  menu.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  const user = getCurrentUser();
  if (user?.role === "admin" && !menu.querySelector('[data-admin-link="true"]')) {
    const adminLink = document.createElement("a");
    adminLink.href = "admin.html";
    adminLink.textContent = "Quản lý món ăn";
    adminLink.dataset.adminLink = "true";
    menu.appendChild(adminLink);
  }
}

const user = getCurrentUser();
const welcome = document.getElementById("welcome-text");
if (user && welcome) welcome.textContent = "Xin chào, " + (user.username || "bạn") + "!";

document.querySelectorAll("[data-user-name]").forEach((element) => {
  element.textContent = user?.username || "Khách";
});
document.querySelectorAll("[data-user-email]").forEach((element) => {
  element.textContent = user?.email || "Chưa đăng nhập";
});

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
});
