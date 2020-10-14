export const calcPortfolioValue = (portfolio) => {
  const cryptos = [...portfolio.cryptos].map(crypto => {
    // if crypto price wasnt found then show '?'
    if (crypto.price === '?') { return { ...crypto, value: '?' }; }
    if (crypto.identifier === 'Manual') { return crypto; }
    return { ...crypto, value: crypto.price * crypto.quantity };
  });

  const stocks = [...portfolio.stocks].map(stock => {
    // if stock price wasnt found then show '?'
    if (stock.price === '?') { return { ...stock, value: '?' }; }
    if (stock.identifier === 'Manual') { return stock; }
    return { ...stock, value: stock.price * stock.quantity };
  });

  return { ...portfolio, stocks, cryptos };
};

export const calcNetWorth = (netWorthData, portfolio) => {
  const updatedPortfolio = calcPortfolioValue(portfolio);
  const updatedData = [...netWorthData];
  let netWorth = 0;
  // add all stocks/cryptos/assets to net worth & remove debts for total
  for (let stock of updatedPortfolio.stocks) {
    if (stock.value !== '?') { netWorth += Number(stock.value); }
  }
  for (let crypto of updatedPortfolio.cryptos) {
    if (crypto.value !== '?') { netWorth += Number(crypto.value); }
  }
  for (let asset of updatedPortfolio.otherAssets) { netWorth += Number(asset.value); }
  for (let debt of updatedPortfolio.liabilities) { netWorth -= Number(debt.value); }

  // if last net worth entry was a day ago make a new entry
  if (Math.abs(new Date().getTime() - new Date(netWorthData[netWorthData.length - 1].date).getTime()) >= 86400000) {
    updatedData.push({ date: new Date(), value: +netWorth.toFixed(2) });
  } else {
    // else update the current day's net worth
    updatedData[netWorthData.length - 1].value = +netWorth.toFixed(2);
  }
  return updatedData;
};
