export const createNetWorthOptions = (data) => {
  const netWorthData = data.map(dataPt => {
    return { x: new Date(dataPt.date), y: Number((dataPt.value).toFixed(2)) };
  });

  const options = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { valueFormatString: "'$'0" },
    axisX: { valueFormatString: 'MM/DD/YY', labelAngle: -20 },
    toolTip: { content: '{x}: ${y}' },
    data: [{
      type: 'area',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      color: 'rgb(26, 171, 152)',
      fillOpacity: '1',
      dataPoints: netWorthData
    }]
  };

  return options;
};
