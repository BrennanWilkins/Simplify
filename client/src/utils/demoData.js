import { v4 as uuid } from 'uuid';

const getDemoData = () => {
  const msInDay = 86400000;
  const budget = [
    {
      transactions: [
        { desc: "Summer Trip", val: "100", date: String(new Date(new Date().getTime() - (msInDay * 5))) }
      ],
      category: 'Travel',
      budget: 150
    },
    {
      transactions: [
        { desc: "Concert", val: "150", date: String(new Date(new Date().getTime() - (msInDay * 10))) },
        { desc: "Netflix", val: "10", date: String(new Date(new Date().getTime() - (msInDay * 5))) },
        { desc: "Movie", val: "15", date: String(new Date(new Date().getTime() - (msInDay * 3))) }
      ],
      category: 'Entertainment',
      budget: 300
    },
    {
      transactions: [
        { desc: "Clothes", val: "50", date: String(new Date(new Date().getTime() - (msInDay * 15))) }
      ],
      category: 'Shopping',
      budget: 100
    },
    {
      transactions: [
        { desc: "Car Payment", val: "400", date: String(new Date(new Date().getTime() - (msInDay * 7))) }
      ],
      category: 'Transportation',
      budget: 500
    },
    {
      transactions: [
        { desc: "Gym Membership", val: "30", date: String(new Date(new Date().getTime() - (msInDay * 4))) },
        { desc: "Haircut", val: "20", date: String(new Date(new Date().getTime() - (msInDay * 2))) }
      ],
      category: 'Personal',
      budget: 150
    },
    {
      transactions: [
        { desc: "Student loan payment", val: "300", date: String(new Date(new Date().getTime() - (msInDay * 12))) },
      ],
      category: 'Education',
      budget: 400
    }
  ];
  const portfolio = {
    cryptos: [
      { name: 'Bitcoin', symbol: 'BTC', quantity: 1.05, identifier: 'Normal' },
      { name: 'Ethereum', symbol: 'ETH', quantity: 5.50, identifier: 'Normal' },
      { name: 'Litecoin', symbol: 'LTC', quantity: 4.33, identifier: 'Normal' },
      { name: 'Monero', symbol: 'XMR', quantity: 0.55, identifier: 'Normal' },
    ],
    stocks: [
      { name: 'SPDR S&P 500 ETF Trust', symbol: 'SPY', quantity: 15, identifier: 'Normal' },
      { name: 'Vanguard 500 Index Fund ETF', symbol: 'VOO', quantity: 12, identifier: 'Normal' },
      { name: 'Alphabet Inc.', symbol: 'GOOGL', quantity: 2, identifier: 'Normal' },
      { name: 'Tesla, Inc.', symbol: 'TSLA', quantity: 3, identifier: 'Normal' },
      { name: 'Amazon.com, Inc.', symbol: 'AMZN', quantity: 1, identifier: 'Normal' },
      { name: 'Microsoft Corporation', symbol: 'MSFT', quantity: 3, identifier: 'Normal' },
      { name: 'Apple Inc.', symbol: 'AAPL', quantity: 4, identifier: 'Normal' }
    ],
    otherAssets: [
      { name: 'Cash', desc: 'My bank accnt', value: 30000 },
      { name: 'Cash', desc: 'Brokerage accnt', value: 10000 },
      { name: 'Real Estate', desc: 'My apartment', value: 175000 },
    ],
    liabilities: [
      { name: 'Credit Card Debt', desc: 'My credit card', value: 3000 }
    ],
    manualStocks: [],
    manualCryptos: []
  };
  const contribs1 = [];
  for (let i = 0; i < 15; i++) {
    contribs1.unshift({ val: String(150 * Math.floor((Math.random() * 5) + 1)), date: String(new Date(new Date().getTime() - (msInDay * 3 * i)).toISOString().split('T')[0]) });
  }
  const contribs2 = [];
  for (let i = 0; i < 30; i++) {
    contribs2.unshift({ val: String(500 * Math.floor((Math.random() * 5) + 1)), date: String(new Date(new Date().getTime() - (msInDay * 14 * i)).toISOString().split('T')[0]) });
  }
  const contribs3 = [];
  for (let i = 0; i < 60; i++) {
    contribs3.unshift({ val: String(50 * Math.floor((Math.random() * 15) + 1)), date: String(new Date(new Date().getTime() - (msInDay * 7 * i)).toISOString().split('T')[0]) });
  }
  const otherGoals = [
    {
      name: 'Vacation savings',
      goal: '4000',
      date: String(new Date(new Date().getTime() + (msInDay * 90)).toISOString().split('T')[0]),
      isComplete: true,
      _id: uuid(),
      contributions: contribs1
    },
    {
      name: 'House down payment',
      goal: '100000',
      date: String(new Date(new Date().getTime() + (msInDay * 200)).toISOString().split('T')[0]),
      isComplete: false,
      _id: uuid(),
      contributions: contribs2
    },
    {
      name: 'New car savings',
      goal: '45000',
      date: String(new Date(new Date().getTime() + (msInDay * 150)).toISOString().split('T')[0]),
      isComplete: false,
      _id: uuid(),
      contributions: contribs3
    }
  ];
  return { budget, NWGoal: 500000, portfolio, otherGoals };
};

export const getDemoNW = portfolio => {
  let tot = 0;
  for (let crypto of portfolio.cryptos) { tot += crypto.price * crypto.quantity; }
  for (let stock of portfolio.stocks) { tot += stock.price * stock.quantity; }
  for (let crypto of portfolio.manualCryptos) { tot += crypto.price * crypto.quantity; }
  for (let stock of portfolio.manualStocks) { tot += stock.price * stock.quantity; }
  for (let debt of portfolio.liabilities) { tot -= debt.value; }
  for (let asset of portfolio.otherAssets) { tot += asset.value; }
  return tot;
};

export const getDemoNWData = NWVal => {
  const netWorthData = [];
  const msInDay = 86400000;
  for (let i = 0; i < 24; i++) {
    netWorthData.unshift({
      date: String(new Date(new Date().getTime() - (msInDay * 15 * (i + 1)))),
      value: NWVal - (NWVal * 0.04 * i) - Math.floor(Math.random() * NWVal * 0.08)
    });
  }
  return netWorthData;
};

export default getDemoData;
