(this["webpackJsonpfurniture-finder-faisal-arkan"]=this["webpackJsonpfurniture-finder-faisal-arkan"]||[]).push([[0],{125:function(e,t,a){e.exports=a(213)},130:function(e,t,a){},132:function(e,t,a){},213:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),c=a.n(l),i=(a(130),a(131),a(58)),o=a(59),u=a(123),s=a(106),h=a(122),f=a(217),d=a(219),m=a(218),y=a(23),p=a(220),v=a(48),E=a(216),g=a(107),S=a.n(g),F=(a(132),a(108)),k=a.n(F),D=function(){function e(){Object(i.a)(this,e),this.baseUrl="https://www.mocky.io/v2/"}return Object(o.a)(e,[{key:"get",value:function(e){return k.a.get("".concat(this.baseUrl).concat(e)).then((function(e){return e.data}))}}]),e}();var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.length>5?"".concat(e.substring(0,t),"... (Read More)"):e},b=f.a.Meta,C=d.a.Option,I=m.a.Search,N=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(s.a)(t).call(this,e))).filterSearchInput=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=a.state.searchInput,n=[];n=e.filter((function(e){var a=e.name.toLowerCase(),n=t.toLowerCase();return a.includes(n)})),a.setState({products:n})},a.filterSelectStyle=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[],n=a.state,r=n.filterFurnitureStyle,l=n.products,c=n.searchInput;if(r.length){var i=c?l:e;i.forEach((function(e){r.every((function(t){return e.furniture_style.includes(t)}))&&t.push(e)})),a.setState({products:t})}},a.filterSelectDelivery=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=a.state,r=n.filterDeliveryDays,l=n.products,c=n.searchInput,i=n.filterFurnitureStyle;if(r.length){var o=r.map((function(e){return JSON.parse(e)})),u=i.length||c?l:t,s=[];o.forEach((function(e){var t=u.filter((function(t){return parseInt(t.delivery_time,10)>e.start&&parseInt(t.delivery_time,10)<=e.end}));s.push(t)}));var h=(e=[]).concat.apply(e,s);a.setState({products:h})}},a.onFilterFurnitureStyle=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";a.setState({filterFurnitureStyle:e},(function(){a.handleFetch()}))},a.onFilterDeliveryDays=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";a.setState({filterDeliveryDays:e},(function(){a.handleFetch()}))},a.onChangeFilterInput=function(e){a.setState({searchInput:e.target.value},(function(){a.handleFetch()}))},a.handleRenderCard=function(){var e=a.state.products,t=[];return e.forEach((function(e){t.push(r.a.createElement(y.a,{flex:2,className:"card",span:10},r.a.createElement(f.a,null,r.a.createElement(b,{title:r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"float-left"},e.name),r.a.createElement("div",{className:"float-right"},"Rp. ".concat(S()(e.price).format()))),description:r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"description"},w(e.description,114)),r.a.createElement("div",{className:"float-left furniture-style"},e.furniture_style.map((function(e){return r.a.createElement(p.a,{color:"blue"},e)}))),r.a.createElement("br",null),r.a.createElement("div",{className:"float-right delivery"},"".concat(e.delivery_time," Day")))}))))})),t},a.state={searchInput:"",products:[],filterFurnitureStyle:[],filterDeliveryDays:[]},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.handleFetch()}},{key:"handleFetch",value:function(){var e=this,t=this.state,a=t.filterDeliveryDays,n=t.searchInput,r=t.filterFurnitureStyle;(new D).get("5c9105cb330000112b649af8").then((function(t){var l=t.products;r.length<=0&&!n&&a.length<=0?e.setState({products:l}):(e.filterSearchInput(l),e.filterSelectStyle(l),e.filterSelectDelivery(l))}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v.a,{className:"container header-tools",type:"flex"},r.a.createElement(y.a,{span:24},r.a.createElement(E.a,{ghost:!1},r.a.createElement(v.a,{gutter:[1,24]},r.a.createElement(y.a,{span:11},r.a.createElement(I,{placeholder:"Search Furniture",onChange:this.onChangeFilterInput}))),r.a.createElement(v.a,{gutter:24},r.a.createElement(y.a,{span:12},r.a.createElement(d.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Furniture Style",onChange:this.onFilterFurnitureStyle},r.a.createElement(C,{key:"Classic"},"Classic"),r.a.createElement(C,{key:"Midcentury"},"Midcentury"),r.a.createElement(C,{key:"Scandinavian"},"Scandinavian"),r.a.createElement(C,{key:"Modern"},"Modern"),r.a.createElement(C,{key:"Contemporary"},"Contemporary"))),r.a.createElement(y.a,{span:12},r.a.createElement(d.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Delivery Days",onChange:this.onFilterDeliveryDays},r.a.createElement(C,{key:'{"start":0, "end":7}'},"1 Week"),r.a.createElement(C,{key:'{"start":7, "end":14}'},"2 weeks"),r.a.createElement(C,{key:'{"start":14, "end":30}'},"1 month"))))))),r.a.createElement(v.a,{className:"container",type:"flex"},this.handleRenderCard()))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[125,1,2]]]);
//# sourceMappingURL=main.db827da9.chunk.js.map