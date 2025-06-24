import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion"; 
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

const Dashboard = () => {
  const [productData, setProductData] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/static", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductData(res.data.products || []);
      setSummary({
        totalOrders: res.data.totalOrders || 0,
        totalRevenue: res.data.totalRevenueAll || 0,
        totalUsers: res.data.totalUsers || 0,
        totalProducts: res.data.totalProducts || 0,
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [token]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">
            {payload[0].payload.ProductName}
          </p>
          <p className="text-green-600">
            Doanh thu: {payload[0].payload.totalRevenue.toLocaleString("vi-VN")}₫
          </p>
          <p className="text-blue-600">
            Số lượng: {payload[0].payload.totalQuantity}
          </p>
        </div>
      );
    }
    return null;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
          📊 Thống kê tổng quan
        </h1>
        <button
          onClick={fetchStatistics}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-semibold text-white text-sm sm:text-base ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Đang tải..." : "Làm mới dữ liệu"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[{
          icon: <ShoppingCartIcon className="h-7 w-7 sm:h-8 sm:w-8 text-red-500" />, label: "Tổng đơn hàng", value: summary.totalOrders, color: "red-500"
        }, {
          icon: <CurrencyDollarIcon className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />, label: "Doanh thu", value: `${summary.totalRevenue.toLocaleString("vi-VN")}₫`, color: "green-500"
        }, {
          icon: <UserGroupIcon className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />, label: "Người dùng", value: summary.totalUsers, color: "blue-500"
        }, {
          icon: <CubeIcon className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-500" />, label: "Sản phẩm", value: summary.totalProducts, color: "yellow-500"
        }].map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg border-t-4 border-${card.color} hover:shadow-xl transition-transform transform hover:-translate-y-1`}
          >
            <div className="flex items-center gap-3">
              {card.icon}
              <div>
                <h3 className="text-gray-500 text-xs sm:text-sm uppercase font-medium">
                  {card.label}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-700">
                  {card.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue and Quantity Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-red-600">
          📈 Doanh thu và số lượng theo sản phẩm
        </h2>
        <div className="min-w-[700px]">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={productData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <XAxis
                dataKey="ProductName"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                yAxisId="revenue"
                orientation="left"
                tickFormatter={(value) => `${(value / 1000).toFixed(3)}₫`}
                tick={{ fontSize: 12 }}
                stroke="#ef4444"
              />
              <YAxis
                yAxisId="quantity"
                orientation="right"
                tickFormatter={(value) => value}
                tick={{ fontSize: 12 }}
                stroke="#3b82f6"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="top"
                wrapperStyle={{ padding: "0 20px" }}
              />
              <Bar
                yAxisId="revenue"
                dataKey="totalRevenue"
                name="Doanh thu (VND)"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="quantity"
                dataKey="totalQuantity"
                name="Số lượng"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;