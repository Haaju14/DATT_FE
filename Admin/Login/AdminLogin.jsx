import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://tmdt2.cholimexfood.com.vn/login", {
        Email: email,
        Password: password,
      });

      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split(".")[1]));

      if (decoded.RoleName !== "admin") {
        toast.error("Chỉ admin mới được truy cập.");
        return;
      }

      localStorage.setItem("token", token);
      toast.success("Đăng nhập Admin thành công!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Đăng nhập thất bại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-red-600">🔒 <br />PANEL ADMIN CHOLIMEX</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Nhập email của bạn"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">Chỉ dành cho quản trị viên</p>
      </div>
    </div>
  );
};

export default AdminLogin;
