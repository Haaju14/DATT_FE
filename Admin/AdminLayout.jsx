import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ShoppingCartIcon,
  StarIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [FullName, setAdminName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      if (location.pathname !== "/admin/login") {
        navigate("/admin/login");
      }
      setIsCheckingAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.RoleName !== "admin") {
        localStorage.removeItem("token");
        setToast({
          type: "error",
          message: "Bạn không có quyền truy cập trang admin.",
        });
        navigate("/admin/login");
        setIsAuthenticated(false);
      } else {
        setAdminName(decoded.FullName || "Admin");
        setIsAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setToast({ type: "error", message: "Token không hợp lệ." });
      navigate("/admin/login");
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToast({ type: "info", message: "Đã đăng xuất." });
    navigate("/admin/login");
    setTimeout(() => window.location.reload(), 100);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (isCheckingAuth) return null;
  if (!isAuthenticated && location.pathname === "/admin/login") {
    return <Outlet />;
  }
  if (!isAuthenticated) return null;

  const menuItems = [
    { to: "/admin/dashboard", icon: HomeIcon, label: "Tổng Quan" },
    { to: "/admin/products", icon: CubeIcon, label: "Sản Phẩm" },
    { to: "/admin/categories", icon: TagIcon, label: "Danh Mục" },
    { to: "/admin/orders", icon: ShoppingCartIcon, label: "Đơn Hàng" },
    { to: "/admin/loyalty", icon: StarIcon, label: "Tích Lũy" },
    { to: "/admin/users", icon: UserGroupIcon, label: "Người Dùng" },
    { to: "/admin/quan-ly-binh-luan", icon: UserGroupIcon, label: "Comment" },
    { to: "/admin/khuyen-mai", icon: UserGroupIcon, label: "Khuyến Mãi" },
    { to: "/admin/quan-ly-voucher", icon: UserGroupIcon, label: "Voucher" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative">
      {/* Hamburger for mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 text-gray-700 bg-white rounded-md shadow-md md:hidden"
      >
        {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 768 ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white shadow-xl flex flex-col ${isSidebarOpen && window.innerWidth < 768 ? 'block' : 'hidden md:block'}`}
      >
        <div className="p-4 sm:p-6 text-xl sm:text-2xl font-bold bg-white bg-clip-text text-transparent tracking-wide">
          Cholimex Admin
        </div>
        <nav className="flex flex-col gap-2 p-2 sm:p-4 text-sm sm:text-base flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.div key={index} whileHover="hover" whileTap="tap">
              <NavLink
                to={item.to}
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-red-600 font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 shadow-md"
                    : "px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
                }
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Overlay khi sidebar mở trên mobile */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black z-30 md:hidden"
        />
      )}

      {/* Content */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col ml-0 md:ml-64"
      >
        {/* Navbar */}
        <header className="h-14 sm:h-16 bg-gradient-to-r from-gray-100 to-blue-50 shadow-md px-3 sm:px-6 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <UserCircleIcon className="h-6 sm:h-8 w-6 sm:w-8 text-gray-600" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Xin chào, {FullName}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Đăng xuất
            </motion.button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-2 sm:p-4 overflow-auto flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 1 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      {/* Toast Notification */}
      {toast && (
        <motion.div
          variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }}}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-14 sm:top-16 right-2 sm:right-4 px-3 sm:px-6 py-1 sm:py-3 rounded-lg shadow-xl text-white text-xs sm:text-base ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : toast.type === "info"
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-gradient-to-r from-red-500 to-red-600"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}