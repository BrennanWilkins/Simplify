import React, { useState, useEffect } from 'react';
import classes from './PriceChartPanel.module.css';
import { StockChart } from '../../UI/Chart/Chart';

const PriceChartPanel = props => {
  // const priceOptions = {
  //   animationEnabled: true,
  //   exportEnabled: false,
  //   theme: 'light2',
  //   charts: [{
  //     axisX: {
  //       lineThickness: 5,
  //       tickLength: 0,
  //       labelFormatter: e => '',
  //       crosshair: {
  //         enabled: true,
  //         snapToDataPoint: true,
  //         labelFormatter: e => ''
  //       }
  //     },
  //     axisY: {
  //       prefix: '$',
  //       tickLength: 0
  //     },
  //     toolTip: { shared: true },
  //     data: [{
  //       name: 'Price (in USD)',
  //       yValueFormatString: '$#,###.##',
  //       type: 'candlestick',
  //       dataPoints : priceData.dps1
  //     }]
  //   },{
  //     height: 100,
  //     axisX: {
  //       crosshair: {
  //         enabled: true,
  //         snapToDataPoint: true
  //       }
  //     },
  //     axisY: {
  //       title: 'Volume',
  //       prefix: '$',
  //       tickLength: 0
  //     },
  //     toolTip: { shared: true },
  //     data: [{
  //       name: 'Volume',
  //       yValueFormatString: '$#,###.##',
  //       type: 'column',
  //       dataPoints : priceData.dps2
  //     }]
  //   }],
  //   navigator: {
  //     data: [{
  //       dataPoints: priceData.dps3
  //     }],
  //     slider: {
  //       minimum: priceData.dps1.length ? priceData.dps1[0].x : new Date(),
  //       maximum: priceData.dps1.length ? priceData.dps1[priceData.dps1.length - 1].x : new Date()
  //     }
  //   }
  // };

  // const candles = res.data.candles;
  // if (candles.s !== 'ok') { return; }
  // const dps1 = []; const dps2 = []; const dps3 = [];
  // for (let i = 0; i < candles.t.length; i++) {
  //   dps1.push({ x: new Date(candles.t[i] * 1000), y: [candles.o[i], candles.h[i], candles.l[i], candles.c[i]] });
  //   dps2.push({ x: new Date(candles.t[i] * 1000), y: candles.v[i] });
  //   dps3.push({ x: new Date(candles.t[i] * 1000), y: candles.c[i] });
  // }
  // setPriceData({ dps1, dps2, dps3 });

  return (
    <div>
    {/*{priceData.dps1.length > 0 ?
      <div className={classes.StockChart}>
        <div className={classes.ChartTitle}>{selected.value} YTD Price Chart</div>
        <StockChart options={priceOptions} />
      </div>
      : <div className={classes.Title}>No historical stock price data was found for {selected.value}.</div>}*/}
    </div>
  );
};

export default PriceChartPanel;
