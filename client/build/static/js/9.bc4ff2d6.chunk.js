(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{109:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){return r.a.createElement("form",{onSubmit:function(a){a.preventDefault(),e.allow&&e.submit()}},e.children)}},111:function(e,a){(function(a){e.exports=a}).call(this,{})},163:function(e,a,t){e.exports={Container:"PlanPage_Container__1LvqB",Content:"PlanPage_Content__XpA00",Chart:"PlanPage_Chart__1rooc",DarkChart:"PlanPage_DarkChart__2nsYv",Hide:"PlanPage_Hide__zHse4",Inputs:"PlanPage_Inputs__39frr",InputRow:"PlanPage_InputRow__1wjg1",InputRow2:"PlanPage_InputRow2__2OCDW",InputField:"PlanPage_InputField__1vfHe",DarkInputs:"PlanPage_DarkInputs__29GcJ",Btns:"PlanPage_Btns__3QKLV",Title:"PlanPage_Title__wUU3R",Title2:"PlanPage_Title2__2Wl9d",SubTitle:"PlanPage_SubTitle__2nLMZ",SelectBar:"PlanPage_SelectBar__3vhlu",Btn:"PlanPage_Btn__pMwJS",ActiveBtn:"PlanPage_ActiveBtn__3jMFk"}},164:function(e,a,t){e.exports={Boxes:"TaxCalculator_Boxes__MtE4F",InputBox:"TaxCalculator_InputBox__2zOXp",DarkBoxes:"TaxCalculator_DarkBoxes__2rLmJ",Row:"TaxCalculator_Row__1SqUd",Field:"TaxCalculator_Field__1Qmo0",AddBtn:"TaxCalculator_AddBtn__3eYQ4",TransBox:"TaxCalculator_TransBox__1Iy1j",Transactions:"TaxCalculator_Transactions__1CeLo",Btns:"TaxCalculator_Btns__34nv-",CalcBtn:"TaxCalculator_CalcBtn__2mpT0",ResetBtn:"TaxCalculator_ResetBtn__FXk4j",TransHeader:"TaxCalculator_TransHeader__1VlpK",TransField:"TaxCalculator_TransField___6TQz",Table:"TaxCalculator_Table__2QFdI",TableTotals:"TaxCalculator_TableTotals__2FzOP",Title:"TaxCalculator_Title__1tpJs"}},165:function(e,a,t){e.exports={Hide:"PlanPageContainer_Hide__1kAc4",Title:"PlanPageContainer_Title__3p2bS",ShowInfo:"PlanPageContainer_ShowInfo__3mdFa",HideInfo:"PlanPageContainer_HideInfo___Tyzt",Dark:"PlanPageContainer_Dark__1IWSD"}},184:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t(3),l=t(0),o=t.n(l),c=t(163),i=t.n(c),s=t(108),u=t(32),d=t(38),m=t(22),h=function(e){var a,t=0,n=0,r=0,l=0,o=Object(m.a)(e.stocks);try{for(o.s();!(a=o.n()).done;){var c=a.value,i=c.salePrice-c.purchasePrice;"More"===c.held?n+=i:t+=i}}catch(y){o.e(y)}finally{o.f()}var s=Number(e.income)+t,u=0;if("Single"===e.filingStatus){l=n<40001?0:n<441451?15:20;for(var d=0;d<n;d++)u+=d<40001?0:d<441451?.15:.2,d>2e5&&(u+=.038)}else if("Head"===e.filingStatus){l=n<53601?0:n<469051?15:20;for(var h=0;h<n;h++)u+=h<53601?0:h<469051?.15:.2,h>2e5&&(u+=.038)}else if("Jointly"===e.filingStatus){l=n<80001?0:n<496601?15:20;for(var f=0;f<n;f++)u+=f<80001?0:f<496601?.15:.2,f>25e4&&(u+=.038)}else{l=n<40001?0:n<248301?15:20;for(var p=0;p<n;p++)u+=p<40001?0:p<248301?.15:.2,p>125e3&&(u+=.038)}var E=s+n;"Jointly"===e.filingStatus?E>25e4&&(r+=3.8):"Separately"===e.filingStatus?E>125e3&&(r+=3.8):E>2e5&&(r+=3.8);var g=0;if("Single"===e.filingStatus){s<=0?r+=0:s<9876?r=10:r+=s<40126?12:s<85526?22:s<163301?24:s<207351?32:s<518401?35:37;for(var v=Number(e.income);v<s;v++)g+=v<9876?.1:v<40126?.12:v<85526?.22:v<163301?.24:v<207351?.32:v<518401?.35:.37,v>=2e5&&(g+=.038)}else if("Head"===e.filingStatus){r+=s<=0?0:s<14101?10:s<53701?12:s<85501?22:s<163301?24:s<207351?32:s<518401?35:37;for(var _=Number(e.income);_<s;_++)g+=_<14101?.1:_<53701?.12:_<85501?.22:_<163301?.24:_<207351?.32:_<518401?.35:.37,_>=2e5&&(g+=.038)}else if("Jointly"===e.filingStatus){r+=s<=0?0:s<19751?10:s<80251?12:s<171051?22:s<326601?24:s<414701?32:s<622051?35:37;for(var P=Number(e.income);P<s;P++)g+=P<19751?.1:P<80251?.12:P<171051?.22:P<326601?.24:P<414701?.32:P<622051?.35:.37,P>=25e4&&(g+=.038)}else{r+=s<=0?0:s<9876?10:s<40126?12:s<85526?22:s<163301?24:s<207351?32:s<311026?35:37;for(var T=Number(e.income);T<s;T++)g+=T<9876?.1:T<40126?.12:T<85526?.22:T<163301?.24:T<207351?.32:T<311026?.35:.37,T>=125e3&&(g+=.038)}r=0===t?0:r,l=0===n?0:l;var b=t<=0?0:(g/t*100).toLocaleString(void 0,{maximumFractionDigits:2}),k=n<=0?0:(u/n*100).toLocaleString(void 0,{maximumFractionDigits:2}),x=(g+u).toFixed(2),C=t+n<=0?0:(x/(t+n)*100).toLocaleString(void 0,{maximumFractionDigits:2});return t=t.toFixed(2),n=n.toFixed(2),{shortRate:r,longRate:l,shortTax:g=g.toFixed(2),longTax:u=u.toFixed(2),totalTax:x,totalProfit:(Number(t)+Number(n)).toFixed(2),shortProfit:t,longProfit:n,shortEffective:b,longEffective:k,totEffectiveRate:C}},f=function(e){for(var a=[],t=e.age<30?e.age-1:e.age-5,n=20;n<=t;n++){var r=e.goal/((Math.pow(1+e.interest/1200,12*(e.age-n))-1)/(e.interest/1200));a.push({label:n,y:Number(r.toFixed(2))})}return a},p=t(164),E=t.n(p),g=t(165),v=t.n(g),_=t(9),P=function(e){var a=Object(l.useRef)(),t=Object(l.useRef)(),n=Object(l.useState)(!1),c=Object(r.a)(n,2),i=c[0],s=c[1];return Object(l.useEffect)((function(){var e=function(e){a.current.contains(e.target)||t.current.contains(e.target)||s(!1)};return i&&document.addEventListener("mousedown",e),function(){return document.removeEventListener("mousedown",e)}}),[i]),o.a.createElement("div",{className:e.show?void 0:v.a.Hide},o.a.createElement("div",{className:e.darkMode?"".concat(v.a.Title," ").concat(v.a.Dark):v.a.Title},o.a.createElement("h1",null,"Tax"===e.currMode?"Capital Gains Tax Calculator":"Retire"===e.currMode?"Retirement Goal Visualizer":"Compound Interest Visualizer",o.a.createElement("span",{onClick:function(){return s(!0)},ref:t},_.q)),o.a.createElement("p",{ref:a,className:i?v.a.ShowInfo:v.a.HideInfo},"Tax"===e.currMode?"Capital gains taxes are estimated based on the Tax Cuts and Jobs Act and 2020 federal income tax brackets.\n        Investments held for longer than a year are taxed at a different rate than investments held for less than a year,\n        which are taxed in the ordinary income tax brackets.":"Retire"===e.currMode?"This shows the monthly contribution you need to add to your investments each month to reach your retirement goal\n        based on the values you enter. The earlier you start saving towards your goal, the less you have to save per month\n        due to the compounding effect of holding your investments over time.":"'Principal Investment' refers to your initial funds that you are starting with. 'Monthly Contribution' refers to the\n        amount you add to your investments each month. 'Years Compounded' refers to how many years you are investing for.\n        'Yearly return in %' is the percentage return on your investments you expect to make per year.")),e.children)},T=function(e){var a=Object(l.useState)({stocks:[],income:"",filingStatus:"Single",purchasePrice:"",salePrice:"",held:"More",results:{shortRate:0,longRate:0,shortTax:0,longTax:0,shortProfit:0,longProfit:0,totEffectiveRate:0,shortEffective:0,longEffective:0,totalTax:0,totalProfit:0},showChart:!1}),t=Object(r.a)(a,2),c=t[0],i=t[1];return o.a.createElement(P,{show:e.show,currMode:"Tax",darkMode:e.darkMode},o.a.createElement("div",{className:e.darkMode?"".concat(E.a.Boxes," ").concat(E.a.DarkBoxes):E.a.Boxes},o.a.createElement("div",{className:E.a.InputBox},o.a.createElement("div",{className:E.a.Row},o.a.createElement("div",{className:E.a.Field},o.a.createElement("p",null,"Annual Income"),o.a.createElement(d.c,{val:c.income,change:function(e){return i(Object(n.a)({},c,{income:e}))},dark:e.darkMode})),o.a.createElement("div",{className:E.a.Field},o.a.createElement("p",null,"Filing Status"),o.a.createElement("select",{value:c.filingStatus,onChange:function(e){return i(Object(n.a)({},c,{filingStatus:e.target.value}))}},o.a.createElement("option",{value:"Single"},"Single"),o.a.createElement("option",{value:"Jointly"},"Married filing jointly"),o.a.createElement("option",{value:"Separately"},"Married filing separately"),o.a.createElement("option",{value:"Head"},"Head of household")))),o.a.createElement("h3",null,"Add a transaction"),o.a.createElement("div",{className:E.a.Row},o.a.createElement("div",{className:E.a.Field},o.a.createElement("p",null,"Purchase price"),o.a.createElement(d.c,{val:c.purchasePrice,change:function(e){return i(Object(n.a)({},c,{purchasePrice:e}))},dark:e.darkMode})),o.a.createElement("div",{className:E.a.Field},o.a.createElement("p",null,"Sale price"),o.a.createElement(d.c,{val:c.salePrice,change:function(e){return i(Object(n.a)({},c,{salePrice:e}))},dark:e.darkMode}))),o.a.createElement("div",{className:E.a.Row},o.a.createElement("div",{className:E.a.Field},o.a.createElement("p",null,"Length of ownership"),o.a.createElement("select",{value:c.held,onChange:function(e){return i(Object(n.a)({},c,{held:e.target.value}))}},o.a.createElement("option",{value:"More"},"More than a year"),o.a.createElement("option",{value:"Less"},"Less than a year"))),o.a.createElement("div",{className:E.a.Field},o.a.createElement("span",{className:E.a.AddBtn},o.a.createElement(u.a,{clicked:function(){"0"!==c.purchasePrice&&""!==c.purchasePrice&&""!==c.salePrice&&i((function(e){return Object(n.a)({},e,{stocks:e.stocks.concat([{purchasePrice:e.purchasePrice,salePrice:e.salePrice,held:e.held}]),purchasePrice:"",salePrice:""})}))}},_.p,"Add transaction")))),o.a.createElement("div",{className:E.a.Btns},o.a.createElement("div",{className:E.a.CalcBtn},o.a.createElement(u.a,{clicked:function(){""!==c.income&&0!==c.stocks.length&&i(Object(n.a)({},c,{results:h(c),showChart:!0}))}},"Calculate")),o.a.createElement("div",{className:E.a.ResetBtn},o.a.createElement(u.a,{clicked:function(){i({stocks:[],income:"",filingStatus:"Single",purchasePrice:"",salePrice:"",held:"More",results:{shortRate:0,longRate:0,shortTax:0,longTax:0,shortProfit:0,longProfit:0,totEffectiveRate:0,shortEffective:0,longEffective:0,totalTax:0,totalProfit:0},showChart:!1})}},"Reset")))),o.a.createElement("div",{className:E.a.TransBox},o.a.createElement("h2",null,"Transactions"),o.a.createElement("div",{className:E.a.Transactions},o.a.createElement("div",{className:E.a.TransHeader},o.a.createElement("span",{style:{width:"10%"}}),o.a.createElement("span",{style:{width:"25%"}},"Purchase price"),o.a.createElement("span",{style:{width:"25%"}},"Sale price"),o.a.createElement("span",{style:{width:"40%"}},"Length of ownership")),c.stocks.map((function(e,a){return o.a.createElement("div",{key:a,className:E.a.TransField},o.a.createElement("span",{style:{width:"10%"}},a+1),o.a.createElement("span",{style:{width:"25%"}},"$",Number(e.purchasePrice).toFixed(2)),o.a.createElement("span",{style:{width:"25%"}},"$",Number(e.salePrice).toFixed(2)),o.a.createElement("span",{style:{width:"40%"}},"More"===e.held?"More than a year":"Less than a year"))}))))),o.a.createElement("table",{className:E.a.Table},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null),o.a.createElement("th",null,"Marginal Tax Rate"),o.a.createElement("th",null,"Effective Tax Rate"),o.a.createElement("th",null,"Profit"),o.a.createElement("th",null,"Tax Amount"))),o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Short Term Transactions"),o.a.createElement("td",null,c.results.shortRate,"%"),o.a.createElement("td",null,c.results.shortEffective,"%"),o.a.createElement("td",null,"$",c.results.shortProfit),o.a.createElement("td",null,"$",c.results.shortTax)),o.a.createElement("tr",null,o.a.createElement("th",null,"Long Term Transactions"),o.a.createElement("td",null,c.results.longRate,"%"),o.a.createElement("td",null,c.results.longEffective,"%"),o.a.createElement("td",null,"$",c.results.longProfit),o.a.createElement("td",null,"$",c.results.longTax)),o.a.createElement("tr",{className:E.a.TableTotals},o.a.createElement("th",null,"Total"),o.a.createElement("td",null),o.a.createElement("td",null,c.results.totEffectiveRate,"%"),o.a.createElement("td",null,"$",c.results.totalProfit),o.a.createElement("td",null,"$",c.results.totalTax)))))},b=t(106),k=t(15),x=t(109);a.default=Object(k.b)((function(e){return{darkMode:e.theme.darkMode}}))((function(e){var a=Object(l.useState)({principal:"",contrib:"",years:"",interest:"",finalVal:"",dataPoints:[],showChart:!1}),t=Object(r.a)(a,2),c=t[0],m=t[1],h=Object(l.useState)({goal:"",interest:"",age:"",shownAge:"",dataPoints:[],showChart:!1}),p=Object(r.a)(h,2),E=p[0],g=p[1],v=Object(l.useState)("Compound"),_=Object(r.a)(v,2),k=_[0],C=_[1],y=function(){var e=function(e){for(var a=[],t=0;t<=e.years;t++){var n=e.principal*Math.pow(1+e.interest/1200,12*t);n+=e.contrib*((Math.pow(1+e.interest/1200,12*t)-1)/(e.interest/1200)),a.push({x:t,y:Number(n.toFixed(2))})}return a}(c);m(Object(n.a)({},c,{finalVal:e[c.years].y,dataPoints:e,showChart:!0}))},w={theme:e.darkMode?"dark2":"light2",axisY:{valueFormatString:"'$'0"},axisX:{valueFormatString:"'Year '0",minimum:0},toolTip:{content:"Year {x}: ${y}"},backgroundColor:e.darkMode?"rgb(32, 84, 109)":"white",data:[{type:"area",indexLabelFontColor:"#5A5757",indexLabelPlacement:"outside",color:"rgb(26, 171, 152)",fillOpacity:"1",dataPoints:c.dataPoints}]},M={theme:e.darkMode?"dark2":"light2",axisY:{valueFormatString:"'$'0"},toolTip:{content:"Age {label}: ${y}"},backgroundColor:e.darkMode?"rgb(32, 84, 109)":"white",data:[{type:"column",dataPoints:E.dataPoints}]};return o.a.createElement("div",{className:i.a.Container},o.a.createElement("div",{className:i.a.Content},o.a.createElement("div",{className:i.a.SelectBar},o.a.createElement("span",{className:"Compound"===k?i.a.ActiveBtn:i.a.Btn},o.a.createElement(u.a,{clicked:function(){return C("Compound")}},"Compound Interest Visualizer")),o.a.createElement("span",{className:"Retire"===k?i.a.ActiveBtn:i.a.Btn},o.a.createElement(u.a,{clicked:function(){return C("Retire")}},"Retirement Visualizer")),o.a.createElement("span",{className:"Tax"===k?i.a.ActiveBtn:i.a.Btn},o.a.createElement(u.a,{clicked:function(){return C("Tax")}},"Capital Gains Calculator"))),o.a.createElement(x.a,{allow:"Tax"!==k,submit:function(){(function(){if("Compound"===k){if("0"===c.years||"0"===c.interest||""===c.years||""===c.interest||""===c.principal||""===c.contrib)return!1}else if(""===E.goal||"0"===E.goal||""===E.interest||"0"===E.interest||""===E.age||E.age<25)return!1;return!0})()&&("Compound"===k?y():g(Object(n.a)({},E,{dataPoints:f(E),showChart:!0,shownAge:E.age})))}},o.a.createElement(P,{show:"Compound"===k,currMode:"Compound",darkMode:e.darkMode},o.a.createElement("div",{className:e.darkMode?"".concat(i.a.Inputs," ").concat(i.a.DarkInputs):i.a.Inputs},o.a.createElement("div",{className:i.a.InputRow},o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Principal Investment"),o.a.createElement(d.c,{val:c.principal,change:function(e){return m(Object(n.a)({},c,{principal:e}))},dark:e.darkMode})),o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Monthly Contribution"),o.a.createElement(d.c,{val:c.contrib,change:function(e){return m(Object(n.a)({},c,{contrib:e}))},dark:e.darkMode}))),o.a.createElement("div",{className:i.a.InputRow},o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Years Compounded"),o.a.createElement(d.c,{val:c.years,change:function(e){return m(Object(n.a)({},c,{years:e}))},dark:e.darkMode})),o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Yearly return in %"),o.a.createElement(d.c,{val:c.interest,change:function(e){return m(Object(n.a)({},c,{interest:e}))},dark:e.darkMode}))))),o.a.createElement(P,{show:"Retire"===k,currMode:"Retire",darkMode:e.darkMode},o.a.createElement("div",{className:e.darkMode?"".concat(i.a.Inputs," ").concat(i.a.DarkInputs):i.a.Inputs},o.a.createElement("div",{className:i.a.InputRow2},o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Retirement Goal"),o.a.createElement(d.c,{val:E.goal,change:function(e){return g(Object(n.a)({},E,{goal:e}))},dark:e.darkMode})),o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Yearly return in %"),o.a.createElement(d.c,{val:E.interest,change:function(e){return g(Object(n.a)({},E,{interest:e}))},dark:e.darkMode})),o.a.createElement("div",{className:i.a.InputField},o.a.createElement("p",null,"Retirement Age"),o.a.createElement(d.c,{val:E.age,change:function(e){return g(Object(n.a)({},E,{age:Math.floor(e)}))},dark:e.darkMode}))))),o.a.createElement("div",{className:"Tax"!==k?i.a.Btns:i.a.Hide},o.a.createElement(u.a,{isSubmit:!0},"Calculate"),o.a.createElement(u.a,{clicked:function(){"Compound"===k?m({principal:"",contrib:"",years:"",interest:"",finalVal:"",dataPoints:[],showChart:!1}):g({goal:"",interest:"",age:"",shownAge:"",dataPoints:[],showChart:!1})}},"Reset"))),c.showChart&&"Compound"===k&&o.a.createElement("div",{className:e.darkMode?"".concat(i.a.Chart," ").concat(i.a.DarkChart):i.a.Chart},o.a.createElement("h1",{className:i.a.Title},"$",Object(b.a)(c.finalVal)),o.a.createElement(s.b,{options:w,darkMode:e.darkMode})),E.showChart&&"Retire"===k&&o.a.createElement("div",{className:e.darkMode?"".concat(i.a.Chart," ").concat(i.a.DarkChart):i.a.Chart},o.a.createElement("h2",{className:i.a.Title2},"Monthly savings to reach goal by age ",E.shownAge),o.a.createElement(s.b,{options:M,darkMode:e.darkMode}),o.a.createElement("p",{className:i.a.SubTitle},"Starting age")),o.a.createElement(T,{show:"Tax"===k,darkMode:e.darkMode})))}))}}]);
//# sourceMappingURL=9.bc4ff2d6.chunk.js.map