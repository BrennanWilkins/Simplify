(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{1:function(e,t,a){"use strict";a.d(t,"j",(function(){return n})),a.d(t,"k",(function(){return r})),a.d(t,"t",(function(){return o})),a.d(t,"i",(function(){return c})),a.d(t,"f",(function(){return l})),a.d(t,"l",(function(){return i})),a.d(t,"h",(function(){return u})),a.d(t,"e",(function(){return s})),a.d(t,"q",(function(){return d})),a.d(t,"m",(function(){return m})),a.d(t,"s",(function(){return f})),a.d(t,"n",(function(){return v})),a.d(t,"b",(function(){return g})),a.d(t,"a",(function(){return p})),a.d(t,"d",(function(){return h})),a.d(t,"c",(function(){return b})),a.d(t,"u",(function(){return E})),a.d(t,"v",(function(){return _})),a.d(t,"p",(function(){return S})),a.d(t,"r",(function(){return N})),a.d(t,"o",(function(){return w})),a.d(t,"g",(function(){return O}));var n="LOGIN",r="LOGOUT",o="START_LOADING",c="END_LOADING",l="CREATE_ERROR",i="REMOVE_ERROR",u="DEMO_LOGIN",s="CREATE_DEMO_ERROR",d="SET_NET_WORTH_DATA",m="RESET_NET_WORTH",f="SET_PORTFOLIO",v="RESET_PORTFOLIO",g="ADD_STOCK",p="ADD_CRYPTO",h="CHANGE_STOCK",b="CHANGE_CRYPTO",E="UPDATE_ASSETS",_="UPDATE_DEBTS",S="SET_GOAL",N="SET_NEW_BUDGET",w="SET_BUDGET",O="DELETE_BUDGET"},11:function(e,t,a){e.exports={Title:"Title_Title__3qGai",AuthTitle:"Title_AuthTitle__AZIms",Bar1:"Title_Bar1__1HyJm",Bar2:"Title_Bar2__3-smX",Bar3:"Title_Bar3__3J6R2",Bar4:"Title_Bar4__1Rii8",Bars:"Title_Bars__bMFp1"}},14:function(e,t,a){"use strict";a.d(t,"h",(function(){return l})),a.d(t,"i",(function(){return i})),a.d(t,"c",(function(){return f})),a.d(t,"g",(function(){return v})),a.d(t,"n",(function(){return g})),a.d(t,"j",(function(){return p})),a.d(t,"p",(function(){return h})),a.d(t,"k",(function(){return b})),a.d(t,"a",(function(){return _})),a.d(t,"b",(function(){return E})),a.d(t,"e",(function(){return S})),a.d(t,"d",(function(){return N})),a.d(t,"q",(function(){return w})),a.d(t,"r",(function(){return O})),a.d(t,"m",(function(){return y})),a.d(t,"o",(function(){return D})),a.d(t,"l",(function(){return k})),a.d(t,"f",(function(){return j}));var n,r=a(1),o=a(15),c=a(20),l=function(){return function(e){n=setTimeout((function(){return e(i())}),Number(localStorage.expirationTime)),e({type:r.j})}},i=function(){return function(e){delete o.b.defaults.headers.common["x-auth-token"],localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("expirationTime"),clearTimeout(n),e({type:r.k}),e(b()),e(p()),e(y(null)),e(j()),e(s())}},u=function(){return{type:r.t}},s=function(){return{type:r.i}},d=function(){return{type:r.f}},m=function(){return{type:r.l}},f=function(){return function(e){if(localStorage.token&&localStorage.expirationDate){if(new Date(localStorage.expirationDate)<=new Date)return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),void localStorage.removeItem("expirationTime");e(u()),o.b.defaults.headers.common["x-auth-token"]=localStorage.token;var t=new Date(localStorage.expirationDate).getTime()-(new Date).getTime();localStorage.expirationTime=t,o.b.get("/auth/autoLogin").then((function(t){var a=Object(c.a)(t.data.netWorth.dataPoints,t.data.portfolio);o.b.put("netWorth",{netWorthData:a}).then((function(a){e(g(a.data.result.dataPoints)),e(h(Object(c.b)(t.data.portfolio))),t.data.goal&&e(y(t.data.goal)),t.data.budgets&&e(k(t.data.budgets)),e(s()),e(m()),e(l())})).catch((function(t){e(i()),e(s()),e(d())}))})).catch((function(t){e(i()),e(s()),e(d())}))}}},v=function(){return function(e){localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("expirationTime"),e(u());var t=function(){var e=new Date;e.setFullYear(2020,6,3);var t=new Date;t.setFullYear(2020,6,1);var a=new Date;a.setFullYear(2020,6,2);var n=new Date;n.setFullYear(2020,6,4);var r=new Date;r.setFullYear(2020,6,5);var o=new Date;o.setFullYear(2020,6,9);var c=new Date;c.setFullYear(2020,6,13);var l=new Date;l.setFullYear(2018,11,10);var i=new Date;i.setFullYear(2019,1,4);var u=new Date;u.setFullYear(2019,1,25);var s=new Date;s.setFullYear(2019,2,8);var d=new Date;d.setFullYear(2019,3,15);var m=new Date;m.setFullYear(2019,6,2);var f=new Date;f.setFullYear(2019,8,22);var v=new Date;v.setFullYear(2019,9,17);var g=new Date;g.setFullYear(2019,10,25);var p=new Date;p.setFullYear(2019,11,4);var h=new Date;h.setFullYear(2020,0,13);var b=new Date;b.setFullYear(2020,1,23);var E=new Date;E.setFullYear(2020,3,18);var _=new Date;_.setFullYear(2020,3,27);var S=new Date;S.setFullYear(2020,4,12);var N=new Date;N.setFullYear(2020,4,15);var w=new Date;w.setFullYear(2020,5,18);var O=new Date;O.setFullYear(2020,5,25);var y=new Date;y.setFullYear(2020,5,29);var D=new Date;D.setFullYear(2020,6,7);return{budget:[{transactions:[{desc:"Summer Trip",value:"100",date:String(e)}],category:"Travel",budget:150},{transactions:[{desc:"Concert",value:"150",date:String(t)},{desc:"Netflix",value:"10",date:String(a)},{desc:"Movie",value:"15",date:String(r)}],category:"Entertainment",budget:300},{transactions:[{desc:"Clothes",value:"50",date:String(n)}],category:"Shopping",budget:100},{transactions:[{desc:"Car Payment",value:"400",date:String(r)}],category:"Transportation",budget:500},{transactions:[{desc:"Gym Membership",value:"30",date:String(o)},{desc:"Haircut",value:"20",date:String(c)}],category:"Personal",budget:150},{transactions:[{desc:"Tuition Loan",value:"300",date:String(a)}],category:"Education",budget:400}],goal:5e5,netWorthData:[{date:String(l),value:1191.91},{date:String(i),value:2043.8},{date:String(u),value:4503.31},{date:String(s),value:10009.99},{date:String(d),value:15043.78},{date:String(m),value:21210.87},{date:String(f),value:34755.22},{date:String(v),value:42815.43},{date:String(g),value:40899.98},{date:String(p),value:62788.66},{date:String(h),value:67238.29},{date:String(b),value:75132.41},{date:String(E),value:80359.78},{date:String(_),value:100576.56},{date:String(S),value:120430.11},{date:String(N),value:145328.28},{date:String(w),value:157567.65},{date:String(O),value:190438.7},{date:String(y),value:211410.88},{date:String(D),value:230599.47}],portfolio:{cryptos:[{name:"Bitcoin",symbol:"BTC",quantity:3.05,identifier:"Normal"},{name:"Ethereum",symbol:"ETH",quantity:5.5,identifier:"Normal"},{name:"Litecoin",symbol:"LTC",quantity:10.33,identifier:"Normal"}],stocks:[{name:"Invesco QQQ Trust, Series 1",symbol:"QQQ",quantity:12,identifier:"Normal"},{name:"Alphabet Inc.",symbol:"GOOGL",quantity:5,identifier:"Normal"},{name:"Tesla, Inc.",symbol:"TSLA",quantity:1,identifier:"Normal"},{name:"Amazon.com, Inc.",symbol:"AMZN",quantity:1,identifier:"Normal"},{name:"Microsoft Corporation",symbol:"MSFT",quantity:3,identifier:"Normal"},{name:"Apple Inc.",symbol:"AAPL",quantity:2,identifier:"Normal"}],otherAssets:[{name:"Bank Accnt",desc:"Capital One Savings",value:3e4},{name:"Real Estate",desc:"My apartment #1",value:175e3}],liabilities:[{name:"Credit Card Debt",desc:"My credit card #1",value:3e3}],manualStocks:[],manualCryptos:[]}}}();o.b.post("/auth/demoLogin",{portfolio:t.portfolio}).then((function(a){var n=Object(c.a)(t.netWorthData,a.data.portfolio);e(g(n)),e(h(Object(c.b)(a.data.portfolio))),e(y(t.goal)),e(k(t.budget)),e(s()),e(m()),e({type:r.h})})).catch((function(t){e(s()),e({type:r.e})}))}},g=function(e){return{type:r.q,data:e}},p=function(){return{type:r.m}},h=function(e){return{type:r.s,data:e}},b=function(){return{type:r.n}},E=function(e){return{type:r.b,stock:e}},_=function(e){return{type:r.a,crypto:e}},S=function(e){return{type:r.d,stocks:e}},N=function(e){return{type:r.c,cryptos:e}},w=function(e){return{type:r.u,assets:e}},O=function(e){return{type:r.v,debts:e}},y=function(e){return{type:r.p,goal:e}},D=function(e){return{type:r.r,budget:e}},k=function(e){return{type:r.o,budget:e}},j=function(){return{type:r.g}}},15:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return c}));var n=a(35),r=a.n(n),o=r.a.create({baseURL:"https://simplify.herokuapp.com/api/auth/"}),c=r.a.create({baseURL:"https://simplify.herokuapp.com/api/"})},17:function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return c})),a.d(t,"a",(function(){return l})),a.d(t,"g",(function(){return i})),a.d(t,"f",(function(){return u})),a.d(t,"b",(function(){return s})),a.d(t,"e",(function(){return d}));var n=a(0),r=a.n(n),o=r.a.createElement("svg",{className:"bi bi-person-fill",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"})),c=r.a.createElement("svg",{className:"bi bi-lock-fill",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("rect",{width:"11",height:"9",x:"2.5",y:"7",rx:"2"}),r.a.createElement("path",{fillRule:"evenodd",d:"M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"})),l=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-arrow-right-short",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"})),i=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-x",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"})),u=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-gear-fill",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"})),s=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-caret-right-fill",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"})),d=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-question-circle",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),r.a.createElement("path",{d:"M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"}))},20:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"a",(function(){return l}));var n=a(27),r=a(2),o=a(18),c=function(e){var t=Object(o.a)(e.cryptos).map((function(e){return"?"===e.price?Object(r.a)({},e,{value:"?"}):"Manual"===e.identifier?e:Object(r.a)({},e,{value:e.price*e.quantity})})),a=Object(o.a)(e.stocks).map((function(e){return"?"===e.price?Object(r.a)({},e,{value:"?"}):"Manual"===e.identifier?e:Object(r.a)({},e,{value:e.price*e.quantity})}));return Object(r.a)({},e,{stocks:a,cryptos:t})},l=function(e,t){var a,r=c(t),l=Object(o.a)(e),i=0,u=Object(n.a)(r.stocks);try{for(u.s();!(a=u.n()).done;){var s=a.value;"?"!==s.value&&(i+=Number(s.value))}}catch(_){u.e(_)}finally{u.f()}var d,m=Object(n.a)(r.cryptos);try{for(m.s();!(d=m.n()).done;){var f=d.value;"?"!==f.value&&(i+=Number(f.value))}}catch(_){m.e(_)}finally{m.f()}var v,g=Object(n.a)(r.otherAssets);try{for(g.s();!(v=g.n()).done;){var p=v.value;i+=Number(p.value)}}catch(_){g.e(_)}finally{g.f()}var h,b=Object(n.a)(r.liabilities);try{for(b.s();!(h=b.n()).done;){var E=h.value;i-=Number(E.value)}}catch(_){b.e(_)}finally{b.f()}return Math.abs((new Date).getTime()-new Date(e[e.length-1].date).getTime())>=864e5?l.push({date:new Date,value:i}):l[e.length-1].value=i,l}},22:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(30),c=a.n(o);t.a=function(e){return r.a.createElement("div",{className:"Login"===e.mode?c.a.LoginLoader:"Signup"===e.mode?c.a.SignupLoader:"Search"===e.mode?c.a.SearchLoader:c.a.Loader})}},25:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(11),c=a.n(o),l=a(5);t.a=function(e){return r.a.createElement("div",null,e.auth?r.a.createElement("div",{className:c.a.AuthTitle},r.a.createElement("div",{className:c.a.Bars},r.a.createElement("div",{className:c.a.Bar1}),r.a.createElement("div",{className:c.a.Bar2}),r.a.createElement("div",{className:c.a.Bar3}),r.a.createElement("div",{className:c.a.Bar4})),r.a.createElement("h1",null,"Simplify")):r.a.createElement(l.b,{to:"/",className:c.a.Title},r.a.createElement("div",{className:c.a.Bars},r.a.createElement("div",{className:c.a.Bar1}),r.a.createElement("div",{className:c.a.Bar2}),r.a.createElement("div",{className:c.a.Bar3}),r.a.createElement("div",{className:c.a.Bar4})),r.a.createElement("h1",null,"Simplify")))}},30:function(e,t,a){e.exports={Loader:"Spinner_Loader__32i5Y",load4:"Spinner_load4__qrFle",LoginLoader:"Spinner_LoginLoader__2cR8S",SignupLoader:"Spinner_SignupLoader__2dzRO",SearchLoader:"Spinner_SearchLoader__3nm0D"}},4:function(e,t,a){e.exports={Container:"AuthPanel_Container__1fGxG",OuterContent:"AuthPanel_OuterContent__1_EmW",LoginPanel:"AuthPanel_LoginPanel__1F59V",SignupPanel:"AuthPanel_SignupPanel__2nKeC",Content:"AuthPanel_Content__278Pw",Demo:"AuthPanel_Demo__1eaov",SwitchAuth:"AuthPanel_SwitchAuth__36gBM",SubTitle:"AuthPanel_SubTitle__3Nric",InputDiv:"AuthPanel_InputDiv__1cTWg",InputDivFocus:"AuthPanel_InputDivFocus__2_GM1",Icon:"AuthPanel_Icon__GMUPw",Remember:"AuthPanel_Remember__pvM88",ErrDiv:"AuthPanel_ErrDiv__135tn",ErrMsgShow:"AuthPanel_ErrMsgShow__1MGID",ErrMsgHide:"AuthPanel_ErrMsgHide__MIuBG"}},55:function(e,t,a){e.exports={Error:"ErrorBoundary_Error__3bxVd"}},58:function(e,t,a){e.exports=a(85)},6:function(e,t,a){e.exports={NavBar:"NavBar_NavBar__3RuxN",Link:"NavBar_Link__3s8nl",LogoutLink:"NavBar_LogoutLink__-3Hge",FocusBorder:"NavBar_FocusBorder__3MSq7",LeftNavBar:"NavBar_LeftNavBar__1FdgP",SideToggle:"NavBar_SideToggle__1ifJ0",Backdrop:"NavBar_Backdrop__2teuq",HideBackdrop:"NavBar_HideBackdrop__2Nbb4",QuestionIcon:"NavBar_QuestionIcon__2-ySy"}},63:function(e,t,a){},7:function(e,t,a){e.exports={SideNav:"SideNav_SideNav__3Gdcf",HideSideNav:"SideNav_HideSideNav__3FAgC",Link:"SideNav_Link__29GsC",LogoutLink:"SideNav_LogoutLink__2cq9F",FocusBorder:"SideNav_FocusBorder__5CDk1",QuestionIcon:"SideNav_QuestionIcon__CspLl"}},85:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(31),c=a.n(o),l=(a(63),a(5)),i=a(21),u=a(12),s=a(4),d=a.n(s),m=a(22),f=a(17),v=function(e,t,a){return 0===e.length||0===t.length?"Email and Password cannot be empty.":/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)?t.length<8?"Password must be at least 8 characters.":t!==a?"Password and Confirm Password must be the same.":"":"Please enter a valid email."},g=a(15),p=a(19),h=a(14),b=a(20),E=a(25),_=Object(p.b)((function(e){return{loading:e.auth.loading,error:e.auth.error,demoError:e.auth.demoError}}),(function(e){return{login:function(){return e(h.h())},setNetWorthData:function(t){return e(h.n(t))},setPortfolio:function(t){return e(h.p(t))},setGoal:function(t){return e(h.m(t))},setBudget:function(t){return e(h.l(t))},loadDemo:function(){return e(h.g())}}}))((function(e){var t=Object(n.useState)(""),a=Object(u.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(""),s=Object(u.a)(i,2),p=s[0],h=s[1],_=Object(n.useState)(""),S=Object(u.a)(_,2),N=S[0],w=S[1],O=Object(n.useState)(!1),y=Object(u.a)(O,2),D=y[0],k=y[1],j=Object(n.useState)(""),L=Object(u.a)(j,2),B=L[0],T=L[1],A=Object(n.useState)(!1),C=Object(u.a)(A,2),F=C[0],P=C[1],x=Object(n.useState)(!1),I=Object(u.a)(x,2),R=I[0],M=I[1],Y=Object(n.useState)(""),G=Object(u.a)(Y,2),H=G[0],z=G[1];Object(n.useEffect)((function(){e.loading&&(k(!0),T("Retrieving current stock prices..."))}),[e.loading]),Object(n.useEffect)((function(){e.error&&(k(!0),T("There was an error logging in."))}),[e.error]),Object(n.useEffect)((function(){e.demoError&&(k(!0),T("There was an error loading the demo account."))}),[e.demoError]);var q=function(e){k(!0),P(!1),T(e)},W=function(){P(!0),k(!0),T("Retrieving current stock prices..."),g.a.post("login",{email:o,password:p,remember:R}).then((function(e){U(e.data)})).catch((function(e){if(e.response)return q(e.response.data.msg);q("There was an error logging in.")}))},Q=function(){P(!0),g.a.post("signup",{email:o,password:p,confirmPassword:N,remember:R}).then((function(e){U(e.data)})).catch((function(e){if(e.response)return q(e.response.data.msg);q("Error signing up.")}))},U=function(t){g.b.defaults.headers.common["x-auth-token"]=t.token,R?(localStorage.token=t.token,localStorage.expirationDate=new Date((new Date).getTime()+6048e5),localStorage.expirationTime="604800000"):(localStorage.token=t.token,localStorage.expirationDate=new Date((new Date).getTime()+36e5),localStorage.expirationTime="3600000");var a=Object(b.a)(t.netWorth.dataPoints,t.portfolio);"Login"===e.mode?g.b.put("netWorth",{netWorthData:a}).then((function(t){e.setNetWorthData(t.data.result.dataPoints)})).catch((function(e){k(!0),T("Error connecting to the server."),P(!1)})):e.setNetWorthData(t.netWorth.dataPoints),e.setPortfolio(Object(b.b)(t.portfolio)),t.goal&&e.setGoal(t.goal),t.budgets&&e.setBudget(t.budgets),V(),e.login()},V=function(){k(!1),T(""),c(""),h(""),w(""),M(!1),P(!1)};return r.a.createElement("div",{className:d.a.Container},r.a.createElement("div",{className:d.a.OuterContent},r.a.createElement("div",{className:"Login"===e.mode?d.a.LoginPanel:d.a.SignupPanel},(F||e.loading)&&r.a.createElement(m.a,{mode:e.mode}),r.a.createElement("div",{className:d.a.Content},r.a.createElement("div",{className:d.a.Demo,onClick:function(){V(),e.loadDemo()}},"View a demo account",r.a.createElement("span",null,f.a)),r.a.createElement(E.a,{auth:!0}),r.a.createElement("p",{className:d.a.SubTitle},"Simplify your finances with budget, net worth, and investment trackers"),r.a.createElement("div",{className:"1"===H?d.a.InputDivFocus:d.a.InputDiv},r.a.createElement("span",{className:d.a.Icon},f.d),r.a.createElement("input",{onFocus:function(){return z("1")},onBlur:function(){return z("")},value:o,placeholder:"Email",spellCheck:"false",onChange:function(e){c(e.target.value),k(!1)}})),r.a.createElement("div",{className:"2"===H?d.a.InputDivFocus:d.a.InputDiv},r.a.createElement("span",{className:d.a.Icon},f.c),r.a.createElement("input",{onFocus:function(){return z("2")},onBlur:function(){return z("")},type:"password",value:p,placeholder:"Password",spellCheck:"false",onChange:function(e){h(e.target.value),k(!1)}})),"Signup"===e.mode&&r.a.createElement("div",{className:"3"===H?d.a.InputDivFocus:d.a.InputDiv},r.a.createElement("span",{className:d.a.Icon},f.c),r.a.createElement("input",{onFocus:function(){return z("3")},onBlur:function(){return z("")},type:"password",value:N,placeholder:"Confirm Password",spellCheck:"false",onChange:function(e){w(e.target.value),k(!1)}})),r.a.createElement("div",{className:d.a.Remember},r.a.createElement("input",{type:"checkbox",onChange:function(){return M((function(e){return!e}))},checked:R}),r.a.createElement("span",null,"Remember me")),r.a.createElement("div",{className:d.a.ErrDiv},r.a.createElement("span",{className:D?d.a.ErrMsgShow:d.a.ErrMsgHide},B)),r.a.createElement("button",{onClick:function(){if(!F&&!e.loading){var t="Login"===e.mode?v(o,p,p):v(o,p,N);if(T(t),k(""!==t),""===t)return"Login"===e.mode?W():void Q()}}},"Login"===e.mode?"Log in":"Sign up"),r.a.createElement("div",{className:d.a.SwitchAuth},"Login"===e.mode?r.a.createElement("span",null,"Not registered?",r.a.createElement(l.b,{onClick:V,to:"/signup"},"Signup")):r.a.createElement("span",null,"Already registered?",r.a.createElement(l.b,{onClick:V,to:"/login"},"Login")))))))})),S=a(6),N=a.n(S),w=a(7),O=a.n(w),y=function(e){var t=Object(n.useRef)();Object(n.useEffect)((function(){return document.addEventListener("mousedown",a),function(){return document.removeEventListener("mousedown",a)}}),[e.show]),Object(n.useEffect)((function(){return function(){return document.removeEventListener("mousedown",a)}}),[]);var a=function(a){t.current.contains(a.target)||e.close()};return r.a.createElement("div",{ref:t,className:e.show?O.a.SideNav:O.a.HideSideNav},r.a.createElement(E.a,null),r.a.createElement(l.b,{className:O.a.Link,to:"/portfolio",onClick:e.close},"Portfolio",r.a.createElement("div",{className:O.a.FocusBorder})),r.a.createElement(l.b,{className:O.a.Link,to:"/budget",onClick:e.close},"Budgeting",r.a.createElement("div",{className:O.a.FocusBorder})),r.a.createElement(l.b,{className:O.a.Link,to:"/plan",onClick:e.close},"Plan",r.a.createElement("div",{className:O.a.FocusBorder})),r.a.createElement(l.b,{className:O.a.Link,to:"/goals",onClick:e.close},"Goals",r.a.createElement("div",{className:O.a.FocusBorder})),r.a.createElement("div",{className:O.a.Link,onClick:function(){e.close(),e.showHelpPanel()}},"Help",r.a.createElement("span",{className:O.a.QuestionIcon},f.e),r.a.createElement("div",{className:O.a.FocusBorder})),r.a.createElement("div",{className:O.a.LogoutLink,onClick:e.logout},e.demo?"Back to Login":"Logout",r.a.createElement("div",{className:O.a.FocusBorder})))},D=r.a.lazy((function(){return a.e(8).then(a.bind(null,136))})),k=Object(p.b)((function(e){return{isDemo:e.auth.isDemo}}),(function(e){return{logout:function(){return e(h.i())}}}))((function(e){var t=Object(n.useState)(!1),a=Object(u.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(!1),s=Object(u.a)(i,2),d=s[0],m=s[1];return Object(n.useEffect)((function(){e.isDemo&&m(!0)}),[]),r.a.createElement("div",null,r.a.createElement("div",{className:N.a.NavBar},r.a.createElement("div",{className:N.a.LeftNavBar},r.a.createElement("div",{className:N.a.SideToggle,onClick:function(){return c(!0)}},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))),r.a.createElement(E.a,null),r.a.createElement(l.b,{className:N.a.Link,to:"/portfolio"},"Portfolio",r.a.createElement("div",{className:N.a.FocusBorder})),r.a.createElement(l.b,{className:N.a.Link,to:"/budget"},"Budgeting",r.a.createElement("div",{className:N.a.FocusBorder})),r.a.createElement(l.b,{className:N.a.Link,to:"/plan"},"Plan",r.a.createElement("div",{className:N.a.FocusBorder})),r.a.createElement(l.b,{className:N.a.Link,to:"/goals"},"Goals",r.a.createElement("div",{className:N.a.FocusBorder})),r.a.createElement("div",{className:N.a.Link,onClick:function(){return m(!0)}},"Help",r.a.createElement("span",{className:N.a.QuestionIcon},f.e),r.a.createElement("div",{className:N.a.FocusBorder})),r.a.createElement("div",{className:N.a.LogoutLink,onClick:e.logout},e.isDemo?"Login":"Logout",r.a.createElement("div",{className:N.a.FocusBorder}))),r.a.createElement("div",{className:o||d?N.a.Backdrop:N.a.HideBackdrop}),r.a.createElement(y,{demo:e.isDemo,show:o,close:function(){return c(!1)},showHelpPanel:function(){return m(!0)}}),r.a.createElement(n.Suspense,{fallback:""},r.a.createElement(D,{show:d,close:function(){return m(!1)}})))})),j=a(49),L=a(50),B=a(51),T=a(52),A=a(55),C=a.n(A),F=function(e){Object(T.a)(a,e);var t=Object(B.a)(a);function a(){var e;Object(j.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={hasError:!1},e}return Object(L.a)(a,[{key:"componentDidCatch",value:function(e,t){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?r.a.createElement("div",{className:C.a.Error},r.a.createElement("h1",null,"Something went wrong."),r.a.createElement(l.b,{to:"/"},r.a.createElement("button",null,"Back to Simplify Home"))):this.props.children}}]),a}(r.a.Component),P=r.a.lazy((function(){return Promise.all([a.e(10),a.e(0),a.e(4)]).then(a.bind(null,137))})),x=r.a.lazy((function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,138))})),I=r.a.lazy((function(){return Promise.all([a.e(0),a.e(6)]).then(a.bind(null,139))})),R=r.a.lazy((function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,140))})),M=r.a.lazy((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,135))})),Y=Object(p.b)((function(e){return{isAuth:e.auth.isAuth,isDemo:e.auth.isDemo}}),(function(e){return{autoLogin:function(){return e(Object(h.c)())}}}))((function(e){return Object(n.useEffect)((function(){e.autoLogin()}),[]),r.a.createElement(l.a,null,r.a.createElement(F,null,e.isAuth||e.isDemo?r.a.createElement(r.a.Fragment,null,r.a.createElement(k,null),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/portfolio",render:function(){return r.a.createElement(n.Suspense,{fallback:r.a.createElement(m.a,null)},r.a.createElement(P,null))}}),r.a.createElement(i.b,{exact:!0,path:"/",render:function(){return r.a.createElement(n.Suspense,{fallback:""},r.a.createElement(I,null))}}),r.a.createElement(i.b,{exact:!0,path:"/goals",render:function(){return r.a.createElement(n.Suspense,{fallback:r.a.createElement(m.a,null)},r.a.createElement(R,null))}}),r.a.createElement(i.b,{exact:!0,path:"/plan",render:function(){return r.a.createElement(n.Suspense,{fallback:r.a.createElement(m.a,null)},r.a.createElement(M,null))}}),r.a.createElement(i.b,{exact:!0,path:"/budget",render:function(){return r.a.createElement(n.Suspense,{fallback:r.a.createElement(m.a,null)},r.a.createElement(x,null))}}),r.a.createElement(i.a,{to:"/"}))):r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/login",render:function(){return r.a.createElement(_,{mode:"Login"})}}),r.a.createElement(i.b,{exact:!0,path:"/signup",render:function(){return r.a.createElement(_,{mode:"Signup"})}}),r.a.createElement(i.a,{to:"/login"}))))})),G=a(23),H=a(2),z=a(1),q={isAuth:!1,loading:!1,error:!1,isDemo:!1,demoError:!1},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case z.j:return Object(H.a)({},e,{isAuth:!0});case z.k:return Object(H.a)({},e,{isAuth:!1,isDemo:!1});case z.t:return Object(H.a)({},e,{loading:!0});case z.i:return Object(H.a)({},e,{loading:!1});case z.f:return Object(H.a)({},e,{error:!0});case z.l:return Object(H.a)({},e,{error:!1,demoError:!1});case z.e:return Object(H.a)({},e,{demoError:!0});case z.h:return Object(H.a)({},e,{isDemo:!0});default:return e}},Q={netWorthData:[]},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case z.q:return Object(H.a)({},e,{netWorthData:t.data});case z.m:return Object(H.a)({},Q);default:return e}},V=a(18),J={cryptos:[],stocks:[],otherAssets:[],liabilities:[]},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case z.s:return Object(H.a)({},e,{cryptos:t.data.cryptos,stocks:t.data.stocks,otherAssets:t.data.otherAssets,liabilities:t.data.liabilities});case z.n:return Object(H.a)({},J);case z.b:var a=Object(V.a)(e.stocks);return a.unshift(t.stock),Object(H.a)({},e,{stocks:a});case z.a:var n=Object(V.a)(e.cryptos);return n.unshift(t.crypto),Object(H.a)({},e,{cryptos:n});case z.d:return Object(H.a)({},e,{stocks:t.stocks});case z.c:return Object(H.a)({},e,{cryptos:t.cryptos});case z.u:return Object(H.a)({},e,{otherAssets:t.assets});case z.v:return Object(H.a)({},e,{liabilities:t.debts});default:return e}},K={goal:null},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case z.p:return Object(H.a)({},e,{goal:t.goal});default:return e}},$={budget:[]},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case z.r:var a=Object(V.a)(t.budget).map((function(e){return Object(H.a)({},e,{remaining:e.budget,transactions:[]})}));return Object(H.a)({},e,{budget:a});case z.o:var n=t.budget.map((function(e){for(var t=e.budget,a=0;a<e.transactions.length;a++)t-=e.transactions[a].value;return{budget:e.budget,category:e.category,transactions:e.transactions,remaining:t}}));return Object(H.a)({},e,{budget:n});case z.g:return Object(H.a)({},e,{budget:[]});default:return e}},te=a(56),ae=G.d,ne=Object(G.c)({auth:W,netWorth:U,portfolio:Z,goal:X,budget:ee}),re=Object(G.e)(ne,ae(Object(G.a)(te.a)));c.a.render(r.a.createElement(p.a,{store:re},r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null))),document.getElementById("root"))}},[[58,2,3]]]);
//# sourceMappingURL=main.b13a4006.chunk.js.map