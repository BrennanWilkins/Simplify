(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{100:function(e,t,a){e.exports={BigBtn:"BlueBtn_BigBtn__3hb37",Btn:"BlueBtn_Btn__O1Uk4",NoBigBtn:"BlueBtn_NoBigBtn__2jTSw"}},101:function(e,t){(function(t){e.exports=t}).call(this,{})},113:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(114),c=a.n(u);t.a=function(e){var t=(e.budget.budget-e.budget.remaining)/e.budget.budget*300;t>300&&(t=300),e.small&&(t=(e.budget.budget-e.budget.remaining)/e.budget.budget*150)>150&&(t=150);var a=(e.budget.budget-e.budget.remaining).toFixed(2);return a>1e6&&(a=""),r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:e.small?c.a.SmallCategory:c.a.Category},e.budget.category),r.a.createElement("div",{className:e.small?c.a.SmallBudgetOval:c.a.BudgetOval},r.a.createElement("div",{className:e.small?c.a.SmallBudgetOverlay:c.a.BudgetOverlay,style:{width:"".concat(t,"px")}},r.a.createElement("span",{className:e.small?t<70?c.a.SmallShowRight:c.a.SmallOverlaySpan:t<140?c.a.ShowRight:c.a.OverlaySpan},"$",a))),r.a.createElement("span",{className:e.small?c.a.SmallBudgetVal:c.a.BudgetVal},"$",Number(Number(e.budget.budget).toFixed(2)).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})))}},114:function(e,t,a){e.exports={Category:"BudgetBars_Category__2dEtV",SmallCategory:"BudgetBars_SmallCategory__t6urY",BudgetOval:"BudgetBars_BudgetOval__2Pj4h",SmallBudgetOval:"BudgetBars_SmallBudgetOval__3-w8T",BudgetOverlay:"BudgetBars_BudgetOverlay__3mnns",SmallBudgetOverlay:"BudgetBars_SmallBudgetOverlay__291IJ",OverlaySpan:"BudgetBars_OverlaySpan__2fvHi",SmallOverlaySpan:"BudgetBars_SmallOverlaySpan__3s6I3",ShowRight:"BudgetBars_ShowRight__3ZVne",SmallShowRight:"BudgetBars_SmallShowRight__14ilS",BudgetVal:"BudgetBars_BudgetVal__3yyPu",SmallBudgetVal:"BudgetBars_SmallBudgetVal__21xgo"}},128:function(e,t,a){e.exports={Container:"BudgetPage_Container__3buPB",OuterContent:"BudgetPage_OuterContent__39FJh",Content:"BudgetPage_Content__1v03f",Budget:"BudgetPage_Budget__1pxzh",LeftContent:"BudgetPage_LeftContent__RlQMa",NewDiv:"BudgetPage_NewDiv__OESoN",Btns:"BudgetPage_Btns__5P0xh",Title:"BudgetPage_Title__2Y8ac",BudgetDiv:"BudgetPage_BudgetDiv__3vJFD",InnerBudgetDiv:"BudgetPage_InnerBudgetDiv__3MqCi",ShowBtn:"BudgetPage_ShowBtn__eQ-ou",AddBtn:"BudgetPage_AddBtn__gi9xy",CaretDown:"BudgetPage_CaretDown__305Z5",CaretRight:"BudgetPage_CaretRight__3zz4H",Transactions:"BudgetPage_Transactions__2wWvx",HideTransactions:"BudgetPage_HideTransactions__AOzgR",Transaction:"BudgetPage_Transaction__2EwoV",ShowAddTrans:"BudgetPage_ShowAddTrans__1noxi",HideAddTrans:"BudgetPage_HideAddTrans__pm1PT"}},129:function(e,t,a){e.exports={Panel:"NewBudgetPanel_Panel__rao9V",HidePanel:"NewBudgetPanel_HidePanel__TxkKj",Field:"NewBudgetPanel_Field__1pmV6",InputDiv:"NewBudgetPanel_InputDiv__Txb62",BtnDiv:"NewBudgetPanel_BtnDiv__1C6j_",BtnDiv2:"NewBudgetPanel_BtnDiv2__2hFkO",BtnDiv3:"NewBudgetPanel_BtnDiv3__2fZa5",CreateBtn:"NewBudgetPanel_CreateBtn__2Zhmh",HideCreateBtn:"NewBudgetPanel_HideCreateBtn__wMZK7",Entries:"NewBudgetPanel_Entries__2l_NH",Text:"NewBudgetPanel_Text__2N3T3",ShowErr:"NewBudgetPanel_ShowErr__1RPMA",HideErr:"NewBudgetPanel_HideErr__3h1Wg"}},130:function(e,t,a){e.exports={ChartContainer:"BudgetChart_ChartContainer__26odE",SmallChartContainer:"BudgetChart_SmallChartContainer__3WAYB",Block:"BudgetChart_Block__zC9sB"}},131:function(e,t,a){e.exports={Panel:"BudgetPanel_Panel__eFyVm",HidePanel:"BudgetPanel_HidePanel__15Ve8",Budgets:"BudgetPanel_Budgets__3OLzW",BtnDiv:"BudgetPanel_BtnDiv__3vUaG",ConfirmBtn:"BudgetPanel_ConfirmBtn__2_Kc0",DeleteBtn:"BudgetPanel_DeleteBtn__r5ayg",AddBtn:"BudgetPanel_AddBtn__GvlFA",BtnDiv2:"BudgetPanel_BtnDiv2__1ouYo",ShowErr:"BudgetPanel_ShowErr__1QAw4",HideErr:"BudgetPanel_HideErr__35mht",Hidden:"BudgetPanel_Hidden__H03vz"}},148:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(18),u=a(14),c=a(0),i=a.n(c),l=a(128),o=a.n(l),d=a(19),s=a(11),g=a(29),m=a(129),B=a.n(m),_=a(95),f=a(17),v=a(96),b=a(94),h=Object(d.b)((function(e){return{isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(s.q(t))},addNotif:function(t){return e(s.b(t))}}}))((function(e){var t=Object(c.useState)(""),a=Object(u.a)(t,2),n=a[0],l=a[1],o=Object(c.useState)(0),d=Object(u.a)(o,2),s=d[0],m=d[1],h=Object(c.useState)([]),E=Object(u.a)(h,2),N=E[0],C=E[1],p=Object(c.useState)(!1),O=Object(u.a)(p,2),w=O[0],S=O[1],P=Object(c.useState)(""),y=Object(u.a)(P,2),D=y[0],j=y[1],T=Object(c.useRef)();Object(c.useEffect)((function(){return e.show&&document.addEventListener("mousedown",x),function(){return document.removeEventListener("mousedown",x)}}),[e.show]);var x=function(e){T.current.contains(e.target)||H()},H=function(){l(""),m(0),C([]),S(!1),j(""),e.close()};return i.a.createElement("div",{className:e.show?B.a.Panel:B.a.HidePanel,ref:T},i.a.createElement("div",{className:B.a.BtnDiv},i.a.createElement(_.a,{close:H})),i.a.createElement("div",{className:B.a.InputDiv},i.a.createElement("div",{className:B.a.Field},i.a.createElement("p",{className:B.a.Text},"Category"),i.a.createElement(b.a,{val:n,change:function(e){e.length>100||(S(!1),l(e))}})),i.a.createElement("div",{className:B.a.Field},i.a.createElement("p",{className:B.a.Text},"Monthly budget"),i.a.createElement(b.b,{val:s,change:function(e){S(!1),m(e)}}))),i.a.createElement("div",{className:B.a.BtnDiv2},i.a.createElement(v.a,{clicked:function(){if(""!==n&&0!==s){var e,t=Object(g.a)(N);try{for(t.s();!(e=t.n()).done;){if(e.value.category===n)return S(!0),j("You already have a category with that name.")}}catch(w){t.e(w)}finally{t.f()}C([].concat(Object(r.a)(N),[{category:n,budget:s}])),l(""),m(0)}}},"Add category")),i.a.createElement("div",{className:B.a.Entries},N.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement("span",null,e.category),i.a.createElement("span",null,e.budget))}))),i.a.createElement("div",{className:B.a.BtnDiv3},i.a.createElement("button",{onClick:function(){if(e.isDemo)return e.setNewBudget(N),e.addNotif("Budget created"),H();f.b.post("budgets",{budgets:N}).then((function(t){e.setNewBudget(N),e.addNotif("Budget created"),H()})).catch((function(e){S(!0),j("Error connecting to the server.")}))},className:N.length>0?B.a.CreateBtn:B.a.HideCreateBtn},"Create budget")),i.a.createElement("p",{className:w?B.a.ShowErr:B.a.HideErr},D))})),E=a(130),N=a.n(E),C=a(99).a.CanvasJSChart,p=Object(d.b)((function(e){return{budget:e.budget.budget}}))((function(e){var t=0,a=0;e.budget.forEach((function(e){t+=Number(e.budget),a+=Number(e.budget-e.remaining)}));var n=(a/t*100).toFixed(2);n>1e3&&(n="over 1000");var r=[{name:"Total Spent",y:a,color:"rgb(18, 152, 189)"}];"over 1000"!==n&&r.push({name:"Remaining Budget",y:Number(t-a),color:"rgb(26, 171, 152)"});var u={animationEnabled:!0,data:[{type:"doughnut",dataPoints:r}]};return"Small"===e.mode&&(u.height=200,u.width=200),i.a.createElement("div",{className:"Small"===e.mode?N.a.SmallChartContainer:N.a.ChartContainer},i.a.createElement(C,{options:u}),i.a.createElement("div",{className:N.a.Block}),i.a.createElement("h1",null,"You've reached ",n,"% of your budget this month"))})),O=a(15),w=a(131),S=a.n(w),P=a(92),y=Object(d.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setNewBudget:function(t){return e(s.q(t))},setBudget:function(t){return e(s.n(t))},deleteBudget:function(){return e(s.g())},addNotif:function(t){return e(s.b(t))}}}))((function(e){var t=Object(c.useState)([]),a=Object(u.a)(t,2),l=a[0],o=a[1],d=Object(c.useState)(!1),s=Object(u.a)(d,2),g=s[0],m=s[1],B=Object(c.useState)(""),v=Object(u.a)(B,2),h=v[0],E=v[1],N=Object(c.useRef)();Object(c.useEffect)((function(){return e.show&&(o(e.budget.map((function(e){return Object(n.a)({},e,{id:Object(P.a)()})}))),document.addEventListener("mousedown",C)),function(){return document.removeEventListener("mousedown",C)}}),[e.show,e.budget]);var C=function(e){N.current.contains(e.target)||p()},p=function(){O(!1),o([]),e.close()},O=function(e){if(e)return m(!0),E("Error connecting to the server.");m(!1),E("")},w=function(){e.setBudget(Object(r.a)(l)),e.addNotif("Budget updated"),p()},y=function(){e.deleteBudget(),e.addNotif("Budget deleted"),p()};return i.a.createElement("div",{className:e.show?S.a.Panel:S.a.HidePanel,ref:N},i.a.createElement("div",{className:S.a.BtnDiv},i.a.createElement(_.a,{close:p})),i.a.createElement("div",{className:S.a.Budgets},l.map((function(e){return i.a.createElement("div",{key:e.id},i.a.createElement(b.a,{val:e.category,change:function(t){return function(e,t){m(!1),o(l.map((function(a){return a.id===t?Object(n.a)({},a,{category:e}):a})))}(t,e.id)}}),i.a.createElement(b.b,{val:e.budget,change:function(t){return function(e,t){m(!1),o(l.map((function(a){return a.id===t?Object(n.a)({},a,{budget:e}):a})))}(t,e.id)}}),i.a.createElement(_.a,{close:function(){return t=e.id,void o(l.filter((function(e){return e.id!==t})));var t}}))})),i.a.createElement("div",{className:S.a.BtnDiv2},i.a.createElement("button",{className:S.a.AddBtn,onClick:function(){o(l.concat({category:"",budget:0,transactions:[]}))}},"Add a new category"))),i.a.createElement("button",{onClick:function(){if(m(!1),function(){if(!l.length)return m(!0),E("You need to have at least one category."),!1;if(new Set(l.map((function(e){return e.category}))).size!==l.length)return m(!0),E("You cannot have categories with the same names."),!1;for(var e=0;e<l.length;e++){if(0===l[e].budget)return m(!0),E("Budget values cannot be zero."),!1;if(""===l[e].category)return m(!0),E("Category names cannot be empty."),!1}return!0}())return e.isDemo?w():void f.b.put("budgets",{budgets:l}).then((function(e){w()})).catch((function(e){O(!0)}))},className:S.a.ConfirmBtn},"Confirm"),i.a.createElement("p",{className:g?S.a.ShowErr:S.a.HideErr},h),i.a.createElement("button",{className:S.a.DeleteBtn,onClick:function(){if(m(!1),e.isDemo)return y();f.b.delete("budgets").then((function(e){y()})).catch((function(e){O(!0)}))}},"Delete Budget"))})),D=a(113);t.default=Object(d.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo}}),(function(e){return{setBudget:function(t){return e(s.n(t))},addNotif:function(t){return e(s.b(t))}}}))((function(e){var t=Object(c.useState)(!1),a=Object(u.a)(t,2),l=a[0],d=a[1],s=Object(c.useState)(!1),g=Object(u.a)(s,2),m=g[0],B=g[1],E=Object(c.useState)([]),N=Object(u.a)(E,2),C=N[0],w=N[1],S=Object(c.useState)(""),P=Object(u.a)(S,2),j=P[0],T=P[1],x=Object(c.useState)(""),H=Object(u.a)(x,2),k=H[0],A=H[1],I=Object(c.useState)(""),F=Object(u.a)(I,2),R=F[0],V=F[1],z=function(){if(""!==R&&0!==R&&""!==k){var t=e.budget.map((function(e,t){if(e.category===j){var a=Object(r.a)(e.transactions);return 20===a.length&&a.pop(),a.unshift({desc:k,val:R,date:String(new Date)}),Object(n.a)({},e,{transactions:a})}return e}));if(e.isDemo)return T(""),e.addNotif("Transaction Added"),e.setBudget(t);f.b.put("budgets",{budgets:t}).then((function(a){T(""),e.addNotif("Transaction Added"),e.setBudget(t)})).catch((function(e){console.log(e)}))}};return i.a.createElement("div",{className:o.a.Container},i.a.createElement("div",{className:o.a.OuterContent},i.a.createElement("h1",{className:o.a.Title},"Budgeting"),e.budget.length>0?i.a.createElement("div",{className:o.a.Content},i.a.createElement("div",{className:o.a.LeftContent},i.a.createElement(p,{mode:"Normal"}),i.a.createElement("div",{className:o.a.Btns},i.a.createElement(v.a,{big:!0,noMargin:!0,clicked:function(){return B(!0)}},"Edit Budget"),i.a.createElement(y,{show:m,close:function(){return B(!1)}}))),i.a.createElement("div",{className:o.a.Budget},e.budget.map((function(e,t){return i.a.createElement("div",{className:o.a.BudgetDiv,key:t},i.a.createElement("div",{className:o.a.InnerBudgetDiv},i.a.createElement(D.a,{budget:e}),i.a.createElement("div",null,i.a.createElement("button",{className:o.a.ShowBtn,onClick:function(){return function(e){if(-1===C.findIndex((function(t){return t===e})))return w(C.concat([e]));w(C.filter((function(t){return t!==e})))}(e.category)}},"Transactions",i.a.createElement("span",{className:C.includes(e.category)?o.a.CaretDown:o.a.CaretRight},O.b)),i.a.createElement("button",{className:o.a.AddBtn,onClick:function(){return t=e.category,A(""),V(""),void T(t);var t}},"Add Transaction"))),i.a.createElement("div",{className:C.includes(e.category)?o.a.Transactions:o.a.HideTransactions},e.transactions.map((function(e,t){var a=new Date(e.date).toJSON().slice(0,10).split("-"),n=[a[1],a[2],a[0].slice(2)].join("/");return i.a.createElement("div",{className:o.a.Transaction,key:t},i.a.createElement("div",null,e.desc),i.a.createElement("div",null,"$",Number(e.val).toFixed(2)),i.a.createElement("div",null,n))}))),i.a.createElement("div",{className:j===e.category?o.a.ShowAddTrans:o.a.HideAddTrans},i.a.createElement(b.a,{val:k,change:function(e){return A(e)},ph:"Transaction Description"}),i.a.createElement(b.b,{val:R,change:function(e){return V(e)},ph:"Cost"}),i.a.createElement("div",{className:o.a.BtnDiv},i.a.createElement(v.a,{big:!0,noMargin:!0,clicked:z},"Add"),i.a.createElement(_.a,{budget:!0,close:function(){return T("")}}))))})))):i.a.createElement("div",{className:o.a.NewDiv},i.a.createElement(v.a,{big:!0,noMargin:!0,clicked:function(){return d(!0)}},"Create a new budget"),i.a.createElement(h,{show:l,close:function(){return d(!1)}}))))}))},94:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return l}));var n=a(0),r=a.n(n),u=a(98),c=a.n(u),i=function(e){return r.a.createElement("input",{value:e.val,onChange:function(t){return e.change(t.target.value)},className:c.a.Input,placeholder:e.ph})},l=function(e){return r.a.createElement("input",{value:e.val,onChange:function(t){var a=t.target.value;isNaN(a)||(2===a.length&&"0"===a.charAt(0)&&"."!==a.charAt(1)&&(a=a.slice(1)),""===a&&(a=0),e.change(a))},className:c.a.Input,placeholder:e.ph})}},95:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(97),c=a.n(u),i=a(15);t.a=function(e){return r.a.createElement("button",{className:e.budget?c.a.CloseBudgetBtn:c.a.CloseBtn,onClick:e.close},r.a.createElement("span",{className:c.a.Icon},i.h))}},96:function(e,t,a){"use strict";var n=a(0),r=a.n(n),u=a(100),c=a.n(u);t.a=function(e){return r.a.createElement("button",{className:e.big?e.noMargin?c.a.NoBigBtn:c.a.BigBtn:c.a.Btn,onClick:e.clicked},e.children)}},97:function(e,t,a){e.exports={Icon:"CloseBtn_Icon__2kCvJ",CloseBtn:"CloseBtn_CloseBtn__2xpN8",CloseBudgetBtn:"CloseBtn_CloseBudgetBtn__21m8o"}},98:function(e,t,a){e.exports={Input:"Inputs_Input__1d94w"}}}]);
//# sourceMappingURL=5.30bc7206.chunk.js.map