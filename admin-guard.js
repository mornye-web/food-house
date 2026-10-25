// Bảo vệ giao diện quản trị ở mức demo. localStorage có thể bị sửa từ DevTools;
// website thật cần xác thực và phân quyền ở phía máy chủ.
(function () {
  const read = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); return value; }
    catch { return fallback; }
  };

  const current = read('currentUser', null);
  if (!current || !current.email) {
    alert('Bạn cần đăng nhập trước khi mở trang quản trị.');
    location.replace('login.html');
    return;
  }

  const users = read('users', []);
  if (!Array.isArray(users)) {
    alert('Dữ liệu tài khoản không hợp lệ. Vui lòng đăng nhập lại.');
    location.replace('login.html');
    return;
  }

  // Thiết lập lần đầu cho bài tập: nếu chưa có quản trị viên nào, cho phép
  // tài khoản đang đăng nhập trở thành admin sau khi xác nhận.
  const hasAdmin = users.some(user => user && user.role === 'admin');
  if (current.role !== 'admin' && !hasAdmin) {
    const setup = confirm('Chưa có tài khoản quản trị viên nào. Bạn có muốn đặt tài khoản đang đăng nhập làm quản trị viên đầu tiên trên trình duyệt này?');
    if (setup) {
      const index = users.findIndex(user => user && user.email === current.email);
      if (index < 0) {
        alert('Không tìm thấy tài khoản trong danh sách. Vui lòng đăng nhập lại.');
        location.replace('login.html');
        return;
      }
      users[index].role = 'admin';
      localStorage.setItem('users', JSON.stringify(users));
      current.role = 'admin';
      localStorage.setItem('currentUser', JSON.stringify(current));
      alert('Đã thiết lập quyền quản trị viên cho tài khoản này.');
    } else {
      location.replace('account.html');
      return;
    }
  }

  if (current.role !== 'admin') {
    alert('Tài khoản của bạn không có quyền quản trị viên.');
    location.replace('account.html');
  }
})();
