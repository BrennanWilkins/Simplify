(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{107:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(112),l=a.n(c);t.a=function(e){return r.a.createElement("button",{type:e.isSubmit?"submit":"button",className:e.big?l.a.BigBtn:l.a.Btn,onClick:e.clicked},e.children)}},109:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.allow&&e.submit()}},e.children)}},110:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return c}));var n=function(e){return["0"===(e=e.split("-"))[1].charAt(0)?e[1].slice(1):e[1],"0"===e[2].charAt(0)?e[2].slice(1):e[2],e[0]===String((new Date).getFullYear())?e[0].slice(2):e[0]].join("/")},r=function(e){var t=e.getFullYear(),a=""+(e.getMonth()+1);a.length<2&&(a="0"+a);var n=""+e.getDate();return n.length<2&&(n="0"+n),[t,a,n].join("-")},c=function(e){var t=""+e.getFullYear();return"2020"===t&&(t="20"),[""+(e.getMonth()+1),""+e.getDate(),t].join("/")}},112:function(e,t,a){e.exports={BigBtn:"GreenBtn_BigBtn__1RpQc",Btn:"GreenBtn_Btn__2UGmh"}},113:function(e,t){(function(t){e.exports=t}).call(this,{})},119:function(e,t,a){"use strict";var n=a(3),r=a(0),c=a.n(r),l=a(120),o=a.n(l),u=a(106);t.a=function(e){var t=Object(r.useState)(0),a=Object(n.a)(t,2),l=a[0],d=a[1],i=Object(r.useState)(""),s=Object(n.a)(i,2),g=s[0],m=s[1],_=Object(r.useState)(88),b=Object(n.a)(_,2),f=b[0],B=b[1];return Object(r.useEffect)((function(){var t=(e.budget.budget-e.budget.remaining)/e.budget.budget*304;t>304&&(t=304),e.small&&(t=(e.budget.budget-e.budget.remaining)/e.budget.budget*152)>152&&(t=152);var a=e.budget.budget-e.budget.remaining;a=a>999999999?"":"$"+Object(u.a)(a);var n=(304-t)/2+t-64;d(t),m(a),B(n)}),[e.budget,e.small]),c.a.createElement("div",{className:e.small?e.darkMode?"".concat(o.a.SmallBar," ").concat(o.a.Dark):o.a.SmallBar:e.darkMode?"".concat(o.a.Bar," ").concat(o.a.Dark):o.a.Bar},c.a.createElement("span",{className:e.small?o.a.SmallCategory:o.a.Category},e.budget.category),c.a.createElement("div",{className:o.a.OvalContainer},c.a.createElement("div",{className:e.small?o.a.SmallOval:o.a.Oval},c.a.createElement("div",{className:e.small?o.a.SmallOverlay:o.a.Overlay,style:{width:"".concat(l,"px")}},c.a.createElement("span",{className:e.small?l<70?o.a.SmallShowRight:o.a.SmallOverlaySpan:l<140?o.a.ShowRight:o.a.OverlaySpan},g),!e.small&&c.a.createElement("div",{className:e.budget.remaining<=0?o.a.Hide:o.a.Remaining,style:{left:"".concat(f,"px")}},"$",Object(u.a)(e.budget.remaining)," remaining"))),!e.small&&c.a.createElement("div",{className:o.a.Overlay2,style:{width:"".concat(l,"px")}})),c.a.createElement("span",{className:e.small?o.a.SmallBudgetVal:o.a.BudgetVal},"$",Object(u.a)(e.budget.budget)))}},120:function(e,t,a){e.exports={Bar:"BudgetBars_Bar__25AEI",SmallBar:"BudgetBars_SmallBar__13JoK",Category:"BudgetBars_Category__31ie1",SmallCategory:"BudgetBars_SmallCategory__3BVX4",Dark:"BudgetBars_Dark__Ob_N4",Oval:"BudgetBars_Oval__3KSoF",SmallOval:"BudgetBars_SmallOval__1esgz",Overlay:"BudgetBars_Overlay__2rZu2",SmallOverlay:"BudgetBars_SmallOverlay__2DI2K",OverlaySpan:"BudgetBars_OverlaySpan__1tGrY",SmallOverlaySpan:"BudgetBars_SmallOverlaySpan__HHn-o",ShowRight:"BudgetBars_ShowRight__3anwZ",SmallShowRight:"BudgetBars_SmallShowRight__Z_fJV",BudgetVal:"BudgetBars_BudgetVal__1jaTn",SmallBudgetVal:"BudgetBars_SmallBudgetVal__fAg45",Overlay2:"BudgetBars_Overlay2__qs7w0",Remaining:"BudgetBars_Remaining__1F9Sn",Hide:"BudgetBars_Hide__1P2Ps",OvalContainer:"BudgetBars_OvalContainer__1vEpg"}},121:function(e,t,a){"use strict";var n=a(3),r=a(0),c=a.n(r),l=a(122),o=a.n(l),u=a(34),d=a(32),i=a(33),s=a(24),g=a(15);t.a=Object(g.b)((function(e){return{dark:e.theme.darkMode}}))((function(e){var t=Object(r.useState)(""),a=Object(n.a)(t,2),l=a[0],g=a[1],m=Object(r.useRef)();Object(r.useEffect)((function(){e.show&&m.current.focus()}),[e.show]);return c.a.createElement(s.a,{show:e.show,close:e.close},c.a.createElement("div",{className:"goal"===e.mode?e.show?o.a.GoalPanel:o.a.HideDown:e.showUp?e.show?o.a.PanelUp:o.a.HideUp:e.show?o.a.PanelDown:o.a.HideDown},c.a.createElement("div",{className:o.a.CloseBtn},c.a.createElement(u.a,{close:e.close})),c.a.createElement("p",{className:o.a.Title,style:e.dark?{color:"rgb(var(--light-blue3))"}:null},"Please type 'DELETE' to delete your ",e.mode,"."),c.a.createElement("div",{className:o.a.Input},c.a.createElement(d.b,{val:l,change:function(e){return g(e)},ref:m,dark2:e.dark})),c.a.createElement("div",{className:o.a.DeleteBtn},c.a.createElement(i.a,{clicked:function(){"DELETE"===l&&(g(""),e.delete())}},"Delete"))))}))},122:function(e,t,a){e.exports={PanelUp:"DeletePanel_PanelUp__14XQe",PanelDown:"DeletePanel_PanelDown__j6b4G",HideUp:"DeletePanel_HideUp__3cQxN",HideDown:"DeletePanel_HideDown__3WUE5",GoalPanel:"DeletePanel_GoalPanel__3onlR",HideGoalPanel:"DeletePanel_HideGoalPanel__BWA4R",Title:"DeletePanel_Title__h8wfy",CloseBtn:"DeletePanel_CloseBtn__2TGiN",DeleteBtn:"DeletePanel_DeleteBtn__3OtZY",Input:"DeletePanel_Input__pTJyM"}},123:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0),r=function(e){var t=Object(n.useRef)();return Object(n.useEffect)((function(){t.current=e}),[e]),t.current}},144:function(e,t,a){e.exports={OuterContainer:"BudgetPage_OuterContainer__3Fp0-",Container:"BudgetPage_Container__3SV0s",Content:"BudgetPage_Content__3pKcc",Budget:"BudgetPage_Budget__14YCt",NewDiv:"BudgetPage_NewDiv__23T2w",CreateBtn:"BudgetPage_CreateBtn__32hCL",Options:"BudgetPage_Options__2TiLL",Btn:"BudgetPage_Btn__ZugOf",Title:"BudgetPage_Title__22hdV",BudgetDiv:"BudgetPage_BudgetDiv__15Fx5",ShowBtn:"BudgetPage_ShowBtn__ljfaY",Dark:"BudgetPage_Dark__2s880",AddBtn:"BudgetPage_AddBtn__13sgH",CaretDown:"BudgetPage_CaretDown__2qc53",CaretRight:"BudgetPage_CaretRight__3-nAE",Transactions:"BudgetPage_Transactions__2sTYo",HideTransactions:"BudgetPage_HideTransactions__2bhxj",Transaction:"BudgetPage_Transaction__3N8M3",TotalBudget:"BudgetPage_TotalBudget__pER0i",Btns:"BudgetPage_Btns__15Iup"}},145:function(e,t,a){e.exports={Panel:"NewBudgetPanel_Panel__ft-O6",HidePanel:"NewBudgetPanel_HidePanel__1kNVN",Field:"NewBudgetPanel_Field__2vOFP",InputDiv:"NewBudgetPanel_InputDiv__3wgts",AddBtn:"NewBudgetPanel_AddBtn__2e88A",CreateBtn:"NewBudgetPanel_CreateBtn__2zSvL",HideCreateBtn:"NewBudgetPanel_HideCreateBtn__JbRHG",Entries:"NewBudgetPanel_Entries__1sPqn",Text:"NewBudgetPanel_Text__VsC77",ShowErr:"NewBudgetPanel_ShowErr__1rt_v",HideErr:"NewBudgetPanel_HideErr__XUq48"}},146:function(e,t,a){e.exports={PanelUp:"EditBudgetPanel_PanelUp__3AgME",HidePanelUp:"EditBudgetPanel_HidePanelUp__37nfl",PanelDown:"EditBudgetPanel_PanelDown__1iH3H",HidePanelDown:"EditBudgetPanel_HidePanelDown__21Pqq",Budgets:"EditBudgetPanel_Budgets__1l5lk",Budget:"EditBudgetPanel_Budget__3kLEy",ConfirmBtn:"EditBudgetPanel_ConfirmBtn__3w2Fy",AddBtn:"EditBudgetPanel_AddBtn__1RiCf",ShowErr:"EditBudgetPanel_ShowErr__26SMT",HideErr:"EditBudgetPanel_HideErr__3hG40"}},147:function(e,t,a){e.exports={Btn:"TrashBtn_Btn__1FsP3",DarkBtn:"TrashBtn_DarkBtn__3y2Lu"}},148:function(e,t,a){e.exports={ShowAddTrans:"AddTrans_ShowAddTrans__16Ycs",HideAddTrans:"AddTrans_HideAddTrans__2ONQD",ConfirmBtn:"AddTrans_ConfirmBtn__2ZxUF",CostInput:"AddTrans_CostInput__1ZXHA"}},149:function(e,t,a){e.exports={Charts:"ChartContainer_Charts__8daXs",HideCharts:"ChartContainer_HideCharts__3Co_0",Chart:"ChartContainer_Chart__1_z4P",CaretDown:"ChartContainer_CaretDown__3ZD4a",CaretRight:"ChartContainer_CaretRight__3OLoj",Btn:"ChartContainer_Btn__2BqhE",DarkBtn:"ChartContainer_DarkBtn__17yKe"}},150:function(e,t,a){e.exports={ChartContainer:"BudgetChart_ChartContainer__2vWo2"}},151:function(e,t,a){e.exports={ChartContainer:"CategChart_ChartContainer__3n6D5"}},185:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(10),c=a(22),l=a(3),o=a(0),u=a.n(o),d=a(144),i=a.n(d),s=a(15),g=a(16),m=a(145),_=a.n(m),b=a(34),f=a(14),B=a(33),h=a(107),v=a(32),E=a(24),O=a(106),C=Object(s.b)((function(e){return{isDemo:e.auth.isDemo,dark:e.theme.darkMode}}),(function(e){return{setNewBudget:function(t){return e(g.y(t))},addNotif:function(t){return e(g.d(t))}}}))((function(e){var t=Object(o.useState)(""),a=Object(l.a)(t,2),n=a[0],d=a[1],i=Object(o.useState)(0),s=Object(l.a)(i,2),g=s[0],m=s[1],C=Object(o.useState)([]),p=Object(l.a)(C,2),w=p[0],N=p[1],y=Object(o.useState)(!1),P=Object(l.a)(y,2),k=P[0],j=P[1],D=Object(o.useState)(""),S=Object(l.a)(D,2),T=S[0],H=S[1],A=function(){d(""),m(0),N([]),j(!1),H(""),e.close()};return u.a.createElement(E.a,{show:e.show,close:A},u.a.createElement("div",{className:e.show?_.a.Panel:_.a.HidePanel},u.a.createElement(b.a,{close:A}),u.a.createElement("div",{className:_.a.InputDiv,style:e.dark?{color:"rgb(var(--light-blue3))"}:null},u.a.createElement("div",{className:_.a.Field},u.a.createElement("p",{className:_.a.Text},"Category"),u.a.createElement(v.b,{val:n,change:function(e){e.length>100||(j(!1),d(e))},dark2:e.dark})),u.a.createElement("div",{className:_.a.Field},u.a.createElement("p",{className:_.a.Text},"Monthly budget"),u.a.createElement(v.c,{val:g,change:function(e){j(!1),m(e)},dark2:e.dark}))),u.a.createElement("div",{className:_.a.AddBtn},u.a.createElement(B.a,{clicked:function(){var e=function(){if(""===n)return"The category name cannot be empty.";if(n.length>70)return"Your category name is too long.";if(0===g||g>999999999)return"Please enter a valid budget value.";var e,t=Object(c.a)(w);try{for(t.s();!(e=t.n()).done;){if(e.value.category===n)return"You already have a category with that name."}}catch(k){t.e(k)}finally{t.f()}return""}();if(""!==e)return j(!0),H(e);N([].concat(Object(r.a)(w),[{category:n,budget:g}])),d(""),m(0)}},"Add category")),u.a.createElement("div",{className:_.a.Entries},w.map((function(t,a){return u.a.createElement("div",{key:a,style:e.dark?{color:"rgb(var(--light-blue3))"}:null},u.a.createElement("span",null,t.category),u.a.createElement("span",null,"$",Object(O.a)(t.budget)))}))),u.a.createElement("div",{className:w.length?_.a.CreateBtn:_.a.HideCreateBtn},u.a.createElement(h.a,{clicked:function(){if(e.isDemo)return e.setNewBudget(w),e.addNotif("Budget created"),A();f.b.post("budgets",{budgets:w}).then((function(t){e.setNewBudget(w),e.addNotif("Budget created"),A()})).catch((function(e){j(!0),H("Error connecting to the server.")}))}},"Create budget")),u.a.createElement("p",{className:k?_.a.ShowErr:_.a.HideErr,style:e.dark?{color:"rgb(var(--light-blue3))"}:null},T)))})),p=a(9),w=a(146),N=a.n(w),y=a(104),P=a(147),k=a.n(P),j=function(e){return u.a.createElement("button",{className:e.dark?k.a.DarkBtn:k.a.Btn,onClick:e.clicked},p.u)},D=Object(s.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo,dark:e.theme.darkMode}}),(function(e){return{setNewBudget:function(t){return e(g.y(t))},setBudget:function(t){return e(g.u(t))},addNotif:function(t){return e(g.d(t))}}}))((function(e){var t=Object(o.useState)([]),a=Object(l.a)(t,2),c=a[0],d=a[1],i=Object(o.useState)(!1),s=Object(l.a)(i,2),g=s[0],m=s[1],_=Object(o.useState)(""),O=Object(l.a)(_,2),C=O[0],w=O[1];Object(o.useEffect)((function(){e.show&&d(e.budget.map((function(e){return Object(n.a)({},e,{id:Object(y.a)()})})))}),[e.show,e.budget]);var P=function(){k(!1),d([]),e.close()},k=function(e){if(e)return m(!0),w("Error connecting to the server.");m(!1),w("")},D=function(t){e.setBudget(Object(r.a)(t)),e.addNotif("Budget updated"),P()};return u.a.createElement(E.a,{show:e.show,close:P},u.a.createElement("div",{className:e.showUp?e.show?N.a.PanelUp:N.a.HidePanelUp:e.show?N.a.PanelDown:N.a.HidePanelDown},u.a.createElement("div",null,u.a.createElement(b.a,{close:P})),u.a.createElement("div",{className:N.a.Budgets},c.map((function(t){return u.a.createElement("div",{key:t.id,className:e.dark?null:N.a.Budget},u.a.createElement(v.b,{val:t.category,change:function(e){return function(e,t){m(!1),d(c.map((function(a){return a.id===t?Object(n.a)({},a,{category:e}):a})))}(e,t.id)},dark2:e.dark}),u.a.createElement(v.c,{val:t.budget,change:function(e){return function(e,t){m(!1),d(c.map((function(a){return a.id===t?Object(n.a)({},a,{budget:e}):a})))}(e,t.id)},dark2:e.dark}),u.a.createElement(j,{clicked:function(){return e=t.id,void d(c.filter((function(t){return t.id!==e})));var e},dark:e.dark}))})),u.a.createElement("div",{className:N.a.AddBtn},u.a.createElement(B.a,{clicked:function(){d(c.concat({category:"",budget:0,transactions:[],id:Object(y.a)()}))}},p.p,"Add a new category"))),u.a.createElement("div",{className:N.a.ConfirmBtn},u.a.createElement(h.a,{big:!0,clicked:function(){m(!1);var t=function(){if(!c.length)return"You need to have at least one category.";for(var e=0;e<c.length;e++){if(0===c[e].budget)return"Budget values cannot be zero.";if(c[e].budget>999999999)return"One of your budgets is too high.";if(""===c[e].category)return"Category names cannot be empty.";if(c[e].category.length>70)return"One of your category names is too long."}return new Set(c.map((function(e){return e.category}))).size!==c.length?"You cannot have categories with the same names.":""}();if(""!==t)return m(!0),w(t);var a=Object(r.a)(c);if(a.forEach((function(e){return delete e.id})),e.isDemo)return D(a);f.b.put("budgets",{budgets:a}).then((function(e){D(a)})).catch((function(e){k(!0)}))}},"Confirm")),u.a.createElement("p",{className:g?N.a.ShowErr:N.a.HideErr,style:e.dark?{color:"rgb(var(--light-blue3))"}:null},C)))})),S=a(119),T=a(121),H=a(110),A=a(148),x=a.n(A),M=a(109),R=function(e){var t=Object(o.useRef)();return Object(o.useEffect)((function(){e.show&&setTimeout((function(){return t.current.focus()}),300)}),[e.show]),u.a.createElement(E.a,{close:e.close,show:e.show},u.a.createElement(M.a,{allow:e.show,submit:e.confirm},u.a.createElement("div",{className:e.show?x.a.ShowAddTrans:x.a.HideAddTrans},u.a.createElement(v.b,{val:e.transDesc,change:e.changeDesc,ph:"Transaction Description",ref:t,dark:e.darkMode}),u.a.createElement("div",{className:x.a.CostInput},u.a.createElement(v.c,{val:e.transCost,change:e.changeCost,ph:"Cost",dark:e.darkMode})),u.a.createElement("div",{className:x.a.ConfirmBtn},u.a.createElement(B.a,{big:!0,isSubmit:!0},"Add")))))},F=a(149),U=a.n(F),Y=a(150),G=a.n(Y),I=a(108),L=Object(s.b)((function(e){return{budget:e.budget.budget,darkMode:e.theme.darkMode}}))((function(e){var t=0,a=0;e.budget.forEach((function(e){t+=Number(e.budget),a+=Number(e.budget-e.remaining)}));var n=(a/t*100).toFixed(2);n>1e3&&(n="over 1000");var r=[{name:"Total Spent",y:Number(a).toFixed(2),color:"rgb(18, 152, 189)"}];"over 1000"!==n&&r.push({name:"Remaining Budget",y:Number(t-a).toFixed(2),color:"rgb(26, 171, 152)"});var c={backgroundColor:"transparent",data:[{type:"doughnut",dataPoints:r,toolTipContent:"{name}: ${y}"}]};return u.a.createElement("div",{className:G.a.ChartContainer},u.a.createElement(I.b,{options:c,darkMode:e.darkMode}),u.a.createElement("h1",null,"You've reached ",n,"% of your budget this month"))})),V=a(151),Z=a.n(V),$=Object(s.b)((function(e){return{budget:e.budget.budget,darkMode:e.theme.darkMode}}))((function(e){var t,a=["#29b6f6","#03a9f4","#039be5","#0288d1","#0277bd","#01579b"],n=0,r=Object(c.a)(e.budget);try{for(r.s();!(t=r.n()).done;){var l=t.value;n+=Number(l.budget)}}catch(d){r.e(d)}finally{r.f()}var o={backgroundColor:"transparent",data:[{type:"pie",toolTipContent:"{label}: {y}% (${val})",indexLabel:"{y}%",indexLabelFontWeight:"bold",indexLabelPlacement:"inside",dataPoints:e.budget.map((function(e,t){return{label:e.category,y:(e.budget/n*100).toFixed(2),val:Number(e.budget).toFixed(2),color:a[t%6]}}))}]};return u.a.createElement("div",{className:Z.a.ChartContainer},u.a.createElement(I.b,{options:o,darkMode:e.darkMode}))})),q=a(123),J=function(e){var t=Object(q.a)(e.show),a=Object(o.useState)(!0),n=Object(l.a)(a,2),r=n[0],c=n[1];return Object(o.useEffect)((function(){!t&&e.show&&c((function(e){return!e}))}),[e.show,t]),u.a.createElement("div",{className:e.show?U.a.Charts:U.a.HideCharts},u.a.createElement("div",{className:U.a.Chart},u.a.createElement(L,{key:r})),u.a.createElement("div",{className:U.a.Chart},u.a.createElement($,{key:r})),u.a.createElement("div",{className:e.darkMode?"".concat(U.a.Btn," ").concat(U.a.DarkBtn):U.a.Btn},u.a.createElement("button",{onClick:e.change},e.show?"Hide Charts":"Show Charts",u.a.createElement("span",{className:e.show?U.a.CaretDown:U.a.CaretRight},p.d))))};t.default=Object(s.b)((function(e){return{budget:e.budget.budget,isDemo:e.auth.isDemo,darkMode:e.theme.darkMode}}),(function(e){return{setBudget:function(t){return e(g.u(t))},addNotif:function(t){return e(g.d(t))},deleteBudget:function(){return e(g.i())}}}))((function(e){var t=Object(o.useState)(!1),a=Object(l.a)(t,2),d=a[0],s=a[1],g=Object(o.useState)(!1),m=Object(l.a)(g,2),_=m[0],b=m[1],v=Object(o.useState)(!1),E=Object(l.a)(v,2),w=E[0],N=E[1],y=Object(o.useState)([]),P=Object(l.a)(y,2),k=P[0],j=P[1],A=Object(o.useState)(""),x=Object(l.a)(A,2),M=x[0],F=x[1],U=Object(o.useState)(""),Y=Object(l.a)(U,2),G=Y[0],I=Y[1],L=Object(o.useState)(""),V=Object(l.a)(L,2),Z=V[0],$=V[1],q=Object(o.useState)(!0),z=Object(l.a)(q,2),K=z[0],X=z[1],Q=Object(o.useState)(0),W=Object(l.a)(Q,2),ee=W[0],te=W[1];Object(o.useEffect)((function(){var t,a=0,n=Object(c.a)(e.budget);try{for(n.s();!(t=n.n()).done;){var r=t.value;a+=Number(r.budget)}}catch(l){n.e(l)}finally{n.f()}te(a)}),[e.budget]);var ae=function(){if(!(""===Z||0===Z||""===G||Z>999999999||G.length>70)){var t=e.budget.map((function(e,t){if(e.category===M){var a=Object(r.a)(e.transactions);return 20===a.length&&a.pop(),a.unshift({desc:G,val:Z,date:String(new Date)}),Object(n.a)({},e,{transactions:a})}return e}));if(e.isDemo)return F(""),e.addNotif("Transaction Added"),e.setBudget(t);f.b.put("budgets",{budgets:t}).then((function(a){F(""),e.addNotif("Transaction Added"),e.setBudget(t)})).catch((function(e){console.log(e)}))}},ne=function(){e.deleteBudget(),e.addNotif("Budget deleted"),N(!1)};return u.a.createElement("div",{className:i.a.OuterContainer},u.a.createElement("div",{className:e.darkMode?"".concat(i.a.Container," ").concat(i.a.Dark):i.a.Container},u.a.createElement("div",{className:i.a.Content},u.a.createElement("h1",{className:i.a.Title},"Budgeting"),e.budget.length?u.a.createElement(u.a.Fragment,null,u.a.createElement(J,{show:K,change:function(){return X((function(e){return!e}))},darkMode:e.darkMode}),u.a.createElement("div",{className:i.a.Budget},u.a.createElement("h1",{className:i.a.TotalBudget},"Total monthly budget: $",Object(O.a)(ee)),u.a.createElement("div",{className:i.a.Options},u.a.createElement("div",{className:i.a.Btn},u.a.createElement(B.a,{big:!0,clicked:function(){return b(!0)}},p.m,"Edit Budget")),u.a.createElement("div",{className:i.a.Btn},u.a.createElement(B.a,{big:!0,clicked:function(){return N(!0)}},p.u,"Delete Budget")),u.a.createElement(D,{showUp:K,show:_,close:function(){return b(!1)}}),u.a.createElement(T.a,{showUp:K,show:w,mode:"budget",close:function(){return N(!1)},delete:function(){if(e.isDemo)return ne();f.b.delete("budgets").then((function(e){ne()})).catch((function(e){}))}})),e.budget.map((function(t,a){return u.a.createElement("div",{className:i.a.BudgetDiv,key:a},u.a.createElement(S.a,{budget:t,darkMode:e.darkMode}),u.a.createElement("div",{className:i.a.Btns},u.a.createElement("button",{className:i.a.ShowBtn,onClick:function(){return function(e){if(-1===k.findIndex((function(t){return t===e})))return j(k.concat([e]));j(k.filter((function(t){return t!==e})))}(t.category)}},"Transactions",u.a.createElement("span",{className:k.includes(t.category)?i.a.CaretDown:i.a.CaretRight},p.d)),u.a.createElement("span",{className:i.a.AddBtn},u.a.createElement(h.a,{big:!0,clicked:function(){return e=t.category,I(""),$(""),void F(e);var e}},p.p,"Add Transaction"))),u.a.createElement("div",{className:k.includes(t.category)?i.a.Transactions:i.a.HideTransactions},t.transactions.map((function(e,t){return u.a.createElement("div",{className:i.a.Transaction,style:0===t?{marginTop:"15px"}:null,key:t},u.a.createElement("div",null,e.desc),u.a.createElement("div",null,"$",Object(O.a)(e.val)),u.a.createElement("div",null,Object(H.c)(new Date(e.date))))}))),u.a.createElement(R,{show:M===t.category,transDesc:G,close:function(){return F("")},darkMode:e.darkMode,transCost:Z,confirm:ae,changeDesc:function(e){return I(e)},changeCost:function(e){return $(e)}}))})))):u.a.createElement("div",{className:i.a.NewDiv},u.a.createElement("div",{className:i.a.CreateBtn},u.a.createElement(B.a,{big:!0,clicked:function(){return s(!0)}},"Create a new budget")),u.a.createElement(C,{show:d,close:function(){return s(!1)}})))))}))}}]);
//# sourceMappingURL=7.3aae165a.chunk.js.map