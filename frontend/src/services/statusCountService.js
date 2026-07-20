// import api from './api';

// // Ek din ka status count data fetch karo
// const getStatusCountsByDate = async (customerId, date) => {
//   const response = await api.get('/status-counts', {
//     params: { customerId, date },
//   });
//   return response.data; // [{ key: { status, statusDate }, countValue }, ...]
// };

// // Date range ke saare din ka data jod ke percentage nikalo
// export const getStatusPercentageForRange = async (customerId, from, to) => {
//   const dates = [];
//   let current = new Date(from);
//   const end = new Date(to);

//   while (current <= end) {
//     dates.push(current.toISOString().split('T')[0]);
//     current.setDate(current.getDate() + 1);
//   }

//   // Har date ke liye parallel API calls
//   const results = await Promise.all(
//     dates.map((date) => getStatusCountsByDate(customerId, date))
//   );

//   // Saare din ka data status-wise sum karo
//   const totals = { normal: 0, blocked: 0, partial_leak: 0, full_leak: 0 };

//   results.forEach((dayData) => {
//     dayData.forEach((item) => {
//       const status = item.key.status;
//       if (status in totals) {
//         totals[status] += item.countValue;
//       }
//     });
//   });

//   const grandTotal = totals.normal + totals.blocked + totals.partial_leak + totals.full_leak;

//   const toPercent = (val) =>
//     grandTotal === 0 ? 0 : Number(((val / grandTotal) * 100).toFixed(1));

//   return [
//     { name: 'Normal', value: toPercent(totals.normal), count: totals.normal },
//     { name: 'Blocked', value: toPercent(totals.blocked), count: totals.blocked },
//     { name: 'Partial', value: toPercent(totals.partial_leak), count: totals.partial_leak },
//     { name: 'Full Leak', value: toPercent(totals.full_leak), count: totals.full_leak },
//   ];
// };