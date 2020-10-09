(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8],{113:function(e,a){(function(a){e.exports=a}).call(this,{})},115:function(e,a,t){"use strict";var n=t(2),r=t(0),l=t.n(r),o=t(116),c=t.n(o),s=t(15),m=t(108),i=t(106);a.a=Object(s.b)((function(e){return{dark:e.theme.darkMode,netWorthData:e.netWorth.netWorthData}}))((function(e){var a=0===e.netWorthData.length?"0.00":Object(i.a)(e.netWorthData[e.netWorthData.length-1].value),t=e.netWorthData.map((function(e){return{x:new Date(e.date),y:Number(e.value.toFixed(2))}})),r={theme:e.dark?"dark2":"light2",axisY:{valueFormatString:"'$'0"},axisX:{valueFormatString:"MM/DD/YY",labelAngle:-20},toolTip:{content:"{x}: ${y}"},backgroundColor:e.dark?"rgb(32, 84, 109)":"white",data:[{type:"area",indexLabelFontColor:"#5A5757",indexLabelPlacement:"outside",color:"rgb(26, 171, 152)",fillOpacity:"1",dataPoints:t}]};return l.a.createElement("div",{className:e.small?void 0:c.a.Container},l.a.createElement("h1",{className:e.small?c.a.TitleSmall:c.a.Title},l.a.createElement("span",{className:c.a.NWTitle},"Net Worth"),l.a.createElement("span",{className:c.a.Value},"$",a)),l.a.createElement("div",{className:e.small?c.a.ChartSmall:c.a.Chart},l.a.createElement(m.b,{options:e.small?Object(n.a)({},r,{height:200}):r,darkMode:e.dark})))}))},116:function(e,a,t){e.exports={TitleSmall:"NetWorthChart_TitleSmall__JPZhB",Title:"NetWorthChart_Title__kcjdH",Value:"NetWorthChart_Value__ELvx1",NWTitle:"NetWorthChart_NWTitle__1KSaq",ChartSmall:"NetWorthChart_ChartSmall__1tSge",Chart:"NetWorthChart_Chart__FlBGM",Container:"NetWorthChart_Container__XFY8B"}},117:function(e,a,t){"use strict";var n=t(10),r=t(2),l=t(3),o=t(0),c=t.n(o),s=t(118),m=t.n(s),i=t(15),d=t(9);a.a=Object(i.b)((function(e){return{stocks:e.portfolio.stocks,cryptos:e.portfolio.cryptos,assets:e.portfolio.otherAssets,debts:e.portfolio.liabilities,dark:e.theme.darkMode,cryptoIDs:e.portfolio.cryptoIDs}}))((function(e){var a=Object(o.useState)([]),t=Object(l.a)(a,2),s=t[0],i=t[1],u=Object(o.useState)({name:"",desc:"",symbol:"",quantity:"",price:"",value:""}),_=Object(l.a)(u,2),b=_[0],g=_[1];Object(o.useEffect)((function(){if(h(),e.normal){var a=Object(r.a)({},b);for(var t in a)a[t]="";g(a)}}),[e.mode,e.stocks,e.cryptos,e.assets,e.debts]);var h=function(){"Stocks"===e.mode?i(Object(n.a)(e.stocks)):"Cryptos"===e.mode?i(Object(n.a)(e.cryptos)):"Assets"===e.mode?i(Object(n.a)(e.assets)):i(Object(n.a)(e.debts))},C=function(e){if(!(s.length<2)){e=p(e);var a="";""===b[e]?a="Descend":"Descend"===b[e]&&(a="Ascend"),function(e,a){var t="name"===a||"desc"===a||"symbol"===a;if("Ascend"===e){var n=t?s.sort((function(e,t){return e[a].localeCompare(t[a])})):s.sort((function(e,t){return e[a]-t[a]}));i(n)}else if("Descend"===e){var l=t?s.sort((function(e,t){return t[a].localeCompare(e[a])})):s.sort((function(e,t){return t[a]-e[a]}));i(l)}else h();var o=Object(r.a)({},b);for(var c in o)o[c]="";o[a]=e,g(o)}(a,e)}},v=function(e){return e=p(e),""===b[e]?m.a.Neutral:"Ascend"===b[e]?m.a.Ascend:m.a.Descend},p=function(a){var t="Stocks"===e.mode||"Cryptos"===e.mode;return"symbol"!==a||t?"name"!==a||t?"quantity"!==a||t||(a="value"):a="desc":a="name",a};return c.a.createElement("div",{className:e.normal?null:"Stocks"===e.mode||"Cryptos"===e.mode?e.dark?"".concat(m.a.Container," ").concat(m.a.Dark):m.a.Container:e.dark?"".concat(m.a.Container," ").concat(m.a.AssetContainer," ").concat(m.a.Dark):"".concat(m.a.Container," ").concat(m.a.AssetContainer)},c.a.createElement("table",{className:e.normal?e.dark?"".concat(m.a.NormalTable," ").concat(m.a.DarkTable):m.a.NormalTable:e.dark?"".concat(m.a.Table," ").concat(m.a.DarkTable):m.a.Table},c.a.createElement("thead",null,c.a.createElement("tr",{className:m.a.HeaderFields},c.a.createElement("th",null,"Stocks"===e.mode?"Ticker":"Cryptos"===e.mode?"Symbol":"Category",e.normal&&c.a.createElement("span",{onClick:function(){return C("symbol")},className:v("symbol")},""===b[p("symbol")]?d.e:d.d)),c.a.createElement("th",null,"Stocks"===e.mode?"Company Name":"Cryptos"===e.mode?"Name":"Description",e.normal&&c.a.createElement("span",{onClick:function(){return C("name")},className:v("name")},""===b[p("name")]?d.e:d.d)),c.a.createElement("th",null,"Stocks"===e.mode?"Shares":"Cryptos"===e.mode?"Quantity":"Value",e.normal&&c.a.createElement("span",{onClick:function(){return C("quantity")},className:v("quantity")},""===b[p("quantity")]?d.e:d.d)),"Stocks"===e.mode||"Cryptos"===e.mode?c.a.createElement("th",null,"Price",e.normal&&c.a.createElement("span",{onClick:function(){return C("price")},className:v("price")},""===b.price?d.e:d.d)):null,"Stocks"===e.mode||"Cryptos"===e.mode?c.a.createElement("th",null,"Value",e.normal&&c.a.createElement("span",{onClick:function(){return C("value")},className:v("value")},""===b.value?d.e:d.d)):null,e.normal&&("Stocks"===e.mode||"Cryptos"===e.mode)&&c.a.createElement("th",{className:m.a.SymbolHeader}))),c.a.createElement("tbody",null,"Stocks"===e.mode?s.map((function(a,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",{className:m.a.Symbol},a.symbol),c.a.createElement("td",null,a.name),c.a.createElement("td",null,Number(a.quantity).toLocaleString(void 0,{maximumFractionDigits:5})),c.a.createElement("td",null,"?"===a.price?"?":"$".concat(Number(a.price).toFixed(2))),c.a.createElement("td",{className:m.a.Value},"?"===a.value?"?":"$".concat(Number(a.value).toFixed(2))),e.normal&&("Stocks"===e.mode||"Cryptos"===e.mode)&&c.a.createElement("td",{onClick:function(){return"Normal"===a.identifier?e.showChart(a.symbol,"Stock"):null},className:m.a.ChartBtn},d.t))})):"Cryptos"===e.mode?s.map((function(a,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",{className:m.a.Symbol},a.cmcID?c.a.createElement("img",{src:"https://s2.coinmarketcap.com/static/img/coins/64x64/".concat(a.cmcID,".png"),alt:""}):a.symbol),c.a.createElement("td",null,a.name),c.a.createElement("td",null,Number(a.quantity).toLocaleString(void 0,{maximumFractionDigits:5})),c.a.createElement("td",null,"?"===a.price?"?":"$".concat(Number(a.price).toFixed(2))),c.a.createElement("td",{className:m.a.Value},"?"===a.value?"?":"$".concat(Number(a.value).toFixed(2))),e.normal&&("Stocks"===e.mode||"Cryptos"===e.mode)&&c.a.createElement("td",{onClick:function(){return"Normal"===a.identifier?e.showChart(a.symbol,"Crypto"):null},className:m.a.ChartBtn},d.t))})):"Assets"===e.mode?s.map((function(e,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",{className:m.a.Symbol},e.name),c.a.createElement("td",null,e.desc),c.a.createElement("td",{className:m.a.Value},"$",Number(e.value).toFixed(2)))})):s.map((function(e,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",{className:m.a.Symbol},e.name),c.a.createElement("td",null,e.desc),c.a.createElement("td",{className:m.a.Value},"$",Number(e.value).toFixed(2)))})))))}))},118:function(e,a,t){e.exports={Container:"InvestmentTable_Container__2RKk9",AssetContainer:"InvestmentTable_AssetContainer__3v4Fg",Dark:"InvestmentTable_Dark__oP_Ur",Table:"InvestmentTable_Table__1p9G2",NormalTable:"InvestmentTable_NormalTable__1wGbb",DarkTable:"InvestmentTable_DarkTable__3rVrS",Value:"InvestmentTable_Value__1WGvp",ChartBtn:"InvestmentTable_ChartBtn__1ZjL-",HeaderFields:"InvestmentTable_HeaderFields__1Ickk",SymbolHeader:"InvestmentTable_SymbolHeader__gZ4ym",Symbol:"InvestmentTable_Symbol__1qyVf",Ascend:"InvestmentTable_Ascend__qKCAE",Descend:"InvestmentTable_Descend__10yMk",Neutral:"InvestmentTable_Neutral__2JdiJ"}},119:function(e,a,t){"use strict";var n=t(3),r=t(0),l=t.n(r),o=t(120),c=t.n(o),s=t(106);a.a=function(e){var a=Object(r.useState)(0),t=Object(n.a)(a,2),o=t[0],m=t[1],i=Object(r.useState)(""),d=Object(n.a)(i,2),u=d[0],_=d[1],b=Object(r.useState)(88),g=Object(n.a)(b,2),h=g[0],C=g[1];return Object(r.useEffect)((function(){var a=(e.budget.budget-e.budget.remaining)/e.budget.budget*304;a>304&&(a=304),e.small&&(a=(e.budget.budget-e.budget.remaining)/e.budget.budget*152)>152&&(a=152);var t=e.budget.budget-e.budget.remaining;t=t>999999999?"":"$"+Object(s.a)(t);var n=(304-a)/2+a-64;m(a),_(t),C(n)}),[e.budget,e.small]),l.a.createElement("div",{className:e.small?e.darkMode?"".concat(c.a.SmallBar," ").concat(c.a.Dark):c.a.SmallBar:e.darkMode?"".concat(c.a.Bar," ").concat(c.a.Dark):c.a.Bar},l.a.createElement("span",{className:e.small?c.a.SmallCategory:c.a.Category},e.budget.category),l.a.createElement("div",{className:c.a.OvalContainer},l.a.createElement("div",{className:e.small?c.a.SmallOval:c.a.Oval},l.a.createElement("div",{className:e.small?c.a.SmallOverlay:c.a.Overlay,style:{width:"".concat(o,"px")}},l.a.createElement("span",{className:e.small?o<70?c.a.SmallShowRight:c.a.SmallOverlaySpan:o<140?c.a.ShowRight:c.a.OverlaySpan},u),!e.small&&l.a.createElement("div",{className:e.budget.remaining<=0?c.a.Hide:c.a.Remaining,style:{left:"".concat(h,"px")}},"$",Object(s.a)(e.budget.remaining)," remaining"))),!e.small&&l.a.createElement("div",{className:c.a.Overlay2,style:{width:"".concat(o,"px")}})),l.a.createElement("span",{className:e.small?c.a.SmallBudgetVal:c.a.BudgetVal},"$",Object(s.a)(e.budget.budget)))}},120:function(e,a,t){e.exports={Bar:"BudgetBars_Bar__25AEI",SmallBar:"BudgetBars_SmallBar__13JoK",Category:"BudgetBars_Category__31ie1",SmallCategory:"BudgetBars_SmallCategory__3BVX4",Dark:"BudgetBars_Dark__Ob_N4",Oval:"BudgetBars_Oval__3KSoF",SmallOval:"BudgetBars_SmallOval__1esgz",Overlay:"BudgetBars_Overlay__2rZu2",SmallOverlay:"BudgetBars_SmallOverlay__2DI2K",OverlaySpan:"BudgetBars_OverlaySpan__1tGrY",SmallOverlaySpan:"BudgetBars_SmallOverlaySpan__HHn-o",ShowRight:"BudgetBars_ShowRight__3anwZ",SmallShowRight:"BudgetBars_SmallShowRight__Z_fJV",BudgetVal:"BudgetBars_BudgetVal__1jaTn",SmallBudgetVal:"BudgetBars_SmallBudgetVal__fAg45",Overlay2:"BudgetBars_Overlay2__qs7w0",Remaining:"BudgetBars_Remaining__1F9Sn",Hide:"BudgetBars_Hide__1P2Ps",OvalContainer:"BudgetBars_OvalContainer__1vEpg"}},124:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(125),o=t.n(l),c=t(108),s=t(15);a.a=Object(s.b)((function(e){return{netWorthData:e.netWorth.netWorthData,netWorthGoal:e.goals.netWorthGoal}}))((function(e){var a=0===e.netWorthData.length?"0.00":e.netWorthData[e.netWorthData.length-1].value.toFixed(2),t="0.00"===a?0:a/e.netWorthGoal*100,n=[{name:"Current Net Worth",y:a,color:"rgb(26, 171, 152)"}];(t=t<100&&t>99.99?99.99:t>100?"over 100":t<-100?"over -100":t.toFixed(2))<100&&n.push({name:"Remaining",y:e.netWorthGoal-a,color:"rgb(15, 119, 147)"});var l={data:[{type:"doughnut",dataPoints:n}],backgroundColor:"transparent"};return e.small?(l.height=200,l.width=200):(l.height=330,l.width=330),r.a.createElement("div",{className:e.small?o.a.SmallChartContainer:o.a.ChartContainer},r.a.createElement(c.b,{options:l,lightblue:!e.small&&!e.darkMode&&e.expanded,darkMode5:!e.small&e.darkMode&&!e.expanded,darkMode:e.darkMode,darkMode3:e.darkMode&&e.small}),r.a.createElement("h1",null,"You've reached ",t,"% of your goal"))}))},125:function(e,a,t){e.exports={ChartContainer:"NWGoalChart_ChartContainer__3RQ_D",SmallChartContainer:"NWGoalChart_SmallChartContainer__2TuSS"}},152:function(e,a,t){e.exports={Container:"HomePage_Container__2HGHq",Content:"HomePage_Content__HEp8W",Dark:"HomePage_Dark__2lqeC",Cards:"HomePage_Cards__2Kcdx",Card:"HomePage_Card__8Onv7",Title:"HomePage_Title__3t3IX",Title2:"HomePage_Title2__3PWqo",ChartContainer:"HomePage_ChartContainer__3yEi-",SubTitle:"HomePage_SubTitle__Dkqgd",BudgetContainer:"HomePage_BudgetContainer__3ZG2f",BudgetDiv:"HomePage_BudgetDiv__2VOA2",InnerBudgetDiv:"HomePage_InnerBudgetDiv__9Zd0K"}},153:function(e,a,t){e.exports={CardContainer:"HomeCard_CardContainer__2uC4o",Card:"HomeCard_Card__3kFFZ",scaleUp:"HomeCard_scaleUp__1ap_L"}},187:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(152),o=t.n(l),c=t(153),s=t.n(c),m=t(26),i=Object(m.g)((function(e){return r.a.createElement("div",{className:s.a.CardContainer,onClick:function(){"1"===e.num?e.history.push("/portfolio"):"2"===e.num?e.history.push("/portfolio/?pos=stocks"):"3"===e.num?e.history.push("/portfolio/?pos=cryptos"):"4"===e.num?e.history.push("/portfolio/?pos=assets"):"5"===e.num?e.history.push("/budget"):e.history.push("/goals")}},r.a.createElement("div",{className:s.a.Card,style:{animationDelay:"".concat(100*e.num,"ms")}},e.children))})),d=t(115),u=t(117),_=t(124),b=t(15),g=t(119);a.default=Object(b.b)((function(e){return{netWorthGoal:e.goals.netWorthGoal,budget:e.budget.budget,dark:e.theme.darkMode}}))((function(e){return r.a.createElement("div",{className:o.a.Container},r.a.createElement("div",{className:e.dark?o.a.Dark:o.a.Content},r.a.createElement("div",{className:o.a.Cards},r.a.createElement(i,{num:"1"},r.a.createElement(d.a,{small:!0})),r.a.createElement(i,{num:"2"},r.a.createElement("div",{className:o.a.Card},r.a.createElement("h1",{className:o.a.Title},"Stocks"),r.a.createElement(u.a,{mode:"Stocks"}))),r.a.createElement(i,{num:"3"},r.a.createElement("div",{className:o.a.Card},r.a.createElement("h1",{className:o.a.Title},"Cryptocurrencies"),r.a.createElement(u.a,{mode:"Cryptos"}))),r.a.createElement(i,{num:"4"},r.a.createElement("div",{className:o.a.Card},r.a.createElement("h1",{className:o.a.Title2},"Assets"),r.a.createElement(u.a,{mode:"Assets"}),r.a.createElement("h1",{className:o.a.Title2},"Liabilities"),r.a.createElement(u.a,{mode:"Debts"}))),r.a.createElement(i,{num:"5"},r.a.createElement("div",{className:o.a.Card},r.a.createElement("h1",{className:o.a.Title},"Budgeting"),e.budget.length>0?r.a.createElement("div",{className:o.a.BudgetContainer},e.budget.map((function(a,t){return r.a.createElement("div",{className:o.a.BudgetDiv,key:t},r.a.createElement("div",{className:o.a.InnerBudgetDiv},r.a.createElement(g.a,{budget:a,small:!0,darkMode:e.dark})))}))):r.a.createElement("div",{className:o.a.ChartContainer},r.a.createElement("p",{className:o.a.SubTitle},"Create a new budget!")))),r.a.createElement(i,{num:"6"},r.a.createElement("div",{className:o.a.Card},r.a.createElement("h1",{className:o.a.Title},"Net Worth Goal"),r.a.createElement("div",{className:o.a.ChartContainer},e.netWorthGoal?r.a.createElement(_.a,{small:!0,darkMode:e.dark}):r.a.createElement("p",{className:o.a.SubTitle},"Create a new net worth goal!")))))))}))}}]);
//# sourceMappingURL=8.bea5d61f.chunk.js.map