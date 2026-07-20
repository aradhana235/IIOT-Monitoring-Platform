import api from './api';

const SENSOR_IDS = ["ST101", "ST102", "ST103", "ST104","ST105"];

const getSensorStatusForDate = async (customerId, sensorId, date) => {
  const response = await api.get('/sensor-status-counts', {
    params: { customerId, sensorId, date },
  });
  return response.data;
};

export const getSensorStatusCounts = async (customerId, date) => {
  const results = await Promise.all(
    SENSOR_IDS.map((sensorId) => getSensorStatusForDate(customerId, sensorId, date))
  );

  return SENSOR_IDS.map((sensorId, idx) => {
    const counts = { normal: 0, partial: 0, blocked: 0, fullLeak: 0 };

    results[idx].forEach((item) => {
      const status = item.key.status;
      if (status === "normal") counts.normal = item.countValue;
      else if (status === "partial_leak") counts.partial = item.countValue;
      else if (status === "blocked") counts.blocked = item.countValue;
      else if (status === "full_leak") counts.fullLeak = item.countValue;
    });

    return { sensor: sensorId, ...counts };
  });
};