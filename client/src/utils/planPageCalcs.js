export const calcCapGains = taxVals => {
  // calculate total profit from short term & long term investments
  let shortProfit = 0, longProfit = 0, shortRate = 0, longRate = 0;
  for (let stock of taxVals.stocks) {
    let profit = stock.salePrice - stock.purchasePrice;
    if (stock.held === 'More') { longProfit += profit; }
    else { shortProfit += profit; }
  }
  let income = Number(taxVals.income) + shortProfit;
  let longTax = 0;
  if (taxVals.filingStatus === 'Single') {
    // Single filing status long term rates
    if (longProfit < 40001) { longRate = 0; }
    else if (longProfit < 441451) { longRate = 15; }
    else { longRate = 20; }
    // calculate long term tax
    for (let i = 0; i < longProfit; i++) {
      if (i < 40001) { longTax += 0; }
      else if (i < 441451) { longTax += .15; }
      else { longTax += .2; }
      if (i > 200000) { longTax += .038; }
    }
  } else if (taxVals.filingStatus === 'Head') {
    // Head of household long term rates
    if (longProfit < 53601) { longRate = 0; }
    else if (longProfit < 469051) { longRate = 15; }
    else { longRate = 20; }
    // calculate long term tax
    for (let i = 0; i < longProfit; i++) {
      if (i < 53601) { longTax += 0; }
      else if (i < 469051) { longTax += .15; }
      else { longTax += .2; }
      if (i > 200000) { longTax += .038; }
    }
  } else if (taxVals.filingStatus === 'Jointly') {
    // Married filing jointly long term rates
    if (longProfit < 80001) { longRate = 0; }
    else if (longProfit < 496601) { longRate = 15; }
    else { longRate = 20; }
    // calculate long term tax
    for (let i = 0; i < longProfit; i++) {
      if (i < 80001) { longTax += 0; }
      else if (i < 496601) { longTax += .15; }
      else { longTax += .2; }
      if (i > 250000) { longTax += .038; }
    }
  } else {
    // Married filing separately long term rates
    if (longProfit < 40001) { longRate = 0; }
    else if (longProfit < 248301) { longRate = 15; }
    else { longRate = 20; }
    // calculate long term tax
    for (let i = 0; i < longProfit; i++) {
      if (i < 40001) { longTax += 0; }
      else if (i < 248301) { longTax += .15; }
      else { longTax += .2; }
      if (i > 125000) { longTax += .038; }
    }
  }
  // adjust tax rates if modified adjusted gross income over
  // $250000 if married filing jointly, $200000 if single/head of household
  // , or 125000 if married filing separately
  let totIncome = income + longProfit;
  if (taxVals.filingStatus === 'Jointly') {
    if (totIncome > 250000) { shortRate += 3.8; longRate += 3.8; }
  } else if (taxVals.filingStatus === 'Separately') {
    if (totIncome > 125000) { shortRate += 3.8; longRate += 3.8; }
  } else {
    // for single or head of household
    if (totIncome > 200000) { shortRate += 3.8; longRate += 3.8; }
  }
  let shortTax = 0;
  if (taxVals.filingStatus === 'Single') {
    // Single filing status short term rates
    if (income < 9876) { shortRate = 10; }
    else if (income < 40126) { shortRate += 12; }
    else if (income < 85526) { shortRate += 22; }
    else if (income < 163301) { shortRate += 24; }
    else if (income < 207351) { shortRate += 32; }
    else if (income < 518401) { shortRate += 35; }
    else { shortRate += 37; }
    // calculate short term tax
    for (let i = Number(taxVals.income); i < income; i++) {
      if (i < 9876) { shortTax += .10; }
      else if (i < 40126) { shortTax += .12; }
      else if (i < 85526) { shortTax += .22; }
      else if (i < 163301) { shortTax += .24; }
      else if (i < 207351) { shortTax += .32; }
      else if (i < 518401) { shortTax += .35; }
      else { shortTax += .37; }
      if (i >= 200000) { shortTax += .038; }
    }
  } else if (taxVals.filingStatus === 'Head') {
    // Head of household short term rates
    if (income < 14101) { shortRate += 10; }
    else if (income < 53701) { shortRate += 12; }
    else if (income < 85501) { shortRate += 22; }
    else if (income < 163301) { shortRate += 24; }
    else if (income < 207351) { shortRate += 32; }
    else if (income < 518401) { shortRate += 35; }
    else { shortRate += 37; }
    // calculate short term tax
    for (let i = Number(taxVals.income); i < income; i++) {
      if (i < 14101) { shortTax += .10; }
      else if (i < 53701) { shortTax += .12; }
      else if (i < 85501) { shortTax += .22; }
      else if (i < 163301) { shortTax += .24; }
      else if (i < 207351) { shortTax += .32; }
      else if (i < 518401) { shortTax += .35; }
      else { shortTax += .37; }
      if (i >= 200000) { shortTax += .038; }
    }
  } else if (taxVals.filingStatus === 'Jointly') {
    // Married filing jointly short term rates
    if (income < 19751) { shortRate += 10; }
    else if (income < 80251) { shortRate += 12; }
    else if (income < 171051) { shortRate += 22; }
    else if (income < 326601) { shortRate += 24; }
    else if (income < 414701) { shortRate += 32; }
    else if (income < 622051) { shortRate += 35; }
    else { shortRate += 37; }
    // calculate short term tax
    for (let i = Number(taxVals.income); i < income; i++) {
      if (i < 19751) { shortTax += .10; }
      else if (i < 80251) { shortTax += .12; }
      else if (i < 171051) { shortTax += .22; }
      else if (i < 326601) { shortTax += .24; }
      else if (i < 414701) { shortTax += .32; }
      else if (i < 622051) { shortTax += .35; }
      else { shortTax += .37; }
      if (i >= 250000) { shortTax += .038; }
    }
  } else {
    // Married filing separately short term rates
    if (income < 9876) { shortRate += 10; }
    else if (income < 40126) { shortRate += 12; }
    else if (income < 85526) { shortRate += 22; }
    else if (income < 163301) { shortRate += 24; }
    else if (income < 207351) { shortRate += 32; }
    else if (income < 311026) { shortRate += 35; }
    else { shortRate += 37; }
    // calculate short term tax
    for (let i = Number(taxVals.income); i < income; i++) {
      if (i < 9876) { shortTax += .10; }
      else if (i < 40126) { shortTax += .12; }
      else if (i < 85526) { shortTax += .22; }
      else if (i < 163301) { shortTax += .24; }
      else if (i < 207351) { shortTax += .32; }
      else if (i < 311026) { shortTax += .35; }
      else { shortTax += .37; }
      if (i >= 125000) { shortTax += .038; }
    }
  }
  shortRate = shortProfit === 0 ? 0 : shortRate;
  longRate = longProfit === 0 ? 0 : longRate;
  let shortEffective = shortProfit === 0 ? 0 : shortTax / shortProfit;
  let longEffective = longTax / longProfit;
  let totalTax = shortTax + longTax;
  let totEffectiveRate = totalTax / (shortProfit + longProfit);
  const results = { shortRate, longRate, shortTax, longTax, totalTax,
    shortProfit, longProfit, shortEffective, longEffective, totEffectiveRate };
  return results;
};

export const calcCompound = compoundVals => {
  const dataPoints = [];
  for (let i = 0; i <= compoundVals.years; i++) {
    // compound interest on principal
    let tot = compoundVals.principal * ((1 + (compoundVals.interest / 1200)) ** (i * 12));
    // compound interest on monthly contribution
    tot += compoundVals.contrib * ((((1 + (compoundVals.interest / 1200)) ** (i * 12)) - 1) / (compoundVals.interest / 1200));
    dataPoints.push({ x: i, y: Number(tot.toFixed(2)) });
  }
  return dataPoints;
};

export const calcRetire = retireVals => {
  const dataPoints = [];
  let max = retireVals.age < 30 ? retireVals.age - 1 : retireVals.age - 5;
  for (let i = 20; i <= max; i++) {
    // solve for monthly contribution based on final goal, years till retirement, & annual return
    let contrib = retireVals.goal / ((((1 + (retireVals.interest / 1200)) ** ((retireVals.age - i) * 12)) - 1) / (retireVals.interest / 1200));
    dataPoints.push({ label: i, y: Number(contrib.toFixed(2)) });
  }
  return dataPoints;
};
