const form = document.getElementById("login-form");
const msg = document.getElementById("login-message");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      msg.textContent = "Email hoặc mật khẩu không đúng.";
      return;
    }

    // Role chỉ dùng cho bản demo chạy trên trình duyệt; không phải cơ chế bảo mật thật.
    localStorage.setItem("currentUser", JSON.stringify({
      username: user.username,
      email: user.email,
      role: user.role === "admin" ? "admin" : "user"
    }));
    msg.textContent = "Đăng nhập thành công! Đang chuyển trang...";
    setTimeout(() => location.href = user.role === "admin" ? "admin.html" : "account.html", 400);
  } catch (error) {
    msg.textContent = "Không thể đọc dữ liệu tài khoản trong trình duyệt.";
    console.error(error);
  }
});
