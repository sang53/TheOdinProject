(()=>{"use strict";var e={208:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(354),a=t.n(r),o=t(314),s=t.n(o)()(a());s.push([e.id,'*,\n::before,\n::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n}\n\nbody {\n  line-height: 1.15;\n  -webkit-font-smoothing: antialiased;\n  font-family: system-ui, "Segoe UI", Roboto, Arial;\n}\n\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\n\nsvg {\n  vertical-align: baseline;\n}\n\ninput,\nbutton,\ntextarea,\nselect,\noptgroup {\n  font: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n}\n\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\np {\n  text-wrap: pretty;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  text-wrap: balance;\n}\n\n.box {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  border: 3px solid black;\n  box-shadow: 3px 2px 5px #1e293b;\n  border-radius: 6px;\n  background-color: #e2e8f0;\n}\n\n#main {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  padding: 1rem;\n  gap: 1rem;\n  background-color: #94a3b8;\n  min-height: 100vh;\n}\n\n#content {\n  background-color: #cbd5e1;\n}\n\ntextarea:focus {\n  min-width: 350px;\n  min-height: 300px;\n}\n',"",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAAA;;;EAGE,sBAAsB;AACxB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,iDAAiD;AACnD;;AAEA;;;;;EAKE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;;;;;EAKE,aAAa;EACb,eAAe;EACf,iBAAiB;AACnB;;AAEA;;;;;;;EAOE,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;;;;;EAME,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,oBAAoB;EACpB,uBAAuB;EACvB,+BAA+B;EAC/B,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,mBAAmB;EACnB,aAAa;EACb,SAAS;EACT,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB",sourcesContent:['*,\n::before,\n::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n}\n\nbody {\n  line-height: 1.15;\n  -webkit-font-smoothing: antialiased;\n  font-family: system-ui, "Segoe UI", Roboto, Arial;\n}\n\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\n\nsvg {\n  vertical-align: baseline;\n}\n\ninput,\nbutton,\ntextarea,\nselect,\noptgroup {\n  font: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n}\n\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\np {\n  text-wrap: pretty;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  text-wrap: balance;\n}\n\n.box {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  border: 3px solid black;\n  box-shadow: 3px 2px 5px #1e293b;\n  border-radius: 6px;\n  background-color: #e2e8f0;\n}\n\n#main {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  padding: 1rem;\n  gap: 1rem;\n  background-color: #94a3b8;\n  min-height: 100vh;\n}\n\n#content {\n  background-color: #cbd5e1;\n}\n\ntextarea:focus {\n  min-width: 350px;\n  min-height: 300px;\n}\n'],sourceRoot:""}]);const i=s},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(s[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);r&&s[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),n.push(d))}},n}},354:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),o="/*# ".concat(a," */");return[n].concat([o]).join("\n")}return[n].join("\n")}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var o={},s=[],i=0;i<e.length;i++){var c=e[i],l=r.base?c[0]+r.base:c[0],d=o[l]||0,h="".concat(l," ").concat(d);o[l]=d+1;var u=t(h),A={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)n[u].references++,n[u].updater(A);else{var p=a(A,r);r.byIndex=i,n.splice(i,0,{identifier:h,updater:p,references:1})}s.push(h)}return s}function a(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var s=0;s<o.length;s++){var i=t(o[s]);n[i].references--}for(var c=r(e,a),l=0;l<o.length;l++){var d=t(o[l]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}o=c}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,a&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var o=n[r]={id:r,exports:{}};return e[r](o,o.exports,t),o.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0;var r=t(72),a=t.n(r),o=t(825),s=t.n(o),i=t(659),c=t.n(i),l=t(56),d=t.n(l),h=t(540),u=t.n(h),A=t(113),p=t.n(A),f=t(208),y={};y.styleTagTransform=p(),y.setAttributes=d(),y.insert=c().bind(null,"head"),y.domAPI=s(),y.insertStyleElement=u(),a()(f.A,y),f.A&&f.A.locals&&f.A.locals;const g="function hash(key) {\n  let hashCode = 0;\n      \n  const primeNumber = 11;\n  for (let i = 0; i < key.length; i++) {\n    hashCode = primeNumber * hashCode + key.charCodeAt(i);\n  }\n\n  return hashCode;\n}",m='  "apple":"red",\n  "banana":"yellow",\n  "carrot":"orange",\n  "dog":"brown",\n  "elephant":"grey",\n  "frog":"green",\n  "grape":"purple",\n  "hat":"black",\n  "ice cream":"white",\n  "jacket":"blue",\n  "kite":"pink",\n  "lion":"golden",\n';class b{constructor(e="",n=17,t=.75){this.data=new Array(n&&n>=1?parseInt(n):17),this.loadFactor=t&&t>0&&t<1?t:.75,e?this.updateHashFunction(e):this.hash=new Function("return "+g)(),this.storedNodes=0,this.storedIndexes=0,this.collIndexes=0,this.collNodes=0}updateHashFunction(e){this.hash=new Function("return "+e)(),this.hash("nba2015"),this.hash(-48374),this.hash(19432.234),this.hash(0)}hashWrapper(e){if(Number.isNaN(e))return NaN;try{const n=this.hash(e);return console.log(`Key: ${e}, Pre-Mod: ${n}`),n%this.data.length}catch(e){return console.log(e),NaN}}checkIndex(e){return!(isNaN(e)||e<0)}getIndexByKey(e){const n=parseInt(this.hashWrapper(e));return this.checkIndex(n)?[!0,n]:[!1,`Error: Hash of ${e} = Non-Valid Index (${n})`]}set(e,n){const t=this.addKVPair(e,n);return this.updateArray(),t}addKVPair(e,n){const[t,r]=this.getIndexByKey(e);return t?this.data[r]?this.data[r].add(new v(e,n))?(this.collNodes+=1,this.storedNodes+=1,2===this.data[r].size?(this.collIndexes+=1,"Success! - New Collision at: "+r):"Success! - Another Collision at: "+r):"Replaced at: "+r:(this.data[r]=new x(new v(e,n)),this.storedIndexes+=1,this.storedNodes+=1,"Success! - New List Created at: "+r):r}updateArray(){if(this.storedNodes<this.data.length*this.loadFactor)return;console.log("New Array");const e=this.data;let n=2*e.length;for(;n*this.loadFactor<=this.storedNodes;)n*=2;this.data=new Array(n),this.storedIndexes=0,this.storedNodes=0,this.collIndexes=0,this.collNodes=0;for(let n in e){if(!e[n])continue;let t=e[n].head;for(;t;)this.set(t.key,t.value),t=t.next}}hashForOutput(e){const n=this.hashWrapper(e);return`${e} hashed to ${n} -> coerced to ${parseInt(n)}`}getValueByKey(e){const[n,t]=this.getIndexByKey(e);if(!n)return t;if(!this.data[t])return`Nothing Found at Key: ${e} -> Index: ${t}`;const r=this.data[t].getNodeByKey(e);return r?`Value of Key (${e}) = ${r.value}`:`Error: Key (${e}) -> Index: ${t} Not Found`}removeNodeByKey(e){const[n,t]=this.getIndexByKey(e);return n?this.data[t]?this.data[t].remove(e)?(this.storedNodes-=1,0===this.data[t].size?(this.data[t]=null,this.storedIndexes-=1):1===this.data[t].size?(this.collIndexes-=1,this.collNodes-=1):this.collNodes-=1,`Success - Removed Key: ${e} at Index: ${t}`):`Error: Key (${e}) -> Index: ${t} Not Found`:`Nothing Found at Key: ${e} -> Index: ${t}`:t}toStringArray(){let e=[];for(let n of this.data)n&&e.push(n.toStringArray());return e}getKeysOrValues(e){const n=this.toStringArray();let t=0===e?"Keys: ":"Values: ";for(let r in n)t+=n[r].map((n=>n.split(":")[e])).join(", "),t+=", ";return t}getKeysAndValues(){const e=this.toStringArray();let n="Key:Value = ";for(let t in e)n+=e[t].join(", "),n+=", ";return n}toString(){let e="";for(let n in this.data)this.data[n]&&(e+=`${n}: [ `,e+=this.data[n].toStringArray().join(", "),e+=" ], ");return e}inputArray(e){console.log("Start Multiple: ");let n="Added: ",t="Failed: ",r="Replaced: ";for(let[a,o]of e){let e=this.addKVPair(a,o);e.startsWith("Success")?n+=`${a}:${o}, `:e.startsWith("Replaced")?r+=`${a}:${o}, `:t+=`${a}:${o}, `}return console.log("End Multiple","\n",""),this.updateArray(),[n,r,t].join("\n")}}class x{constructor(e){this.head=e,this.tail=e,this.size=1}add(e){const n=this.getNodeByKey(e.key);return n?(n.value=e.value,!1):(this.append(e),!0)}getNodeByKey(e){let n=this.head;for(;n;){if(n.key===e)return n;n=n.next}return!1}append(e){this.tail.next=e,this.tail=e,this.size+=1}remove(e){if(1===this.size&&this.head.key===e)return this.size=0,!0;if(this.head.key===e)return this.head=this.head.next,this.size-=1,!0;let n=this.head;for(;n&&n.next.key!==e;)n=n.next;return!!n&&(n.next=n.next.next,this.size-=1,!0)}toStringArray(){let e=this.head,n=[];for(;e;)n.push(e.toString()),e=e.next;return n}}class v{constructor(e,n,t=null){this.key=e,this.value=n,this.next=t}toString(){return`${"string"==typeof this.key?`"${this.key}"`:this.key}:${"string"==typeof this.value?`"${this.value}"`:this.value}`}}const B=document.querySelector("#function"),C=document.querySelector("#input-array-v"),E=document.querySelector("#display-response"),k=document.querySelector("#display-hashmap"),w=document.querySelector("#length"),N=document.querySelector("#nodes"),S=document.querySelector("#indexes"),$=document.querySelector("#load");let I=new b,K=g;function F(e){return'"'===e.at(0)&&'"'===e.at(-1)||"'"===e.at(0)&&"'"===e.at(-1)?e.slice(1,-1):parseFloat(e)}function j(e,n){M(n(F(...z(e))))}function z(e){const n=[];return e.parentNode.querySelectorAll("textarea").forEach((e=>n.push(e.value))),e.parentNode.querySelectorAll("input").forEach((e=>n.push(e.value))),n}function M(e){E.innerText=e,k.textContent=I.toString(),w.textContent=`Capacity: ${I.data.length}`,N.textContent=`Node Collisions: ${I.collNodes}/${I.storedNodes}`,S.textContent=`Index Collisions: ${I.collIndexes}/${I.storedIndexes}`,$.textContent=`Load Factor: ${I.loadFactor}`}M(""),B.placeholder=K,B.value=K,C.placeholder=m,C.value=m,document.addEventListener("click",(function(e){if("BUTTON"!==!e.target.tagName)switch(e.target.id){case"generate-function":!function(e,n,t){try{const r=new b(e,+n,+t);I=r,K=e,M("Successfully Created New HashMap")}catch(e){M("Hash Function "+e)}}(...z(e.target));break;case"input-array-b":M(I.inputArray(function(e=m){return e.split(",").map((e=>e.trim().split(":"))).filter((e=>2===e.length)).map((([e,n])=>[F(e),F(n)]))}(C.value)));break;case"hash-b":j(e.target,I.hashForOutput.bind(I));break;case"set-b":!function(e){const n=z(e).map((e=>F(e)));M(I.set(...n))}(e.target);break;case"get-b":j(e.target,I.getValueByKey.bind(I));break;case"remove-b":j(e.target,I.removeNodeByKey.bind(I));break;case"clear-b":I=new b(K),M("Cleared!");break;case"keys-b":M(I.getKeysOrValues(0));break;case"values-b":M(I.getKeysOrValues(1));break;case"keys-values-b":M(I.getKeysAndValues())}}))})();
//# sourceMappingURL=main.js.map