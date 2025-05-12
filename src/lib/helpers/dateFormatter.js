export function getFormattedDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}${pad(month, 2)}${pad(day, 2)}`;
}

export function getInputFormatDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${pad(month, 2)}-${pad(day, 2)}`;
}

export function timestampToDateString(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function convertToDateRange(type, start, end) {
  if (!start || !end) return null;

  if (type === 'month') {
    const startDate = new Date(`${start}-01`);
    const endDate = new Date(`${end}-01`);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // hari terakhir bulan sebelumnya
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  }

  if (type === 'year') {
    const startDate = new Date(`${start}-01-01`);
    const endDate = new Date(`${end}-12-31`);
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  }

  return null;
}

export function getFormattedDateReport(type, date) {
  if (!date) return '';

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  if (type === 'date') {
    const d = new Date(date);
    const day = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  if (type === 'month') {
    const [year, month] = date.split('-'); // format "2025-05"
    return `${monthNames[+month - 1]} ${year}`;
  }

  if (type === 'year') {
    return date.toString(); // langsung kembalikan angka tahunnya
  }

  return '';
}

function pad(num, length) {
  let str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
