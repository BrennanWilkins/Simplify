(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{100:function(e,t,a){e.exports={BigBtn:"BlueBtn_BigBtn__3hb37",Btn:"BlueBtn_Btn__O1Uk4",NoBigBtn:"BlueBtn_NoBigBtn__2jTSw"}},101:function(e,t){(function(t){e.exports=t}).call(this,{})},113:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(114),c=a.n(u);t.a=function(e){var t=(e.budget.budget-e.budget.remaining)/e.budget.budget*300;t>300&&(t=300),e.small&&(t=(e.budget.budget-e.budget.remaining)/e.budget.budget*150)>150&&(t=150);var a=(e.budget.budget-e.budget.remaining).toFixed(2);return a>1e6&&(a=""),r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:e.small?c.a.SmallCategory:c.a.Category},e.budget.category),r.a.createElement("div",{className:e.small?c.a.SmallBudgetOval:c.a.BudgetOval},r.a.createElement("div",{className:e.small?c.a.SmallBudgetOverlay:c.a.BudgetOverlay,style:{width:"".concat(t,"px")}},r.a.createElement("span",{className:e.small?t<70?c.a.SmallShowRight:c.a.SmallOverlaySpan:t<140?c.a.ShowRight:c.a.OverlaySpan},"$",a))),r.a.createElement("span",{className:e.small?c.a.SmallBudgetVal:c.a.BudgetVal},"$",Number(Number(e.budget.budget).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})))}},114:function(e,t,a){e.exports={Category:"BudgetBars_Category__2dEtV",SmallCategory:"BudgetBars_SmallCategory__t6urY",BudgetOval:"BudgetBars_BudgetOval__2Pj4h",SmallBudgetOval:"BudgetBars_SmallBudgetOval__3-w8T",BudgetOverlay:"BudgetBars_BudgetOverlay__3mnns",SmallBudgetOverlay:"BudgetBars_SmallBudgetOverlay__291IJ",OverlaySpan:"BudgetBars_OverlaySpan__2fvHi",SmallOverlaySpan:"BudgetBars_SmallOverlaySpan__3s6I3",ShowRight:"BudgetBars_ShowRight__3ZVne",SmallShowRight:"BudgetBars_SmallShowRight__14ilS",BudgetVal:"BudgetBars_BudgetVal__3yyPu",SmallBudgetVal:"BudgetBars_SmallBudgetVal__21xgo"}},128:function(e,t,a){e.exports={Container:"BudgetPage_Container__3buPB",OuterContent:"BudgetPage_OuterContent__39FJh",Content:"BudgetPage_Content__1v03f",Budget:"BudgetPage_Budget__1pxzh",LeftContent:"BudgetPage_LeftContent__RlQMa",Charts:"BudgetPage_Charts__Xl5l7",NewDiv:"BudgetPage_NewDiv__OESoN",Btns:"BudgetPage_Btns__5P0xh",Title:"BudgetPage_Title__2Y8ac",BudgetDiv:"BudgetPage_BudgetDiv__3vJFD",InnerBudgetDiv:"BudgetPage_InnerBudgetDiv__3MqCi",ShowBtn:"BudgetPage_ShowBtn__eQ-ou",AddBtn:"BudgetPage_AddBtn__gi9xy",CaretDown:"BudgetPage_CaretDown__305Z5",CaretRight:"BudgetPage_CaretRight__3zz4H",Transactions:"BudgetPage_Transactions__2wWvx",HideTransactions:"BudgetPage_HideTransactions__AOzgR",Transaction:"BudgetPage_Transaction__2EwoV",ShowAddTrans:"BudgetPage_ShowAddTrans__1noxi",HideAddTrans:"BudgetPage_HideAddTrans__pm1PT",TotalBudget:"BudgetPage_TotalBudget__3ltGC"}},129:function(e,t,a){e.exports={Panel:"NewBudgetPanel_Panel__rao9V",HidePanel:"NewBudgetPanel_HidePanel__TxkKj",Field:"NewBudgetPanel_Field__1pmV6",InputDiv:"NewBudgetPanel_InputDiv__Txb62",BtnDiv:"NewBudgetPanel_BtnDiv__1C6j_",BtnDiv2:"NewBudgetPanel_BtnDiv2__2hFkO",BtnDiv3:"NewBudgetPanel_BtnDiv3__2fZa5",CreateBtn:"NewBudgetPanel_CreateBtn__2Zhmh",HideCreateBtn:"NewBudgetPanel_HideCreateBtn__wMZK7",Entries:"NewBudgetPanel_Entries__2l_NH",Text:"NewBudgetPanel_Text__2N3T3",ShowErr:"NewBudgetPanel_ShowErr__1RPMA",HideErr:"NewBudgetPanel_HideErr__3h1Wg"}},130:function(e,t,a){e.exports={ChartContainer:"BudgetChart_ChartContainer__26odE",SmallChartContainer:"BudgetChart_SmallChartContainer__3WAYB",Block:"BudgetChart_Block__zC9sB"}},131:function(e,t,a){e.exports={Panel:"BudgetPanel_Panel__eFyVm",HidePanel:"BudgetPanel_HidePanel__15Ve8",Budgets:"BudgetPanel_Budgets__3OLzW",BtnDiv:"BudgetPanel_BtnDiv__3vUaG",ConfirmBtn:"BudgetPanel_ConfirmBtn__2_Kc0",DeleteBtn:"BudgetPanel_DeleteBtn__r5ayg",AddBtn:"BudgetPanel_AddBtn__GvlFA",BtnDiv2:"BudgetPanel_BtnDiv2__1ouYo",ShowErr:"BudgetPanel_ShowErr__1QAw4",HideErr:"BudgetPanel_HideErr__35mht",Hidden:"BudgetPanel_Hidden__H03vz"}},132:function(e,t,a){e.exports={ChartContainer:"BudgetByCateg_ChartContainer__1eYX6",Block:"BudgetByCateg_Block__Kxnud"}},148:function(e,t,a){"use strict";a.r(t);var n=a(29),r=a(2),u=a(18),c=a(14),i=a(0),l=a.n(i),o=a(128),d=a.n(o),s=a(19),g=a(11),m=a(129),B=a.n(m),_=a(95),b=a(17),f=a(96),v=a(94),h=Object(s.b)((function(e){return{isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(g.q(t))},addNotif:function(t){return e(g.b(t))}}}))((function(e){var t=Object(i.useState)(""),a=Object(c.a)(t,2),r=a[0],o=a[1],d=Object(i.useState)(0),s=Object(c.a)(d,2),g=s[0],m=s[1],h=Object(i.useState)([]),E=Object(c.a)(h,2),N=E[0],C=E[1],p=Object(i.useState)(!1),O=Object(c.a)(p,2),w=O[0],y=O[1],S=Object(i.useState)(""),P=Object(c.a)(S,2),j=P[0],D=P[1],T=Object(i.useRef)();Object(i.useEffect)((function(){return e.show&&document.addEventListener("mousedown",x),function(){return document.removeEventListener("mousedown",x)}}),[e.show]);var x=function(e){T.current.contains(e.target)||k()},k=function(){o(""),m(0),C([]),y(!1),D(""),e.close()};return l.a.createElement("div",{className:e.show?B.a.Panel:B.a.HidePanel,ref:T},l.a.createElement("div",{className:B.a.BtnDiv},l.a.createElement(_.a,{close:k})),l.a.createElement("div",{className:B.a.InputDiv},l.a.createElement("div",{className:B.a.Field},l.a.createElement("p",{className:B.a.Text},"Category"),l.a.createElement(v.a,{val:r,change:function(e){e.length>100||(y(!1),o(e))}})),l.a.createElement("div",{className:B.a.Field},l.a.createElement("p",{className:B.a.Text},"Monthly budget"),l.a.createElement(v.b,{val:g,change:function(e){y(!1),m(e)}}))),l.a.createElement("div",{className:B.a.BtnDiv2},l.a.createElement(f.a,{clicked:function(){if(""!==r&&0!==g){var e,t=Object(n.a)(N);try{for(t.s();!(e=t.n()).done;){if(e.value.category===r)return y(!0),D("You already have a category with that name.")}}catch(w){t.e(w)}finally{t.f()}C([].concat(Object(u.a)(N),[{category:r,budget:g}])),o(""),m(0)}}},"Add category")),l.a.createElement("div",{className:B.a.Entries},N.map((function(e,t){return l.a.createElement("div",{key:t},l.a.createElement("span",null,e.category),l.a.createElement("span",null,e.budget))}))),l.a.createElement("div",{className:B.a.BtnDiv3},l.a.createElement("button",{onClick:function(){if(e.isDemo)return e.setNewBudget(N),e.addNotif("Budget created"),k();b.b.post("budgets",{budgets:N}).then((function(t){e.setNewBudget(N),e.addNotif("Budget created"),k()})).catch((function(e){y(!0),D("Error connecting to the server.")}))},className:N.length>0?B.a.CreateBtn:B.a.HideCreateBtn},"Create budget")),l.a.createElement("p",{className:w?B.a.ShowErr:B.a.HideErr},j))})),E=a(130),N=a.n(E),C=a(99),p=C.a.CanvasJSChart,O=Object(s.b)((function(e){return{budget:e.budget.budget}}))((function(e){var t=0,a=0;e.budget.forEach((function(e){t+=Number(e.budget),a+=Number(e.budget-e.remaining)}));var n=(a/t*100).toFixed(2);n>1e3&&(n="over 1000");var r=[{name:"Total Spent",y:Number(a).toFixed(2),color:"rgb(18, 152, 189)"}];"over 1000"!==n&&r.push({name:"Remaining Budget",y:Number(t-a).toFixed(2),color:"rgb(26, 171, 152)"});var u={animationEnabled:!0,data:[{type:"doughnut",dataPoints:r,toolTipContent:"{name}: ${y}"}]};return"Small"===e.mode&&(u.height=200,u.width=200),l.a.createElement("div",{className:"Small"===e.mode?N.a.SmallChartContainer:N.a.ChartContainer},l.a.createElement(p,{options:u}),l.a.createElement("div",{className:N.a.Block}),l.a.createElement("h1",null,"You've reached ",n,"% of your budget this month"))})),w=a(15),y=a(131),S=a.n(y),P=a(92),j=Object(s.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(g.q(t))},setBudget:function(t){return e(g.n(t))},deleteBudget:function(){return e(g.g())},addNotif:function(t){return e(g.b(t))}}}))((function(e){var t=Object(i.useState)([]),a=Object(c.a)(t,2),n=a[0],o=a[1],d=Object(i.useState)(!1),s=Object(c.a)(d,2),g=s[0],m=s[1],B=Object(i.useState)(""),f=Object(c.a)(B,2),h=f[0],E=f[1],N=Object(i.useRef)();Object(i.useEffect)((function(){return e.show&&(o(e.budget.map((function(e){return Object(r.a)({},e,{id:Object(P.a)()})}))),document.addEventListener("mousedown",C)),function(){return document.removeEventListener("mousedown",C)}}),[e.show,e.budget]);var C=function(e){N.current.contains(e.target)||p()},p=function(){O(!1),o([]),e.close()},O=function(e){if(e)return m(!0),E("Error connecting to the server.");m(!1),E("")},w=function(){e.setBudget(Object(u.a)(n)),e.addNotif("Budget updated"),p()},y=function(){e.deleteBudget(),e.addNotif("Budget deleted"),p()};return l.a.createElement("div",{className:e.show?S.a.Panel:S.a.HidePanel,ref:N},l.a.createElement("div",{className:S.a.BtnDiv},l.a.createElement(_.a,{close:p})),l.a.createElement("div",{className:S.a.Budgets},n.map((function(e){return l.a.createElement("div",{key:e.id},l.a.createElement(v.a,{val:e.category,change:function(t){return function(e,t){m(!1),o(n.map((function(a){return a.id===t?Object(r.a)({},a,{category:e}):a})))}(t,e.id)}}),l.a.createElement(v.b,{val:e.budget,change:function(t){return function(e,t){m(!1),o(n.map((function(a){return a.id===t?Object(r.a)({},a,{budget:e}):a})))}(t,e.id)}}),l.a.createElement(_.a,{close:function(){return t=e.id,void o(n.filter((function(e){return e.id!==t})));var t}}))})),l.a.createElement("div",{className:S.a.BtnDiv2},l.a.createElement("button",{className:S.a.AddBtn,onClick:function(){o(n.concat({category:"",budget:0,transactions:[]}))}},"Add a new category"))),l.a.createElement("button",{onClick:function(){if(m(!1),function(){if(!n.length)return m(!0),E("You need to have at least one category."),!1;if(new Set(n.map((function(e){return e.category}))).size!==n.length)return m(!0),E("You cannot have categories with the same names."),!1;for(var e=0;e<n.length;e++){if(0===n[e].budget)return m(!0),E("Budget values cannot be zero."),!1;if(""===n[e].category)return m(!0),E("Category names cannot be empty."),!1}return!0}())return e.isDemo?w():void b.b.put("budgets",{budgets:n}).then((function(e){w()})).catch((function(e){O(!0)}))},className:S.a.ConfirmBtn},"Confirm"),l.a.createElement("p",{className:g?S.a.ShowErr:S.a.HideErr},h),l.a.createElement("button",{className:S.a.DeleteBtn,onClick:function(){if(m(!1),e.isDemo)return y();b.b.delete("budgets").then((function(e){y()})).catch((function(e){O(!0)}))}},"Delete Budget"))})),D=a(113),T=a(132),x=a.n(T),k=["rgb(18, 152, 189)","rgb(13, 112, 139)","rgb(0, 162, 208)","rgb(74, 165, 190)","rgb(63, 190, 224)"],H=function(e){var t,a=0,r=Object(n.a)(e.budget);try{for(r.s();!(t=r.n()).done;){var u=t.value;a+=u.budget}}catch(i){r.e(i)}finally{r.f()}var c={animationEnabled:!0,data:[{type:"pie",toolTipContent:"{label}: {y}% (${val})",indexLabel:"{y}%",indexLabelFontWeight:"bold",indexLabelPlacement:"inside",dataPoints:e.budget.map((function(e,t){return{label:e.category,y:(e.budget/a*100).toFixed(2),val:Number(e.budget).toFixed(2),color:k[t%4]}}))}]};return l.a.createElement("div",{className:x.a.ChartContainer},l.a.createElement(C.a.CanvasJSChart,{options:c}),l.a.createElement("div",{className:x.a.Block}))};t.default=Object(s.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setBudget:function(t){return e(g.n(t))},addNotif:function(t){return e(g.b(t))}}}))((function(e){var t,a=Object(i.useState)(!1),o=Object(c.a)(a,2),s=o[0],g=o[1],m=Object(i.useState)(!1),B=Object(c.a)(m,2),E=B[0],N=B[1],C=Object(i.useState)([]),p=Object(c.a)(C,2),y=p[0],S=p[1],P=Object(i.useState)(""),T=Object(c.a)(P,2),x=T[0],k=T[1],A=Object(i.useState)(""),F=Object(c.a)(A,2),I=F[0],R=F[1],V=Object(i.useState)(""),L=Object(c.a)(V,2),z=L[0],J=L[1],M=function(){if(""!==z&&0!==z&&""!==I){var t=e.budget.map((function(e,t){if(e.category===x){var a=Object(u.a)(e.transactions);return 20===a.length&&a.pop(),a.unshift({desc:I,val:z,date:String(new Date)}),Object(r.a)({},e,{transactions:a})}return e}));if(e.isDemo)return k(""),e.addNotif("Transaction Added"),e.setBudget(t);b.b.put("budgets",{budgets:t}).then((function(a){k(""),e.addNotif("Transaction Added"),e.setBudget(t)})).catch((function(e){console.log(e)}))}},Y=0,$=Object(n.a)(e.budget);try{for($.s();!(t=$.n()).done;){Y+=t.value.budget}}catch(W){$.e(W)}finally{$.f()}return l.a.createElement("div",{className:d.a.Container},l.a.createElement("div",{className:d.a.OuterContent},l.a.createElement("h1",{className:d.a.Title},"Budgeting"),e.budget.length>0?l.a.createElement("div",{className:d.a.Content},l.a.createElement("div",{className:d.a.LeftContent},l.a.createElement("div",{className:d.a.Charts},l.a.createElement(O,{mode:"Normal"}),l.a.createElement(H,{budget:e.budget})),l.a.createElement("div",{className:d.a.Btns},l.a.createElement(f.a,{big:!0,noMargin:!0,clicked:function(){return N(!0)}},"Edit Budget"),l.a.createElement(j,{show:E,close:function(){return N(!1)}}))),l.a.createElement("div",{className:d.a.Budget},l.a.createElement("h1",{className:d.a.TotalBudget},"Total monthly budget: $",Y.toFixed(2)),e.budget.map((function(e,t){return l.a.createElement("div",{className:d.a.BudgetDiv,key:t},l.a.createElement("div",{className:d.a.InnerBudgetDiv},l.a.createElement(D.a,{budget:e}),l.a.createElement("div",null,l.a.createElement("button",{className:d.a.ShowBtn,onClick:function(){return function(e){if(-1===y.findIndex((function(t){return t===e})))return S(y.concat([e]));S(y.filter((function(t){return t!==e})))}(e.category)}},"Transactions",l.a.createElement("span",{className:y.includes(e.category)?d.a.CaretDown:d.a.CaretRight},w.b)),l.a.createElement("button",{className:d.a.AddBtn,onClick:function(){return t=e.category,R(""),J(""),void k(t);var t}},"Add Transaction"))),l.a.createElement("div",{className:y.includes(e.category)?d.a.Transactions:d.a.HideTransactions},e.transactions.map((function(e,t){var a=new Date(e.date).toJSON().slice(0,10).split("-"),n=[a[1],a[2],a[0].slice(2)].join("/");return l.a.createElement("div",{className:d.a.Transaction,key:t},l.a.createElement("div",null,e.desc),l.a.createElement("div",null,"$",Number(e.val).toFixed(2)),l.a.createElement("div",null,n))}))),l.a.createElement("div",{className:x===e.category?d.a.ShowAddTrans:d.a.HideAddTrans},l.a.createElement(v.a,{val:I,change:function(e){return R(e)},ph:"Transaction Description"}),l.a.createElement(v.b,{val:z,change:function(e){return J(e)},ph:"Cost"}),l.a.createElement("div",{className:d.a.BtnDiv},l.a.createElement(f.a,{big:!0,noMargin:!0,clicked:M},"Add"),l.a.createElement(_.a,{budget:!0,close:function(){return k("")}}))))})))):l.a.createElement("div",{className:d.a.NewDiv},l.a.createElement(f.a,{big:!0,noMargin:!0,clicked:function(){return g(!0)}},"Create a new budget"),l.a.createElement(h,{show:s,close:function(){return g(!1)}}))))}))},94:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return l}));var n=a(0),r=a.n(n),u=a(98),c=a.n(u),i=function(e){return r.a.createElement("input",{value:e.val,onChange:function(t){return e.change(t.target.value)},className:c.a.Input,placeholder:e.ph})},l=function(e){return r.a.createElement("input",{value:e.val,onChange:function(t){var a=t.target.value;isNaN(a)||(2===a.length&&"0"===a.charAt(0)&&"."!==a.charAt(1)&&(a=a.slice(1)),""===a&&(a=0),e.change(a))},className:c.a.Input,placeholder:e.ph})}},95:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(97),c=a.n(u),i=a(15);t.a=function(e){return r.a.createElement("button",{className:e.budget?c.a.CloseBudgetBtn:c.a.CloseBtn,onClick:e.close},r.a.createElement("span",{className:c.a.Icon},i.h))}},96:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(100),c=a.n(u);t.a=function(e){return r.a.createElement("button",{className:e.big?e.noMargin?c.a.NoBigBtn:c.a.BigBtn:c.a.Btn,onClick:e.clicked},e.children)}},97:function(e,t,a){e.exports={Icon:"CloseBtn_Icon__2kCvJ",CloseBtn:"CloseBtn_CloseBtn__2xpN8",CloseBudgetBtn:"CloseBtn_CloseBudgetBtn__21m8o"}},98:function(e,t,a){e.exports={Input:"Inputs_Input__1d94w"}}}]);
//# sourceMappingURL=5.6c62318f.chunk.js.map