(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3],{109:function(e,t,a){},112:function(e,t,a){e.exports={Container:"Portfolio_Container__2Lh7v",Content:"Portfolio_Content__1tCeD",Investments:"Portfolio_Investments__3xVv8",Stocks:"Portfolio_Stocks__17s2Y",Cryptos:"Portfolio_Cryptos__1lkDy",Table:"Portfolio_Table__31oz1",Value:"Portfolio_Value__7pg89",HeaderFields:"Portfolio_HeaderFields__36Kmk",Symbol:"Portfolio_Symbol__34IIQ",NewBtn:"Portfolio_NewBtn__3d9Gr",BuySellBtns:"Portfolio_BuySellBtns__1GGk8",SettingsBtn:"Portfolio_SettingsBtn__3XtZ5",AssetSettingsBtn:"Portfolio_AssetSettingsBtn__1r-p2",BuyBtn:"Portfolio_BuyBtn__qjMvK",SellBtn:"Portfolio_SellBtn__wlh1v",AssetBtns:"Portfolio_AssetBtns__33a9_"}},114:function(e,t,a){e.exports={StockPanel:"SearchPanel_StockPanel__2CChX",CryptoPanel:"SearchPanel_CryptoPanel__1dypT",StockPanelHide:"SearchPanel_StockPanelHide__13Ch4",CryptoPanelHide:"SearchPanel_CryptoPanelHide__2a3g4",BtnDiv:"SearchPanel_BtnDiv__17zMD",Text:"SearchPanel_Text__2AKO8",SearchInput:"SearchPanel_SearchInput__1c0sz",ShowInput:"SearchPanel_ShowInput__2qwC3",HideInput:"SearchPanel_HideInput__2x1NU",Results:"SearchPanel_Results__2-1PS",Result:"SearchPanel_Result__Gop_s",SearchSymbol:"SearchPanel_SearchSymbol__OfAX-",SearchName:"SearchPanel_SearchName__3DzYW",ManualAddBtn:"SearchPanel_ManualAddBtn__2Epv4",ConfirmBtn:"SearchPanel_ConfirmBtn__1si_K",InputText:"SearchPanel_InputText__3gmXN",ShowErr:"SearchPanel_ShowErr__2DhsU",HideErr:"SearchPanel_HideErr__3XLu_"}},115:function(e,t,a){e.exports={BackBtn:"BackBtn_BackBtn__2ULbF",Hide:"BackBtn_Hide__2sOS9"}},116:function(e,t,a){e.exports={Hide:"BuySellPanel_Hide__2o5mT",BuyStock:"BuySellPanel_BuyStock__1-QCB",SellStock:"BuySellPanel_SellStock__2S1eJ",HideBuyStock:"BuySellPanel_HideBuyStock__2euoZ",HideSellStock:"BuySellPanel_HideSellStock__3vuAK",BuyCrypto:"BuySellPanel_BuyCrypto__3F8id",SellCrypto:"BuySellPanel_SellCrypto__3AD3L",HideBuyCrypto:"BuySellPanel_HideBuyCrypto__cErw3",HideSellCrypto:"BuySellPanel_HideSellCrypto__i1atI",BtnDiv:"BuySellPanel_BtnDiv__1HkjQ",Text:"BuySellPanel_Text__29sR8",HideText:"BuySellPanel_HideText__3-jQz",Input:"BuySellPanel_Input__3GW2s",ConfirmBtn:"BuySellPanel_ConfirmBtn__9seJA",HideConfirmBtn:"BuySellPanel_HideConfirmBtn__3-mHz",AllBtn:"BuySellPanel_AllBtn__2dh18",ShowErr:"BuySellPanel_ShowErr__Ttp5f",HideErr:"BuySellPanel_HideErr__1B6WU",InputDiv:"BuySellPanel_InputDiv__317pk",HideInputDiv:"BuySellPanel_HideInputDiv__3FILJ",Dropdown:"BuySellPanel_Dropdown__3Tpwu"}},117:function(e,t,a){e.exports={StockPanel:"SettingsPanel_StockPanel__UZXeJ",CryptoPanel:"SettingsPanel_CryptoPanel__2tSHt",StockPanelHide:"SettingsPanel_StockPanelHide__1UghW",CryptoPanelHide:"SettingsPanel_CryptoPanelHide__1evDN",BtnDiv:"SettingsPanel_BtnDiv__3ZXY8",Text:"SettingsPanel_Text__2Nd-n",Dropdown:"SettingsPanel_Dropdown__1ishV",ShowInput:"SettingsPanel_ShowInput__3VLzL",HideInput:"SettingsPanel_HideInput__19j3W",ConfirmBtn:"SettingsPanel_ConfirmBtn__2Hnt7",ShowErr:"SettingsPanel_ShowErr__6l0YA",HideErr:"SettingsPanel_HideErr__2ME_N"}},118:function(e,t,a){e.exports={Hide:"AssetPanel_Hide__3Zgog",AddAsset:"AssetPanel_AddAsset__aLKaa",HideAddAsset:"AssetPanel_HideAddAsset__1YIeu",AddDebt:"AssetPanel_AddDebt__25Dbr",HideAddDebt:"AssetPanel_HideAddDebt__QE8he",SettingsAsset:"AssetPanel_SettingsAsset__16_Bh",HideSettingsAsset:"AssetPanel_HideSettingsAsset__1kSfW",SettingsDebt:"AssetPanel_SettingsDebt__1e1zF",HideSettingsDebt:"AssetPanel_HideSettingsDebt__2Y8t6",RemoveAsset:"AssetPanel_RemoveAsset__2qe-b",RemoveDebt:"AssetPanel_RemoveDebt__lRaMp",HideRemoveDebt:"AssetPanel_HideRemoveDebt__ppnKl",HideRemoveAsset:"AssetPanel_HideRemoveAsset__3WcJZ",BtnDiv:"AssetPanel_BtnDiv__2A2iq",Text:"AssetPanel_Text__2AaTj",Inputs:"AssetPanel_Inputs__3EVLV",NewValueInput:"AssetPanel_NewValueInput__27MUa",Confirm:"AssetPanel_Confirm__3pA6d",HideConfirm:"AssetPanel_HideConfirm__Xv9Y4",ShowErr:"AssetPanel_ShowErr__2bbll",HideErr:"AssetPanel_HideErr__TqJf1",Dropdown:"AssetPanel_Dropdown__2TDVG"}},119:function(e,t,a){"use strict";a.r(t);var n,r=a(2),o=a(0),c=a.n(o),s=a(112),u=a.n(s),l=a(6),i=a(35),m=a(107),d=a.n(m),b=a(4),p=a(15),f=a(36),h=a(108),S=a(114),_=a.n(S),v=a(9),y=a(8),k=a(33),j=a(26),O=a(115),E=a.n(O),D=a(14),C=function(e){return c.a.createElement("button",{className:"Hide"===e.mode?E.a.Hide:E.a.BackBtn,onClick:e.back},c.a.createElement("span",null,D.a))},N=a(47),A=Object(l.b)((function(e){return{stocks:e.portfolio.stocks,cryptos:e.portfolio.cryptos,portfolio:e.portfolio,netWorthData:e.netWorth.netWorthData,isDemo:e.auth.isDemo}}),(function(e){return{addStock:function(t){return e(y.b(t))},addCrypto:function(t){return e(y.a(t))},setNetWorthData:function(t){return e(y.n(t))}}}))((function(e){var t=Object(o.useState)(""),a=Object(r.a)(t,2),s=a[0],u=a[1],l=Object(o.useState)([]),i=Object(r.a)(l,2),m=i[0],S=i[1],y=Object(o.useState)(!1),O=Object(r.a)(y,2),E=O[0],D=O[1],A=Object(o.useState)(!1),g=Object(r.a)(A,2),B=g[0],P=g[1],x=Object(o.useState)(""),w=Object(r.a)(x,2),W=w[0],H=w[1],I=Object(o.useState)(""),R=Object(r.a)(I,2),T=R[0],L=R[1],q=Object(o.useState)(0),V=Object(r.a)(q,2),F=V[0],M=V[1],Y=Object(o.useState)(0),z=Object(r.a)(Y,2),J=z[0],U=z[1],X=Object(o.useState)(null),K=Object(r.a)(X,2),G=K[0],Q=K[1],Z=Object(o.useState)(""),$=Object(r.a)(Z,2),ee=$[0],te=$[1],ae=Object(o.useState)(!1),ne=Object(r.a)(ae,2),re=ne[0],oe=ne[1],ce=Object(o.useState)(""),se=Object(r.a)(ce,2),ue=se[0],le=se[1],ie=Object(o.useState)(!1),me=Object(r.a)(ie,2),de=me[0],be=me[1],pe=Object(o.useRef)(),fe=Object(o.useRef)();Object(o.useEffect)((function(){return document.addEventListener("mousedown",he),pe.current.focus(),function(){return document.removeEventListener("mousedown",he)}}),[e.mode,e.show]),Object(o.useEffect)((function(){return function(){return document.removeEventListener("mousedown",he)}}),[]);var he=function(e){fe.current.contains(e.target)||ve()},Se=function(e){if(""===e)return S([]);be(!0),v.b.get("portfolio/searchStock/"+e).then((function(e){S(e.data.result),be(!1)})).catch((function(e){be(!1),console.log(e)}))},_e=function(e){if(""===e)return S([]);be(!0),v.b.get("portfolio/searchCrypto/"+e).then((function(e){S(e.data.result),be(!1)})).catch((function(e){console.log(e),be(!1)}))},ve=function(){e.close(),u(""),S([]),ye()},ye=function(){D(!1),P(!1),H(""),M(0),U(0),L(""),Q(null),te(""),oe(!1),le(""),be(!1)},ke=function(e){var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),M(t))},je=function(){var t=Object(h.a)(d.a.mark((function t(a){var n,r,o,c,s,u,l,i,m,h,S,_,y,j,O;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a?{name:W,symbol:T.toUpperCase(),price:Number(J).toFixed(2),quantity:F,value:(J*F).toFixed(2),identifier:"Manual"}:"Stock"===e.mode?{name:G.name,symbol:G.ticker,price:G.price.toFixed(2),quantity:F,value:(F*G.price).toFixed(2),identifier:"Normal"}:{name:G.item.name,symbol:G.item.symbol,price:G.item.price.toFixed(2),quantity:F,value:(F*G.item.price).toFixed(2),identifier:"Normal"},"Stock"!==e.mode){t.next=46;break}r=Object(f.a)(e.stocks),t.prev=3,r.s();case 5:if((o=r.n()).done){t.next=12;break}if((c=o.value).symbol!==n.symbol){t.next=10;break}return oe(!0),t.abrupt("return",le("You already have ".concat(c.symbol," in your portfolio.")));case 10:t.next=5;break;case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(3),r.e(t.t0);case 17:return t.prev=17,r.f(),t.finish(17);case 20:if((s=Object(p.a)(e.stocks)).unshift(Object(b.a)({},n)),u=Object(b.a)({},e.portfolio,{stocks:s}),l=Object(k.a)(e.netWorthData,u),!e.isDemo){t.next=28;break}return e.setNetWorthData(l),e.addStock(n),t.abrupt("return",ve());case 28:return t.prev=28,t.next=31,v.b.put("portfolio/updateStocks",{data:n});case 31:return t.sent,t.next=34,v.b.put("netWorth",{netWorthData:l});case 34:i=t.sent,e.setNetWorthData(i.data.result.dataPoints),e.addStock(n),ve(),t.next=44;break;case 40:return t.prev=40,t.t1=t.catch(28),oe(!0),t.abrupt("return",le("Error connecting to the server."));case 44:t.next=88;break;case 46:m=Object(f.a)(e.cryptos),t.prev=47,m.s();case 49:if((h=m.n()).done){t.next=56;break}if((S=h.value).symbol!==n.symbol){t.next=54;break}return oe(!0),t.abrupt("return",le("You already have ".concat(S.symbol," in your portfolio.")));case 54:t.next=49;break;case 56:t.next=61;break;case 58:t.prev=58,t.t2=t.catch(47),m.e(t.t2);case 61:return t.prev=61,m.f(),t.finish(61);case 64:if((_=Object(p.a)(e.cryptos)).unshift(Object(b.a)({},n)),y=Object(b.a)({},e.portfolio,{cryptos:_}),j=Object(k.a)(e.netWorthData,y),!e.isDemo){t.next=72;break}return e.setNetWorthData(j),e.addCrypto(n),t.abrupt("return",ve());case 72:return t.prev=72,t.next=75,v.b.put("portfolio/updateCryptos",{data:n});case 75:return t.sent,t.next=78,v.b.put("netWorth",{netWorthData:j});case 78:O=t.sent,e.setNetWorthData(O.data.result.dataPoints),e.addCrypto(n),ve(),t.next=88;break;case 84:return t.prev=84,t.t3=t.catch(72),oe(!0),t.abrupt("return",le("Error connecting to the server."));case 88:case"end":return t.stop()}}),t,null,[[3,14,17,20],[28,40],[47,58,61,64],[72,84]])})));return function(e){return t.apply(this,arguments)}}();return c.a.createElement("div",{ref:fe,className:"Stock"===e.mode?e.show?_.a.StockPanel:_.a.StockPanelHide:e.show?_.a.CryptoPanel:_.a.CryptoPanelHide},c.a.createElement("div",{className:_.a.BtnDiv},c.a.createElement(j.a,{close:ve}),c.a.createElement(C,{back:ye,mode:E||B?"Show":"Hide"})),c.a.createElement("p",{className:_.a.Text},"Stock"===e.mode?"Search for a stock by entering its ticker or the company name":"Search for a cryptocurrency by entering its symbol or name"),c.a.createElement("input",{className:_.a.SearchInput,value:s,onChange:function(t){var a=t.target.value;u(a),clearTimeout(n),n="Stock"===e.mode?setTimeout((function(){return Se(a)}),600):setTimeout((function(){return _e(a)}),600)},ref:pe,placeholder:"Stock"===e.mode?"AAPL, Apple, ...":"BTC, Bitcoin, ..."}),de&&c.a.createElement(N.a,{mode:"Search"}),c.a.createElement("div",{className:_.a.Results},m.map((function(t,a){return c.a.createElement("div",{className:_.a.Result,key:a,onClick:function(){return function(t){D(!0),Q(t),"Stock"===e.mode?te(t.ticker):te(t.item.symbol)}(t)}},c.a.createElement("div",{className:_.a.SearchSymbol},"Stock"===e.mode?t.ticker:t.item.symbol),c.a.createElement("div",{className:_.a.SearchName},"Stock"===e.mode?t.name:t.item.name))})),c.a.createElement("button",{className:_.a.ManualAddBtn,onClick:function(){return P(!0)}},"".concat("Stock"===e.mode?"Stock":"Crypto"," not found? Add it manually"))),c.a.createElement("div",{className:E?_.a.ShowInput:_.a.HideInput},c.a.createElement("p",{className:_.a.InputText},"Stock"===e.mode?"How many shares of ".concat(ee," do you own?"):"How much ".concat(ee," do you own?")),c.a.createElement("input",{value:F,onChange:ke}),c.a.createElement("button",{className:_.a.ConfirmBtn,onClick:function(){return je(!1)}},"Add"),c.a.createElement("p",{className:re?_.a.ShowErr:_.a.HideErr},ue)),c.a.createElement("div",{className:B?_.a.ShowInput:_.a.HideInput},c.a.createElement("div",null,c.a.createElement("p",null,"Stock"===e.mode?"Ticker:":"Symbol:"),c.a.createElement("input",{placeholder:"Stock"===e.mode?"eg AAPL":"eg BTC",value:T,onChange:function(e){return L(e.target.value)}})),c.a.createElement("div",null,c.a.createElement("p",null,"Stock"===e.mode?"Company name:":"Cryptocurrency name:"),c.a.createElement("input",{placeholder:"Stock"===e.mode?"eg Apple":"eg Bitcoin",value:W,onChange:function(e){return H(e.target.value)}})),c.a.createElement("div",null,c.a.createElement("p",null,"Current price:"),c.a.createElement("input",{value:J,onChange:function(e){var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t="0"),U(t))}})),c.a.createElement("div",null,c.a.createElement("p",null,"Stock"===e.mode?"Number of shares:":"Quantity:"),c.a.createElement("input",{value:F,onChange:ke})),c.a.createElement("button",{className:_.a.ConfirmBtn,onClick:function(){return je(!0)}},"Add"),c.a.createElement("p",{className:re?_.a.ShowErr:_.a.HideErr},ue)))})),g=a(116),B=a.n(g),P=a(110),x=(a(109),{name:"",symbol:"",quantity:0,price:0,value:0,identifier:"Normal"}),w=Object(l.b)((function(e){return{cryptos:e.portfolio.cryptos,stocks:e.portfolio.stocks,portfolio:e.portfolio,netWorthData:e.netWorth.netWorthData,isDemo:e.auth.isDemo}}),(function(e){return{changeCrypto:function(t){return e(y.d(t))},changeStock:function(t){return e(y.e(t))},setNetWorthData:function(t){return e(y.n(t))}}}))((function(e){var t=Object(o.useState)(Object(b.a)({},x)),a=Object(r.a)(t,2),n=a[0],s=a[1],u=Object(o.useState)(""),l=Object(r.a)(u,2),i=l[0],m=l[1],f=Object(o.useState)(0),S=Object(r.a)(f,2),_=S[0],y=S[1],O=Object(o.useState)(!1),E=Object(r.a)(O,2),D=E[0],C=E[1],N=Object(o.useState)(""),A=Object(r.a)(N,2),g=A[0],w=A[1],W=Object(o.useState)(B.a.Hide),H=Object(r.a)(W,2),I=H[0],R=H[1],T=Object(o.useState)(""),L=Object(r.a)(T,2),q=L[0],V=L[1],F=Object(o.useRef)();Object(o.useEffect)((function(){switch(e.mode){case"BuyStock":e.show?R(B.a.BuyStock):R(B.a.HideBuyStock),V("Which stock did you buy?");break;case"SellStock":e.show?R(B.a.SellStock):R(B.a.HideSellStock),V("Which stock did you sell?");break;case"BuyCrypto":e.show?R(B.a.BuyCrypto):R(B.a.HideBuyCrypto),V("Which cryptocurrency did you buy?");break;default:e.show?R(B.a.SellCrypto):R(B.a.HideSellCrypto),V("Which cryptocurrency did you sell?")}return document.addEventListener("mousedown",M),function(){return document.removeEventListener("mousedown",M)}}),[e.mode,e.show]),Object(o.useEffect)((function(){return function(){return document.removeEventListener("mousedown",M)}}),[]);var M=function(e){F.current.contains(e.target)||Y()},Y=function(){s(Object(b.a)({},x)),y(0),m(""),C(!1),w(""),V(""),e.close()},z=function(){var t=Object(h.a)(d.a.mark((function t(){var a,r,o,c,s,u,l,i,m,f,h,S,y,j,O,E,D,N,A;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==_){t.next=2;break}return t.abrupt("return");case 2:if("SellStock"!==e.mode&&"SellCrypto"!==e.mode||!(_>n.quantity)){t.next=5;break}return C(!0),t.abrupt("return",w("You do not own enough".concat("SellStock"===e.mode?" shares of":""," ").concat(n.symbol," to sell that much.")));case 5:if(_!==n.quantity){t.next=60;break}if("SellStock"!==e.mode){t.next=33;break}if(a=Object(p.a)(e.stocks),r=a.findIndex((function(e){return e.name===n.name})),a.splice(r,1),(o=Object(b.a)({},e.portfolio)).stocks=Object(p.a)(a),c=Object(k.a)(e.netWorthData,o),!e.isDemo){t.next=17;break}return e.setNetWorthData(c),e.changeStock(a),t.abrupt("return",Y());case 17:return t.prev=17,t.next=20,v.b.put("portfolio/deleteStock",{identifier:n.identifier,name:n.name});case 20:return t.sent,t.next=23,v.b.put("netWorth",{netWorthData:c});case 23:return s=t.sent,e.setNetWorthData(s.data.result.dataPoints),e.changeStock(a),t.abrupt("return",Y());case 29:return t.prev=29,t.t0=t.catch(17),C(!0),t.abrupt("return",w("Error connecting to the server."));case 33:if("SellCrypto"!==e.mode){t.next=60;break}if(u=Object(p.a)(e.cryptos),l=u.findIndex((function(e){return e.name===n.name})),u.splice(l,1),(i=Object(b.a)({},e.portfolio)).cryptos=Object(p.a)(u),m=Object(k.a)(e.netWorthData,i),!e.isDemo){t.next=44;break}return e.setNetWorthData(m),e.changeCrypto(u),t.abrupt("return",Y());case 44:return t.prev=44,t.next=47,v.b.put("portfolio/deleteCrypto",{identifier:n.identifier,name:n.name});case 47:return t.sent,t.next=50,v.b.put("netWorth",{netWorthData:m});case 50:return f=t.sent,e.setNetWorthData(f.data.result.dataPoints),e.changeCrypto(u),t.abrupt("return",Y());case 56:return t.prev=56,t.t1=t.catch(44),C(!0),t.abrupt("return",w("Error connecting to the server."));case 60:if(h="BuyStock"===e.mode||"SellStock"===e.mode?Object(p.a)(e.stocks):Object(p.a)(e.cryptos),S=h.findIndex((function(e){return e.name===n.name})),y=Object(b.a)({},h[S]),j="BuyStock"===e.mode||"BuyCrypto"===e.mode?Number(Number(y.quantity)+Number(_)):Number(Number(y.quantity)-Number(_)),y.quantity=Number(j),y.value=Number(y.price*j),h[S]=Object(b.a)({},y),O=Object(b.a)({},e.portfolio),"BuyStock"!==e.mode&&"SellStock"!==e.mode){t.next=93;break}if(O.stocks=Object(p.a)(h),E=Object(k.a)(e.netWorthData,O),!e.isDemo){t.next=75;break}return e.setNetWorthData(E),e.changeStock(h),t.abrupt("return",Y());case 75:return t.prev=75,t.next=78,v.b.put("portfolio/changeStock",Object(b.a)({},y));case 78:return t.sent,t.next=81,v.b.put("netWorth",{netWorthData:E});case 81:D=t.sent,e.setNetWorthData(D.data.result.dataPoints),e.changeStock(h),Y(),t.next=91;break;case 87:t.prev=87,t.t2=t.catch(75),C(!0),w("Error connecting to the server.");case 91:t.next=115;break;case 93:if(O.cryptos=Object(p.a)(h),N=Object(k.a)(e.netWorthData,O),!e.isDemo){t.next=99;break}return e.setNetWorthData(N),e.changeCrypto(h),t.abrupt("return",Y());case 99:return t.prev=99,t.next=102,v.b.put("portfolio/changeCrypto",Object(b.a)({},y));case 102:return t.sent,t.next=105,v.b.put("netWorth",{netWorthData:N});case 105:A=t.sent,e.setNetWorthData(A.data.result.dataPoints),e.changeCrypto(h),Y(),t.next=115;break;case 111:t.prev=111,t.t3=t.catch(99),C(!0),w("Error connecting to the server.");case 115:case"end":return t.stop()}}),t,null,[[17,29],[44,56],[75,87],[99,111]])})));return function(){return t.apply(this,arguments)}}(),J=e.stocks.map((function(e){return{value:e.name,label:e.name}})),U=e.cryptos.map((function(e){return{value:e.name,label:e.name}}));return c.a.createElement("div",{ref:F,className:I},c.a.createElement("div",{className:B.a.BtnDiv},c.a.createElement(j.a,{close:Y})),c.a.createElement("p",{className:B.a.Text},q),c.a.createElement(P.a,{options:"BuyStock"===e.mode||"SellStock"===e.mode?J:U,className:B.a.Dropdown,onChange:function(t){if(!t)return m(""),s(Object(b.a)({},x));if(m(t),C(!1),w(""),y(0),"BuyStock"===e.mode||"SellStock"===e.mode){var a=e.stocks.find((function(e){return e.name===t.value}));s(Object(b.a)({},a))}else{var n=e.cryptos.find((function(e){return e.name===t.value}));s(Object(b.a)({},n))}},isSearchable:!0,value:i,classNamePrefix:"react-select"}),c.a.createElement("p",{className:""===i?B.a.HideText:B.a.Text},"BuyStock"===e.mode?"How many shares of ".concat(n.symbol," did you buy?"):"SellStock"===e.mode?"How many shares of ".concat(n.symbol," did you sell?"):"BuyCrypto"===e.mode?"How much ".concat(n.symbol," did you buy?"):"How much ".concat(n.symbol," did you sell?")),c.a.createElement("div",{className:""===i?B.a.HideInputDiv:B.a.InputDiv},c.a.createElement("input",{disabled:""===i,type:"text",className:B.a.Input,value:_,onChange:function(e){C(!1),w("");var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),y(t))}}),"SellStock"===e.mode||"SellCrypto"===e.mode?c.a.createElement("button",{className:B.a.AllBtn,onClick:function(){return y(n.quantity)}},"All"):null),c.a.createElement("button",{onClick:z,className:""===i?B.a.HideConfirmBtn:B.a.ConfirmBtn},"Confirm"),c.a.createElement("p",{className:D?B.a.ShowErr:B.a.HideErr},g))})),W=a(117),H=a.n(W),I={name:"",symbol:"",quantity:0,price:0,value:0,identifier:"Manual"},R=Object(l.b)((function(e){return{cryptos:e.portfolio.cryptos,stocks:e.portfolio.stocks,portfolio:e.portfolio,netWorthData:e.netWorth.netWorthData,isDemo:e.auth.isDemo}}),(function(e){return{changeCrypto:function(t){return e(y.d(t))},changeStock:function(t){return e(y.e(t))},setNetWorthData:function(t){return e(y.n(t))}}}))((function(e){var t=Object(o.useState)(""),a=Object(r.a)(t,2),n=a[0],s=a[1],u=Object(o.useState)(Object(b.a)({},I)),l=Object(r.a)(u,2),i=l[0],m=l[1],d=Object(o.useState)(0),f=Object(r.a)(d,2),h=f[0],S=f[1],_=Object(o.useState)(!1),y=Object(r.a)(_,2),O=y[0],E=y[1],D=Object(o.useState)(""),C=Object(r.a)(D,2),N=C[0],A=C[1],g=Object(o.useState)(!1),B=Object(r.a)(g,2),x=B[0],w=B[1],W=Object(o.useRef)();Object(o.useEffect)((function(){return document.addEventListener("mousedown",R),function(){return document.removeEventListener("mousedown",R)}}),[e.mode,e.show]),Object(o.useEffect)((function(){return function(){return document.removeEventListener("mousedown",R)}}),[]);var R=function(e){W.current.contains(e.target)||T()},T=function(){m(Object(b.a)({},I)),S(0),s(""),E(!1),A(""),w(!1),e.close()},L=e.stocks.filter((function(e){return"Manual"===e.identifier})),q=e.cryptos.filter((function(e){return"Manual"===e.identifier})),V=L.map((function(e){return{value:e.name,label:e.name}})),F=q.map((function(e){return{value:e.name,label:e.name}}));return c.a.createElement("div",{ref:W,className:"Stock"===e.mode?e.show?H.a.StockPanel:H.a.StockPanelHide:e.show?H.a.CryptoPanel:H.a.CryptoPanelHide},c.a.createElement("div",{className:H.a.BtnDiv},c.a.createElement(j.a,{close:T})),c.a.createElement("p",{className:H.a.Text},"Stock"===e.mode?"Change the price of a manually added stock":"Change the price of a manually added cryptocurrency"),c.a.createElement(P.a,{options:"Stock"===e.mode?V:F,className:H.a.Dropdown,onChange:function(t){if(!t)return s(""),w(!1),m(Object(b.a)({},I));if(w(!0),s(t),E(!1),A(""),"Stock"===e.mode){var a=L.find((function(e){return e.name===t.value}));m(Object(b.a)({},a)),S(a.price)}else{var n=q.find((function(e){return e.name===t.value}));m(Object(b.a)({},n)),S(n.price)}},isSearchable:!0,value:n,classNamePrefix:"react-select"}),c.a.createElement("div",{className:x?H.a.ShowInput:H.a.HideInput},c.a.createElement("input",{value:h,onChange:function(e){E(!1),A("");var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),S(t))}}),c.a.createElement("button",{className:H.a.ConfirmBtn,onClick:function(){var t="Stock"===e.mode?Object(p.a)(e.stocks):Object(p.a)(e.cryptos),a=t.findIndex((function(e){return e.name===i.name})),n=Object(b.a)({},t[a]),r=Number(h);n.price=r,n.value=r*n.quantity,t[a]=Object(b.a)({},n);var o=Object(b.a)({},e.portfolio);if("Stock"===e.mode){o.stocks=Object(p.a)(t);var c=Object(k.a)(e.netWorthData,o);if(e.isDemo)return e.setNetWorthData(c),e.changeStock(t),T();v.b.put("portfolio/changeStock",Object(b.a)({},n)).then((function(a){v.b.put("netWorth",{netWorthData:c}).then((function(a){e.setNetWorthData(a.data.result.dataPoints),e.changeStock(t),T()})).catch((function(e){E(!0),A("Error connecting to the server.")}))})).catch((function(e){E(!0),A("Error connecting to the server.")}))}else{o.cryptos=Object(p.a)(t);var s=Object(k.a)(e.netWorthData,o);if(e.isDemo)return e.setNetWorthData(s),e.changeCrypto(t),T();v.b.put("portfolio/changeCrypto",Object(b.a)({},n)).then((function(a){v.b.put("netWorth",{netWorthData:s}).then((function(a){e.setNetWorthData(a.data.result.dataPoints),e.changeCrypto(t),T()})).catch((function(e){E(!0),A("Error connecting to the server.")}))})).catch((function(e){E(!0),A("Error connecting to the server.")}))}}},"Confirm"),c.a.createElement("p",{className:O?H.a.ShowErr:H.a.HideErr},N)))})),T=a(118),L=a.n(T),q=Object(l.b)((function(e){return{otherAssets:e.portfolio.otherAssets,liabilities:e.portfolio.liabilities,portfolio:e.portfolio,netWorthData:e.netWorth.netWorthData,isDemo:e.auth.isDemo}}),(function(e){return{setNetWorthData:function(t){return e(y.n(t))},updateAssets:function(t){return e(y.q(t))},updateDebts:function(t){return e(y.r(t))}}}))((function(e){var t=Object(o.useState)(""),a=Object(r.a)(t,2),n=a[0],s=a[1],u=Object(o.useState)(L.a.Hide),l=Object(r.a)(u,2),i=l[0],m=l[1],S=Object(o.useState)(L.a.HideConfirm),_=Object(r.a)(S,2),y=_[0],O=_[1],E=Object(o.useState)(null),D=Object(r.a)(E,2),C=D[0],N=D[1],A=Object(o.useState)(""),g=Object(r.a)(A,2),B=g[0],x=g[1],w=Object(o.useState)(null),W=Object(r.a)(w,2),H=W[0],I=W[1],R=Object(o.useState)(""),T=Object(r.a)(R,2),q=T[0],V=T[1],F=Object(o.useState)(""),M=Object(r.a)(F,2),Y=M[0],z=M[1],J=Object(o.useState)(""),U=Object(r.a)(J,2),X=U[0],K=U[1],G=Object(o.useState)(!1),Q=Object(r.a)(G,2),Z=Q[0],$=Q[1],ee=Object(o.useState)(""),te=Object(r.a)(ee,2),ae=te[0],ne=te[1],re=Object(o.useState)(""),oe=Object(r.a)(re,2),ce=oe[0],se=oe[1],ue=Object(o.useRef)();Object(o.useEffect)((function(){switch(e.mode){case"AddAsset":s("Add a new asset"),e.show?m(L.a.AddAsset):m(L.a.HideAddAsset);break;case"RemoveAsset":s("Select an asset to remove it from your portfolio"),e.show?m(L.a.RemoveAsset):m(L.a.HideRemoveAsset),N(e.otherAssets.map((function(e){return{value:e.name,label:e.name}})));break;case"AddDebt":s("Add a new liability"),e.show?m(L.a.AddDebt):m(L.a.HideAddDebt);break;case"RemoveDebt":s("Select a liability to remove it from your portfolio"),e.show?m(L.a.RemoveDebt):m(L.a.HideRemoveDebt),N(e.liabilities.map((function(e){return{value:e.name,label:e.name}})));break;case"SettingsAsset":s("Select an asset to change its value"),e.show?m(L.a.SettingsAsset):m(L.a.HideSettingsAsset),N(e.otherAssets.map((function(e){return{value:e.name,label:e.name}})));break;default:s("Select a liability to change its value"),e.show?m(L.a.SettingsDebt):m(L.a.HideSettingsDebt),N(e.liabilities.map((function(e){return{value:e.name,label:e.name}})))}return document.addEventListener("mousedown",le),function(){return document.removeEventListener("mousedown",le)}}),[e.mode,e.show]),Object(o.useEffect)((function(){return function(){return document.removeEventListener("mousedown",le)}}),[]);var le=function(e){ue.current.contains(e.target)||ie()},ie=function(){s(""),O(L.a.HideConfirm),N(null),x(""),I(null),V(""),z(""),K(""),$(!1),ne(""),se(""),e.close()},me=function(){$(!0),ne("Error connecting to the server.")},de=function(){var t=Object(h.a)(d.a.mark((function t(){var a,n,r,o,c,s,u,l,i,m,h,S,_,y,j,O,E,D,C,N,A,g,B,P,x,w,W,I,R,T,L,V,F,M,z,J,U,K,G,Q,Z,ee,te;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=Object(b.a)({},e.portfolio),"AddAsset"!==e.mode){t.next=48;break}n={name:q,desc:Y,value:X},r=Object(f.a)(e.otherAssets),t.prev=4,r.s();case 6:if((o=r.n()).done){t.next=13;break}if(o.value.name!==n.name){t.next=11;break}return $(!0),t.abrupt("return",ne("You already have ".concat(n.name," in your portfolio")));case 11:t.next=6;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t.catch(4),r.e(t.t0);case 18:return t.prev=18,r.f(),t.finish(18);case 21:if(!e.isDemo){t.next=29;break}return(c=Object(p.a)(a.otherAssets)).unshift(Object(b.a)({},n)),a.otherAssets=c,s=Object(k.a)(e.netWorthData,a),e.setNetWorthData(s),e.updateAssets(c),t.abrupt("return",ie());case 29:return t.prev=29,t.next=32,v.b.put("portfolio/addAsset",Object(b.a)({},n));case 32:return u=t.sent,a.otherAssets=u.data.assets,l=Object(k.a)(e.netWorthData,a),t.next=37,v.b.put("netWorth",{netWorthData:l});case 37:return i=t.sent,e.setNetWorthData(i.data.result.dataPoints),e.updateAssets(u.data.assets),t.abrupt("return",ie());case 43:return t.prev=43,t.t1=t.catch(29),t.abrupt("return",me());case 46:t.next=210;break;case 48:if("RemoveAsset"!==e.mode){t.next=77;break}if(!e.isDemo){t.next=58;break}return m=Object(p.a)(a.otherAssets),h=m.findIndex((function(e){return e.name===H.name})),m.splice(h,1),a.otherAssets=m,S=Object(k.a)(e.netWorthData,a),e.setNetWorthData(S),e.updateAssets(m),t.abrupt("return",ie());case 58:return t.prev=58,t.next=61,v.b.put("portfolio/removeAsset",{name:H.name});case 61:return _=t.sent,a.otherAssets=_.data.assets,y=Object(k.a)(e.netWorthData,a),t.next=66,v.b.put("netWorth",{netWorthData:y});case 66:return j=t.sent,e.setNetWorthData(j.data.result.dataPoints),e.updateAssets(_.data.assets),t.abrupt("return",ie());case 72:return t.prev=72,t.t2=t.catch(58),t.abrupt("return",me());case 75:t.next=210;break;case 77:if("AddDebt"!==e.mode){t.next=124;break}O={name:q,desc:Y,value:X},E=Object(f.a)(e.liabilities),t.prev=80,E.s();case 82:if((D=E.n()).done){t.next=89;break}if(D.value.name!==O.name){t.next=87;break}return $(!0),t.abrupt("return",ne("You already have ".concat(O.name," in your portfolio")));case 87:t.next=82;break;case 89:t.next=94;break;case 91:t.prev=91,t.t3=t.catch(80),E.e(t.t3);case 94:return t.prev=94,E.f(),t.finish(94);case 97:if(!e.isDemo){t.next=105;break}return(C=Object(p.a)(a.liabilities)).unshift(Object(b.a)({},O)),a.liabilities=C,N=Object(k.a)(e.netWorthData,a),e.setNetWorthData(N),e.updateDebts(C),t.abrupt("return",ie());case 105:return t.prev=105,t.next=108,v.b.put("portfolio/addDebt",Object(b.a)({},O));case 108:return A=t.sent,a.liabilities=A.data.debts,g=Object(k.a)(e.netWorthData,a),t.next=113,v.b.put("netWorth",{netWorthData:g});case 113:return B=t.sent,e.setNetWorthData(B.data.result.dataPoints),e.updateDebts(A.data.debts),t.abrupt("return",ie());case 119:return t.prev=119,t.t4=t.catch(105),t.abrupt("return",me());case 122:t.next=210;break;case 124:if("RemoveDebt"!==e.mode){t.next=153;break}if(!e.isDemo){t.next=134;break}return P=Object(p.a)(a.liabilities),x=P.findIndex((function(e){return e.name===H.name})),P.splice(x,1),a.liabilities=P,w=Object(k.a)(e.netWorthData,a),e.setNetWorthData(w),e.updateDebts(P),t.abrupt("return",ie());case 134:return t.prev=134,t.next=137,v.b.put("portfolio/removeDebt",{name:H.name});case 137:return W=t.sent,a.liabilities=W.data.debts,I=Object(k.a)(e.netWorthData,a),t.next=142,v.b.put("netWorth",{netWorthData:I});case 142:return R=t.sent,e.setNetWorthData(R.data.result.dataPoints),e.updateDebts(W.data.debts),t.abrupt("return",ie());case 148:return t.prev=148,t.t5=t.catch(134),t.abrupt("return",me());case 151:t.next=210;break;case 153:if("SettingsAsset"!==e.mode){t.next=183;break}if(T={name:H.name,desc:H.desc,value:ce},!e.isDemo){t.next=164;break}return L=Object(p.a)(a.otherAssets),V=L.findIndex((function(e){return e.name===T.name})),L[V].value=T.value,a.otherAssets=L,F=Object(k.a)(e.netWorthData,a),e.setNetWorthData(F),e.updateAssets(L),t.abrupt("return",ie());case 164:return t.prev=164,t.next=167,v.b.put("portfolio/updateAsset",Object(b.a)({},T));case 167:return M=t.sent,a.otherAssets=M.data.assets,z=Object(k.a)(e.netWorthData,a),t.next=172,v.b.put("netWorth",{netWorthData:z});case 172:return J=t.sent,e.setNetWorthData(J.data.result.dataPoints),e.updateAssets(M.data.assets),t.abrupt("return",ie());case 178:return t.prev=178,t.t6=t.catch(164),t.abrupt("return",me());case 181:t.next=210;break;case 183:if(U={name:H.name,desc:H.desc,value:ce},!e.isDemo){t.next=193;break}return K=Object(p.a)(a.liabilities),G=K.findIndex((function(e){return e.name===U.name})),K[G].value=U.value,a.liabilities=K,Q=Object(k.a)(e.netWorthData,a),e.setNetWorthData(Q),e.updateDebts(K),t.abrupt("return",ie());case 193:return t.prev=193,t.next=196,v.b.put("portfolio/updateDebt",Object(b.a)({},U));case 196:return Z=t.sent,a.liabilities=Z.data.debts,ee=Object(k.a)(e.netWorthData,a),t.next=201,v.b.put("netWorth",{netWorthData:ee});case 201:return te=t.sent,e.setNetWorthData(te.data.result.dataPoints),e.updateDebts(Z.data.debts),t.abrupt("return",ie());case 207:return t.prev=207,t.t7=t.catch(193),t.abrupt("return",me());case 210:case"end":return t.stop()}}),t,null,[[4,15,18,21],[29,43],[58,72],[80,91,94,97],[105,119],[134,148],[164,178],[193,207]])})));return function(){return t.apply(this,arguments)}}();return c.a.createElement("div",{ref:ue,className:i},c.a.createElement("div",{className:L.a.BtnDiv},c.a.createElement(j.a,{close:ie})),c.a.createElement("p",{className:L.a.Text},n),C?c.a.createElement(P.a,{options:C,className:L.a.Dropdown,onChange:function(t){if(!t)return x(""),O(L.a.HideConfirm),I(null);if(x(t),$(!1),ne(""),O(L.a.Confirm),"SettingsAsset"===e.mode||"RemoveAsset"===e.mode){var a=e.otherAssets.find((function(e){return e.name===t.value}));I(Object(b.a)({},a)),se(a.value)}else if("SettingsDebt"===e.mode||"RemoveDebt"===e.mode){var n=e.liabilities.find((function(e){return e.name===t.value}));I(Object(b.a)({},n)),se(n.value)}},isSearchable:!0,value:B,classNamePrefix:"react-select"}):c.a.createElement("div",{className:L.a.Inputs},c.a.createElement("div",null,c.a.createElement("p",null,"Name"),c.a.createElement("input",{value:q,onChange:function(e){V(e.target.value),$(!1),ne(""),e.target.value.length>0&&Y.length>0&&X.length>0?O(L.a.Confirm):O(L.a.HideConfirm)}})),c.a.createElement("div",null,c.a.createElement("p",null,"Description"),c.a.createElement("input",{value:Y,onChange:function(e){z(e.target.value),$(!1),ne(""),e.target.value.length>0&&q.length>0&&X.length>0?O(L.a.Confirm):O(L.a.HideConfirm)}})),c.a.createElement("div",null,c.a.createElement("p",null,"Value"),c.a.createElement("input",{value:X,onChange:function(e){var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),K(t),$(!1),ne(""),t.length>0&&Y.length>0&&q.length>0?O(L.a.Confirm):O(L.a.HideConfirm))}}))),"SettingsAsset"!==e.mode&&"SettingsDebt"!==e.mode||""===B?null:c.a.createElement("input",{className:L.a.NewValueInput,value:ce,onChange:function(e){var t=e.target.value;isNaN(t)||(2===t.length&&"0"===t.charAt(0)&&"."!==t.charAt(1)&&(t=t.slice(1)),""===t&&(t=0),se(t),$(!1),ne(""))}}),c.a.createElement("button",{onClick:de,className:y},"Confirm"),c.a.createElement("p",{className:Z?L.a.ShowErr:L.a.HideErr},ae))})),V=a(72),F=a(43);t.default=Object(l.b)((function(e){return{stocks:e.portfolio.stocks,cryptos:e.portfolio.cryptos}}))(Object(i.g)((function(e){var t=Object(o.useState)(!1),a=Object(r.a)(t,2),n=a[0],s=a[1],l=Object(o.useState)(!1),i=Object(r.a)(l,2),m=i[0],d=i[1],b=Object(o.useState)(!1),p=Object(r.a)(b,2),f=p[0],h=p[1],S=Object(o.useState)(!1),_=Object(r.a)(S,2),v=_[0],y=_[1],k=Object(o.useState)(!1),j=Object(r.a)(k,2),O=j[0],E=j[1],C=Object(o.useState)(!1),N=Object(r.a)(C,2),g=N[0],B=N[1],P=Object(o.useState)(!1),x=Object(r.a)(P,2),W=x[0],H=x[1],I=Object(o.useState)(!1),T=Object(r.a)(I,2),L=T[0],M=T[1],Y=Object(o.useState)(!1),z=Object(r.a)(Y,2),J=z[0],U=z[1],X=Object(o.useState)(!1),K=Object(r.a)(X,2),G=K[0],Q=K[1],Z=Object(o.useState)(!1),$=Object(r.a)(Z,2),ee=$[0],te=$[1],ae=Object(o.useState)(!1),ne=Object(r.a)(ae,2),re=ne[0],oe=ne[1],ce=Object(o.useState)(!1),se=Object(r.a)(ce,2),ue=se[0],le=se[1],ie=Object(o.useState)(!1),me=Object(r.a)(ie,2),de=me[0],be=me[1],pe=Object(o.useRef)(),fe=Object(o.useRef)(),he=Object(o.useRef)(),Se=Object(o.useRef)();Object(o.useEffect)((function(){switch(e.location.search){case"?pos=stocks":return fe.current.scrollIntoView();case"?pos=cryptos":return he.current.scrollIntoView();case"?pos=assets":return Se.current.scrollIntoView();default:return pe.current.scrollIntoView()}}),[]);var _e=function(t){return"BuyStock"!==t&&"SellStock"!==t||0!==e.stocks.length?"BuyCrypto"!==t&&"SellCrypto"!==t||0!==e.cryptos.length?void("BuyStock"===t?h(!0):"SellStock"===t?y(!0):"BuyCrypto"===t?E(!0):B(!0)):d(!0):s(!0)};return c.a.createElement("div",{className:u.a.Container},c.a.createElement("div",{className:u.a.Content,ref:pe},c.a.createElement(V.a,{small:!1}),c.a.createElement("div",{className:u.a.Investments},c.a.createElement("div",{className:u.a.Stocks,ref:fe},c.a.createElement("h1",null,"Stocks"),c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return s(!0)}},"Add a new holding"),c.a.createElement("div",{className:u.a.BuySellBtns},c.a.createElement("button",{className:u.a.BuyBtn,onClick:function(){return _e("BuyStock")}},"Buy"),c.a.createElement(w,{mode:"BuyStock",show:f,close:function(){return h(!1)}}),c.a.createElement("button",{className:u.a.SellBtn,onClick:function(){return _e("SellStock")}},"Sell"),c.a.createElement(w,{mode:"SellStock",show:v,close:function(){return y(!1)}}),c.a.createElement("button",{className:u.a.SettingsBtn,onClick:function(){return H(!0)}},c.a.createElement("span",null,D.f)),c.a.createElement(R,{mode:"Stock",show:W,close:function(){return H(!1)}})),c.a.createElement(A,{mode:"Stock",show:n,close:function(){return s(!1)}}),c.a.createElement(F.a,{mode:"Stocks",normal:!0})),c.a.createElement("div",{className:u.a.Cryptos,ref:he},c.a.createElement("h1",null,"Cryptocurrencies"),c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return d(!0)}},"Add a new holding"),c.a.createElement("div",{className:u.a.BuySellBtns},c.a.createElement("button",{className:u.a.BuyBtn,onClick:function(){return _e("BuyCrypto")}},"Buy"),c.a.createElement(w,{mode:"BuyCrypto",show:O,close:function(){return E(!1)}}),c.a.createElement("button",{className:u.a.SellBtn,onClick:function(){return _e("SellCrypto")}},"Sell"),c.a.createElement(w,{mode:"SellCrypto",show:g,close:function(){return B(!1)}}),c.a.createElement("button",{className:u.a.SettingsBtn,onClick:function(){return M(!0)}},c.a.createElement("span",null,D.f)),c.a.createElement(R,{mode:"Crypto",show:L,close:function(){return M(!1)}})),c.a.createElement(A,{mode:"Crypto",show:m,close:function(){return d(!1)}}),c.a.createElement(F.a,{mode:"Cryptos",normal:!0}))),c.a.createElement("div",{className:u.a.Investments},c.a.createElement("div",{className:u.a.Stocks,ref:Se},c.a.createElement("h1",null,"Assets"),c.a.createElement("div",{className:u.a.AssetBtns},c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return U(!0)}},"Add a new asset"),c.a.createElement(q,{mode:"AddAsset",close:function(){return U(!1)},show:J}),c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return Q(!0)}},"Remove an asset"),c.a.createElement(q,{mode:"RemoveAsset",close:function(){return Q(!1)},show:G}),c.a.createElement("button",{className:u.a.AssetSettingsBtn,onClick:function(){return le(!0)}},c.a.createElement("span",null,D.f)),c.a.createElement(q,{mode:"SettingsAsset",close:function(){return le(!1)},show:ue})),c.a.createElement(F.a,{mode:"Assets",normal:!0})),c.a.createElement("div",{className:u.a.Cryptos},c.a.createElement("h1",null,"Liabilities"),c.a.createElement("div",{className:u.a.AssetBtns},c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return te(!0)}},"Add a new liability"),c.a.createElement(q,{mode:"AddDebt",close:function(){return te(!1)},show:ee}),c.a.createElement("button",{className:u.a.NewBtn,onClick:function(){return oe(!0)}},"Remove a liability"),c.a.createElement(q,{mode:"RemoveDebt",close:function(){return oe(!1)},show:re}),c.a.createElement("button",{className:u.a.AssetSettingsBtn,onClick:function(){return be(!0)}},c.a.createElement("span",null,D.f)),c.a.createElement(q,{mode:"SettingsDebt",close:function(){return be(!1)},show:de})),c.a.createElement(F.a,{mode:"Debts",normal:!0})))))})))}}]);
//# sourceMappingURL=3.f0fb0041.chunk.js.map