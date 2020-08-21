import { formatNum } from './formatNum';

export const calcNWRate = (data, goal) => {
  if (data.length === 0) { return ''; }
  let currVal = data[data.length - 1].value;
  if (Number(currVal) === Number(goal)) { return `You've reached your net worth goal!`; }
  if (currVal > goal) {
    // goal reached, show overflow amount
    let overflow = formatNum(Number(currVal) - Number(goal));
    return `You've passed your goal by $${overflow}!`;
  }
  if (data.length < 2) { return ''; }
  // get slope of net worth data by using y2-y1/x2-x1
  // ie (curr value - initial value/curr date - initial date)
  let x1 = new Date(data[0].date).getTime();
  let x2 = new Date(data[data.length - 1].date).getTime();
  let x = x2 - x1;
  let y = Number(currVal) - Number(data[0].value);
  let slope = y / x;
  // calculate date to reach goal using y = slope * x
  let msUntilGoal = (goal - currVal) / slope;
  let date = new Date(msUntilGoal + new Date().getTime()).toLocaleString().split(',')[0];
  return `At your current net worth growth rate, you will reach your goal by ${date}.`;
};

export const calcGoalRate = (data, goal, currVal) => {
  if (data.length === 0) { return ''; }
  if (Number(currVal) === Number(goal)) { return `You've reached your goal!`; }
  if (currVal > goal) {
    // goal reached, show overflow amount
    let overflow = formatNum(Number(currVal) - Number(goal));
    return `You've passed your goal by $${overflow}!`;
  }
  if (data.length < 2) { return ''; }
  // sort data by date
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // get average contribution value over time
  let tot = data.reduce((tot, curr) => tot + Number(curr.val), 0);
  let totTime = new Date(sortedData[sortedData.length - 1].date).getTime() - new Date(sortedData[0].date).getTime() + 86400000;
  let avg = tot / totTime;
  let msUntilGoal = (goal - currVal) / avg;
  let date = new Date(msUntilGoal + new Date().getTime() + 86400000).toLocaleString().split(',')[0];
  return `At your current contribution rate, you will reach your goal by ${date}.`;
};
