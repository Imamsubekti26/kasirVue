// orderService.js
import { db } from '../firebase';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, Timestamp, where, setDoc } from 'firebase/firestore';

export async function getHoldedOrder(user_id) {
  const startOfDay = new Date();
  const orderHistory = await getOrderHistory(user_id, startOfDay);
  if (orderHistory.error) {
    return orderHistory;
  }

  const holdedHistory = {
    error: orderHistory.error,
    message: orderHistory.message,
    data: {
      total_data: orderHistory.data.length,
      total_money: orderHistory.data.reduce((sum, item) => sum + item.total, 0),
      holded: [],
      success: []
    }
  };

  orderHistory.data.forEach((item) => {
    if (item.finish_date) {
      holdedHistory.data.success.push(item);
    } else {
      holdedHistory.data.holded.push(item);
    }
  });
  return holdedHistory;
}

export async function detailOrder(user_id, history_id) {
  try {
    const historyRef = doc(db, 'users', user_id, 'histories', history_id);
    const historyDoc = await getDoc(historyRef);

    const orderListCol = collection(db, 'users', user_id, 'histories', history_id, 'order_list');
    const orderListSnapshot = await getDocs(orderListCol);
    const orderList = orderListSnapshot.docs.map((doc) => doc.data());
    const orderDetail = { id: historyDoc.id, ...historyDoc.data(), orderList };

    return { error: false, message: 'getting data successfully', data: orderDetail };
  } catch (error) {
    console.error('Error fetching order detail:', error);
    return { error: false, message: error.message, data: null };
  }
}

export async function getOrderHistory(user_id, startDate = null, endDate = null) {
  try {
    const startOfDay = startDate ? new Date(startDate) : new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = endDate ? new Date(endDate) : new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const historiesCol = collection(db, 'users', user_id, 'histories');
    const q = query(historiesCol, where('order_date', '>=', Timestamp.fromDate(startOfDay)), where('order_date', '<=', Timestamp.fromDate(endOfDay)));

    const historySnapshot = await getDocs(q);
    const holdedHistory = historySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { error: false, message: 'getting data successfully', data: holdedHistory };
  } catch (error) {
    console.error('Error fetching holded orders:', error);
    return { error: true, message: error.message, data: null };
  }
}

export async function createNewOrder(user_id, orderDetail) {
  try {
    const historiesCol = collection(db, 'users', user_id, 'histories');
    const historyDocRef = await addDoc(historiesCol, {
      label: orderDetail.label,
      total: orderDetail.total,
      money: orderDetail.money,
      method: orderDetail.method,
      order_date: orderDetail.orderDate,
      finish_date: orderDetail.finishDate
    });

    const orderListCol = collection(db, 'users', user_id, 'histories', historyDocRef.id, 'order_list');
    const batch = orderDetail.orderList.map((order) => addDoc(orderListCol, order));
    await Promise.all(batch);
    const result = { id: historyDocRef.id, ...orderDetail };

    return { error: false, message: 'create new order success', data: result };
  } catch (error) {
    console.error('Error creating new order:', error);
    return { error: true, message: error.message, data: null };
  }
}

export async function updateOrder(user_id, history_id, orderDetail) {
  try {
    const historyRef = doc(db, 'users', user_id, 'histories', history_id);
    await updateDoc(historyRef, {
      label: orderDetail.label,
      total: orderDetail.total,
      money: orderDetail.money,
      method: orderDetail.method,
      finish_date: orderDetail.finishDate
    });

    const orderListCol = collection(db, 'users', user_id, 'histories', history_id, 'order_list');
    const existingOrdersSnapshot = await getDocs(orderListCol);

    // Buat map dari id produk ke dokumen Firestore
    const existingOrderMap = new Map();
    existingOrdersSnapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      existingOrderMap.set(data.id, { docId: docSnap.id, data: data });
    });

    const operations = [];

    // Cek mana yang perlu di-update atau ditambahkan
    for (const order of orderDetail.orderList) {
      const existing = existingOrderMap.get(order.id);
      if (existing) {
        if (existing.data.amount !== order.amount) {
          // update jika amount berubah
          const docRef = doc(orderListCol, existing.docId);
          operations.push(setDoc(docRef, order));
        }
        // kalau tidak berubah, tidak usah lakukan apa-apa
        existingOrderMap.delete(order.id); // tandai sudah diproses
      } else {
        // tidak ditemukan di firestore, berarti tambahkan baru
        operations.push(addDoc(orderListCol, order));
      }
    }

    // Sisanya di existingOrderMap adalah data yang harus dihapus
    for (const { docId } of existingOrderMap.values()) {
      const docRef = doc(orderListCol, docId);
      operations.push(deleteDoc(docRef));
    }

    // Jalankan semua operasi sekaligus
    await Promise.all(operations);

    const result = { id: history_id, ...orderDetail };
    return { error: false, message: 'create new order success', data: result };
  } catch (error) {
    console.error('Error updating order:', error);
    return { error: true, message: error.message, data: null };
  }
}
