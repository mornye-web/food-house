const form = document.getElementById("register-form");
const msg = document.getElementById("register-message");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim().toLowerCase();
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm").value;

  if (username.length < 3) { msg.textContent = "Tên người dùng cần ít nhất 3 ký tự."; return; }
  if (password.length < 8) { msg.textContent = "Mật khẩu cần ít nhất 8 ký tự."; return; }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    msg.textContent = "Mật khẩu cần có chữ thường, chữ hoa và chữ số."; return;
  }
  if (password !== confirmPassword) { msg.textContent = "Mật khẩu nhập lại chưa khớp."; return; }

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!Array.isArray(users)) throw new Error("Dữ liệu tài khoản không hợp lệ");
    if (users.some((user) => user.email === email)) { msg.textContent = "Email này đã được đăng ký."; return; }
    // Người đăng ký mới luôn là user; không cho chọn quyền admin trong form.
    users.push({ username, email, password, role: "user", createdAt: new Date().toISOString() });
    localStorage.setItem("users", JSON.stringify(users));
    msg.textContent = "Đăng ký thành công! Đang chuyển đến đăng nhập...";
    form.reset();
    setTimeout(() => location.href = "login.html", 700);
  } catch (error) {
    msg.textContent = "Không thể lưu tài khoản trong trình duyệt.";
    console.error(error);
  }
});
