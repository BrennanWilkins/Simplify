(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{100:function(e,a,t){e.exports={BigBtn:"BlueBtn_BigBtn__3hb37",Btn:"BlueBtn_Btn__O1Uk4",NoBigBtn:"BlueBtn_NoBigBtn__2jTSw"}},101:function(e,a){(function(a){e.exports=a}).call(this,{})},137:function(e,a,t){e.exports={Container:"PlanPage_Container__1AJoD",Content:"PlanPage_Content__14s1_",Chart:"PlanPage_Chart__1SVaj",HideChart:"PlanPage_HideChart__3nFdt",Hide:"PlanPage_Hide__1rPYB",Block:"PlanPage_Block__1nzxK",Inputs:"PlanPage_Inputs__2xDI-",InputRow:"PlanPage_InputRow__3_YF2",InputRow2:"PlanPage_InputRow2__1LYoj",InputField:"PlanPage_InputField__33n_W",Btns:"PlanPage_Btns__3itjP",Title:"PlanPage_Title__NmRSi",Title2:"PlanPage_Title2__1ThLw",Title3:"PlanPage_Title3__3Vzzx",SubTitle:"PlanPage_SubTitle__3jdvU",SelectBar:"PlanPage_SelectBar__7brPT",Btn:"PlanPage_Btn__2SZ6M",ActiveBtn:"PlanPage_ActiveBtn__25O_6"}},138:function(e,a,t){e.exports={Hide:"TaxCalculator_Hide__3e8sP",Title:"TaxCalculator_Title__2g16n",ShowInfo:"TaxCalculator_ShowInfo__3jobP",HideInfo:"TaxCalculator_HideInfo__24x78",Boxes:"TaxCalculator_Boxes__3GwxO",InputBox:"TaxCalculator_InputBox__3Kb04",Row:"TaxCalculator_Row__r99rj",Field:"TaxCalculator_Field__12-_N",TransBox:"TaxCalculator_TransBox__6iOuZ",Transactions:"TaxCalculator_Transactions__1z3a8",Btns:"TaxCalculator_Btns__hZD4y",CalcBtn:"TaxCalculator_CalcBtn__1Agr_",ResetBtn:"TaxCalculator_ResetBtn__plh71",TransHeader:"TaxCalculator_TransHeader__15y5_",TransField:"TaxCalculator_TransField__8qzQI",Table:"TaxCalculator_Table__3KZpC",TableTotals:"TaxCalculator_TableTotals__24W5F"}},149:function(e,a,t){"use strict";t.r(a);var n=t(2),l=t(14),r=t(0),i=t.n(r),c=t(137),o=t.n(c),s=t(99),u=t(96),m=t(94),d=t(29),h=function(e){var a,t=0,n=0,l=0,r=0,i=Object(d.a)(e.stocks);try{for(i.s();!(a=i.n()).done;){var c=a.value,o=c.salePrice-c.purchasePrice;"More"===c.held?n+=o:t+=o}}catch(B){i.e(B)}finally{i.f()}var s=Number(e.income)+t,u=0;if("Single"===e.filingStatus){r=n<40001?0:n<441451?15:20;for(var m=0;m<n;m++)u+=m<40001?0:m<441451?.15:.2,m>2e5&&(u+=.038)}else if("Head"===e.filingStatus){r=n<53601?0:n<469051?15:20;for(var h=0;h<n;h++)u+=h<53601?0:h<469051?.15:.2,h>2e5&&(u+=.038)}else if("Jointly"===e.filingStatus){r=n<80001?0:n<496601?15:20;for(var f=0;f<n;f++)u+=f<80001?0:f<496601?.15:.2,f>25e4&&(u+=.038)}else{r=n<40001?0:n<248301?15:20;for(var E=0;E<n;E++)u+=E<40001?0:E<248301?.15:.2,E>125e3&&(u+=.038)}var g=s+n;"Jointly"===e.filingStatus?g>25e4&&(l+=3.8):"Separately"===e.filingStatus?g>125e3&&(l+=3.8):g>2e5&&(l+=3.8);var p=0;if("Single"===e.filingStatus){s<=0?l+=0:s<9876?l=10:l+=s<40126?12:s<85526?22:s<163301?24:s<207351?32:s<518401?35:37;for(var v=Number(e.income);v<s;v++)p+=v<9876?.1:v<40126?.12:v<85526?.22:v<163301?.24:v<207351?.32:v<518401?.35:.37,v>=2e5&&(p+=.038)}else if("Head"===e.filingStatus){l+=s<=0?0:s<14101?10:s<53701?12:s<85501?22:s<163301?24:s<207351?32:s<518401?35:37;for(var _=Number(e.income);_<s;_++)p+=_<14101?.1:_<53701?.12:_<85501?.22:_<163301?.24:_<207351?.32:_<518401?.35:.37,_>=2e5&&(p+=.038)}else if("Jointly"===e.filingStatus){l+=s<=0?0:s<19751?10:s<80251?12:s<171051?22:s<326601?24:s<414701?32:s<622051?35:37;for(var b=Number(e.income);b<s;b++)p+=b<19751?.1:b<80251?.12:b<171051?.22:b<326601?.24:b<414701?.32:b<622051?.35:.37,b>=25e4&&(p+=.038)}else{l+=s<=0?0:s<9876?10:s<40126?12:s<85526?22:s<163301?24:s<207351?32:s<311026?35:37;for(var P=Number(e.income);P<s;P++)p+=P<9876?.1:P<40126?.12:P<85526?.22:P<163301?.24:P<207351?.32:P<311026?.35:.37,P>=125e3&&(p+=.038)}l=0===t?0:l,r=0===n?0:r;var x=t<=0?0:(p/t*100).toLocaleString(void 0,{maximumFractionDigits:2}),T=n<=0?0:(u/n*100).toLocaleString(void 0,{maximumFractionDigits:2}),C=(p+u).toFixed(2),N=t+n<=0?0:(C/(t+n)*100).toLocaleString(void 0,{maximumFractionDigits:2});return t=t.toFixed(2),n=n.toFixed(2),{shortRate:l,longRate:r,shortTax:p=p.toFixed(2),longTax:u=u.toFixed(2),totalTax:C,totalProfit:(Number(t)+Number(n)).toFixed(2),shortProfit:t,longProfit:n,shortEffective:x,longEffective:T,totEffectiveRate:N}},f=function(e){for(var a=[],t=e.age<30?e.age-1:e.age-5,n=20;n<=t;n++){var l=e.goal/((Math.pow(1+e.interest/1200,12*(e.age-n))-1)/(e.interest/1200));a.push({label:n,y:Number(l.toFixed(2))})}return a},E=t(138),g=t.n(E),p=t(15),v=function(e){var a=Object(r.useRef)(),t=Object(r.useRef)(),c=Object(r.useState)(!1),o=Object(l.a)(c,2),s=o[0],u=o[1],d=Object(r.useState)({stocks:[],income:"",filingStatus:"Single",purchasePrice:"",salePrice:"",held:"More",results:{shortRate:0,longRate:0,shortTax:0,longTax:0,shortProfit:0,longProfit:0,totEffectiveRate:0,shortEffective:0,longEffective:0,totalTax:0,totalProfit:0},showChart:!1}),f=Object(l.a)(d,2),E=f[0],v=f[1],_=function(e){a.current.contains(e.target)||t.current.contains(e.target)||u(!1)};Object(r.useEffect)((function(){return s&&document.addEventListener("mousedown",_),function(){return document.removeEventListener("mousedown",_)}}),[s]);return i.a.createElement("div",{className:e.show?void 0:g.a.Hide},i.a.createElement("div",{className:g.a.Title},i.a.createElement("h1",null,"Capital Gains Tax Calculator",i.a.createElement("span",{onClick:function(){return u(!0)},ref:t},p.f)),i.a.createElement("p",{ref:a,className:s?g.a.ShowInfo:g.a.HideInfo},"Capital gains taxes are estimated based on the Tax Cuts and Jobs Act and 2020 federal income tax brackets. Investments held for longer than a year are taxed at a different rate than investments held for less than a year, which are taxed in the ordinary income tax brackets.")),i.a.createElement("div",{className:g.a.Boxes},i.a.createElement("div",{className:g.a.InputBox},i.a.createElement("div",{className:g.a.Row},i.a.createElement("div",{className:g.a.Field},i.a.createElement("p",null,"Annual Income"),i.a.createElement(m.b,{val:E.income,change:function(e){return v(Object(n.a)({},E,{income:e}))}})),i.a.createElement("div",{className:g.a.Field},i.a.createElement("p",null,"Filing Status"),i.a.createElement("select",{value:E.filingStatus,onChange:function(e){return v(Object(n.a)({},E,{filingStatus:e.target.value}))}},i.a.createElement("option",{value:"Single"},"Single"),i.a.createElement("option",{value:"Jointly"},"Married filing jointly"),i.a.createElement("option",{value:"Separately"},"Married filing separately"),i.a.createElement("option",{value:"Head"},"Head of household")))),i.a.createElement("h3",null,"Add a transaction"),i.a.createElement("div",{className:g.a.Row},i.a.createElement("div",{className:g.a.Field},i.a.createElement("p",null,"Purchase price"),i.a.createElement(m.b,{val:E.purchasePrice,change:function(e){return v(Object(n.a)({},E,{purchasePrice:e}))}})),i.a.createElement("div",{className:g.a.Field},i.a.createElement("p",null,"Sale price"),i.a.createElement(m.b,{val:E.salePrice,change:function(e){return v(Object(n.a)({},E,{salePrice:e}))}}))),i.a.createElement("div",{className:g.a.Row},i.a.createElement("div",{className:g.a.Field},i.a.createElement("p",null,"Length of ownership"),i.a.createElement("select",{value:E.held,onChange:function(e){return v(Object(n.a)({},E,{held:e.target.value}))}},i.a.createElement("option",{value:"More"},"More than a year"),i.a.createElement("option",{value:"Less"},"Less than a year"))),i.a.createElement("div",{className:g.a.Field},i.a.createElement("button",{onClick:function(){"0"!==E.purchasePrice&&""!==E.purchasePrice&&""!==E.salePrice&&v((function(e){return Object(n.a)({},e,{stocks:e.stocks.concat([{purchasePrice:e.purchasePrice,salePrice:e.salePrice,held:e.held}]),purchasePrice:"",salePrice:""})}))}},"Add transaction"))),i.a.createElement("div",{className:g.a.Btns},i.a.createElement("button",{className:g.a.CalcBtn,onClick:function(){""!==E.income&&0!==E.stocks.length&&v(Object(n.a)({},E,{results:h(E),showChart:!0}))}},"Calculate"),i.a.createElement("button",{className:g.a.ResetBtn,onClick:function(){v({stocks:[],income:"",filingStatus:"Single",purchasePrice:"",salePrice:"",held:"More",results:{shortRate:0,longRate:0,shortTax:0,longTax:0,shortProfit:0,longProfit:0,totEffectiveRate:0,shortEffective:0,longEffective:0,totalTax:0,totalProfit:0},showChart:!1})}},"Reset"))),i.a.createElement("div",{className:g.a.TransBox},i.a.createElement("h2",null,"Transactions"),i.a.createElement("div",{className:g.a.Transactions},i.a.createElement("div",{className:g.a.TransHeader},i.a.createElement("span",{style:{width:"10%"}}),i.a.createElement("span",{style:{width:"25%"}},"Purchase price"),i.a.createElement("span",{style:{width:"25%"}},"Sale price"),i.a.createElement("span",{style:{width:"40%"}},"Length of ownership")),E.stocks.map((function(e,a){return i.a.createElement("div",{key:a,className:g.a.TransField},i.a.createElement("span",{style:{width:"10%"}},a+1),i.a.createElement("span",{style:{width:"25%"}},"$",Number(e.purchasePrice).toFixed(2)),i.a.createElement("span",{style:{width:"25%"}},"$",Number(e.salePrice).toFixed(2)),i.a.createElement("span",{style:{width:"40%"}},"More"===e.held?"More than a year":"Less than a year"))}))))),i.a.createElement("table",{className:g.a.Table},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null),i.a.createElement("th",null,"Marginal Tax Rate"),i.a.createElement("th",null,"Effective Tax Rate"),i.a.createElement("th",null,"Profit"),i.a.createElement("th",null,"Tax Amount"))),i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Short Term Transactions"),i.a.createElement("td",null,E.results.shortRate,"%"),i.a.createElement("td",null,E.results.shortEffective,"%"),i.a.createElement("td",null,"$",E.results.shortProfit),i.a.createElement("td",null,"$",E.results.shortTax)),i.a.createElement("tr",null,i.a.createElement("th",null,"Long Term Transactions"),i.a.createElement("td",null,E.results.longRate,"%"),i.a.createElement("td",null,E.results.longEffective,"%"),i.a.createElement("td",null,"$",E.results.longProfit),i.a.createElement("td",null,"$",E.results.longTax)),i.a.createElement("tr",{className:g.a.TableTotals},i.a.createElement("th",null,"Total"),i.a.createElement("td",null),i.a.createElement("td",null,E.results.totEffectiveRate,"%"),i.a.createElement("td",null,"$",E.results.totalProfit),i.a.createElement("td",null,"$",E.results.totalTax)))))},_=s.a.CanvasJSChart;a.default=function(e){var a=Object(r.useState)({principal:"",contrib:"",years:"",interest:"",finalVal:"",dataPoints:[],showChart:!1}),t=Object(l.a)(a,2),c=t[0],s=t[1],d=Object(r.useState)({goal:"",interest:"",age:"",shownAge:"",dataPoints:[],showChart:!1}),h=Object(l.a)(d,2),E=h[0],g=h[1],p=Object(r.useState)("Compound"),b=Object(l.a)(p,2),P=b[0],x=b[1],T=function(){var e=function(e){for(var a=[],t=0;t<=e.years;t++){var n=e.principal*Math.pow(1+e.interest/1200,12*t);n+=e.contrib*((Math.pow(1+e.interest/1200,12*t)-1)/(e.interest/1200)),a.push({x:t,y:Number(n.toFixed(2))})}return a}(c);s(Object(n.a)({},c,{finalVal:e[c.years].y,dataPoints:e,showChart:!0}))},C={animationEnabled:!0,theme:"light1",exportEnabled:!1,axisY:{valueFormatString:"'$'0"},axisX:{valueFormatString:"'Year '0",minimum:0},toolTip:{content:"Year {x}: ${y}"},data:[{type:"area",indexLabelFontColor:"#5A5757",indexLabelPlacement:"outside",color:"rgb(26, 171, 152)",fillOpacity:"1",dataPoints:c.dataPoints}]},N={animationEnabled:!0,theme:"light2",exportEnabled:!1,axisY:{valueFormatString:"'$'0"},toolTip:{content:"Age {label}: ${y}"},data:[{type:"column",dataPoints:E.dataPoints}]};return i.a.createElement("div",{className:o.a.Container},i.a.createElement("div",{className:o.a.Content},i.a.createElement("div",{className:o.a.SelectBar},i.a.createElement("button",{onClick:function(){return x("Compound")},className:"Compound"===P?o.a.ActiveBtn:o.a.Btn},"Compount Interest Visualizer"),i.a.createElement("button",{onClick:function(){return x("Retire")},className:"Retire"===P?o.a.ActiveBtn:o.a.Btn},"Retirement Visualizer"),i.a.createElement("button",{onClick:function(){return x("Tax")},className:"Tax"===P?o.a.ActiveBtn:o.a.Btn},"Capital Gains Calculator")),i.a.createElement("div",{className:"Compound"===P?void 0:o.a.Hide},i.a.createElement("h1",{className:o.a.Title},"Compound Interest Visualizer"),i.a.createElement("div",{className:o.a.Inputs},i.a.createElement("div",{className:o.a.InputRow},i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Principal Investment"),i.a.createElement(m.b,{val:c.principal,change:function(e){return s(Object(n.a)({},c,{principal:e}))}})),i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Monthly Contribution"),i.a.createElement(m.b,{val:c.contrib,change:function(e){return s(Object(n.a)({},c,{contrib:e}))}}))),i.a.createElement("div",{className:o.a.InputRow},i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Years Compounded"),i.a.createElement(m.b,{val:c.years,change:function(e){return s(Object(n.a)({},c,{years:e}))}})),i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Yearly return in %"),i.a.createElement(m.b,{val:c.interest,change:function(e){return s(Object(n.a)({},c,{interest:e}))}}))))),i.a.createElement("div",{className:"Retire"===P?void 0:o.a.Hide},i.a.createElement("h1",{className:o.a.Title},"Retirement Goal Visualizer"),i.a.createElement("div",{className:o.a.Inputs},i.a.createElement("div",{className:o.a.InputRow2},i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Retirement Goal"),i.a.createElement(m.b,{val:E.goal,change:function(e){return g(Object(n.a)({},E,{goal:e}))}})),i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Yearly return in %"),i.a.createElement(m.b,{val:E.interest,change:function(e){return g(Object(n.a)({},E,{interest:e}))}})),i.a.createElement("div",{className:o.a.InputField},i.a.createElement("p",null,"Retirement Age"),i.a.createElement(m.b,{val:E.age,change:function(e){return g(Object(n.a)({},E,{age:Math.floor(e)}))}}))))),i.a.createElement("div",{className:"Tax"!==P?o.a.Btns:o.a.Hide},i.a.createElement(u.a,{clicked:function(){(function(){if("Compound"===P){if("0"===c.years||"0"===c.interest||""===c.years||""===c.interest||""===c.principal||""===c.contrib)return!1}else if(""===E.goal||"0"===E.goal||""===E.interest||"0"===E.interest||""===E.age||E.age<25)return!1;return!0})()&&("Compound"===P?T():g(Object(n.a)({},E,{dataPoints:f(E),showChart:!0,shownAge:E.age})))}},"Calculate"),i.a.createElement(u.a,{clicked:function(){"Compound"===P?s({principal:"",contrib:"",years:"",interest:"",finalVal:"",dataPoints:[],showChart:!1}):g({goal:"",interest:"",age:"",shownAge:"",dataPoints:[],showChart:!1})}},"Reset")),i.a.createElement("div",{className:c.showChart&&"Compound"===P?o.a.Chart:o.a.HideChart},i.a.createElement("h1",{className:o.a.Title2},"$",Number(Number(c.finalVal).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})),i.a.createElement(_,{options:C}),i.a.createElement("div",{className:o.a.Block})),i.a.createElement("div",{className:E.showChart&&"Retire"===P?o.a.Chart:o.a.HideChart},i.a.createElement("h2",{className:o.a.Title3},"Monthly savings to reach goal by age ",E.shownAge),i.a.createElement(_,{options:N}),i.a.createElement("div",{className:o.a.Block}),i.a.createElement("p",{className:o.a.SubTitle},"Starting age")),i.a.createElement(v,{show:"Tax"===P})))}},94:function(e,a,t){"use strict";t.d(a,"a",(function(){return c})),t.d(a,"b",(function(){return o}));var n=t(0),l=t.n(n),r=t(98),i=t.n(r),c=function(e){return l.a.createElement("input",{value:e.val,onChange:function(a){return e.change(a.target.value)},className:i.a.Input,placeholder:e.ph})},o=function(e){return l.a.createElement("input",{value:e.val,onChange:function(a){var t=a.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),e.change(t))},className:i.a.Input,placeholder:e.ph})}},96:function(e,a,t){"use strict";var n=t(0),l=t.n(n),r=t(100),i=t.n(r);a.a=function(e){return l.a.createElement("button",{className:e.big?e.noMargin?i.a.NoBigBtn:i.a.BigBtn:i.a.Btn,onClick:e.clicked},e.children)}},98:function(e,a,t){e.exports={Input:"Inputs_Input__1d94w"}}}]);
//# sourceMappingURL=9.48f91e5e.chunk.js.map