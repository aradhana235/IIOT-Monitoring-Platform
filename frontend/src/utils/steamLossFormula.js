// utils/steamLossFormula.js
// Central place for the steam trap loss formula so Add & Edit forms
// (and the backend, if you port this to Java) always agree.
//
//   Steam Loss (kg/hr) = 0.0012 x d^2 x P
//     d = orifice / trap diameter in mm
//     P = steam pressure in kg/cm2 (or bar, per your steam_parameters convention)

export function calcSteamLossKgHr(diameter, pressure) {
  const d = parseFloat(diameter);
  const p = parseFloat(pressure);
  if (!d || !p || d <= 0 || p <= 0) return 0;
  return +(0.0012 * d * d * p).toFixed(3);
}

export function calcLossAmount(steamLossKgHr, hoursPerDay, costPerKg) {
  const loss = parseFloat(steamLossKgHr) || 0;
  const hours = parseFloat(hoursPerDay) || 24;
  const cost = parseFloat(costPerKg) || 0;
  return +(loss * hours * cost).toFixed(2);
}

export function calcSavings(lossAmount, recoveryPercent) {
  const loss = parseFloat(lossAmount) || 0;
  const recovery = parseFloat(recoveryPercent) || 0;
  return +((loss * recovery) / 100).toFixed(2);
}
