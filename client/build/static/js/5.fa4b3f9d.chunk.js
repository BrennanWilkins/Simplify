(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{103:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(104),c=a.n(u);t.a=function(e){var t=(e.budget.budget-e.budget.remaining)/e.budget.budget*300;t>300&&(t=300),e.small&&(t=(e.budget.budget-e.budget.remaining)/e.budget.budget*150)>150&&(t=150);var a=(e.budget.budget-e.budget.remaining).toFixed(2);return a>1e6&&(a=""),r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:e.small?c.a.SmallCategory:c.a.Category},e.budget.category),r.a.createElement("div",{className:e.small?c.a.SmallBudgetOval:c.a.BudgetOval},r.a.createElement("div",{className:e.small?c.a.SmallBudgetOverlay:c.a.BudgetOverlay,style:{width:"".concat(t,"px")}},r.a.createElement("span",{className:e.small?t<70?c.a.SmallShowRight:c.a.SmallOverlaySpan:t<140?c.a.ShowRight:c.a.OverlaySpan},"$",a))),r.a.createElement("span",{className:e.small?c.a.SmallBudgetVal:c.a.BudgetVal},"$",Number(Number(e.budget.budget).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})))}},104:function(e,t,a){e.exports={Category:"BudgetBars_Category__2dEtV",SmallCategory:"BudgetBars_SmallCategory__t6urY",BudgetOval:"BudgetBars_BudgetOval__2Pj4h",SmallBudgetOval:"BudgetBars_SmallBudgetOval__3-w8T",BudgetOverlay:"BudgetBars_BudgetOverlay__3mnns",SmallBudgetOverlay:"BudgetBars_SmallBudgetOverlay__291IJ",OverlaySpan:"BudgetBars_OverlaySpan__2fvHi",SmallOverlaySpan:"BudgetBars_SmallOverlaySpan__3s6I3",ShowRight:"BudgetBars_ShowRight__3ZVne",SmallShowRight:"BudgetBars_SmallShowRight__14ilS",BudgetVal:"BudgetBars_BudgetVal__3yyPu",SmallBudgetVal:"BudgetBars_SmallBudgetVal__21xgo"}},118:function(e,t,a){e.exports={Container:"BudgetPage_Container__3buPB",OuterContent:"BudgetPage_OuterContent__39FJh",Content:"BudgetPage_Content__1v03f",NewDiv:"BudgetPage_NewDiv__OESoN",Btns:"BudgetPage_Btns__5P0xh",Title:"BudgetPage_Title__2Y8ac",Budget:"BudgetPage_Budget__1pxzh",BudgetDiv:"BudgetPage_BudgetDiv__3vJFD",InnerBudgetDiv:"BudgetPage_InnerBudgetDiv__3MqCi",ShowBtn:"BudgetPage_ShowBtn__eQ-ou",AddBtn:"BudgetPage_AddBtn__gi9xy",CaretDown:"BudgetPage_CaretDown__305Z5",CaretRight:"BudgetPage_CaretRight__3zz4H",Transactions:"BudgetPage_Transactions__2wWvx",HideTransactions:"BudgetPage_HideTransactions__AOzgR",Transaction:"BudgetPage_Transaction__2EwoV",ShowAddTrans:"BudgetPage_ShowAddTrans__1noxi",HideAddTrans:"BudgetPage_HideAddTrans__pm1PT",Input1:"BudgetPage_Input1__2K0u2",Input2:"BudgetPage_Input2__37sW8",SmallShowAddTrans:"BudgetPage_SmallShowAddTrans__2OrTw",SmallHideAddTrans:"BudgetPage_SmallHideAddTrans__XcySZ",BtnDiv:"BudgetPage_BtnDiv__36Smq"}},119:function(e,t,a){e.exports={Panel:"NewBudgetPanel_Panel__rao9V",HidePanel:"NewBudgetPanel_HidePanel__TxkKj",Input:"NewBudgetPanel_Input__6fjW6",InputDiv:"NewBudgetPanel_InputDiv__Txb62",BtnDiv:"NewBudgetPanel_BtnDiv__1C6j_",BtnDiv2:"NewBudgetPanel_BtnDiv2__2hFkO",BtnDiv3:"NewBudgetPanel_BtnDiv3__2fZa5",Field:"NewBudgetPanel_Field__1pmV6",CreateBtn:"NewBudgetPanel_CreateBtn__2Zhmh",HideCreateBtn:"NewBudgetPanel_HideCreateBtn__wMZK7",Entries:"NewBudgetPanel_Entries__2l_NH",Text:"NewBudgetPanel_Text__2N3T3",ShowErr:"NewBudgetPanel_ShowErr__1RPMA",HideErr:"NewBudgetPanel_HideErr__3h1Wg"}},120:function(e,t,a){e.exports={ChartContainer:"BudgetChart_ChartContainer__26odE",SmallChartContainer:"BudgetChart_SmallChartContainer__3WAYB",Block:"BudgetChart_Block__zC9sB"}},121:function(e,t,a){e.exports={Panel:"BudgetPanel_Panel__eFyVm",HidePanel:"BudgetPanel_HidePanel__15Ve8",Budgets:"BudgetPanel_Budgets__3OLzW",BtnDiv:"BudgetPanel_BtnDiv__3vUaG",ConfirmBtn:"BudgetPanel_ConfirmBtn__2_Kc0",DeleteBtn:"BudgetPanel_DeleteBtn__r5ayg",AddBtn:"BudgetPanel_AddBtn__GvlFA",BtnDiv2:"BudgetPanel_BtnDiv2__1ouYo",ShowErr:"BudgetPanel_ShowErr__1QAw4",HideErr:"BudgetPanel_HideErr__35mht",Hidden:"BudgetPanel_Hidden__H03vz"}},138:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(18),u=a(12),c=a(0),l=a.n(c),i=a(118),o=a.n(i),d=a(19),s=a(14),g=a(27),m=a(119),_=a.n(m),B=a(86),v=a(15),b=a(87),f=Object(d.b)((function(e){return{isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(s.o(t))}}}))((function(e){var t=Object(c.useState)(""),a=Object(u.a)(t,2),n=a[0],i=a[1],o=Object(c.useState)(0),d=Object(u.a)(o,2),s=d[0],m=d[1],f=Object(c.useState)([]),h=Object(u.a)(f,2),E=h[0],N=h[1],C=Object(c.useState)(!1),p=Object(u.a)(C,2),S=p[0],O=p[1],w=Object(c.useState)(""),P=Object(u.a)(w,2),y=P[0],j=P[1],D=Object(c.useRef)();Object(c.useEffect)((function(){return document.addEventListener("mousedown",T),function(){return document.removeEventListener("mousedown",T)}}),[e.show]),Object(c.useEffect)((function(){return function(){return document.removeEventListener("mousedown",T)}}),[]);var T=function(e){D.current.contains(e.target)||A()},A=function(){i(""),m(0),N([]),O(!1),j(""),e.close()};return l.a.createElement("div",{className:e.show?_.a.Panel:_.a.HidePanel,ref:D},l.a.createElement("div",{className:_.a.BtnDiv},l.a.createElement(B.a,{close:A})),l.a.createElement("div",{className:_.a.InputDiv},l.a.createElement("div",{className:_.a.Field},l.a.createElement("p",{className:_.a.Text},"Category"),l.a.createElement("input",{className:_.a.Input,value:n,onChange:function(e){e.target.value.length>100||(O(!1),i(e.target.value))}})),l.a.createElement("div",{className:_.a.Field},l.a.createElement("p",{className:_.a.Text},"Monthly budget"),l.a.createElement("input",{className:_.a.Input,value:s,onChange:function(e){O(!1);var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),m(t))}}))),l.a.createElement("div",{className:_.a.BtnDiv2},l.a.createElement(b.a,{clicked:function(){if(""!==n&&0!==s){var e,t=Object(g.a)(E);try{for(t.s();!(e=t.n()).done;){if(e.value.category===n)return O(!0),j("You already have a category with that name.")}}catch(S){t.e(S)}finally{t.f()}N([].concat(Object(r.a)(E),[{category:n,budget:s}])),i(""),m(0)}}},"Add category")),l.a.createElement("div",{className:_.a.Entries},E.map((function(e,t){return l.a.createElement("div",{key:t},l.a.createElement("span",null,e.category),l.a.createElement("span",null,e.budget))}))),l.a.createElement("div",{className:_.a.BtnDiv3},l.a.createElement("button",{onClick:function(){if(e.isDemo)return e.setNewBudget(E),A();v.b.post("budgets",{budgets:E}).then((function(t){e.setNewBudget(E),A()})).catch((function(e){O(!0),j("Error connecting to the server.")}))},className:E.length>0?_.a.CreateBtn:_.a.HideCreateBtn},"Create budget")),l.a.createElement("p",{className:S?_.a.ShowErr:_.a.HideErr},y))})),h=a(120),E=a.n(h),N=a(89).a.CanvasJSChart,C=Object(d.b)((function(e){return{budget:e.budget.budget}}))((function(e){var t=0,a=0;e.budget.forEach((function(e){t+=Number(e.budget),a+=Number(e.budget-e.remaining)}));var n=(a/t*100).toFixed(2);n>1e3&&(n="over 1000");var r=[{name:"Total Spent",y:a,color:"rgb(18, 152, 189)"}];"over 1000"!==n&&r.push({name:"Remaining Budget",y:Number(t-a),color:"rgb(26, 171, 152)"});var u={animationEnabled:!0,data:[{type:"doughnut",dataPoints:r}]};return"Small"===e.mode&&(u.height=200,u.width=200),l.a.createElement("div",{className:"Small"===e.mode?E.a.SmallChartContainer:E.a.ChartContainer},l.a.createElement(N,{options:u}),l.a.createElement("div",{className:E.a.Block}),l.a.createElement("h1",null,"You've reached ",n,"% of your budget this month"))})),p=a(17),S=a(121),O=a.n(S),w=Object(d.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(s.o(t))},setBudget:function(t){return e(s.l(t))},deleteBudget:function(){return e(s.f())}}}))((function(e){var t=Object(c.useState)([]),a=Object(u.a)(t,2),n=a[0],i=a[1],o=Object(c.useState)([]),d=Object(u.a)(o,2),s=d[0],g=d[1],m=Object(c.useState)(!1),_=Object(u.a)(m,2),b=_[0],f=_[1],h=Object(c.useState)(""),E=Object(u.a)(h,2),N=E[0],C=E[1],p=Object(c.useState)([]),S=Object(u.a)(p,2),w=S[0],P=S[1],y=Object(c.useRef)();Object(c.useEffect)((function(){return e.show&&(i(e.budget.map((function(e){return e.category}))),g(e.budget.map((function(e){return e.budget})))),document.addEventListener("mousedown",j),function(){return document.removeEventListener("mousedown",j)}}),[e.show]),Object(c.useEffect)((function(){return function(){return document.removeEventListener("mousedown",j)}}),[]);var j=function(e){y.current.contains(e.target)||D()},D=function(){f(!1),C(""),i([]),g([]),P([]),e.close()};return l.a.createElement("div",{className:e.show?O.a.Panel:O.a.HidePanel,ref:y},l.a.createElement("div",{className:O.a.BtnDiv},l.a.createElement(B.a,{close:D})),l.a.createElement("div",{className:O.a.Budgets},s.map((function(e,t){return l.a.createElement("div",{key:t,className:w.includes(t)?O.a.Hidden:void 0},l.a.createElement("input",{value:n[t],onChange:function(e){return function(e,t){f(!1);var a=Object(r.a)(n);a[e]=t.target.value,i(a)}(t,e)}}),l.a.createElement("input",{value:e,onChange:function(e){return function(e,t){f(!1);var a=t.target.value;if(!isNaN(a)){2===a.length&&"0"===a.charAt(0)&&"."!==a.charAt(1)&&(a=a.slice(1)),""===a&&(a=0);var n=Object(r.a)(s);n[e]=a,g(n)}}(t,e)}}),l.a.createElement(B.a,{close:function(){return function(e){P(w.concat([e]))}(t)}}))})),l.a.createElement("div",{className:O.a.BtnDiv2},l.a.createElement("button",{className:O.a.AddBtn,onClick:function(){i(n.concat([""])),g(s.concat([0]))}},"Add a new category"))),l.a.createElement("button",{onClick:function(){f(!1);for(var t=Object(r.a)(e.budget),a=0;a<s.length;a++)if(!w.includes(a)){if(0===s[a])return f(!0),C("Budget values cannot be zero.");if(""===n[a])return f(!0),C("Category names cannot be empty.");t[a]&&(t[a].budget=s[a],t[a].category=n[a])}for(var u=e.budget.length;u<s.length;u++)w.includes(u)||t.push({category:n[u],budget:Number(s[u]),transactions:[]});var c=t.map((function(e){return{category:e.category,budget:e.budget,transactions:e.transactions}})).filter((function(e,t){return!w.includes(t)}));if(e.isDemo)return e.setBudget(c),D();v.b.put("budgets",{budgets:c}).then((function(t){e.setBudget(c),D()})).catch((function(e){console.log(e),f(!0),C("Error connecting to the server.")}))},className:O.a.ConfirmBtn},"Confirm"),l.a.createElement("p",{className:b?O.a.ShowErr:O.a.HideErr},N),l.a.createElement("button",{className:O.a.DeleteBtn,onClick:function(){if(f(!1),e.isDemo)return e.deleteBudget(),D();v.b.delete("budgets").then((function(t){e.deleteBudget(),D()})).catch((function(e){console.log(e),f(!0),C("Error connecting to the server.")}))}},"Delete Budget"))})),P=a(103);a(90),t.default=Object(d.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setBudget:function(t){return e(s.l(t))}}}))((function(e){var t=Object(c.useState)(!1),a=Object(u.a)(t,2),i=a[0],d=a[1],s=Object(c.useState)(!1),g=Object(u.a)(s,2),m=g[0],_=g[1],h=Object(c.useState)([]),E=Object(u.a)(h,2),N=E[0],S=E[1],O=Object(c.useState)(""),y=Object(u.a)(O,2),j=y[0],D=y[1],T=Object(c.useState)(""),A=Object(u.a)(T,2),H=A[0],k=A[1],x=Object(c.useState)(""),I=Object(u.a)(x,2),F=I[0],R=I[1],V=function(e){var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),R(t))},M=function(){if(""!==F&&0!==F&&""!==H){var t=e.budget.map((function(e,t){if(e.category===j){var a=Object(r.a)(e.transactions);return 5===a.length&&a.splice(4,1),a.unshift({desc:H,value:F,date:new Date}),Object(n.a)({},e,{transactions:a})}return e}));if(e.isDemo)return D(""),e.setBudget(t);v.b.put("budgets",{budgets:t}).then((function(a){D(""),e.setBudget(t)})).catch((function(e){console.log(e)}))}};return l.a.createElement("div",{className:o.a.Container},l.a.createElement("div",{className:o.a.OuterContent},l.a.createElement("h1",{className:o.a.Title},"Budgeting"),e.budget.length>0?l.a.createElement("div",{className:o.a.Content},l.a.createElement(C,{mode:"Normal"}),l.a.createElement("div",{className:o.a.Btns},l.a.createElement(b.a,{big:!0,noMargin:!0,clicked:function(){return _(!0)}},"Edit Budget"),l.a.createElement(w,{show:m,close:function(){return _(!1)}})),l.a.createElement("div",{className:o.a.Budget},e.budget.map((function(e,t){return l.a.createElement("div",{className:o.a.BudgetDiv,key:t},l.a.createElement("div",{className:o.a.InnerBudgetDiv},l.a.createElement(P.a,{budget:e}),l.a.createElement("div",null,l.a.createElement("button",{className:o.a.ShowBtn,onClick:function(){return function(e){if(-1===N.findIndex((function(t){return t===e})))return S(N.concat([e]));S(N.filter((function(t){return t!==e})))}(e.category)}},"Transactions",l.a.createElement("span",{className:N.includes(e.category)?o.a.CaretDown:o.a.CaretRight},p.b)),l.a.createElement("button",{className:o.a.AddBtn,onClick:function(){return t=e.category,k(""),R(""),void D(t);var t}},"Add Transaction"))),l.a.createElement("div",{className:N.includes(e.category)?o.a.Transactions:o.a.HideTransactions},e.transactions.map((function(e,t){var a=new Date(e.date).toJSON().slice(0,10).split("-"),n=[a[1],a[2],a[0].slice(2)].join("/");return l.a.createElement("div",{className:o.a.Transaction,key:t},l.a.createElement("div",null,e.desc),l.a.createElement("div",null,"$",Number(e.value).toFixed(2)),l.a.createElement("div",null,n))}))),l.a.createElement("div",{className:j===e.category?o.a.ShowAddTrans:o.a.HideAddTrans},l.a.createElement("input",{className:o.a.Input1,value:H,onChange:function(e){return k(e.target.value)},placeholder:"Transaction Description"}),l.a.createElement("input",{className:o.a.Input2,value:F,onChange:V,placeholder:"Cost"}),l.a.createElement(b.a,{big:!0,noMargin:!0,clicked:M},"Add"),l.a.createElement(B.a,{budget:!0,close:function(){return D("")}})),l.a.createElement("div",{className:j===e.category?o.a.SmallShowAddTrans:o.a.SmallHideAddTrans},l.a.createElement("input",{className:o.a.Input1,value:H,onChange:function(e){return k(e.target.value)},placeholder:"Transaction Description"}),l.a.createElement("input",{className:o.a.Input2,value:F,onChange:V,placeholder:"Cost"}),l.a.createElement("div",{className:o.a.BtnDiv},l.a.createElement(b.a,{big:!0,noMargin:!0,clicked:M},"Add"),l.a.createElement(B.a,{budget:!0,close:function(){return D("")}}))))})))):l.a.createElement("div",{className:o.a.NewDiv},l.a.createElement(b.a,{big:!0,noMargin:!0,clicked:function(){return d(!0)}},"Create a new budget"),l.a.createElement(f,{show:i,close:function(){return d(!1)}}))))}))},86:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(88),c=a.n(u),l=a(17);t.a=function(e){return r.a.createElement("button",{className:e.budget?c.a.CloseBudgetBtn:c.a.CloseBtn,onClick:e.close},r.a.createElement("span",{className:c.a.Icon},l.g))}},87:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(91),c=a.n(u);t.a=function(e){return r.a.createElement("button",{className:e.big?e.noMargin?c.a.NoBigBtn:c.a.BigBtn:c.a.Btn,onClick:e.clicked},e.children)}},88:function(e,t,a){e.exports={Icon:"CloseBtn_Icon__2kCvJ",CloseBtn:"CloseBtn_CloseBtn__2xpN8",CloseBudgetBtn:"CloseBtn_CloseBudgetBtn__21m8o"}},90:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(93),c=a.n(u);t.a=function(e){return r.a.createElement("button",{className:e.big?c.a.BigBtn:c.a.Btn,onClick:e.clicked},e.children)}},91:function(e,t,a){e.exports={BigBtn:"BlueBtn_BigBtn__3hb37",Btn:"BlueBtn_Btn__O1Uk4",NoBigBtn:"BlueBtn_NoBigBtn__2jTSw"}},92:function(e,t){(function(t){e.exports=t}).call(this,{})},93:function(e,t,a){e.exports={BigBtn:"GreenBtn_BigBtn__CbbvN",Btn:"GreenBtn_Btn__339UW"}}}]);
//# sourceMappingURL=5.fa4b3f9d.chunk.js.map