import api from './api';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMonthlyAlertTrend = async (customerId, year) => {
  const response = await api.get('/alert-trend', {
    params: { customerId, year },
  });

  // Backend: [{ key: { year, month }, alertCount }]
  // Chart chahta hai: [{ month: "Jul", alerts: 15 }]
  return response.data
    .map((item) => ({
      month: MONTH_NAMES[item.key.month - 1], // month 1-12 hai, array 0-indexed
      monthNum: item.key.month,
      alerts: item.alertCount,
    }))
    .sort((a, b) => a.monthNum - b.monthNum); // chronological order me sort
};