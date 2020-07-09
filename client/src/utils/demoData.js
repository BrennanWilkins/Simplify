export const getDemoData = () => {
  let date1 = new Date(); date1.setFullYear(2020, 6, 3);
  let date2 = new Date(); date2.setFullYear(2020, 6, 1);
  let date3 = new Date(); date3.setFullYear(2020, 6, 2);
  let date4 = new Date(); date4.setFullYear(2020, 6, 4);
  let date5 = new Date(); date5.setFullYear(2020, 6, 5);
  let date6 = new Date(); date6.setFullYear(2020, 6, 9);
  let date7 = new Date(); date7.setFullYear(2020, 6, 13);
  let date12 = new Date(); date12.setFullYear(2018, 11, 10);
  let date13 = new Date(); date13.setFullYear(2019, 1, 4);
  let date14 = new Date(); date14.setFullYear(2019, 1, 25);
  let date15 = new Date(); date15.setFullYear(2019, 2, 8);
  let date16 = new Date(); date16.setFullYear(2019, 3, 15);
  let date17 = new Date(); date17.setFullYear(2019, 6, 2);
  let date18 = new Date(); date18.setFullYear(2019, 8, 22);
  let date19 = new Date(); date19.setFullYear(2019, 9, 17);
  let date20 = new Date(); date20.setFullYear(2019, 10, 25);
  let date21 = new Date(); date21.setFullYear(2019, 11, 4);
  let date22 = new Date(); date22.setFullYear(2020, 0, 13);
  let date23 = new Date(); date23.setFullYear(2020, 1, 23);
  let date24 = new Date(); date24.setFullYear(2020, 3, 18);
  let date25 = new Date(); date25.setFullYear(2020, 3, 27);
  let date26 = new Date(); date26.setFullYear(2020, 4, 12);
  let date27 = new Date(); date27.setFullYear(2020, 4, 15);
  let date28 = new Date(); date28.setFullYear(2020, 5, 18);
  let date29 = new Date(); date29.setFullYear(2020, 5, 25);
  let date30 = new Date(); date30.setFullYear(2020, 5, 29);
  let date31 = new Date(); date31.setFullYear(2020, 6, 7);

  const budget = [
    {
      transactions: [
        { desc: "Summer Trip", value: "100", date: String(date1) }
      ],
      category: 'Travel',
      budget: 150
    },
    {
      transactions: [
        { desc: "Concert", value: "150", date: String(date2) },
        { desc: "Netflix", value: "10", date: String(date3) },
        { desc: "Movie", value: "15", date: String(date5) }
      ],
      category: 'Entertainment',
      budget: 300
    },
    {
      transactions: [
        { desc: "Clothes", value: "50", date: String(date4) }
      ],
      category: 'Shopping',
      budget: 100
    },
    {
      transactions: [
        { desc: "Car Payment", value: "400", date: String(date5) }
      ],
      category: 'Transportation',
      budget: 500
    },
    {
      transactions: [
        { desc: "Gym Membership", value: "30", date: String(date6) },
        { desc: "Haircut", value: "20", date: String(date7) }
      ],
      category: 'Personal',
      budget: 150
    },
    {
      transactions: [
        { desc: "Tuition Loan", value: "300", date: String(date3) },
      ],
      category: 'Education',
      budget: 400
    }
  ];
  const goal = 500000;
  const netWorthData = [
    { date: String(date12), value: 1191.91 },
    { date: String(date13), value: 2043.80 },
    { date: String(date14), value: 4503.31 },
    { date: String(date15), value: 10009.99 },
    { date: String(date16), value: 15043.78 },
    { date: String(date17), value: 21210.87 },
    { date: String(date18), value: 34755.22 },
    { date: String(date19), value: 42815.43 },
    { date: String(date20), value: 40899.98 },
    { date: String(date21), value: 62788.66 },
    { date: String(date22), value: 67238.29 },
    { date: String(date23), value: 75132.41 },
    { date: String(date24), value: 80359.78 },
    { date: String(date25), value: 100576.56 },
    { date: String(date26), value: 120430.11 },
    { date: String(date27), value: 145328.28 },
    { date: String(date28), value: 157567.65 },
    { date: String(date29), value: 190438.70 },
    { date: String(date30), value: 211410.88 },
    { date: String(date31), value: 230599.47 }
  ];
  const portfolio = {
    cryptos: [
      { name: 'Bitcoin', symbol: 'BTC', quantity: 3.05, identifier: 'Normal' },
      { name: 'Ethereum', symbol: 'ETH', quantity: 5.50, identifier: 'Normal' },
      { name: 'Litecoin', symbol: 'LTC', quantity: 10.33, identifier: 'Normal' },
    ],
    stocks: [
      { name: 'Invesco QQQ Trust, Series 1', symbol: 'QQQ', quantity: 12, identifier: 'Normal' },
      { name: 'Alphabet Inc.', symbol: 'GOOGL', quantity: 5, identifier: 'Normal' },
      { name: 'Tesla, Inc.', symbol: 'TSLA', quantity: 1, identifier: 'Normal' },
      { name: 'Amazon.com, Inc.', symbol: 'AMZN', quantity: 1, identifier: 'Normal' },
      { name: 'Microsoft Corporation', symbol: 'MSFT', quantity: 3, identifier: 'Normal' },
      { name: 'Apple Inc.', symbol: 'AAPL', quantity: 2, identifier: 'Normal' }
    ],
    otherAssets: [
      { name: 'Bank Accnt', desc: 'Capital One Savings', value: 30000 },
      { name: 'Real Estate', desc: 'My apartment #1', value: 175000 }
    ],
    liabilities: [
      { name: 'Credit Card Debt', desc: 'My credit card #1', value: 3000 }
    ],
    manualStocks: [],
    manualCryptos: []
  };
  return { budget, goal, netWorthData, portfolio };
};
