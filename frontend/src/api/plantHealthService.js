import api from './api';

const getStatusCountsByDate = async (customerId, date) => {
  const response = await api.get('/status-counts', {
    params: { customerId, date },
  });
  return response.data;
};

export const getPlantHealthScore = async (customerId, date) => {
  const data = await getStatusCountsByDate(customerId, date);

  const totals = { normal: 0, blocked: 0, partial_leak: 0, full_leak: 0 };

  data.forEach((item) => {
    const status = item.key.status;
    if (status in totals) {
      totals[status] = item.countValue;
    }
  });

  const total = totals.normal + totals.blocked + totals.partial_leak + totals.full_leak;

  if (total === 0) return 0;

  const weightedScore =
    (totals.normal * 1.0 + totals.partial_leak * 0.5 + totals.blocked * 0 + totals.full_leak * 0) / total;

  return Math.round(weightedScore * 100);
};