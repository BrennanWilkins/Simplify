export const calcPortfolioValue = (portfolio) => {
  const cryptos = [...portfolio.cryptos].map(crypto => {
    if (crypto.price === '?') { return { ...crypto, value: '?' }; }
    return { ...crypto, value: crypto.price * crypto.quantity };
  });

  const stocks = [...portfolio.stocks].map(stock => {
    if (stock.price === '?') { return { ...stock, value: '?' }; }
    return { ...stock, value: stock.price * stock.quantity };
  });

  return { ...portfolio, stocks, cryptos };
};

export const calcNetWorth = (netWorthData, portfolio) => {
  const updatedPortfolio = calcPortfolioValue(portfolio);
  const updatedData = [...netWorthData];
  let netWorth = 0;
  for (let stock of updatedPortfolio.stocks) {
    if (stock.value !== '?') { netWorth += stock.value; }
  }
  for (let crypto of updatedPortfolio.cryptos) {
    if (crypto.value !== '?') { netWorth += crypto.value; }
  }
  for (let asset of updatedPortfolio.otherAssets) { netWorth += asset.value; }
  for (let debt of updatedPortfolio.liabilities) { netWorth -= debt.value; }

  // if last net worth entry was a day ago make a new entry
  if (Math.abs(new Date().getTime() - new Date(netWorthData[netWorthData.length - 1].date).getTime()) >= 86400000) {
    updatedData.push({ date: new Date(), value: netWorth });
  } else {
    // else update the current day's net worth
    updatedData[netWorthData.length - 1].value = netWorth;
  }
  return updatedData;
};
