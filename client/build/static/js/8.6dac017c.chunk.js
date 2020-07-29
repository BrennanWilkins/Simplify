(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8],{123:function(e,a,t){e.exports={Container:"PlanPage_Container__1AJoD",Content:"PlanPage_Content__14s1_",Chart:"PlanPage_Chart__1SVaj",HideChart:"PlanPage_HideChart__3nFdt",Block:"PlanPage_Block__1nzxK",Inputs:"PlanPage_Inputs__2xDI-",InputRow:"PlanPage_InputRow__3_YF2",InputField:"PlanPage_InputField__33n_W",Btns:"PlanPage_Btns__3itjP",Title:"PlanPage_Title__NmRSi",Title2:"PlanPage_Title2__1ThLw"}},124:function(e,a){e.exports=compound=function(e,a,t,n){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;e=Number(e),a=Number(a),t=Number(t);for(var r,l,c,o=(n=Number(n))/(i=Number(i)),s=[e],u=[0],m=[e],p=1;p<t+1;p++){l=e*Math.pow(1+o,p*i),c=(Math.pow(1+o,p*i)-1)/o;var d=(c*=a)+l;m.push(Number(d.toFixed(2)));var _=a*p*i+e;s.push(Number(_.toFixed(2)));var b=d-_;u.push(Number(b.toFixed(2))),p==t&&(r=Number(d.toFixed(2)))}return{result:r,principal:s,interest:u,total:m}}},125:function(e,a,t){"use strict";t.r(a);var n=t(40),i=t(3),r=t(9),l=t(0),c=t.n(l),o=t(123),s=t.n(o),u=t(124),m=t.n(u),p=t(89),d=t(88),_=p.a.CanvasJSChart;a.default=function(e){var a=Object(l.useState)({principal:"",contrib:"",years:"",interest:""}),t=Object(r.a)(a,2),o=t[0],u=t[1],p=Object(l.useState)(!1),b=Object(r.a)(p,2),v=b[0],g=b[1],h=Object(l.useState)([]),N=Object(r.a)(h,2),E=N[0],B=N[1],P=Object(l.useState)(""),C=Object(r.a)(P,2),f=C[0],x=C[1],F=function(e){var a=e.target.value;isNaN(a)||(2===a.length&&"0"===a.charAt(0)&&"."!==a.charAt(1)&&(a=a.slice(1)),u(Object(i.a)({},o,Object(n.a)({},e.target.name,a))))},I={animationEnabled:!0,theme:"light2",exportEnabled:!1,axisY:{valueFormatString:"'$'0"},axisX:{valueFormatString:"'Year '0",minimum:0},toolTip:{content:"Year {x}: ${y}"},data:[{type:"area",indexLabelFontColor:"#5A5757",indexLabelPlacement:"outside",color:"rgb(26, 171, 152)",fillOpacity:"1",dataPoints:E}]};return c.a.createElement("div",{className:s.a.Container},c.a.createElement("div",{className:s.a.Content},c.a.createElement("h1",{className:s.a.Title},"Compound Interest Visualizer"),c.a.createElement("div",{className:s.a.Inputs},c.a.createElement("div",{className:s.a.InputRow},c.a.createElement("div",{className:s.a.InputField},c.a.createElement("p",null,"Principal Investment"),c.a.createElement("input",{value:o.principal,name:"principal",onChange:F})),c.a.createElement("div",{className:s.a.InputField},c.a.createElement("p",null,"Monthly Contribution"),c.a.createElement("input",{value:o.contrib,name:"contrib",onChange:F}))),c.a.createElement("div",{className:s.a.InputRow},c.a.createElement("div",{className:s.a.InputField},c.a.createElement("p",null,"Years Compounded"),c.a.createElement("input",{value:o.years,name:"years",onChange:F})),c.a.createElement("div",{className:s.a.InputField},c.a.createElement("p",null,"Yearly return in %"),c.a.createElement("input",{value:o.interest,name:"interest",onChange:F})))),c.a.createElement("div",{className:s.a.Btns},c.a.createElement(d.a,{clicked:function(){for(var e in o)if(""===o[e])return;if("0"!==o.years&&"0"!==o.interest){var a=m()(o.principal,o.contrib,o.years,o.interest/100,12);x(a.result);var t=a.total.map((function(e,a){return{x:a,y:e}}));B(t),g(!0)}}},"Calculate"),c.a.createElement(d.a,{clicked:function(){var e=Object(i.a)({},o);for(var a in e)e[a]="";u(e),x(""),B([]),g(!1)}},"Reset")),c.a.createElement("div",{className:v?s.a.Chart:s.a.HideChart},c.a.createElement("h1",{className:s.a.Title2},"$",Number(Number(f).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})),c.a.createElement(_,{options:I}),c.a.createElement("div",{className:s.a.Block}))))}},88:function(e,a,t){"use strict";var n=t(0),i=t.n(n),r=t(91),l=t.n(r);a.a=function(e){return i.a.createElement("button",{className:e.big?e.noMargin?l.a.NoBigBtn:l.a.BigBtn:l.a.Btn,onClick:e.clicked},e.children)}},91:function(e,a,t){e.exports={BigBtn:"BlueBtn_BigBtn__3hb37",Btn:"BlueBtn_Btn__O1Uk4",NoBigBtn:"BlueBtn_NoBigBtn__2jTSw"}},92:function(e,a){(function(a){e.exports=a}).call(this,{})}}]);
//# sourceMappingURL=8.6dac017c.chunk.js.map