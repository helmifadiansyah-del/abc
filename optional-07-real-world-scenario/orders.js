// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

// Variabel menyimpan data orders sebagai array
let orders = [];

// Menambahkan pesanan baru ke array orders
function addOrder(customerName, items) {
  if (!customerName || !Array.isArray(items) || items.length === 0) {
    throw new Error('customerName harus diisi dan items harus array dengan setidaknya satu item');
  }

  const totalPrice = items.reduce((sum, item) => {
    const price = Number(item.price);
    return sum + (Number.isFinite(price) ? price : 0);
  }, 0);

  const order = {
    id: generateUniqueId(),
    customerName,
    items,
    totalPrice,
    status: 'Menunggu'
  };

  orders.push(order);
  return order;
}

// Mengupdate status pesanan berdasarkan id
function updateOrderStatus(orderId, status) {
  const validStatus = ['Menunggu', 'Diproses', 'Selesai'];
  if (!validStatus.includes(status)) {
    throw new Error(`Status tidak valid. Gunakan salah satu: ${validStatus.join(', ')}`);
  }

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error(`Order dengan id ${orderId} tidak ditemukan`);
  }

  order.status = status;
  return order;
}

// Menghitung total revenue dari order dengan status Selesai
function calculateTotalRevenue() {
  return orders
    .filter((o) => o.status === 'Selesai')
    .reduce((sum, o) => sum + o.totalPrice, 0);
}

// Menghapus order berdasarkan id
function deleteOrder(id) {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    throw new Error(`Order dengan id ${id} tidak ditemukan`);
  }
  orders.splice(index, 1);
  return true;
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
