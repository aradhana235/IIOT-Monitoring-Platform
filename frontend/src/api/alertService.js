import api from './api';

export const getRecentAlerts = async (customerId, date) => {
  const params = { customerId };
  if (date) params.date = date;

  const response = await api.get('/alerts', { params });
  return response.data;
};

// Date range ke saare din ke alerts fetch karo (from se to tak)
export const getAlertsForDateRange = async (customerId, from, to) => {
  const dates = [];
  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  const results = await Promise.all(
    dates.map((date) => getRecentAlerts(customerId, date))
  );

  const allAlerts = results.flat();

  allAlerts.sort((a, b) => new Date(b.key.ts) - new Date(a.key.ts));

  return allAlerts;
};