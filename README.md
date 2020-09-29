# Simplify

https://simplify.herokuapp.com/

Simplify helps you organize and simplify your finances by tracking your budget, goals, investments, net worth, and more.
The UI has a responsive design, which allows for any screen size to be used, including mobile.
If you are unsure how any feature works, you can click on 'Help' to reach the help panel with gifs and explanations of all the features.

To test all of the features without creating an account, you can click 'View a demo account' on the login page.

## Portfolio

The portfolio page shows your net worth over time, creating a new data point every day. Each time you buy or sell a stock, cryptocurrency, or asset, your net worth will update. Every time you log in, your net worth will also update based on the current real-time prices of your stocks and cryptocurrencies.

In the highlights section, you can see recent key changes in your portfolio. You can also get recent financial news for a certain stock or general market news. You must have an account to access the news.

In the stocks and cryptocurrencies sections, you can buy, sell, and search for stocks and cryptocurrencies. If you can't find the stock or cryptocurrency from the search results, you can add it manually and update the price using the settings icon.

When searching for a stock or cryptocurrency, the server will fetch a list of all cryptocurrencies or stocks stored in the mongoDB database, which is frequently updated.

The server generates a list of the closest matching investments for your search query, and uses several APIs to retrieve the current price of the investment.

You can also retrieve an analysis of a stock using the 'Analysis' button, which will show you current analyst price targets, EPS expected vs actual data, and analyst recommendation trends.

In the assets and liabilities sections, you can add or remove assets like real estate, and add liabilities like credit card debt. You can change their value in the settings menu. Assets and liabilities are added on to and subtracted from your net worth, respectively.

In the portfolio breakdown section, you can see the total percentages of your portfolio of your different asset classes, and a percentage breakdown of your stock and cryptocurrency portfolio.

## Budgeting

You can create or edit a budget from the budgeting page. You can create different budgeting categories and set the budget for each category. The graphs at the top of the page will show you a breakdown of your budget and your total remaining budget. Your budget will reset at the beginning of every month. You can click on 'Add Transaction' to add a new transaction for a given budget category, or 'Transactions' to view your recent transactions.

## Plan

The plan page has visualization tools to plan for your financial goals, as well as a capital gains tax calculator to estimate your taxes based on the current tax brackets for the year. You can learn more about how the compound interest visualizer, retirement goal visualizer, and capital gains calculator work by clicking the '?' icon on each page.

## Goals

You can create and track your goals on the goal page. By adding contributions to your goals, you can see a chart of the progression of your goal over time, and the expected date to reach your goal calculated based on your contribution rate.

## Built With

React/Redux used for the frontend
Node.js (Express.js) and MongoDB (mongoose) used for the backend
