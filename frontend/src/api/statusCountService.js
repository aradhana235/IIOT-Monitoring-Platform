import apiClient from './api';

// Ek din ka data fetch karo
const getStatusCountsByDate = async (customerId, date) => {
  const response = await apiClient.get('/status-counts', {
    params: { customerId, date },
  });
  return response.data; // [{ key: { status, statusDate, ... }, countValue }, ...]
};

// Date range ke liye loop lagao (from -> to, saare din)
export const getStatusCountsRange = async (customerId, from, to) => {
  const dates = [];
  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]); // YYYY-MM-DD
    current.setDate(current.getDate() + 1);
  }

  // Har date ke liye parallel API calls
  const results = await Promise.all(
    dates.map((date) => getStatusCountsByDate(customerId, date))
  );

  // Backend ka response shape ko chart ke expected shape me convert karo
  // Backend: [{ key: { status: "blocked", statusDate: "2026-05-19" }, countValue: 5 }]
  // Chart chahta hai: { date: "2026-05-19", blocked: 5, leak: 0, normal: 0, partial: 0 }
  return dates.map((date, index) => {
    const dayData = results[index];
    const row = { date, blocked: 0, leak: 0, normal: 0, partial: 0 };

    dayData.forEach((item) => {
      const status = item.key.status;
      if (status in row) {
        row[status] = item.countValue;
      }
    });

    return row;
  });
};