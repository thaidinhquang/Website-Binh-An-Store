export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price || 0);
};

export const calculateTotalPrice = (item) => {
  if (!item || !item.productId) return 0;
  const price = item.productId.price || 0;
  const quantity = item.quantity || 0;
  return price * quantity;
};