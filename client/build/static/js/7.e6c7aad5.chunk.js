(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{102:function(e,t,a){e.exports={BigBtn:"GreenBtn_BigBtn__CbbvN",Btn:"GreenBtn_Btn__339UW"}},105:function(e,t,a){"use strict";var n=a(0),o=a.n(n),l=a(106),r=a.n(l),i=a(89),c=a(19),s=i.a.CanvasJSChart;t.a=Object(c.b)((function(e){return{netWorthData:e.netWorth.netWorthData,goal:e.goal.goal}}))((function(e){var t=0===e.netWorthData.length?"0.00":e.netWorthData[e.netWorthData.length-1].value.toFixed(2),a=(t/e.goal*100).toFixed(2);a>100&&(a=100);var n=[{name:"Current Net Worth",y:t,color:"rgb(26, 171, 152)"}];a<100&&n.push({name:"Remaining",y:e.goal-t,color:"rgb(15, 119, 147)"});var l={animationEnabled:!0,data:[{type:"doughnut",dataPoints:n}]};return"Small"===e.mode&&(l.height=200,l.width=200),o.a.createElement("div",{className:"Small"===e.mode?r.a.SmallChartContainer:r.a.ChartContainer},o.a.createElement(s,{options:l}),o.a.createElement("div",{className:r.a.Block}),o.a.createElement("h1",null,"You've reached ",a,"% of your goal"))}))},106:function(e,t,a){e.exports={ChartContainer:"GoalChart_ChartContainer__1a4IH",SmallChartContainer:"GoalChart_SmallChartContainer__1b4Le",Block:"GoalChart_Block__1P0Ct"}},124:function(e,t,a){e.exports={Container:"GoalPage_Container__1LsnJ",Content:"GoalPage_Content__13G0j",SetGoal:"GoalPage_SetGoal__1Arrw",Title:"GoalPage_Title__jiuOz",Title2:"GoalPage_Title2__eCW7M",Input:"GoalPage_Input__26DF-",SubTitle:"GoalPage_SubTitle__1ICNM",Btns:"GoalPage_Btns__1WQPw",ShowErr:"GoalPage_ShowErr__1OQ3i",HideErr:"GoalPage_HideErr__1oz2h"}},125:function(e,t,a){e.exports={EditPanel:"EditGoalPanel_EditPanel__sdva3",HideEditPanel:"EditGoalPanel_HideEditPanel__1qweF",DeletePanel:"EditGoalPanel_DeletePanel__1Sskm",HideDeletePanel:"EditGoalPanel_HideDeletePanel__lhPeB",Input:"EditGoalPanel_Input__MBUcc",BtnDiv2:"EditGoalPanel_BtnDiv2__2e2kA",ShowErr:"EditGoalPanel_ShowErr__1__Ei",HideErr:"EditGoalPanel_HideErr__2b-oF",BtnDiv:"EditGoalPanel_BtnDiv__T7xw3",Title:"EditGoalPanel_Title__1D3L2"}},140:function(e,t,a){"use strict";a.r(t);var n=a(12),o=a(0),l=a.n(o),r=a(124),i=a.n(r),c=a(19),s=a(14),u=a(15),m=a(125),d=a.n(m),_=a(86),E=a(92),g=Object(c.b)((function(e){return{isDemo:e.auth.isDemo}}),(function(e){return{setGoal:function(t){return e(s.m(t))}}}))((function(e){var t=Object(o.useRef)(),a=Object(o.useState)(e.goal),r=Object(n.a)(a,2),i=r[0],c=r[1],s=Object(o.useState)(!1),m=Object(n.a)(s,2),g=m[0],h=m[1],f=Object(o.useState)(""),v=Object(n.a)(f,2),b=v[0],C=v[1];Object(o.useEffect)((function(){return document.addEventListener("mousedown",B),function(){return document.removeEventListener("mousedown",B)}}),[e.show]),Object(o.useEffect)((function(){return function(){return document.removeEventListener("mousedown",B)}}),[]);var B=function(e){t.current.contains(e.target)||G()},G=function(){c(e.goal),h(!1),C(""),e.close()};return l.a.createElement("div",{ref:t,className:"Edit"===e.mode?e.show?d.a.EditPanel:d.a.HideEditPanel:e.show?d.a.DeletePanel:d.a.HideDeletePanel},l.a.createElement("div",{className:d.a.BtnDiv},l.a.createElement(_.a,{close:G})),"Edit"===e.mode?l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{className:d.a.Input,value:i,onChange:function(e){h(!1),C("");var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),c(t))}}),l.a.createElement("div",{className:d.a.BtnDiv2},l.a.createElement(E.a,{clicked:function(){if(!(0===i||i>999999999999))return e.isDemo?(e.setGoal(i),G()):void u.b.put("goals",{goal:i}).then((function(t){e.setGoal(i),G()})).catch((function(e){h(!0),C("Error connecting to the server.")}))}},"Change"))):l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:d.a.Title},"Are you sure?"),l.a.createElement("div",{className:d.a.BtnDiv2},l.a.createElement(E.a,{clicked:function(){if(e.isDemo)return e.setGoal(null),G();u.b.delete("goals").then((function(t){e.setGoal(null),G()})).catch((function(e){h(!0),C("Error connecting to the server.")}))}},"Delete"))),l.a.createElement("p",{className:g?d.a.ShowErr:d.a.HideErr},b))})),h=a(105);t.default=Object(c.b)((function(e){return{goal:e.goal.goal,isDemo:e.auth.isDemo}}),(function(e){return{setGoal:function(t){return e(s.m(t))}}}))((function(e){var t=Object(o.useState)(0),a=Object(n.a)(t,2),r=a[0],c=a[1],s=Object(o.useState)(!1),m=Object(n.a)(s,2),d=m[0],_=m[1],f=Object(o.useState)(""),v=Object(n.a)(f,2),b=v[0],C=v[1],B=Object(o.useState)(!1),G=Object(n.a)(B,2),N=G[0],P=G[1],D=Object(o.useState)(!1),p=Object(n.a)(D,2),S=p[0],j=p[1];return l.a.createElement("div",{className:i.a.Container},l.a.createElement("div",{className:i.a.Content},e.goal?l.a.createElement("div",null,l.a.createElement("h1",{className:i.a.Title},"Net Worth Goal"),l.a.createElement("h1",{className:i.a.Title2},"$",Number(Number(e.goal).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})),l.a.createElement(h.a,{mode:"Normal"}),l.a.createElement("div",{className:i.a.Btns},l.a.createElement(E.a,{big:!0,clicked:function(){return P(!0)}},"Edit goal"),l.a.createElement(E.a,{big:!0,clicked:function(){return j(!0)}},"Delete goal"),l.a.createElement(g,{show:N,mode:"Edit",close:function(){return P(!1)},goal:e.goal}),l.a.createElement(g,{show:S,mode:"Delete",close:function(){j(!1),c(0)},goal:e.goal}))):l.a.createElement("div",{className:i.a.SetGoal},l.a.createElement("h1",{className:i.a.Title},"Create a new net worth goal"),l.a.createElement("p",{className:i.a.SubTitle},"$",Number(Number(r).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})),l.a.createElement("input",{className:i.a.Input,value:r,onChange:function(e){_(!1),C("");var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),c(t))}}),l.a.createElement(E.a,{big:!0,clicked:function(){if(!(0===r||r>999999999999))return e.isDemo?e.setGoal(r):void u.b.post("goals",{goal:r}).then((function(t){e.setGoal(r)})).catch((function(e){_(!0),C("Error connecting to the server.")}))}},"Create"),l.a.createElement("p",{className:d?i.a.ShowErr:i.a.HideErr},b))))}))},86:function(e,t,a){"use strict";var n=a(0),o=a.n(n),l=a(88),r=a.n(l),i=a(17);t.a=function(e){return o.a.createElement("button",{className:e.budget?r.a.CloseBudgetBtn:r.a.CloseBtn,onClick:e.close},o.a.createElement("span",{className:r.a.Icon},i.g))}},88:function(e,t,a){e.exports={Icon:"CloseBtn_Icon__2kCvJ",CloseBtn:"CloseBtn_CloseBtn__2xpN8",CloseBudgetBtn:"CloseBtn_CloseBudgetBtn__21m8o"}},91:function(e,t){(function(t){e.exports=t}).call(this,{})},92:function(e,t,a){"use strict";var n=a(0),o=a.n(n),l=a(102),r=a.n(l);t.a=function(e){return o.a.createElement("button",{className:e.big?r.a.BigBtn:r.a.Btn,onClick:e.clicked},e.children)}}}]);
//# sourceMappingURL=7.e6c7aad5.chunk.js.map