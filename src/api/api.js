import axios from "axios";

const API = axios.create({
  baseURL: "/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === AUTH ===
export const login = (data) =>
  API.post("/auth/login", {
    Email: data.email,
    Password: data.password,
  });

export const register = (data) =>
  API.post("/auth/signup", {
    FullName: data.name,
    Email: data.email,
    Password: data.password,
    Phone: data.phone,
    Address: data.address,
  });

export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", {
    Email: data.email,
  });

export const resetPassword = (data) =>
  API.post("/auth/reset-password", {
    Token: data.token,
    NewPassword: data.newPassword,
  });

export const changePassword = (data, token) =>
  API.post("/auth/change-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === PRODUCT ===
export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return { data: Array.isArray(response.data) ? response.data : [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
};

export const getProductsByCategoryId = (id) =>
  API.get(`/categories/${id}/products`);

export const getAllCategories = () => API.get("/categories");

export const getProductById = (id) => API.get(`/products/product/${id}`);

// === CART ===
export const addToCartAPI = (data, token) =>
  API.post("/cart/cart-add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCartAPI = (token) =>
  API.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCartAPI = (Id, quantity, token) =>
  API.put(
    `/cart/cart-edit/${Id}`,
    { Quantity: quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const removeCartItemAPI = (cartId, token) =>
  API.delete(`/cart/del/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === ORDER ===
export const createOrderAPI = (data, token) =>
  API.post("/orders/order-add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const processPaymentAPI = (data, token) =>
  API.post("/orders/payment", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllOrders = (token) =>
  API.get("/orders/order", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrderById = (token, Id) =>
  API.get(`/orders/order/${Id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrderByIdUser = (token, Id) =>
  API.get(`/orders/order-user/${Id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === ORDER ADMIN ===
export const deleteOrder = (id) =>
  API.delete(`/orders/order-del/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const updateOrder = (id, data) =>
  API.put(`/orders/order-update/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getOrdersByUserId = (userId, token) =>
  API.get(`/orders/orders-all/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === LOYALTY POINTS ===
export const getLoyaltyPointsAPI = (token) =>
  API.get("/loyalty/point", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserPointsByAdmin = (token, userId) =>
  API.get(`/loyalty/point/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === LOYALTY POINTS ADMIN ===
export const updateLoyaltyPoint = (id, data, token) =>
  API.put(`/loyalty/point-edit/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteLoyaltyPoint = (id, token) =>
  API.delete(`/loyalty/point-del/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === USER PROFILE ===
export const getUserProfile = (userId, token) =>
  API.get(`/users/user-profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserProfile = (userId, data) =>
  API.put(`/users/update-profile/${userId}`, data);

// === WISHLIST ===
export const getWishlistAPI = (token) =>
  API.get("/wishlist/wishlist-all", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToWishlistAPI = (data, token) =>
  API.post("/wishlist/wishlist-add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeFromWishlistAPI = (productId, token) =>
  API.delete(`/wishlist/wishlist-del/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === NOTIFICATION ===
export const getNotifications = (token) =>
  API.get("/notifications/noti", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const markNotificationAsRead = (id, token) =>
  API.post(`/notifications/noti/read/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createNotification = (data, token) =>
  API.post("/notifications/noti-add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNotification = (id, token) =>
  API.delete(`/notifications/noti-del/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllNotifications = (token) =>
  API.get("/notifications/noti-all", {
    headers: { Authorization: `Bearer ${token}` },
  });

// === PRODUCT ADMIN ===
export const addProduct = () =>
  API.post("/products/product-add", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch((error) => {
    console.error("Error details:", error.response?.data);
    throw error;
  });

export const updateProduct = (id, data) =>
  API.put(`/products/product-update/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/product-del/${id}`);

// === REVIEW ===
export const getReviewsByProduct = (id) =>
  API.get(`/reviews/review/product/${id}`);

export const createReview = (data, token) =>
  API.post("/reviews/review-add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === VOUCHERS ===
export const getAvailableVouchers = (token) =>
  API.get("/vouchers", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const redeemVoucher = (data) =>
  API.post("/vouchers/redeem-voucher", data);

export const applyVoucher = (data, token) =>
  API.post("/vouchers/apply-voucher", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRedeemedVouchers = (token) =>
  API.get("/vouchers/redeemed", {
    headers: { Authorization: `Bearer ${token}` },
  });

// === USER ADMIN ===
export const getAllUsers = () => API.get("/users/user-all");

export const updateUser = (id, data) =>
  API.put(`/users/update-profile/${id}`, data);

export const deleteUser = (id) => API.delete(`/users/delete-user/${id}`);

export const getRevenueStatistics = () => API.get("/statistics/static");

// === VOUCHER ADMIN ===
export const getAllVouchers = (token) =>
  API.get("/vouchers", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addVoucher = (data, token) =>
  API.post("/vouchers", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const editVoucher = (voucherId, data, token) =>
  API.put(`/vouchers/${voucherId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteVoucher = (voucherId, token) =>
  API.delete(`/vouchers/${voucherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// === REVIEW ADMIN ===
export const getAllReviews = () => API.get("/reviews/review-all");

export const updateReview = (id, data) =>
  API.put(`/reviews/review-update/${id}`, data);

export const deleteReview = (id) => API.delete(`/reviews/review-delete/${id}`);
