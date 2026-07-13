// utils/profitLossExport.js
// Export helpers for the Profit & Loss table.
// Uses: xlsx (SheetJS) for Excel, jspdf + jspdf-autotable for PDF.
//
// npm install xlsx jspdf jspdf-autotable

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COLUMNS = [
  { header: "ID", key: "displayId" },
  { header: "Date", key: "date" },
  { header: "Device", key: "deviceName" },
  { header: "Customer", key: "customerName" },
  { header: "Diameter (mm)", key: "diameter" },
  { header: "Pressure (bar)", key: "pressure" },
  { header: "Steam Loss (kg/hr)", key: "steamLossKgHr" },
  { header: "Cost / kg (₹)", key: "costPerKg" },
  { header: "Loss Amount (₹)", key: "lossAmount" },
  { header: "Savings (₹)", key: "savings" },
  { header: "Status", key: "status" },
];

function toRows(records) {
  return records.map((r, i) => ({
    displayId: r.displayId || `PL-${String(r.id).padStart(3, "0")}`,
    date: r.date,
    deviceName: r.deviceName,
    customerName: r.customerName,
    diameter: r.diameter,
    pressure: r.pressure,
    steamLossKgHr: r.steamLossKgHr,
    costPerKg: r.costPerKg,
    lossAmount: r.lossAmount,
    savings: r.savings,
    status: r.status,
  }));
}

/** Export the current (filtered) list of Profit & Loss records to an .xlsx file. */
export function exportProfitLossToExcel(records, fileName = "ProfitLoss_Report") {
  const rows = toRows(records);

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: COLUMNS.map((c) => c.key),
  });

  // Friendly header row
  XLSX.utils.sheet_add_aoa(worksheet, [COLUMNS.map((c) => c.header)], {
    origin: "A1",
  });

  // Reasonable column widths
  worksheet["!cols"] = [
    { wch: 10 }, // ID
    { wch: 12 }, // Date
    { wch: 16 }, // Device
    { wch: 16 }, // Customer
    { wch: 14 }, // Diameter
    { wch: 14 }, // Pressure
    { wch: 18 }, // Steam Loss
    { wch: 14 }, // Cost/kg
    { wch: 16 }, // Loss Amount
    { wch: 14 }, // Savings
    { wch: 12 }, // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Profit & Loss");

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${fileName}_${stamp}.xlsx`);
}

/** Export the current (filtered) list of Profit & Loss records to a .pdf file. */
export function exportProfitLossToPDF(records, fileName = "ProfitLoss_Report") {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt" });

  const generatedOn = new Date().toLocaleString("en-IN");

  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235); // #2563eb
  doc.text("SteamGuard - Profit & Loss Report", 40, 40);

  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // gray
  doc.text(`Generated on: ${generatedOn}`, 40, 58);
  doc.text(`Total Records: ${records.length}`, 40, 72);

  const rows = toRows(records).map((r) => [
    r.displayId,
    r.date,
    r.deviceName,
    r.customerName,
    r.diameter,
    r.pressure,
    r.steamLossKgHr,
    r.costPerKg != null ? `₹${r.costPerKg}` : "",
    r.lossAmount != null ? `₹${r.lossAmount}` : "",
    r.savings != null ? `₹${r.savings}` : "",
    r.status,
  ]);

  autoTable(doc, {
    startY: 90,
    head: [COLUMNS.map((c) => c.header)],
    body: rows,
    styles: { fontSize: 8, cellPadding: 6 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 250, 251] },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  doc.save(`${fileName}_${stamp}.pdf`);
}
