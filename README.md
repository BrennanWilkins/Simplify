# Simplify

https://simplify.herokuapp.com/

Simplify helps you simplify your finances by providing budgeting, net worth tracking, investment portfolio tracking, and visualization tools.
On the home page, you can see your investments, net worth, goals, and budgets all at once.
The UI has a responsive design, which allows for any screen size to be used, including mobile.
If you are unsure how any feature works, you can also click on 'Help' to reach the help panel with gifs and explanations of all the features.

## Portfolio

The portfolio page shows your net worth over time, creating a new data point every day. Each time you buy or sell a stock, cryptocurrency, or asset, your net worth will update. Every time you log in, your net worth will also update based on the current real-time prices of your stocks and cryptocurrencies.

In the stocks section, you can buy, sell, and search for stocks. If you can't find the stock from the search results, you can always add it manually and update the price from the settings icon at any time. The server will use an API to fetch the closest matching results for your search query, and uses a yahoo finance API to retrieve the current price of the stock.

In the cryptocurrency section, you can buy, sell, and search for cryptocurrencies just like for stocks. You can also add cryptocurrencies manually. Cryptocurrency prices are stored on the mongoDB database, and are updated every hour. When you search for a cryptocurrency, your search results are retrieved from the database.

In the assets and liabilities sections, you can add or remove assets like real estate, and add liabilities like credit card debt. You can change their value in the settings menu. Assets and liabilities are added on to and subtracted from your net worth, respectively.

## Budgeting

You can create or edit a budget from the budgeting page. You can create different budgeting categories and set the budget for each category. The graph at the top of the page will show you what percentage of your total budget you've reached for the month, and resets every month. You can click on 'Add Transaction' to add a new transaction for a given budget category.

## Plan

The plan page lets you visualize the progression of your goals over time based on exponential growth. You can use this tool to create a plan for reaching your goal and to see how long it will take based on the parameters you put in.

## Goals

You can create a net worth goal that will show you how close you are to your net worth goal, and can be updated or removed at any time.

## Built With

React/Redux used for the frontend
Node.js (Express.js) and MongoDB (mongoose) used for the backend
