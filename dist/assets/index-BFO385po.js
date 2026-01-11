var Ut=Object.defineProperty;var Lt=(o,t,e)=>t in o?Ut(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var h=(o,t,e)=>Lt(o,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,nt=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol(),pt=new WeakMap;let St=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(nt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}};const Nt=o=>new St(typeof o=="string"?o:o+"",void 0,lt),f=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new St(e,o,lt)},jt=(o,t)=>{if(nt)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},ut=nt?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Nt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Rt,defineProperty:Ht,getOwnPropertyDescriptor:Vt,getOwnPropertyNames:Yt,getOwnPropertySymbols:qt,getPrototypeOf:Jt}=Object,w=globalThis,ht=w.trustedTypes,Xt=ht?ht.emptyScript:"",R=w.reactiveElementPolyfillSupport,P=(o,t)=>o,J={toAttribute(o,t){switch(t){case Boolean:o=o?Xt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Ct=(o,t)=>!Rt(o,t),gt={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:Ct};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=gt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ht(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=Vt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){const c=i==null?void 0:i.call(this);r==null||r.call(this,a),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=Jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,s=[...Yt(e),...qt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ut(i))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return jt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const a=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:J).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){var r,a;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const c=s.getPropertyOptions(i),l=typeof c.converter=="function"?{fromAttribute:c.converter}:((r=c.converter)==null?void 0:r.fromAttribute)!==void 0?c.converter:J;this._$Em=i;const d=l.fromAttribute(e,c.type);this[i]=d??((a=this._$Ej)==null?void 0:a.get(i))??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){var a;if(t!==void 0){const c=this.constructor;if(i===!1&&(r=this[t]),s??(s=c.getPropertyOptions(t)),!((s.hasChanged??Ct)(r,e)||s.useDefault&&s.reflect&&r===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(c._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,a]of i){const{wrapped:c}=a,l=this[r];c!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,a,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,R==null||R({ReactiveElement:E}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,mt=o=>o,N=O.trustedTypes,bt=N?N.createPolicy("lit-html",{createHTML:o=>o}):void 0,Et="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+x,Kt=`<${At}>`,S=document,I=()=>S.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",ct=Array.isArray,Wt=o=>ct(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",H=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,vt=/>/g,_=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,xt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,Gt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),n=Gt(1),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),wt=new WeakMap,$=S.createTreeWalker(S,129);function Mt(o,t){if(!ct(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}const Qt=(o,t)=>{const e=o.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",a=M;for(let c=0;c<e;c++){const l=o[c];let d,u,p=-1,g=0;for(;g<l.length&&(a.lastIndex=g,u=a.exec(l),u!==null);)g=a.lastIndex,a===M?u[1]==="!--"?a=ft:u[1]!==void 0?a=vt:u[2]!==void 0?(Ft.test(u[2])&&(i=RegExp("</"+u[2],"g")),a=_):u[3]!==void 0&&(a=_):a===_?u[0]===">"?(a=i??M,p=-1):u[1]===void 0?p=-2:(p=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?_:u[3]==='"'?xt:yt):a===xt||a===yt?a=_:a===ft||a===vt?a=M:(a=_,i=void 0);const v=a===_&&o[c+1].startsWith("/>")?" ":"";r+=a===M?l+Kt:p>=0?(s.push(d),l.slice(0,p)+Et+l.slice(p)+x+v):l+x+(p===-2?c:v)}return[Mt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class T{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,a=0;const c=t.length-1,l=this.parts,[d,u]=Qt(t,e);if(this.el=T.createElement(d,s),$.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=$.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(Et)){const g=u[a++],v=i.getAttribute(p).split(x),U=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:U[2],strings:v,ctor:U[1]==="."?te:U[1]==="?"?ee:U[1]==="@"?se:j}),i.removeAttribute(p)}else p.startsWith(x)&&(l.push({type:6,index:r}),i.removeAttribute(p));if(Ft.test(i.tagName)){const p=i.textContent.split(x),g=p.length-1;if(g>0){i.textContent=N?N.emptyScript:"";for(let v=0;v<g;v++)i.append(p[v],I()),$.nextNode(),l.push({type:2,index:++r});i.append(p[g],I())}}}else if(i.nodeType===8)if(i.data===At)l.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(x,p+1))!==-1;)l.push({type:7,index:r}),p+=x.length-1}r++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function F(o,t,e=o,s){var a,c;if(t===A)return t;let i=s!==void 0?(a=e._$Co)==null?void 0:a[s]:e._$Cl;const r=z(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=F(o,i._$AS(o,t.values),i,s)),t}class Zt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??S).importNode(e,!0);$.currentNode=i;let r=$.nextNode(),a=0,c=0,l=s[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new B(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new ie(r,this,t)),this._$AV.push(d),l=s[++c]}a!==(l==null?void 0:l.index)&&(r=$.nextNode(),a++)}return $.currentNode=S,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(Mt(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const a=new Zt(i,this),c=a.u(this.options);a.p(e),this.T(c),this._$AH=a}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new T(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new B(this.O(I()),this.O(I()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=mt(t).nextSibling;mt(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){const r=this.strings;let a=!1;if(r===void 0)t=F(this,t,e,0),a=!z(t)||t!==this._$AH&&t!==A,a&&(this._$AH=t);else{const c=t;let l,d;for(t=r[0],l=0;l<r.length-1;l++)d=F(this,c[s+l],e,l),d===A&&(d=this._$AH[l]),a||(a=!z(d)||d!==this._$AH[l]),d===m?t=m:t!==m&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}a&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class te extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}}class ee extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}}class se extends j{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??m)===A)return;const s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class ie{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const V=O.litHtmlPolyfillSupport;V==null||V(T,B),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.2");const oe=(o,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new B(t.insertBefore(I(),r),r,void 0,e??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis;class b extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=oe(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}}var kt;b._$litElement$=!0,b.finalized=!0,(kt=k.litElementHydrateSupport)==null||kt.call(k,{LitElement:b});const Y=k.litElementPolyfillSupport;Y==null||Y({LitElement:b});(k.litElementVersions??(k.litElementVersions=[])).push("4.2.2");const Dt="ttstar_users",dt="ttstar_current_user",Pt="ttstar_login_history",re="ttstar_auto_login",_t=5;function Ot(){try{const o=localStorage.getItem(Dt);return o?JSON.parse(o):[]}catch(o){return console.error("获取用户数据失败:",o),[]}}function ae(o){try{return localStorage.setItem(Dt,JSON.stringify(o)),!0}catch(t){return console.error("保存用户数据失败:",t),!1}}function It(o){return Ot().find(e=>e.username.toLowerCase()===o.toLowerCase())}function ne(o){if(It(o.username))return{success:!1,error:"用户名已存在"};const t=Ot(),e={id:"user-"+Date.now(),username:o.username,password:o.password,role:"user",createdAt:new Date().toISOString(),...o.birthday&&{birthday:o.birthday},...o.gender&&{gender:o.gender},...o.school&&{school:o.school}};return t.push(e),ae(t)?{success:!0,user:e}:{success:!1,error:"保存用户数据失败"}}function le(o,t){const e=It(o);if(!e)return{success:!1,error:"用户名不存在"};if(e.password!==t)return{success:!1,error:"密码错误"};const{password:s,...i}=e;return localStorage.setItem(dt,JSON.stringify(i)),de(o),{success:!0,user:i}}function zt(){try{const o=localStorage.getItem(dt);return o?JSON.parse(o):null}catch(o){return console.error("获取当前用户失败:",o),null}}function ce(){try{return localStorage.removeItem(dt),localStorage.removeItem("app-settings"),!0}catch(o){return console.error("登出失败:",o),!1}}function Tt(){try{const o=localStorage.getItem(Pt);return o?JSON.parse(o):[]}catch(o){return console.error("获取登录历史失败:",o),[]}}function de(o){try{let t=Tt();return t=t.filter(e=>e.username.toLowerCase()!==o.toLowerCase()),t.unshift({username:o,lastLogin:new Date().toISOString()}),t.length>_t&&(t=t.slice(0,_t)),localStorage.setItem(Pt,JSON.stringify(t)),!0}catch(t){return console.error("添加登录历史失败:",t),!1}}function pe(){try{const o=localStorage.getItem(re);return o?JSON.parse(o):[]}catch(o){return console.error("获取自动登录用户列表失败:",o),[]}}function $t(o){return pe().includes(o.toLowerCase())}class X extends b{constructor(){super(),this.username="User",this.isMenuOpen=!1,this.isSettingsOpen=!1,this.darkMode=!1,this.hasUnreadMessages=!1,this.isLogoutConfirmOpen=!1,this.isSwitchAccountOpen=!1,this.loginHistory=[],this.isLoading=!1,this.currentAction="",this.error="",this.updateGreeting(),setInterval(()=>this.updateGreeting(),6e4)}connectedCallback(){super.connectedCallback();const t=zt();t&&(this.username=t.username)}updateGreeting(){const t=new Date().getHours();t<12?this.greeting="早上好":t<18?this.greeting="下午好":this.greeting="晚上好"}render(){return n`
      <div class="header-content">
        <div class="logo">抬头望星</div>
        <div class="user-area">
          <span class="greeting">${this.greeting}, ${this.username}</span>
          <div 
            class="avatar" 
            @click=${this._toggleMenu}
            @keydown=${this._handleKeyDown}
            tabindex="0"
            role="button"
            aria-haspopup="menu"
            aria-expanded=${this.isMenuOpen}
            aria-controls="user-menu"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=${this.username}" 
              width="100%" 
              height="100%" 
              alt="用户头像" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <!-- Main User Menu -->
      <div 
        id="user-menu"
        class="user-menu ${this.isMenuOpen?"open":""}"
        role="menu"
        aria-labelledby="user-avatar"
        @click=${this._handleMenuClick}
      >
        <!-- Core Menu Items -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("messages")}
          role="menuitem"
          tabindex="0"
          aria-label="消息"
          aria-haspopup="false"
        >
          <span>💬</span> 消息
          ${this.hasUnreadMessages?n`<span class="notification-dot" aria-hidden="true"></span>`:""}
        </div>
        
        <!-- Settings with Submenu -->
        <div 
          class="menu-item has-submenu"
          @click=${()=>this._toggleSettingsSubmenu()}
          role="menuitem"
          tabindex="0"
          aria-haspopup="menu"
          aria-expanded=${this.isSettingsOpen}
          aria-controls="settings-submenu"
        >
          <span>⚙️</span> 设置
        </div>
        
        <!-- About -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("about")}
          role="menuitem"
          tabindex="0"
          aria-label="关于"
        >
          <span>ℹ️</span> 关于
        </div>
        
        <!-- Divider -->
        <div class="menu-divider"></div>
        
        <!-- Account Switch -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("switch-account")}
          role="menuitem"
          tabindex="0"
          aria-label="切换账号"
        >
          <span>🔄</span> 切换账号
        </div>
        
        <!-- Logout -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("logout")}
          role="menuitem"
          tabindex="0"
          aria-label="退出账号"
          style="color: var(--color-state-error)"
        >
          <span>🚪</span> 退出账号
        </div>
      </div>
      
      <!-- Settings Submenu -->
      <div 
        id="settings-submenu"
        class="settings-submenu ${this.isSettingsOpen?"open":""}"
        role="menu"
        aria-labelledby="settings-menu"
      >
        <!-- Personal Profile -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("profile-edit")}
          role="menuitem"
          tabindex="0"
          aria-label="个人资料编辑"
        >
          <span>👤</span> 个人资料
        </div>
        
        <!-- Notification Settings -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("notification-settings")}
          role="menuitem"
          tabindex="0"
          aria-label="通知设置"
        >
          <span>🔔</span> 通知设置
        </div>
        
        <!-- Privacy Settings -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("privacy-settings")}
          role="menuitem"
          tabindex="0"
          aria-label="隐私设置"
        >
          <span>🔒</span> 隐私设置
        </div>
        
        <!-- Theme Settings -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("theme-settings")}
          role="menuitem"
          tabindex="0"
          aria-label="主题与外观"
        >
          <span>${this.darkMode?"☀️":"🌙"}</span> ${this.darkMode?"浅色模式":"深色模式"}
        </div>
        
        <!-- Account Security -->
        <div 
          class="menu-item" 
          @click=${()=>this._handleAction("security-settings")}
          role="menuitem"
          tabindex="0"
          aria-label="账号安全"
        >
          <span>🛡️</span> 账号安全
        </div>
      </div>

      <!-- Logout Confirmation Dialog -->
      ${this.isLogoutConfirmOpen?n`
        <div class="confirm-dialog" role="alertdialog" aria-labelledby="logout-confirm-title">
          <div class="confirm-dialog-content">
            <h3 class="confirm-dialog-title" id="logout-confirm-title">退出登录</h3>
            <p class="confirm-dialog-message">确定要退出当前账号吗？</p>
            <div class="confirm-dialog-buttons">
              <button 
                class="confirm-dialog-button cancel" 
                @click=${()=>this.isLogoutConfirmOpen=!1}
              >
                取消
              </button>
              <button 
                class="confirm-dialog-button confirm" 
                @click=${this._confirmLogout}
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Switch Account Dialog -->
      ${this.isSwitchAccountOpen?n`
        <div class="switch-account-dialog" role="dialog" aria-labelledby="switch-account-title">
          <div class="switch-account-content">
            <div class="switch-account-header">
              <h3 class="switch-account-title" id="switch-account-title">切换账号</h3>
              <button 
                class="close-button" 
                @click=${()=>this.isSwitchAccountOpen=!1}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <div class="account-list">
              ${this.isLoading?n`
                <div class="loading">
                  <div class="loading-spinner"></div>
                </div>
              `:this.loginHistory.length>0?n`
                ${this.loginHistory.map(t=>{const e=$t(t.username),s=t.username===this.username;return n`
                    <div 
                      class="account-item ${s?"selected":""}" 
                      @click=${()=>this._selectAccount(t.username)}
                      role="button"
                      tabindex="0"
                    >
                      <div class="account-avatar">
                        ${t.username.charAt(0).toUpperCase()}
                      </div>
                      <div class="account-info">
                        <div class="account-username">
                          ${t.username}
                          ${s?n`<span style="font-size: 0.8rem; color: var(--color-primary); margin-left: 8px;">(当前)</span>`:""}
                        </div>
                        <div class="account-last-login">
                          ${new Date(t.lastLogin).toLocaleString()}
                        </div>
                      </div>
                      ${e?n`<span class="auto-login-indicator">自动登录</span>`:""}
                    </div>
                  `})}
              `:n`
                <div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">
                  暂无登录历史
                </div>
              `}
            </div>
          </div>
        </div>
      `:""}

      <!-- Password Input Dialog -->
      ${this.currentAction==="password-required"?n`
        <div class="password-dialog" role="dialog" aria-labelledby="password-dialog-title">
          <div class="password-dialog-content">
            <div class="password-dialog-header">
              <h3 class="password-dialog-title" id="password-dialog-title">请输入密码</h3>
              <button 
                class="close-button" 
                @click=${()=>this.currentAction=""}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <form @submit=${this._handlePasswordSubmit}>
              <div class="password-form-group">
                <label for="password-input" class="password-label">密码</label>
                <input 
                  type="password" 
                  id="password-input" 
                  class="password-input" 
                  placeholder="请输入密码" 
                  required
                  autofocus
                >
              </div>
              <div class="password-dialog-buttons">
                <button 
                  type="button" 
                  class="password-dialog-button cancel" 
                  @click=${()=>this.currentAction=""}
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  class="password-dialog-button submit"
                  ?disabled=${this.isLoading}
                >
                  ${this.isLoading?n`<div class="loading-spinner"></div>`:"登录"}
                </button>
              </div>
            </form>
          </div>
        </div>
      `:""}
    `}_toggleMenu(){this.isMenuOpen=!this.isMenuOpen}_toggleSettingsSubmenu(){this.isSettingsOpen=!this.isSettingsOpen}_handleAction(t){this.isMenuOpen=!1,t==="logout"?this.isLogoutConfirmOpen=!0:t==="switch-account"?this._openSwitchAccountDialog():t==="toggle-dark-mode"?this.dispatchEvent(new CustomEvent("toggle-dark-mode",{bubbles:!0,composed:!0})):t==="settings"?this.dispatchEvent(new CustomEvent("toggle-settings",{bubbles:!0,composed:!0})):t==="about"&&this.dispatchEvent(new CustomEvent("navigate",{detail:{id:"about"},bubbles:!0,composed:!0}))}async _confirmLogout(){this.isLoading=!0;try{await new Promise(e=>setTimeout(e,500)),ce()?(this.dispatchEvent(new CustomEvent("logout-success",{bubbles:!0,composed:!0})),this.isLogoutConfirmOpen=!1,this.isMenuOpen=!1,this.isSettingsOpen=!1):(console.error("登出失败，请重试"),this.error="登出失败，请重试",setTimeout(()=>{this.error=""},3e3))}catch(t){console.error("Logout failed:",t),this.error="登出过程中发生错误",setTimeout(()=>{this.error=""},3e3)}finally{this.isLoading=!1}}async _openSwitchAccountDialog(){this.isLoading=!0;try{this.loginHistory=Tt(),this.isSwitchAccountOpen=!0}catch(t){console.error("Failed to load login history:",t)}finally{this.isLoading=!1}}_selectAccount(t){if(t===this.username){this.isSwitchAccountOpen=!1;return}$t(t)?this._handleAutoLogin(t):(this.selectedAccount=t,this.currentAction="password-required"),this.isSwitchAccountOpen=!1}async _handleAutoLogin(t){this.isLoading=!0;try{await new Promise(e=>setTimeout(e,1e3)),window.location.reload()}catch(e){console.error("Auto-login failed:",e),this.isLoading=!1}}async _handlePasswordSubmit(t){t.preventDefault(),this.isLoading=!0,this.shadowRoot.getElementById("password-input").value;try{await new Promise(s=>setTimeout(s,1e3)),window.location.reload()}catch(s){console.error("Password validation failed:",s)}finally{this.isLoading=!1,this.currentAction=""}}}h(X,"properties",{greeting:{type:String},username:{type:String},isMenuOpen:{type:Boolean},isSettingsOpen:{type:Boolean},darkMode:{type:Boolean},hasUnreadMessages:{type:Boolean},isLogoutConfirmOpen:{type:Boolean},isSwitchAccountOpen:{type:Boolean},loginHistory:{type:Array},isLoading:{type:Boolean},currentAction:{type:String},error:{type:String}}),h(X,"styles",f`
    :host {
      display: block;
      height: var(--header-height);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 20;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--glass-border);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: none;
    }

    .user-area {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .greeting {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-bg-surface);
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;
      border: 2px solid var(--color-bg-surface);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .avatar:hover {
      transform: scale(1.05);
      border-color: var(--color-primary);
    }

    .avatar:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* Main Menu */
    .user-menu {
      position: absolute;
      top: 70px;
      right: 20px;
      background: var(--color-bg-main);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 8px;
      width: 220px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      transform-origin: top right;
      transform: scaleY(0);
      opacity: 0;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease;
      z-index: 100;
      overflow: hidden;
    }

    .user-menu.open {
      transform: scaleY(1);
      opacity: 1;
    }

    /* Settings Submenu */
    .settings-submenu {
      position: absolute;
      top: 0;
      right: 100%;
      background: var(--color-bg-main);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 8px;
      width: 220px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      transform-origin: top right;
      transform: translateX(20px) scaleX(0);
      opacity: 0;
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease;
      z-index: 99;
    }

    .settings-submenu.open {
      transform: translateX(0) scaleX(1);
      opacity: 1;
    }

    /* Menu Items */
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      color: var(--color-text-main);
      text-decoration: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.15s, color 0.2s;
      font-size: 0.95rem;
      position: relative;
      user-select: none;
      outline: none;
    }

    .menu-item:hover {
      background-color: var(--color-bg-surface);
      color: var(--color-primary);
      transform: translateY(-1px);
    }

    .menu-item:focus {
      background-color: var(--color-bg-surface);
      outline: 2px solid var(--color-primary);
    }

    .menu-item:active {
      transform: translateY(0);
    }

    .menu-item.selected {
      background-color: var(--color-bg-surface);
      color: var(--color-primary);
    }

    .menu-item.has-submenu::after {
      content: '⟩';
      font-size: 0.8rem;
      opacity: 0.7;
    }

    /* Unread Messages Indicator */
    .notification-dot {
      position: absolute;
      top: 12px;
      right: 16px;
      width: 8px;
      height: 8px;
      background: #EF4444;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
    }

    /* Dividers */
    .menu-divider {
      height: 1px;
      background: var(--glass-border);
      margin: 8px 0;
    }

    /* Accessibility */
    [role="menu"] {
      outline: none;
    }

    [role="menuitem"] {
      cursor: pointer;
    }

    [role="menuitem"]:hover {
      background-color: var(--color-bg-surface);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 0 12px;
      }

      .logo {
        font-size: 1.2rem;
      }

      .greeting {
        display: none;
      }

      .user-menu,
      .settings-submenu {
        right: 12px;
        left: 12px;
        width: auto;
        max-width: 300px;
      }

      .settings-submenu {
        top: 100%;
        right: 0;
        transform-origin: top right;
        transform: translateY(20px) scaleY(0);
      }

      .settings-submenu.open {
        transform: translateY(0) scaleY(1);
      }
    }

    /* High Contrast Support */
    @media (prefers-contrast: high) {
      .menu-item {
        border: 1px solid transparent;
      }

      .menu-item:hover {
        border-color: var(--color-primary);
      }
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      .user-menu,
      .settings-submenu,
      .menu-item,
      .avatar {
        transition: none;
      }
    }

    /* Confirmation Dialog */
    .confirm-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .confirm-dialog-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .confirm-dialog-title {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 12px;
      text-align: center;
    }

    .confirm-dialog-message {
      color: var(--color-text-secondary);
      margin-bottom: 20px;
      text-align: center;
      line-height: 1.5;
    }

    .confirm-dialog-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .confirm-dialog-button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .confirm-dialog-button.cancel {
      background: var(--color-bg-surface);
      color: var(--color-text-main);
      border: 1px solid var(--glass-border);
    }

    .confirm-dialog-button.cancel:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .confirm-dialog-button.confirm {
      background: var(--color-state-error);
      color: white;
    }

    .confirm-dialog-button.confirm:hover {
      background: var(--color-state-error-hover);
    }

    /* Switch Account Dialog */
    .switch-account-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .switch-account-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .switch-account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .switch-account-title {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .close-button {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .account-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 300px;
      overflow-y: auto;
    }

    .account-item {
      display: flex;
      align-items: center;
      padding: 12px;
      background: var(--color-bg-surface);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .account-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    .account-item.selected {
      border-color: var(--color-primary);
      background: rgba(90, 100, 255, 0.1);
    }

    .account-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-primary);
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
    }

    .account-info {
      flex: 1;
    }

    .account-username {
      font-weight: 500;
      margin-bottom: 2px;
    }

    .account-last-login {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
    }

    .auto-login-indicator {
      color: var(--color-primary);
      font-size: 0.8rem;
      background: rgba(90, 100, 255, 0.1);
      padding: 2px 6px;
      border-radius: 10px;
    }

    /* Password Input Dialog */
    .password-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .password-dialog-content {
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .password-dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .password-dialog-title {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .password-form-group {
      margin-bottom: 20px;
    }

    .password-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .password-input {
      width: 100%;
      padding: 10px;
      background: var(--color-bg-surface);
      border: 1px solid var(--glass-border);
      border-radius: 6px;
      color: var(--color-text-main);
      font-size: 1rem;
    }

    .password-input:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .password-dialog-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .password-dialog-button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .password-dialog-button.cancel {
      background: var(--color-bg-surface);
      color: var(--color-text-main);
      border: 1px solid var(--glass-border);
    }

    .password-dialog-button.cancel:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .password-dialog-button.submit {
      background: var(--color-primary);
      color: white;
    }

    .password-dialog-button.submit:hover {
      background: var(--color-primary-hover);
    }

    /* Loading State */
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `);customElements.define("app-header",X);class K extends b{constructor(){super(),this.searchQuery="",this.categories=[{name:"工具箱",children:[{name:"计时器",id:"timer",pinyin:"jsq"},{name:"单位转换",id:"converter",pinyin:"dwzh"},{name:"计算器",id:"calculator",pinyin:"jsq"}]},{name:"开发工具",children:[{name:"JSON格式化",id:"json-fmt",pinyin:"jsongsh"},{name:"Base64编解码",id:"base64",pinyin:"base64bjm"}]}]}render(){const t=this._filterCategories();return n`
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索功能..." 
          .value=${this.searchQuery}
          @input=${this._onSearch}
        >
      </div>
      
      <div class="nav-tree">
        ${t.map(e=>n`
          <div class="category-group">
            <div class="category-title">${e.name}</div>
            ${e.children.map(s=>n`
              <a class="nav-item" @click=${()=>this._selectItem(s.id)}>
                ${s.name}
              </a>
            `)}
          </div>
        `)}
      </div>
    `}_onSearch(t){this.searchQuery=t.target.value}_filterCategories(){if(!this.searchQuery)return this.categories;const t=this.searchQuery.toLowerCase();return this.categories.map(e=>{const s=e.children.filter(i=>i.name.toLowerCase().includes(t)||i.pinyin&&i.pinyin.includes(t));return s.length>0?{...e,children:s}:null}).filter(e=>e!==null)}_selectItem(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{id:t},bubbles:!0,composed:!0}))}}h(K,"properties",{categories:{type:Array},searchQuery:{type:String}}),h(K,"styles",f`
    :host {
      display: block;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      border-right: 1px solid var(--glass-border);
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      transition: background 0.3s ease;
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.8);
      color: var(--color-text-main);
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s;
    }
    
    .search-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--primary-hue), var(--primary-sat), var(--primary-light), 0.1);
    }

    .category-group {
      margin-bottom: 15px;
    }

    .category-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      margin-bottom: 10px;
      padding-left: 10px;
      font-weight: 600;
      opacity: 0.8;
    }

    .nav-item {
      display: block;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      color: var(--color-text-main);
      text-decoration: none;
      margin-bottom: 4px;
    }

    .nav-item:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--color-primary);
      transform: translateX(4px);
    }
  `);customElements.define("app-sidebar",K);class W extends b{constructor(){super(),this.time=0,this.isRunning=!1,this.mode="stopwatch",this.interval=null,this.presets=[1,5,10,25,30,60],this.inputTime=5,this.showTimeInput=!1,this.customHours=0,this.customMinutes=5,this.customSeconds=0,this.isAlerting=!1,this._showEndModal=!1,this._warningSound=null,this._endSound=null,this._preloadSounds()}render(){return n`
      <div class="container">
        <div class="tabs">
          <div class="tab ${this.mode==="stopwatch"?"active":""}" @click=${()=>this._setMode("stopwatch")}>秒表</div>
          <div class="tab ${this.mode==="timer"?"active":""}" @click=${()=>this._setMode("timer")}>倒计时</div>
        </div>

        <div class="display ${this.isAlerting?"alert":""}">${this._formatTime(this.time)}</div>

        <div class="controls">
          <button class="primary" @click=${this._toggle}>
            ${this.isRunning?"暂停":"开始"}
          </button>
          <button @click=${this._reset}>重置</button>
          ${this.mode==="timer"?n`
            <button @click=${()=>this._toggleTimeInput}>${this.showTimeInput?"取消":"设置时间"}</button>
          `:""}
        </div>

        ${this.mode==="timer"&&this.showTimeInput?n`
          <div class="time-input-container">
            <div class="time-input-row">
              <div class="time-input-group">
                <div class="time-input-label">小时</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="23" 
                  .value=${this.customHours} 
                  @input=${t=>this.customHours=Math.max(0,Math.min(23,parseInt(t.target.value)||0))}
                >
              </div>
              <div>:</div>
              <div class="time-input-group">
                <div class="time-input-label">分钟</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="59" 
                  .value=${this.customMinutes} 
                  @input=${t=>this.customMinutes=Math.max(0,Math.min(59,parseInt(t.target.value)||0))}
                >
              </div>
              <div>:</div>
              <div class="time-input-group">
                <div class="time-input-label">秒钟</div>
                <input 
                  type="number" 
                  class="time-input" 
                  min="0" 
                  max="59" 
                  .value=${this.customSeconds} 
                  @input=${t=>this.customSeconds=Math.max(0,Math.min(59,parseInt(t.target.value)||0))}
                >
              </div>
            </div>
            <button class="primary set-time-btn" @click=${this._setCustomTime}>设置</button>
          </div>
        `:""}

        ${this.mode==="timer"&&!this.showTimeInput?n`
          <div class="presets">
            ${this.presets.map(t=>n`
              <button class="preset-btn" @click=${()=>this._setTimer(t)}>${t} 分钟</button>
            `)}
          </div>
        `:""}
      </div>

      <!-- End timer modal -->
      ${this._showEndModal?n`
        <div class="modal-overlay">
          <div class="modal-content">
            <h2 class="modal-title">⏰</h2>
            <p class="modal-message">计时结束</p>
            <button class="modal-btn" @click=${()=>this._showEndModal=!1}>确定</button>
          </div>
        </div>
      `:""}
    `}_formatTime(t){const e=Math.floor(t/1e3),s=Math.floor(e/3600),i=Math.floor(e%3600/60),r=e%60,a=Math.floor(t%1e3/10);return s>0?`${s.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}.${a.toString().padStart(2,"0")}`:`${i.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}.${a.toString().padStart(2,"0")}`}_setMode(t){this.mode=t,this._reset()}_toggle(){if(this.isRunning)clearInterval(this.interval),this.isRunning=!1;else{const t=Date.now()-(this.mode==="stopwatch"?this.time:0),e=Date.now()+this.time;this.interval=setInterval(()=>{if(this.mode==="stopwatch")this.time=Date.now()-t;else{const s=e-Date.now();this.isAlerting=s<=1e4&&s>0,s<=3e3&&s>0&&s%1e3<100&&this._playWarningSound(),s<=0?(this.time=0,this.isAlerting=!1,this._reset(),this._handleTimerEnd()):this.time=s}},10),this.isRunning=!0}}_reset(){clearInterval(this.interval),this.isRunning=!1,this.isAlerting=!1,this._showEndModal=!1,this.time=this.mode==="stopwatch"?0:this.inputTime*60*1e3}_setTimer(t){this.inputTime=t,this._reset()}_notify(){Notification.permission==="granted"?new Notification("时间到!",{body:"您的倒计时已结束。"}):Notification.permission!=="denied"&&Notification.requestPermission()}_preloadSounds(){try{const t=this._generateTone(800,200);this._warningSound=this._createAudioFromBuffer(t);const e=this._generateTone(440,500);this._endSound=this._createAudioFromBuffer(e)}catch(t){console.error("Failed to preload sounds:",t),this._warningSound=new Audio,this._endSound=new Audio}}_generateTone(t,e){const i=e/1e3,r=Math.floor(i*44100),a=new ArrayBuffer(r*2),c=new DataView(a);for(let l=0;l<r;l++){const d=l/44100,u=Math.sin(2*Math.PI*t*d)*.3,p=Math.max(-32768,Math.min(32767,u*32768));c.setInt16(l*2,p,!0)}return a}_createAudioFromBuffer(t){const e=new Audio,s=new Blob([t],{type:"audio/wav"});return e.src=URL.createObjectURL(s),e}_playWarningSound(){this._warningSound&&(this._warningSound.currentTime=0,this._warningSound.play().catch(t=>console.warn("Failed to play warning sound:",t)))}_playEndSound(){this._endSound&&(this._endSound.currentTime=0,this._endSound.play().catch(t=>console.warn("Failed to play end sound:",t)))}_toggleTimeInput(){this.showTimeInput=!this.showTimeInput}_setCustomTime(){const t=this.customHours*3600+this.customMinutes*60+this.customSeconds;t>0&&(this.inputTime=t/60,this._reset(),this.showTimeInput=!1)}_handleTimerEnd(){this._playEndSound(),this._showEndModal=!0,this._notify()}}h(W,"properties",{time:{type:Number},isRunning:{type:Boolean},mode:{type:String},presets:{type:Array},inputTime:{type:Number},showTimeInput:{type:Boolean},customHours:{type:Number},customMinutes:{type:Number},customSeconds:{type:Number},isAlerting:{type:Boolean}}),h(W,"styles",f`
    :host {
      display: block;
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .display {
      font-size: 5rem;
      font-weight: 200;
      font-feature-settings: "tnum";
      font-variant-numeric: tabular-nums;
      text-shadow: 0 0 20px rgba(160, 160, 255, 0.3);
      transition: color 0.3s ease;
    }

    .display.alert {
      color: #ff6b6b;
      text-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
      animation: pulse 1s infinite alternate;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }

    .controls {
      display: flex;
      gap: 15px;
    }

    button {
      padding: 12px 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    button.primary {
      background: linear-gradient(45deg, #6a11cb, #2575fc);
      border: none;
    }

    .tabs {
      display: flex;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      padding: 4px;
      margin-bottom: 20px;
    }

    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 6px;
      opacity: 0.7;
    }

    .tab.active {
      background: rgba(255,255,255,0.1);
      opacity: 1;
    }

    .presets {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }

    .preset-btn {
      padding: 6px 12px;
      font-size: 0.9rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.05);
    }

    .time-input-container {
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .time-input-row {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }

    .time-input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .time-input-label {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .time-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      width: 60px;
      padding: 8px;
      border-radius: 6px;
      font-size: 1.2rem;
      text-align: center;
      font-feature-settings: "tnum";
    }

    .time-input:focus {
      outline: 2px solid rgba(255,255,255,0.3);
    }

    .set-time-btn {
      margin-top: 15px;
      width: 100%;
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: rgba(255,255,255,0.95);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      min-width: 300px;
    }

    .modal-title {
      color: var(--color-text-main);
      font-size: 2rem;
      margin: 0 0 15px 0;
    }

    .modal-message {
      color: var(--color-text-secondary);
      font-size: 1.2rem;
      margin: 0 0 25px 0;
    }

    .modal-btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .display {
        font-size: 3.5rem;
      }
      
      .time-input-row {
        gap: 5px;
      }
      
      .time-input {
        width: 50px;
        font-size: 1rem;
        padding: 6px;
      }
      
      .time-input-container {
        padding: 15px;
      }
    }
  `);customElements.define("timer-tool",W);const C={length:{base:"m",units:{km:1e3,m:1,cm:.01,mm:.001,mile:1609.34,yard:.9144,foot:.3048,inch:.0254}},weight:{base:"kg",units:{t:1e3,kg:1,g:.001,mg:1e-6,lb:.453592,oz:.0283495}},temperature:{special:!0,units:["C","F","K"]}};class G extends b{constructor(){super(),this.category="length",this.fromUnit="m",this.toUnit="km",this.value=1,this._calculate()}render(){return n`
      <div class="container">
        <div class="category-select">
          <button class="cat-btn ${this.category==="length"?"active":""}" @click=${()=>this._setCategory("length")}>长度</button>
          <button class="cat-btn ${this.category==="weight"?"active":""}" @click=${()=>this._setCategory("weight")}>重量</button>
          <button class="cat-btn ${this.category==="temperature"?"active":""}" @click=${()=>this._setCategory("temperature")}>温度</button>
        </div>

        <div class="converter-row">
          <div class="input-group">
            <input type="number" .value=${this.value} @input=${this._onInput}>
            <select .value=${this.fromUnit} @change=${t=>{this.fromUnit=t.target.value,this._calculate()}}>
              ${this._renderOptions()}
            </select>
          </div>

          <div class="equals">=</div>

          <div class="input-group">
            <input type="number" .value=${this.result} readonly>
            <select .value=${this.toUnit} @change=${t=>{this.toUnit=t.target.value,this._calculate()}}>
              ${this._renderOptions()}
            </select>
          </div>
        </div>
      </div>
    `}_renderOptions(){return this.category==="temperature"?C.temperature.units.map(t=>n`
        <option value=${t}>${t}</option>
      `):C[this.category]?Object.keys(C[this.category].units).map(t=>n`
      <option value=${t}>${t}</option>
    `):""}_setCategory(t){this.category=t;let e;t==="temperature"?e=C.temperature.units:e=Object.keys(C[t].units),this.fromUnit=e[0],this.toUnit=e[1]||e[0],this._calculate()}_onInput(t){this.value=parseFloat(t.target.value),this._calculate()}_calculate(){if(this.category==="temperature"){let r;this.fromUnit==="C"?r=this.value:this.fromUnit==="F"?r=(this.value-32)*5/9:this.fromUnit==="K"&&(r=this.value-273.15),this.toUnit==="C"?this.result=r:this.toUnit==="F"?this.result=r*9/5+32:this.toUnit==="K"&&(this.result=r+273.15),this.result=Number(this.result.toFixed(2));return}const t=C[this.category],e=t.units[this.fromUnit],s=t.units[this.toUnit],i=this.value*e;this.result=Number((i/s).toFixed(6))}}h(G,"properties",{category:{type:String},fromUnit:{type:String},toUnit:{type:String},value:{type:Number},result:{type:Number}}),h(G,"styles",f`
    :host {
      display: block;
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .category-select {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .cat-btn {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
      color: white;
      cursor: pointer;
    }

    .cat-btn.active {
      background: #a0a0ff;
      border-color: #a0a0ff;
    }

    .converter-row {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(255,255,255,0.05);
      padding: 20px;
      border-radius: 12px;
    }

    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    input, select {
      padding: 10px;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: white;
      font-size: 1.2rem;
    }

    .equals {
      font-size: 2rem;
      color: rgba(255,255,255,0.5);
    }
  `);customElements.define("unit-converter",G);class Q extends b{constructor(){super(),this.display="0",this.equation="",this._newNumber=!0}render(){return n`
      <div class="calculator">
        <div class="screen">
          <div class="equation">${this.equation}</div>
          <div class="current">${this.display}</div>
        </div>
        <div class="keypad">
          <button class="btn-clr" @click=${this._clear}>AC</button>
          <button class="btn-op" @click=${this._del}>DEL</button>
          <button class="btn-op" @click=${()=>this._op("%")}>%</button>
          <button class="btn-op" @click=${()=>this._op("/")}>÷</button>
          
          <button @click=${()=>this._num("7")}>7</button>
          <button @click=${()=>this._num("8")}>8</button>
          <button @click=${()=>this._num("9")}>9</button>
          <button class="btn-op" @click=${()=>this._op("*")}>×</button>
          
          <button @click=${()=>this._num("4")}>4</button>
          <button @click=${()=>this._num("5")}>5</button>
          <button @click=${()=>this._num("6")}>6</button>
          <button class="btn-op" @click=${()=>this._op("-")}>-</button>
          
          <button @click=${()=>this._num("1")}>1</button>
          <button @click=${()=>this._num("2")}>2</button>
          <button @click=${()=>this._num("3")}>3</button>
          <button class="btn-op" @click=${()=>this._op("+")}>+</button>
          
          <button @click=${()=>this._num("0")}>0</button>
          <button @click=${()=>this._num(".")}>.</button>
          <button class="btn-eq" @click=${this._calc}>=</button>
        </div>
      </div>
    `}_num(t){if(this._newNumber)this.display=t,this._newNumber=!1;else{if(t==="."&&this.display.includes("."))return;this.display==="0"&&t!=="."?this.display=t:this.display+=t}}_op(t){this.equation=`${this.display} ${t}`,this._newNumber=!0,this._prevVal=parseFloat(this.display),this._currentOp=t}_del(){this.display.length>1?this.display=this.display.slice(0,-1):(this.display="0",this._newNumber=!0)}_clear(){this.display="0",this.equation="",this._newNumber=!0,this._prevVal=null,this._currentOp=null}_calc(){if(!this._currentOp||this._prevVal===null)return;const t=parseFloat(this.display);let e=0;switch(this._currentOp){case"+":e=this._prevVal+t;break;case"-":e=this._prevVal-t;break;case"*":e=this._prevVal*t;break;case"/":e=this._prevVal/t;break;case"%":e=this._prevVal%t;break}e=parseFloat(e.toFixed(10)),this.equation=`${this._prevVal} ${this._currentOp} ${t} =`,this.display=String(e),this._newNumber=!0,this._prevVal=null,this._currentOp=null}}h(Q,"properties",{display:{type:String},equation:{type:String}}),h(Q,"styles",f`
    :host {
      display: block;
      color: white;
    }

    .calculator {
      max-width: 320px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .screen {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      text-align: right;
    }

    .equation {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      height: 1.4rem;
      overflow: hidden;
    }

    .current {
      font-size: 2.8rem;
      font-weight: 500;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 600px) {
      .current {
        font-size: 2.2rem;
      }
      
      .equation {
        font-size: 0.9rem;
      }
      
      .calculator {
        max-width: 280px;
        padding: 16px;
      }
      
      .keypad {
        gap: 10px;
      }
      
      button {
        padding: 12px 0;
        font-size: 1.1rem;
      }
    }

    .keypad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    button {
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.2rem;
      padding: 15px 0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    button:active {
      transform: translateY(0);
    }

    .btn-op {
      color: #a0a0ff;
      background: rgba(160, 160, 255, 0.1);
    }
    
    .btn-op:hover {
      background: rgba(160, 160, 255, 0.2);
    }

    .btn-eq {
      background: #a0a0ff;
      color: white;
      grid-column: span 2;
    }

    .btn-eq:hover {
      background: #b0b0ff;
    }

    .btn-clr {
      color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }

    .btn-clr:hover {
      background: rgba(255, 107, 107, 0.2);
    }
  `);customElements.define("calculator-tool",Q);class Z extends b{constructor(){super(),this.messages=[],this.isLoading=!1,this.hasUnreadMessages=!1}connectedCallback(){super.connectedCallback(),this._loadMessages()}async _loadMessages(){this.isLoading=!0;try{await new Promise(e=>setTimeout(e,500));const t=localStorage.getItem("messages");t?this.messages=JSON.parse(t):(this.messages=this._generateMockMessages(),this._saveMessages()),this._updateUnreadStatus()}catch(t){console.error("加载消息失败:",t)}finally{this.isLoading=!1}}_generateMockMessages(){return[{id:1,title:"欢迎使用抬头望星",content:"感谢您注册使用我们的服务！在这里，您可以管理您的日常任务、使用各种实用工具，享受流畅的用户体验。",time:new Date(Date.now()-36e5).toISOString(),read:!1},{id:2,title:"新版本更新通知",content:"我们刚刚发布了新版本，增加了更多实用功能和性能优化。快去体验吧！",time:new Date(Date.now()-72e5).toISOString(),read:!0},{id:3,title:"提醒：完成您的个人资料",content:"请完善您的个人资料，让我们更好地为您服务。",time:new Date(Date.now()-108e5).toISOString(),read:!1},{id:4,title:"系统维护通知",content:"我们将在今晚23:00-次日1:00进行系统维护，期间服务可能会暂时中断。",time:new Date(Date.now()-144e5).toISOString(),read:!0},{id:5,title:"积分奖励通知",content:"您已获得100积分奖励！继续使用我们的服务，可获得更多积分。",time:new Date(Date.now()-18e6).toISOString(),read:!1}]}_saveMessages(){localStorage.setItem("messages",JSON.stringify(this.messages))}_updateUnreadStatus(){this.hasUnreadMessages=this.messages.some(t=>!t.read),this.dispatchEvent(new CustomEvent("unread-status-changed",{detail:{hasUnread:this.hasUnreadMessages},bubbles:!0,composed:!0}))}_markAsRead(t){const e=this.messages.findIndex(s=>s.id===t);if(e!==-1&&!this.messages[e].read){const s=[...this.messages];s[e]={...s[e],read:!0},this.messages=s,this._saveMessages(),this._updateUnreadStatus()}}async _markAllAsRead(){if(this.hasUnreadMessages){this.isLoading=!0;try{await new Promise(t=>setTimeout(t,800)),this.messages=this.messages.map(t=>({...t,read:!0})),this._saveMessages(),this._updateUnreadStatus(),this._showToast("所有消息已标记为已读")}catch(t){console.error("标记消息失败:",t),this._showToast("操作失败，请重试","error")}finally{this.isLoading=!1}}}_handleMessageClick(t){this._markAsRead(t.id),console.log("查看消息详情:",t)}_showToast(t,e="success"){const s=document.createElement("div");s.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      background: ${e==="success"?"#10B981":"#EF4444"};
    `,s.textContent=t,document.body.appendChild(s),setTimeout(()=>{s.style.animation="slideOut 0.3s ease-out forwards",setTimeout(()=>{document.body.removeChild(s)},300)},2e3)}render(){return this.isLoading?n`
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载消息中...</p>
        </div>
      `:n`
      <div class="message-container">
        <div class="header">
          <h1 class="title">消息中心</h1>
          <button 
            class="action-btn"
            @click=${this._markAllAsRead}
            ?disabled=${!this.hasUnreadMessages}
          >
            <span>${this.isLoading?"⏳":"✓"}</span>
            一键已读
          </button>
        </div>
        
        ${this.messages.length===0?n`
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <p>暂无消息</p>
          </div>
        `:n`
          <ul class="messages-list" role="list">
            ${this.messages.map(t=>n`
              <li 
                class="message-item"
                @click=${()=>this._handleMessageClick(t)}
                role="listitem"
                data-message-id=${t.id}
                data-read=${t.read}
              >
                <div class="message-content">
                  <h3 class="message-title ${t.read?"read":"unread"}">
                    ${t.title}
                  </h3>
                  <p class="message-preview">${t.content}</p>
                  <p class="message-time">${this._formatTime(t.time)}</p>
                </div>
                ${t.read?"":n`<div class="message-status"><span class="status-dot" role="presentation"></span></div>`}
              </li>
            `)}
          </ul>
        `}
      </div>

      <style>
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
    `}_formatTime(t){const e=new Date(t),i=new Date-e;return i<6e4?"刚刚":i<36e5?`${Math.floor(i/6e4)}分钟前`:i<864e5?`${Math.floor(i/36e5)}小时前`:e.toLocaleDateString()}}h(Z,"properties",{messages:{type:Array},isLoading:{type:Boolean},hasUnreadMessages:{type:Boolean}}),h(Z,"styles",f`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .message-container {
      background: var(--color-bg-main);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: var(--color-bg-surface);
      border-bottom: 1px solid var(--glass-border);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-text-main);
      margin: 0;
    }

    .action-btn {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .action-btn:hover {
      background: var(--color-primary-hover);
      transform: translateY(-1px);
    }

    .action-btn:active {
      transform: translateY(0);
    }

    .action-btn:disabled {
      background: var(--color-text-secondary);
      cursor: not-allowed;
      transform: none;
    }

    .messages-list {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 600px;
      overflow-y: auto;
      /* 性能优化：使用虚拟滚动相关样式 */
      contain: content;
      will-change: scroll-position;
    }

    .message-item {
      padding: 16px 20px;
      border-bottom: 1px solid var(--glass-border);
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      /* 性能优化：减少重绘 */
      will-change: background-color, transform;
      contain: layout;
    }

    .message-item:last-child {
      border-bottom: none;
    }

    .message-item:hover {
      background-color: var(--color-bg-surface);
      transform: translateX(4px);
    }

    .message-content {
      flex: 1;
      min-width: 0;
    }

    .message-title {
      font-size: 1rem;
      margin: 0 0 6px 0;
      transition: color 0.2s, font-weight 0.2s;
    }

    .message-title.unread {
      color: #111827;
      font-weight: bold;
    }

    .message-title.read {
      color: #6B7280;
      font-weight: normal;
    }

    .message-preview {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      margin: 0 0 8px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .message-time {
      font-size: 0.8rem;
      color: var(--color-text-tertiary);
      margin: 0;
    }

    .message-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      margin-left: 16px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #EF4444;
      flex-shrink: 0;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: var(--color-text-secondary);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .loading-state {
      padding: 40px 20px;
      text-align: center;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-bg-surface);
      border-top: 3px solid var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      :host {
        padding: 0 12px;
      }

      .header {
        padding: 16px;
      }

      .title {
        font-size: 1.25rem;
      }

      .message-item {
        padding: 12px 16px;
      }
    }
  `);customElements.define("message-list",Z);class tt extends b{constructor(){super(),this.currentView="dashboard"}render(){return this.currentView==="dashboard"?n`
        <div class="grid">
          ${this._renderCards()}
        </div>
      `:n`
      <div class="container">
        <button class="back-btn" @click=${()=>this._navigate("dashboard")}>
          ← 返回仪表盘
        </button>
        <div class="tool-container">
          ${this._renderTool()}
        </div>
      </div>
    `}_renderTool(){switch(this.currentView){case"timer":return n`<timer-tool></timer-tool>`;case"converter":return n`<unit-converter></unit-converter>`;case"calculator":return n`<calculator-tool></calculator-tool>`;case"messages":return n`<message-list @unread-status-changed=${this._handleUnreadStatusChanged}></message-list>`;default:return n`<div>功能开发中...</div>`}}_handleUnreadStatusChanged(t){this.dispatchEvent(new CustomEvent("unread-status-changed",{detail:t.detail,bubbles:!0,composed:!0}))}_renderCards(){return[{id:"messages",title:"消息中心",icon:"💬",desc:"查看系统通知和消息"},{id:"timer",title:"计时器",icon:"⏱️",desc:"精准倒计时与秒表"},{id:"converter",title:"单位转换",icon:"⚖️",desc:"32种单位实时换算"},{id:"color",title:"颜色工具",icon:"🎨",desc:"HSL/RGB/HEX 转换"},{id:"todo",title:"待办事项",icon:"📝",desc:"高效任务管理"},{id:"weather",title:"天气",icon:"☁️",desc:"实时天气查看"},{id:"settings",title:"设置",icon:"⚙️",desc:"个性化偏好设置"}].map((e,s)=>n`
      <div class="card" 
           style="animation-delay: ${s*.1}s"
           @click=${()=>this._navigate(e.id)}>
        <span class="icon">${e.icon}</span>
        <h2>${e.title}</h2>
        <p>${e.desc}</p>
      </div>
    `)}_navigate(t){t==="settings"?this.dispatchEvent(new CustomEvent("toggle-settings",{bubbles:!0,composed:!0})):(this.currentView=t,this.dispatchEvent(new CustomEvent("view-changed",{detail:{view:t},bubbles:!0,composed:!0})))}}h(tt,"properties",{currentView:{type:String}}),h(tt,"styles",f`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .container {
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      padding: 10px 0 50px 0;
      width: 100%;
      box-sizing: border-box;
    }

    .card {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 24px;
      color: var(--color-text-main);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                  box-shadow 0.4s ease, 
                  border-color 0.3s ease;
      cursor: pointer;
      opacity: 0;
      animation: slideIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      box-shadow: var(--shadow-card), inset 0 0 20px rgba(255, 255, 255, 0.02);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      position: relative;
      overflow: hidden;
      text-align: left;
    }

    /* Ambient colored blob for liquid feel */
    .card::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 120px;
      height: 120px;
      background: var(--color-primary);
      filter: blur(60px);
      opacity: 0.15;
      border-radius: 50%;
      transition: all 0.6s ease;
      z-index: 0;
    }

    /* Surface shine effect */
    .card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        115deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.05) 30%, 
        rgba(255, 255, 255, 0.15) 50%, 
        rgba(255, 255, 255, 0.05) 70%, 
        transparent 100%
      );
      transform: skewX(-20deg);
      pointer-events: none;
      transition: none;
    }

    .card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: var(--shadow-hover), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      z-index: 1;
    }

    .card:hover::before {
      opacity: 0.25;
      transform: scale(1.5) translate(-20px, 20px);
    }

    .card:hover::after {
      left: 100%;
      transition: left 0.7s ease-in-out;
    }

    .icon, h2, p {
      position: relative;
      z-index: 1;
    }

    .back-btn {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      color: var(--color-text-main);
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 12px;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    }

    .back-btn:hover {
      background: var(--color-bg-surface);
      color: var(--color-primary);
      transform: translateX(-4px);
    }

    .tool-container {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-card);
      animation: fadeIn 0.4s ease-out;
      max-width: 1200px;
      margin: 0 auto;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    h2 { 
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-main);
      letter-spacing: -0.01em;
    }
    
    p { 
      margin: 0;
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 4px;
      display: block;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
      transition: transform 0.3s ease;
    }

    .card:hover .icon {
      transform: scale(1.1) rotate(5deg);
    }

    @media (max-width: 600px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 0 0 30px 0;
      }
      .card {
        padding: 20px;
        flex-direction: row;
        align-items: center;
      }
      .icon {
        margin-bottom: 0;
        margin-right: 16px;
        font-size: 2rem;
      }
      .tool-container {
        padding: 20px;
      }
    }
  `);customElements.define("app-main",tt);class et extends b{constructor(){super(),this.value="",this._viewDate=new Date,this._isOpen=!1,this.minYear=1900,this.maxDate=new Date,this._handleOutsideClick=this._handleOutsideClick.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleOutsideClick)}_handleOutsideClick(t){const e=typeof t.composedPath=="function"?t.composedPath():[];this._isOpen&&!e.includes(this)&&(this._isOpen=!1)}render(){const t=this.value||"年 / 月 / 日",e=!this.value,s=this.maxDate.getFullYear(),i=this.maxDate.getMonth();return n`
      ${this.label?n`<label>${this.label}</label>`:""}
      <div class="input-wrapper">
        <button
          type="button"
          class="date-input ${this._isOpen?"active":""}"
          style="${e?"color: rgba(255,255,255,0.5)":""}"
          aria-haspopup="dialog"
          aria-expanded=${this._isOpen?"true":"false"}
          @click=${this._toggleOpen}
          @keydown=${this._onInputKeydown}
        >
          ${t}
          <span class="calendar-icon">📅</span>
        </button>
        
        <input type="hidden" name="${this.name}" .value=${this.value}>

        <div class="dropdown ${this._isOpen?"open":""}" @click=${r=>r.stopPropagation()} @keydown=${this._onDropdownKeydown}>
          <div class="header">
            <button class="nav-btn" @click=${()=>this._changeMonth(-1)}>←</button>
            <div class="month-year">
              <select
                aria-label="选择年份"
                .value=${String(this._viewDate.getFullYear())}
                @change=${r=>this._setYear(parseInt(r.target.value,10))}
              >
                ${Array.from({length:s-this.minYear+1},(r,a)=>this.minYear+a).map(r=>n`
                  <option value=${String(r)}>${r}年</option>
                `)}
              </select>
              <select
                aria-label="选择月份"
                .value=${String(this._viewDate.getMonth()+1)}
                @change=${r=>this._setMonth(parseInt(r.target.value,10)-1)}
              >
                ${Array.from({length:12},(r,a)=>a+1).map(r=>n`
                  <option value=${String(r)} ?disabled=${this._viewDate.getFullYear()===s&&r-1>i}>${r}月</option>
                `)}
              </select>
            </div>
            <button class="nav-btn" @click=${()=>this._changeMonth(1)}>→</button>
          </div>

          <div class="weekdays">
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
          </div>

          <div class="days">
            ${this._renderDays()}
          </div>

          <div class="actions">
            <button class="action-btn" @click=${this._clear}>清除</button>
            <button class="action-btn" @click=${this._today}>今天</button>
          </div>
        </div>
      </div>
    `}_renderDays(){const t=this._viewDate.getFullYear(),e=this._viewDate.getMonth(),s=new Date(t,e,1).getDay(),i=new Date(t,e+1,0).getDate(),r=new Date(t,e,0).getDate(),a=[];for(let d=s-1;d>=0;d--){const u=r-d,p=new Date(t,e-1,u),g=!this._isDateSelectable(p);a.push(n`
        <button
          type="button"
          class="day other-month"
          ?disabled=${g}
          data-date=${this._formatDate(p.getFullYear(),p.getMonth(),p.getDate())}
          @click=${()=>this._selectDay(p.getFullYear(),p.getMonth(),p.getDate())}
        >${u}</button>
      `)}const c=new Date;for(let d=1;d<=i;d++){const u=this.value===this._formatDate(t,e,d),p=c.getFullYear()===t&&c.getMonth()===e&&c.getDate()===d,g=new Date(t,e,d),v=!this._isDateSelectable(g);a.push(n`
        <button
          type="button"
          class="day ${u?"selected":""} ${p?"today":""}"
          ?disabled=${v}
          data-date=${this._formatDate(g.getFullYear(),g.getMonth(),g.getDate())}
          @click=${()=>this._selectDay(g.getFullYear(),g.getMonth(),g.getDate())}
        >${d}</button>
      `)}const l=42-a.length;for(let d=1;d<=l;d++){const u=new Date(t,e+1,d),p=!this._isDateSelectable(u);a.push(n`
        <button
          type="button"
          class="day other-month"
          ?disabled=${p}
          data-date=${this._formatDate(u.getFullYear(),u.getMonth(),u.getDate())}
          @click=${()=>this._selectDay(u.getFullYear(),u.getMonth(),u.getDate())}
        >${d}</button>
      `)}return a}_formatDate(t,e,s){const i=new Date(t,e,s),r=i.getFullYear(),a=String(i.getMonth()+1).padStart(2,"0"),c=String(i.getDate()).padStart(2,"0");return`${r}-${a}-${c}`}_toggleOpen(){this._isOpen=!this._isOpen,this._isOpen&&this.value&&(this._viewDate=this._clampViewDate(new Date(this.value))),this._isOpen&&this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".day.selected"),e=this.renderRoot.querySelector(".day:not([disabled])"),s=t||e;s&&typeof s.focus=="function"&&s.focus()})}_changeMonth(t){const e=new Date(this._viewDate);e.setMonth(e.getMonth()+t),this._viewDate=this._clampViewDate(e)}_selectDay(t,e,s){const i=new Date(t,e,s);this._isDateSelectable(i)&&(this.value=this._formatDate(i.getFullYear(),i.getMonth(),i.getDate()),this._isOpen=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}_clear(t){t.stopPropagation(),this.value="",this._isOpen=!1}_today(t){t.stopPropagation();const e=new Date;this._selectDay(e.getFullYear(),e.getMonth(),e.getDate())}_setYear(t){const e=new Date(this._viewDate);e.setFullYear(t),this._viewDate=this._clampViewDate(e)}_setMonth(t){const e=new Date(this._viewDate);e.setMonth(t),this._viewDate=this._clampViewDate(e)}_clampViewDate(t){const e=new Date(this.minYear,0,1),s=new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),1),i=new Date(t);return i.setDate(1),i<e?e:i>s?s:i}_isDateSelectable(t){const e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),s=new Date(this.minYear,0,1),i=new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),this.maxDate.getDate());return e>=s&&e<=i}_onInputKeydown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._toggleOpen()),t.key==="Escape"&&(t.preventDefault(),this._isOpen=!1)}_onDropdownKeydown(t){var c;if(t.key==="Escape"){t.preventDefault(),this._isOpen=!1;return}const e={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};if(!(t.key in e))return;t.preventDefault();const s=this.renderRoot.activeElement,i=(c=s==null?void 0:s.dataset)==null?void 0:c.date;if(!i)return;const r=new Date(i);if(r.setDate(r.getDate()+e[t.key]),!this._isDateSelectable(r))return;this._viewDate=this._clampViewDate(r);const a=this._formatDate(r.getFullYear(),r.getMonth(),r.getDate());this.updateComplete.then(()=>{const l=this.renderRoot.querySelector(`.day[data-date="${a}"]:not([disabled])`);l&&typeof l.focus=="function"&&l.focus()})}}h(et,"properties",{name:{type:String},label:{type:String},value:{type:String},_viewDate:{state:!0},_isOpen:{state:!0}}),h(et,"styles",f`
    :host {
      display: block;
      position: relative;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .input-wrapper {
      position: relative;
      cursor: pointer;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .date-input {
      width: 100%;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      appearance: none;
    }

    .date-input:hover, .date-input.active {
      border-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    .date-input:focus-visible {
      border-color: var(--color-primary, #a0a0ff);
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .calendar-icon {
      opacity: 0.7;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 300px;
      margin-top: 8px;
      background: #1a1a20;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      z-index: 1000;
      padding: 16px;
      animation: slideDown 0.2s ease-out;
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .month-year {
      font-weight: 600;
      color: white;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .month-year select {
      background: rgba(255, 255, 255, 0.08);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 8px;
      outline: none;
      cursor: pointer;
    }

    .month-year select:focus-visible {
      border-color: var(--color-primary, #a0a0ff);
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .nav-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 1.2rem;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      margin-bottom: 8px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.2s;
      background: none;
      border: none;
      padding: 0;
    }

    .day:hover:not(.empty) {
      background: rgba(255, 255, 255, 0.1);
    }

    .day.selected {
      background: var(--color-primary, #6a11cb);
      color: white;
      font-weight: bold;
    }

    .day.today {
      border: 1px solid var(--color-primary, #6a11cb);
    }

    .day.empty {
      cursor: default;
    }

    .day.other-month {
      color: rgba(255, 255, 255, 0.3);
    }

    .day:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .day:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(160, 160, 255, 0.15);
    }

    .actions {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .action-btn {
      background: none;
      border: none;
      color: var(--color-primary, #a0a0ff);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .action-btn:hover {
      background: rgba(160, 160, 255, 0.1);
    }
    
    /* Mobile optimization */
    @media (max-width: 480px) {
      .dropdown {
        width: 100%;
        left: 0;
        right: 0;
        position: fixed;
        bottom: 0;
        top: auto;
        margin: 0;
        border-radius: 16px 16px 0 0;
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .day {
        padding: 8px;
      }
    }
  `);customElements.define("date-picker",et);function st(o){return o?o.length<8?"密码长度不足8位":/[A-Z]/.test(o)?/[a-z]/.test(o)?/\d/.test(o)?null:"密码必须包含至少一个数字":"密码必须包含至少一个小写字母":"密码必须包含至少一个大写字母":"密码不能为空"}class it extends b{constructor(){super(),this.mode="login",this.error="",this.isLoading=!1}render(){return n`
      <div class="modal">
        <h2>${this.mode==="login"?"登录":"注册"}</h2>
        ${this.error?n`<div class="error">${this.error}</div>`:""}
        
        <form @submit=${this._handleSubmit}>
          <div class="form-group">
            <label>用户名</label>
            <input type="text" name="username" required minlength="4" maxlength="20" @input=${this._clearError}>
          </div>
          
          <div class="form-group">
            <label>密码</label>
            <input type="password" name="password" required @input=${this._onPasswordInput}>
          </div>

          ${this.mode==="register"?n`
            <div class="form-group">
              <date-picker name="birthday" label="生日"></date-picker>
            </div>
            <div class="form-group">
              <label>性别</label>
              <select name="gender">
                <option value="other">保密</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div class="form-group">
              <label>就读学校</label>
              <input type="text" name="school">
            </div>
          `:""}

          <button type="submit" ?disabled=${this.isLoading}>
            ${this.isLoading?"处理中...":this.mode==="login"?"进入星空":"创建账号"}
          </button>
        </form>

        <div class="switch-mode">
          ${this.mode==="login"?n`还没有账号? <a @click=${()=>this._switchMode("register")}>立即注册</a>`:n`已有账号? <a @click=${()=>this._switchMode("login")}>直接登录</a>`}
        </div>
      </div>
    `}_switchMode(t){this.mode=t,this.error=""}_clearError(){this.error&&(this.error="")}_onPasswordInput(t){if(!this.error)return;const e=t.target.value;st(e)||(this.error="")}async _handleSubmit(t){t.preventDefault(),this.isLoading=!0,this.error="";const e=new FormData(t.target),s=Object.fromEntries(e.entries());if(this.mode==="register"){const i=st(s.password);if(i){this.error=i,this.isLoading=!1;return}}if(this.mode==="register"){const i=this.shadowRoot.querySelector("date-picker");i&&(s.birthday=i.value)}try{if(await new Promise(i=>setTimeout(i,800)),this.mode==="register"){const i=ne(s);i.success?(this.mode="login",this.error="注册成功，请登录",t.target&&t.target.reset()):this.error=i.error}else{const i=le(s.username,s.password);i.success?this.dispatchEvent(new CustomEvent("login-success",{detail:{user:i.user}})):this.error=i.error}}catch(i){this.error="操作失败，请稍后重试",console.error("认证失败:",i)}finally{this.isLoading=!1}}}h(it,"properties",{mode:{type:String},error:{type:String},isLoading:{type:Boolean}}),h(it,"styles",f`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .modal {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 40px;
      width: 400px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
      color: white;
      animation: popup 0.3s ease-out;
    }

    @keyframes popup {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: 300;
      letter-spacing: 2px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    input, select {
      width: 100%;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }

    input:focus, select:focus {
      border-color: #a0a0ff;
    }

    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(45deg, #6a11cb, #2575fc);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    button:hover {
      opacity: 0.9;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-mode {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9rem;
    }

    .switch-mode a {
      color: #a0a0ff;
      text-decoration: none;
      cursor: pointer;
    }

    .error {
      color: #ff6b6b;
      text-align: center;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }
  `);customElements.define("auth-modal",it);function Bt(){return{themeId:"morning-glory",customPrimaryColor:null,darkMode:!1,fontSize:16,lineHeight:"standard",customColors:{},language:"zh-CN",animationsEnabled:!0,animationSpeed:"normal",highContrast:!1,notifications:{enabled:!0,sound:!1,desktop:!1},privacy:{analyticsEnabled:!1,profileVisible:!0},storage:{cloudSyncEnabled:!1,autoSyncEnabled:!0,autoSyncIntervalSec:30},functionality:{shortcuts:{},autoSaveIntervalMin:5,defaultFileLocation:""}}}function y(o){const t=Bt();if(!o||typeof o!="object")return t;const e={...t,...D(o,["themeId","darkMode","fontSize","lineHeight","language","animationsEnabled","animationSpeed","highContrast"]),customColors:{...o.customColors||{}},notifications:{...t.notifications,...D(o.notifications,["enabled","sound","desktop"])},privacy:{...t.privacy,...D(o.privacy,["analyticsEnabled","profileVisible"])},storage:{...t.storage,...D(o.storage,["cloudSyncEnabled","autoSyncEnabled","autoSyncIntervalSec"])},functionality:{...t.functionality,...D(o.functionality||{},["shortcuts","autoSaveIntervalMin","defaultFileLocation"])}};return e.fontSize=q(e.fontSize,12,32,t.fontSize),e.storage.autoSyncIntervalSec=q(e.storage.autoSyncIntervalSec,5,300,t.storage.autoSyncIntervalSec),e.functionality.autoSaveIntervalMin=q(e.functionality.autoSaveIntervalMin,1,30,t.functionality.autoSaveIntervalMin),["slow","normal","fast"].includes(e.animationSpeed)||(e.animationSpeed=t.animationSpeed),["compact","standard","loose"].includes(e.lineHeight)||(e.lineHeight=t.lineHeight),["zh-CN","zh-TW","en-US","ja-JP","ko-KR","ar-SA"].includes(e.language)||(e.language=t.language),(typeof e.themeId!="string"||!e.themeId)&&(e.themeId=t.themeId),e.customPrimaryColor&&typeof e.customPrimaryColor!="string"&&(e.customPrimaryColor=null),e.darkMode=!!e.darkMode,e.animationsEnabled=!!e.animationsEnabled,e.highContrast=!!e.highContrast,e.notifications.enabled=!!e.notifications.enabled,e.notifications.sound=!!e.notifications.sound,e.notifications.desktop=!!e.notifications.desktop,e.privacy.analyticsEnabled=!!e.privacy.analyticsEnabled,e.privacy.profileVisible=!!e.privacy.profileVisible,e.storage.cloudSyncEnabled=!!e.storage.cloudSyncEnabled,e.storage.autoSyncEnabled=!!e.storage.autoSyncEnabled,e}function D(o,t){if(!o||typeof o!="object")return{};const e={};for(const s of t)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);return e}function q(o,t,e,s){return typeof o!="number"||Number.isNaN(o)?s:o<t?t:o>e?e:o}class ot extends b{constructor(){super(),this.isVisible=!1,this.section="personal",this.confirmState=null,this.cloudState={status:"idle",message:""},this.backups=[],this.passwordForm={oldPassword:"",newPassword:"",confirmPassword:"",error:"",ok:""},this.languages=[{code:"zh-CN",name:"简体中文"},{code:"zh-TW",name:"繁体中文"},{code:"en-US",name:"English"},{code:"ja-JP",name:"日本語"},{code:"ko-KR",name:"한국어"},{code:"ar-SA",name:"العربية"}],this.themes=[{name:"晨曦微光 (默认)",id:"morning-glory",colors:{primary:"#2563EB",secondary:"#4F46E5",accent:"#F59E0B",bgMain:"#FFFFFF",bgSurface:"#F3F4F6",bgCard:"#FFFFFF",textMain:"#111827",textSecondary:"#4B5563",textDisabled:"#9CA3AF",glassBg:"rgba(255, 255, 255, 0.8)",glassBorder:"rgba(0, 0, 0, 0.05)",stateError:"#EF4444"}},{name:"深色专业版",id:"dark-pro",colors:{primary:"#3B82F6",secondary:"#60A5FA",accent:"#F59E0B",bgMain:"#18181B",bgSurface:"#27272A",bgCard:"#1F1F23",textMain:"#F4F4F5",textSecondary:"#A1A1AA",textDisabled:"#52525B",glassBg:"rgba(24, 24, 27, 0.85)",glassBorder:"rgba(255, 255, 255, 0.08)",stateError:"#EF4444"}},{name:"浅色简约版",id:"light-minimal",colors:{primary:"#171717",secondary:"#404040",accent:"#737373",bgMain:"#FAFAFA",bgSurface:"#FFFFFF",bgCard:"#FFFFFF",textMain:"#171717",textSecondary:"#52525B",textDisabled:"#A1A1AA",glassBg:"rgba(255, 255, 255, 0.9)",glassBorder:"rgba(0, 0, 0, 0.04)",stateError:"#DC2626"}},{name:"高对比度版",id:"high-contrast",colors:{primary:"#FFFF00",secondary:"#00FFFF",accent:"#FF00FF",bgMain:"#000000",bgSurface:"#000000",bgCard:"#121212",textMain:"#FFFFFF",textSecondary:"#FFFF00",textDisabled:"#00FFFF",glassBg:"rgba(0, 0, 0, 0.95)",glassBorder:"#FFFFFF",stateError:"#FF0000"}},{name:"深海蔚蓝",id:"deep-sea",colors:{primary:"#0EA5E9",secondary:"#0284C7",accent:"#38BDF8",bgMain:"#F0F9FF",bgSurface:"#E0F2FE",bgCard:"#FFFFFF",textMain:"#0C4A6E",textSecondary:"#075985",textDisabled:"#94A3B8",glassBg:"rgba(255, 255, 255, 0.75)",glassBorder:"rgba(2, 132, 199, 0.12)",stateError:"#EF4444"}},{name:"暗夜极光",id:"aurora-night",colors:{primary:"#10B981",secondary:"#3B82F6",accent:"#8B5CF6",bgMain:"#0B1220",bgSurface:"#111827",bgCard:"#0F172A",textMain:"#F9FAFB",textSecondary:"rgba(249, 250, 251, 0.75)",textDisabled:"rgba(249, 250, 251, 0.45)",glassBg:"rgba(15, 23, 42, 0.65)",glassBorder:"rgba(255, 255, 255, 0.08)",stateError:"#F87171"}},{name:"落日余晖",id:"sunset-glow",colors:{primary:"#F59E0B",secondary:"#DC2626",accent:"#FCD34D",bgMain:"#FFFBEB",bgSurface:"#FEF3C7",bgCard:"#FFFFFF",textMain:"#451A03",textSecondary:"#78350F",textDisabled:"#A16207",glassBg:"rgba(255, 255, 255, 0.75)",glassBorder:"rgba(245, 158, 11, 0.15)",stateError:"#DC2626"}},{name:"森林物语",id:"forest-whisper",colors:{primary:"#059669",secondary:"#047857",accent:"#34D399",bgMain:"#ECFDF5",bgSurface:"#D1FAE5",bgCard:"#FFFFFF",textMain:"#064E3B",textSecondary:"#065F46",textDisabled:"#6B7280",glassBg:"rgba(255, 255, 255, 0.75)",glassBorder:"rgba(5, 150, 105, 0.15)",stateError:"#EF4444"}},{name:"薰衣草田",id:"lavender-field",colors:{primary:"#8B5CF6",secondary:"#7C3AED",accent:"#C4B5FD",bgMain:"#F5F3FF",bgSurface:"#EDE9FE",bgCard:"#FFFFFF",textMain:"#4C1D95",textSecondary:"#5B21B6",textDisabled:"#6B7280",glassBg:"rgba(255, 255, 255, 0.75)",glassBorder:"rgba(124, 58, 237, 0.15)",stateError:"#EF4444"}}],this.settings=this._loadLocalSettings(),this._applySettings()}connectedCallback(){super.connectedCallback(),this._setupAutoSyncTimer()}disconnectedCallback(){super.disconnectedCallback(),this._clearAutoSyncTimer()}open(){this.isVisible=!0,this.settings.storage.cloudSyncEnabled&&(this._pullFromCloud(),this._loadCloudBackups())}close(){this.isVisible=!1,this.confirmState=null}_loadLocalSettings(){const t=localStorage.getItem("app-settings");if(t)try{return y(JSON.parse(t))}catch{return y(null)}const e=y(null);return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(e.themeId="aurora-night"),e}_saveLocalSettings(){localStorage.setItem("app-settings",JSON.stringify(this.settings))}toggleDarkMode(){this._updateSetting("darkMode",!this.settings.darkMode)}_applySettings(){const t=document.documentElement,e=this.settings.darkMode?"aurora-night":this.settings.themeId,i={...(this.themes.find(l=>l.id===e)||this.themes.find(l=>l.id==="aurora-night")||this.themes[0]).colors},r=this.settings.customColors||{};this.settings.customPrimaryColor&&(r.primary=this.settings.customPrimaryColor);const a={...i,...r};t.style.setProperty("--color-primary",a.primary),t.style.setProperty("--color-secondary",a.secondary),t.style.setProperty("--color-accent",a.accent),t.style.setProperty("--color-bg-main",a.bgMain),t.style.setProperty("--color-bg-surface",a.bgSurface),t.style.setProperty("--color-bg-card",a.bgCard),t.style.setProperty("--color-text-main",a.textMain),t.style.setProperty("--color-text-secondary",a.textSecondary),t.style.setProperty("--color-text-disabled",a.textDisabled),t.style.setProperty("--glass-bg",a.glassBg),t.style.setProperty("--glass-border",a.glassBorder),t.style.setProperty("--color-state-error",a.stateError),t.style.setProperty("--base-font-size",`${this.settings.fontSize}px`);let c="1.5";if(this.settings.lineHeight==="compact"&&(c="1.3"),this.settings.lineHeight==="loose"&&(c="1.7"),t.style.setProperty("--base-line-height",c),document.body.style.lineHeight=c,document.documentElement.lang=this.settings.language,this.settings.highContrast||e==="high-contrast"?(t.style.setProperty("--glass-border",a.glassBorder),t.style.setProperty("--shadow-card","0 0 0 2px "+a.textMain),this.settings.highContrast):t.style.setProperty("--shadow-card","2px 2px 12px rgba(0, 0, 0, 0.08)"),this.settings.animationsEnabled){let l="0.3s";this.settings.animationSpeed==="slow"&&(l="0.6s"),this.settings.animationSpeed==="fast"&&(l="0.15s"),t.style.setProperty("--transition-speed",l)}else t.style.setProperty("--transition-speed","0s");this.dispatchEvent(new CustomEvent("settings-changed",{detail:this.settings,bubbles:!0,composed:!0}))}_updateSetting(t,e){const s=structuredClone(this.settings);ue(s,t,e),this.settings=y(s),this._saveLocalSettings(),this._applySettings(),this._setupAutoSyncTimer(),this.settings.storage.cloudSyncEnabled&&this._scheduleCloudPush()}_setSection(t){this.section=t}_requestConfirm(t,e,s){this.confirmState={title:t,message:e,action:s}}_confirmYes(){var e;const t=(e=this.confirmState)==null?void 0:e.action;this.confirmState=null,typeof t=="function"&&t()}_confirmNo(){this.confirmState=null}_handleOverlayClick(){this.confirmState||this.close()}_handleThemeHover(t){const e=document.documentElement,s=t.colors;e.style.setProperty("--color-primary",s.primary),e.style.setProperty("--color-secondary",s.secondary),e.style.setProperty("--color-accent",s.accent),e.style.setProperty("--color-bg-main",s.bgMain),e.style.setProperty("--color-bg-surface",s.bgSurface),e.style.setProperty("--color-bg-card",s.bgCard),e.style.setProperty("--color-text-main",s.textMain),e.style.setProperty("--color-text-secondary",s.textSecondary),e.style.setProperty("--color-text-disabled",s.textDisabled),e.style.setProperty("--glass-bg",s.glassBg),e.style.setProperty("--glass-border",s.glassBorder),e.style.setProperty("--color-state-error",s.stateError)}_handleThemeLeave(){this._applySettings()}_selectTheme(t){this._updateSetting("themeId",t)}_getToken(){return localStorage.getItem("token")}async _apiFetch(t,e={}){await new Promise(r=>setTimeout(r,500));const s=()=>JSON.parse(localStorage.getItem("mock_cloud_db")||'{"settings":{}, "backups":[]}'),i=r=>localStorage.setItem("mock_cloud_db",JSON.stringify(r));if(t==="/api/settings"){if(e.method==="GET"){const r=s();return{ok:!0,json:async()=>({settings:r.settings})}}if(e.method==="PUT"){const r=s(),a=JSON.parse(e.body);return r.settings=a.settings,i(r),{ok:!0,json:async()=>({success:!0})}}}if(t==="/api/settings/backups"){if(e.method==="GET"){const r=s();return{ok:!0,json:async()=>({backups:r.backups})}}if(e.method==="POST"){const r=s(),a={id:Date.now(),createdAt:new Date().toISOString(),settings:this.settings};return r.backups.unshift(a),r.backups.length>20&&r.backups.pop(),i(r),{ok:!0,json:async()=>({success:!0})}}}if(t==="/api/settings/restore"){const r=s(),a=JSON.parse(e.body),c=r.backups.find(l=>l.id===a.backupId);return c?{ok:!0,json:async()=>({settings:c.settings})}:{ok:!1,json:async()=>({error:"Backup not found"})}}return t==="/api/auth/change-password"?{ok:!0,json:async()=>({success:!0})}:{ok:!1,status:404,json:async()=>({error:"Not Found"})}}_setCloudState(t,e=""){this.cloudState={status:t,message:e}}async _pullFromCloud(){this._setCloudState("loading","正在从云端读取设置...");try{const t=await this._apiFetch("/api/settings",{method:"GET"}),e=await t.json();if(!t.ok)throw new Error(e.error||"云端读取失败");const s=y({...e.settings,storage:{...e.settings.storage,cloudSyncEnabled:!0}});this.settings=s,this._saveLocalSettings(),this._applySettings(),this._setCloudState("ok","云端设置已同步到本机")}catch(t){this._setCloudState("error",t.message||"云端读取失败")}}async _pushToCloud(){this._setCloudState("loading","正在同步到云端...");try{const t=await this._apiFetch("/api/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:this.settings})}),e=await t.json();if(!t.ok)throw new Error(e.error||"云端同步失败");this._setCloudState("ok","云端同步成功")}catch(t){this._setCloudState("error",t.message||"云端同步失败")}}_scheduleCloudPush(){clearTimeout(this._cloudPushTimer),this._cloudPushTimer=setTimeout(()=>{this.settings.storage.cloudSyncEnabled&&this._pushToCloud()},500)}_setupAutoSyncTimer(){if(this._clearAutoSyncTimer(),!(this.settings.storage.cloudSyncEnabled&&this.settings.storage.autoSyncEnabled))return;const e=this.settings.storage.autoSyncIntervalSec*1e3;this._autoSyncTimer=setInterval(()=>{this.settings.storage.cloudSyncEnabled&&this._pushToCloud()},e)}_clearAutoSyncTimer(){this._autoSyncTimer&&clearInterval(this._autoSyncTimer),this._autoSyncTimer=null}_enableCloudSync(){if(!this._getToken()){this._setCloudState("error","未登录，无法启用云端同步");return}this._requestConfirm("启用云端同步","启用后，设置将保存到本机并同步到云端。是否继续？",()=>{this._updateSetting("storage.cloudSyncEnabled",!0),this._pullFromCloud(),this._pushToCloud(),this._loadCloudBackups()})}_disableCloudSync(){this._requestConfirm("关闭云端同步","关闭后将不再自动同步到云端，本地设置仍会保存。是否继续？",()=>this._updateSetting("storage.cloudSyncEnabled",!1))}async _loadCloudBackups(){try{const t=await this._apiFetch("/api/settings/backups",{method:"GET"}),e=await t.json();if(!t.ok)throw new Error(e.error||"读取备份失败");this.backups=Array.isArray(e.backups)?e.backups:[]}catch{this.backups=[]}}async _createCloudBackup(){if(!this._getToken()){this._setCloudState("error","未登录，无法创建云端备份");return}this._setCloudState("loading","正在创建云端备份...");try{const e=await this._apiFetch("/api/settings/backups",{method:"POST"}),s=await e.json();if(!e.ok)throw new Error(s.error||"创建备份失败");await this._loadCloudBackups(),this._setCloudState("ok","云端备份已创建")}catch(e){this._setCloudState("error",e.message||"创建备份失败")}}_restoreCloudBackup(t){this._requestConfirm("从云端备份恢复","恢复会覆盖当前设置，且立即生效。是否继续？",async()=>{this._setCloudState("loading","正在恢复云端备份...");try{const e=await this._apiFetch("/api/settings/restore",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({backupId:t})}),s=await e.json();if(!e.ok)throw new Error(s.error||"恢复失败");const i=y({...s.settings,storage:{...s.settings.storage,cloudSyncEnabled:this.settings.storage.cloudSyncEnabled}});this.settings=i,this._saveLocalSettings(),this._applySettings(),this._setCloudState("ok","云端备份恢复成功")}catch(e){this._setCloudState("error",e.message||"恢复失败")}})}_downloadLocalBackup(){const t={version:1,createdAt:new Date().toISOString(),settings:this.settings},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=`app-settings-backup-${Date.now()}.json`,i.click(),URL.revokeObjectURL(s)}_triggerRestoreInput(){const t=this.shadowRoot.getElementById("restore-file");t&&t.click()}async _restoreFromFile(t){var s;const e=(s=t.target.files)==null?void 0:s[0];if(t.target.value="",!!e)try{const i=await e.text(),r=JSON.parse(i),a=y((r==null?void 0:r.settings)||r);this._requestConfirm("从本地备份恢复","恢复会覆盖当前设置，且立即生效。是否继续？",()=>{const c=this.settings.storage.cloudSyncEnabled;this.settings=y({...a,storage:{...a.storage,cloudSyncEnabled:c}}),this._saveLocalSettings(),this._applySettings(),c&&this._scheduleCloudPush()})}catch{this._setCloudState("error","备份文件解析失败，请确认文件格式正确")}}_resetSettings(){this._requestConfirm("重置设置","重置会恢复默认配置，且立即生效。是否继续？",()=>{const t=Bt();window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(t.themeId="aurora-night");const e=this.settings.storage.cloudSyncEnabled;t.storage.cloudSyncEnabled=e,this.settings=y(t),this._saveLocalSettings(),this._applySettings(),e&&this._scheduleCloudPush()})}_updatePasswordField(t,e){this.passwordForm={...this.passwordForm,[t]:e,error:"",ok:""}}_submitChangePassword(){const{oldPassword:t,newPassword:e,confirmPassword:s}=this.passwordForm;if(!t||!e||!s){this.passwordForm={...this.passwordForm,error:"请完整填写旧密码、新密码和确认密码",ok:""};return}if(e!==s){this.passwordForm={...this.passwordForm,error:"两次输入的新密码不一致",ok:""};return}const i=st(e);if(i){this.passwordForm={...this.passwordForm,error:i,ok:""};return}this._requestConfirm("修改密码","修改密码后需要使用新密码重新登录。是否继续？",async()=>{this.passwordForm={...this.passwordForm,error:"",ok:""};try{const r=await this._apiFetch("/api/auth/change-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldPassword:t,newPassword:e})}),a=await r.json();if(!r.ok)throw new Error(a.error||"密码修改失败");this.passwordForm={oldPassword:"",newPassword:"",confirmPassword:"",error:"",ok:"密码修改成功"}}catch(r){this.passwordForm={...this.passwordForm,error:r.message||"密码修改失败",ok:""}}})}_updateCustomColor(t,e){const s={...this.settings.customColors||{}};e===null?delete s[t]:s[t]=e,this._updateSetting("customColors",s)}_renderColorPicker(t,e){var a,c;const i=(this.themes.find(l=>l.id===this.settings.themeId)||this.themes[0]).colors[t],r=((a=this.settings.customColors)==null?void 0:a[t])||i;return n`
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 0.75rem; color: var(--color-text-secondary);">${e}</span>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="color" .value=${r} @input=${l=>this._updateCustomColor(t,l.target.value)} style="width: 100%; height: 32px; padding: 0; border: 1px solid var(--glass-border); border-radius: 6px;">
          ${(c=this.settings.customColors)!=null&&c[t]?n`
            <button class="btn" style="padding: 0; width: 24px; height: 24px; min-width: 24px; min-height: 24px; display: grid; place-items: center;" @click=${()=>this._updateCustomColor(t,null)} title="重置">×</button>
          `:""}
        </div>
      </div>
    `}_handleExportTheme(){const t=this.themes.find(a=>a.id===this.settings.themeId)||this.themes[0],e={name:`Custom ${t.name}`,colors:{...t.colors,...this.settings.customColors||{}}},s=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`theme-${this.settings.themeId}-${Date.now()}.json`,r.click(),URL.revokeObjectURL(i)}_triggerThemeImport(){this.shadowRoot.getElementById("theme-import-file").click()}async _handleImportTheme(t){var s;const e=(s=t.target.files)==null?void 0:s[0];if(t.target.value="",!!e)try{const i=await e.text(),r=JSON.parse(i);r.colors&&typeof r.colors=="object"&&this._updateSetting("customColors",r.colors)}catch{alert("主题文件解析失败")}}render(){if(!this.isVisible)return n``;const t=this._getCloudStatusText(),e=this.cloudState.status==="ok"?"ok":this.cloudState.status==="error"?"error":this.cloudState.status==="loading"?"loading":"";return n`
      <div class="overlay" @click=${this._handleOverlayClick}></div>
      <div class="panel" @click=${s=>s.stopPropagation()}>
        <div class="header">
          <div class="title">
            <h2>系统设置</h2>
            <div class="subtitle">所有变更将立即生效，并自动保存</div>
          </div>
          <div class="pill ${e}">${t}</div>
          <button class="close-btn" @click=${()=>this.close()}>关闭</button>
        </div>

        <div class="body">
          <div class="nav">
            <button class="nav-btn ${this.section==="personal"?"active":""}" @click=${()=>this._setSection("personal")}>🎨 个性化</button>
            <button class="nav-btn ${this.section==="system"?"active":""}" @click=${()=>this._setSection("system")}>🧩 系统配置</button>
            <button class="nav-btn ${this.section==="storage"?"active":""}" @click=${()=>this._setSection("storage")}>💾 存储与同步</button>
            <button class="nav-btn ${this.section==="security"?"active":""}" @click=${()=>this._setSection("security")}>🔒 账户安全</button>
            <button class="nav-btn ${this.section==="backup"?"active":""}" @click=${()=>this._setSection("backup")}>🗄️ 备份恢复</button>
          </div>
          <div class="content">
            ${this.section==="personal"?this._renderPersonal():""}
            ${this.section==="system"?this._renderSystem():""}
            ${this.section==="storage"?this._renderStorage():""}
            ${this.section==="security"?this._renderSecurity():""}
            ${this.section==="backup"?this._renderBackup():""}
          </div>
        </div>
      </div>

      ${this.confirmState?n`
        <div class="confirm" @click=${this._confirmNo}>
          <div class="confirm-card" @click=${s=>s.stopPropagation()}>
            <div class="confirm-title">${this.confirmState.title}</div>
            <div class="confirm-msg">${this.confirmState.message}</div>
            <div class="confirm-actions">
              <button class="btn" @click=${this._confirmNo}>取消</button>
              <button class="btn primary" @click=${this._confirmYes}>确认</button>
            </div>
          </div>
        </div>
      `:""}
    `}_getCloudStatusText(){return this.settings.storage.cloudSyncEnabled?this.cloudState.status==="loading"?this.cloudState.message||"云端同步：进行中":this.cloudState.status==="ok"?"云端同步：已连接":this.cloudState.status==="error"?this.cloudState.message||"云端同步：失败":"云端同步：已开启":"云端同步：未开启"}_renderPersonal(){const t=this.settings.darkMode;return n`
      <div class="section">
        <h3>主题</h3>
        <p class="desc">
          ${t?"深色模式下主题设置已禁用。切换回浅色模式以自定义主题。":"鼠标悬停可预览主题效果，点击即可应用。主题切换不触发布局重排。"}
        </p>
        
        <div class="row" ?disabled=${t} style="${t?"opacity: 0.6; pointer-events: none;":""}">
          <div class="label">
            <strong>自定义主题色</strong>
            <span>选择一个颜色以覆盖当前主题的主色调。</span>
          </div>
          <div class="control" style="display: flex; gap: 10px; align-items: center;">
            <input type="color" .value=${this.settings.customPrimaryColor||"#2563EB"} @input=${e=>this._updateSetting("customPrimaryColor",e.target.value)}>
            <button class="btn" style="padding: 4px 12px; min-height: 32px; font-size: 0.85rem;" @click=${()=>this._updateSetting("customPrimaryColor",null)}>重置</button>
          </div>
        </div>

        <div class="row" ?disabled=${t} style="${t?"opacity: 0.6; pointer-events: none;":""}">
          <div class="label">
            <strong>主题操作</strong>
            <span>导入或导出当前主题配置。</span>
          </div>
          <div class="btn-group" style="margin: 0;">
            <button class="btn" @click=${this._handleExportTheme}>导出配置</button>
            <button class="btn" @click=${this._triggerThemeImport}>导入配置</button>
            <input type="file" id="theme-import-file" accept=".json" style="display: none" @change=${this._handleImportTheme}>
          </div>
        </div>

        <div class="row" ?disabled=${t} style="${t?"opacity: 0.6; pointer-events: none;":""}">
          <div class="label">
            <strong>界面元素颜色自定义</strong>
            <span>精细调整界面各部分的颜色。</span>
          </div>
          <div class="control" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px;">
            ${this._renderColorPicker("primary","主色调")}
            ${this._renderColorPicker("secondary","次色调")}
            ${this._renderColorPicker("accent","强调色")}
            ${this._renderColorPicker("bgMain","主背景")}
            ${this._renderColorPicker("bgSurface","表面背景")}
            ${this._renderColorPicker("textMain","主要文字")}
          </div>
        </div>

        <div class="theme-grid" style="${t?"opacity: 0.6; pointer-events: none;":""}">
          ${this.themes.map(e=>n`
            <div
              class="theme-card ${this.settings.themeId===e.id?"active":""}"
              @click=${()=>this._selectTheme(e.id)}
              @mouseenter=${()=>this._handleThemeHover(e)}
              @mouseleave=${this._handleThemeLeave}
            >
              <div class="theme-preview" style="background: ${e.colors.bgMain}">
                <div style="
                  width: 120px;
                  height: 120px;
                  border-radius: 24px;
                  background: linear-gradient(135deg, ${e.colors.primary}, ${e.colors.secondary});
                  box-shadow: 2px 10px 24px rgba(0,0,0,0.18);
                  border: 1px solid ${e.colors.glassBorder};
                "></div>
              </div>
              <div class="theme-info">${e.name}</div>
            </div>
          `)}
        </div>
      </div>

      <div class="section">
        <h3>字体与语言</h3>
        <p class="desc">调整字体大小与语言偏好。语言偏好会保存并用于后续多语言扩展。</p>

        <div class="row">
          <div class="label">
            <strong>字体大小</strong>
            <span>建议范围 12–24，当前：${this.settings.fontSize}px</span>
          </div>
          <div class="control">
            <input type="range" min="12" max="24" step="1" .value=${String(this.settings.fontSize)} @input=${e=>this._updateSetting("fontSize",Number(e.target.value))}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>行间距</strong>
            <span>调整文本行之间的垂直距离。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.lineHeight} @change=${e=>this._updateSetting("lineHeight",e.target.value)}>
              <option value="compact">紧凑</option>
              <option value="standard">标准</option>
              <option value="loose">宽松</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>语言偏好</strong>
            <span>更改后立即生效（当前页面文案逐步覆盖）。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.language} @change=${e=>this._updateSetting("language",e.target.value)}>
              ${this.languages.map(e=>n`<option value="${e.code}">${e.name}</option>`)}
            </select>
          </div>
        </div>
      </div>
    `}_renderSystem(){var t,e,s;return n`
      <div class="section">
        <h3>功能设置</h3>
        <p class="desc">自定义快捷键与自动化行为。</p>

        <div class="row">
          <div class="label">
            <strong>自动保存间隔</strong>
            <span>设置自动保存的频率（1-30分钟）。当前：${((t=this.settings.functionality)==null?void 0:t.autoSaveIntervalMin)||5}分钟</span>
          </div>
          <div class="control">
            <input type="range" min="1" max="30" step="1" .value=${String(((e=this.settings.functionality)==null?void 0:e.autoSaveIntervalMin)||5)} @input=${i=>this._updateSetting("functionality.autoSaveIntervalMin",Number(i.target.value))}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>默认文件位置</strong>
            <span>新建文件时的默认保存路径。</span>
          </div>
          <div class="control">
             <input type="text" placeholder="例如: /MyProject/Docs" .value=${((s=this.settings.functionality)==null?void 0:s.defaultFileLocation)||""} @change=${i=>this._updateSetting("functionality.defaultFileLocation",i.target.value)}>
          </div>
        </div>

        <div class="row">
           <div class="label">
            <strong>快捷键配置</strong>
            <span>自定义常用操作的快捷键。</span>
           </div>
           <div class="control">
             <button class="btn" @click=${()=>alert("快捷键配置功能开发中...")}>配置快捷键</button>
           </div>
        </div>
      </div>

      <div class="section">
        <h3>动画与可访问性</h3>
        <p class="desc">关闭动画可减少眩晕与电量消耗；高对比度可提升文字与控件辨识度。</p>

        <div class="row">
          <div class="label">
            <strong>启用全局动画</strong>
            <span>关闭后，界面切换将变为无动画。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.animationsEnabled} @change=${i=>this._updateSetting("animationsEnabled",i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>动画速度</strong>
            <span>建议保持“正常”，以获得更稳定的视觉节奏。</span>
          </div>
          <div class="control">
            <select .value=${this.settings.animationSpeed} @change=${i=>this._updateSetting("animationSpeed",i.target.value)}>
              <option value="slow">慢</option>
              <option value="normal">正常</option>
              <option value="fast">快</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>高对比度模式</strong>
            <span>增强分隔线与阴影，提升层次和可读性。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.highContrast} @change=${i=>this._updateSetting("highContrast",i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="section">
        <h3>通知与隐私</h3>
        <p class="desc">通知开关会影响未来通知功能；隐私选项用于控制数据使用范围。</p>

        <div class="row">
          <div class="label">
            <strong>启用通知</strong>
            <span>开启后，未来的提醒与系统消息将可推送。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.notifications.enabled} @change=${i=>this._updateSetting("notifications.enabled",i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>通知音效</strong>
            <span>需要先开启“启用通知”。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!this.settings.notifications.enabled} .checked=${this.settings.notifications.sound} @change=${i=>this._updateSetting("notifications.sound",i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>桌面通知</strong>
            <span>开启后将尝试请求浏览器权限。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!this.settings.notifications.enabled} .checked=${this.settings.notifications.desktop} @change=${i=>this._handleDesktopNotificationToggle(i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>允许匿名使用统计</strong>
            <span>用于改进体验，不包含密码等敏感信息。</span>
          </div>
          <label class="switch">
            <input type="checkbox" .checked=${this.settings.privacy.analyticsEnabled} @change=${i=>this._updateSetting("privacy.analyticsEnabled",i.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `}async _handleDesktopNotificationToggle(t){if(t){if(!("Notification"in window)){this._setCloudState("error","当前浏览器不支持桌面通知");return}if(Notification.permission==="granted"){this._updateSetting("notifications.desktop",!0);return}const e=await Notification.requestPermission();this._updateSetting("notifications.desktop",e==="granted"),e!=="granted"&&this._setCloudState("error","未授予通知权限")}else this._updateSetting("notifications.desktop",!1)}_renderStorage(){const t=this.settings.storage.cloudSyncEnabled;return n`
      <div class="section">
        <h3>数据存储</h3>
        <p class="desc">所有设置默认保存在本地。启用云端同步需要登录，并会把设置保存到服务器。</p>

        <div class="row">
          <div class="label">
            <strong>云端同步</strong>
            <span>重要设置变更：开启/关闭会触发二次确认。</span>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              .checked=${t}
              @change=${e=>e.target.checked?this._enableCloudSync():this._disableCloudSync()}
            >
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>自动同步</strong>
            <span>开启后，将按间隔自动推送到云端。</span>
          </div>
          <label class="switch">
            <input type="checkbox" ?disabled=${!t} .checked=${this.settings.storage.autoSyncEnabled} @change=${e=>this._updateSetting("storage.autoSyncEnabled",e.target.checked)}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="row">
          <div class="label">
            <strong>自动同步间隔（秒）</strong>
            <span>范围 5–300，建议 30。间隔过短会增加网络请求。</span>
          </div>
          <div class="control">
            <input type="number" min="5" max="300" step="1" ?disabled=${!t||!this.settings.storage.autoSyncEnabled} .value=${String(this.settings.storage.autoSyncIntervalSec)} @change=${e=>this._updateSetting("storage.autoSyncIntervalSec",Number(e.target.value))}>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn" ?disabled=${!t} @click=${this._pullFromCloud}>从云端拉取</button>
          <button class="btn primary" ?disabled=${!t} @click=${this._pushToCloud}>立即同步</button>
        </div>
        <div class="hint">提示：云端拉取会以云端为准覆盖本地（主题等立即变化）。</div>
      </div>
    `}_renderSecurity(){const t=!!this._getToken();return n`
      <div class="section">
        <h3>密码修改</h3>
        <p class="desc">请先输入旧密码，再设置新密码。新密码需满足：至少8位，包含大写、小写与数字。</p>

        <div class="row">
          <div class="label">
            <strong>旧密码</strong>
            <span>用于确认你是账户所有者。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!t} .value=${this.passwordForm.oldPassword} @input=${e=>this._updatePasswordField("oldPassword",e.target.value)}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>新密码</strong>
            <span>建议使用不易猜测的组合，并避免与旧密码相同。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!t} .value=${this.passwordForm.newPassword} @input=${e=>this._updatePasswordField("newPassword",e.target.value)}>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <strong>确认新密码</strong>
            <span>用于减少输入错误。</span>
          </div>
          <div class="control" style="width: 240px">
            <input type="password" ?disabled=${!t} .value=${this.passwordForm.confirmPassword} @input=${e=>this._updatePasswordField("confirmPassword",e.target.value)}>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn primary" ?disabled=${!t} @click=${this._submitChangePassword}>提交修改</button>
        </div>

        ${this.passwordForm.error?n`<div class="msg error">${this.passwordForm.error}</div>`:""}
        ${this.passwordForm.ok?n`<div class="msg ok">${this.passwordForm.ok}</div>`:""}
        ${t?"":n`<div class="hint">未登录时无法修改密码，请先登录。</div>`}
      </div>
    `}_renderBackup(){const t=this.settings.storage.cloudSyncEnabled;return n`
      <div class="section">
        <h3>本地备份</h3>
        <p class="desc">建议在更换设备或清理浏览器数据前，先导出备份文件。恢复需要二次确认。</p>
        <div class="btn-group">
          <button class="btn" @click=${this._downloadLocalBackup}>导出本地备份</button>
          <button class="btn" @click=${this._triggerRestoreInput}>从文件恢复</button>
          <button class="btn danger" @click=${this._resetSettings}>重置为默认设置</button>
        </div>
        <input id="restore-file" type="file" accept="application/json" style="display:none" @change=${this._restoreFromFile}>
      </div>

      <div class="section">
        <h3>云端备份</h3>
        <p class="desc">云端备份会保存一份设置快照，可用于误操作后的快速恢复。最多保留20份。</p>
        <div class="btn-group">
          <button class="btn primary" ?disabled=${!t} @click=${this._createCloudBackup}>创建云端备份</button>
          <button class="btn" ?disabled=${!t} @click=${this._loadCloudBackups}>刷新列表</button>
        </div>
        ${t?"":n`<div class="hint">启用“云端同步”后才能使用云端备份。</div>`}
        ${t?n`
          <div class="hint">点击某条备份即可恢复（会触发二次确认）。</div>
          <div style="margin-top: 12px; display: grid; gap: 8px;">
            ${(this.backups||[]).length===0?n`<div class="hint">暂无备份</div>`:this.backups.map(e=>n`
              <button class="btn" style="justify-content: space-between; width: 100%; display: flex;" @click=${()=>this._restoreCloudBackup(e.id)}>
                <span>备份时间：${new Date(e.createdAt).toLocaleString()}</span>
                <span>恢复</span>
              </button>
            `)}
          </div>
        `:""}
      </div>
    `}}h(ot,"properties",{settings:{type:Object},isVisible:{type:Boolean,reflect:!0},section:{type:String},confirmState:{type:Object},cloudState:{type:Object},backups:{type:Array},passwordForm:{type:Object}}),h(ot,"styles",f`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      pointer-events: none;
      font-size: var(--base-font-size);
    }

    :host([isVisible]) {
      pointer-events: auto;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.18);
      opacity: 0;
      transition: opacity var(--transition-speed);
    }

    :host([isVisible]) .overlay {
      opacity: 1;
    }

    .panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 420px;
      height: 100%;
      background: var(--color-bg-main);
      box-shadow: -8px 0 40px rgba(0, 0, 0, 0.12);
      transform: translateX(100%);
      transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      color: var(--color-text-main);
      border-left: 1px solid var(--glass-border);
    }

    :host([isVisible]) .panel {
      transform: translateX(0);
    }

    .header {
      padding: 18px 18px 14px;
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-bg-surface);
      gap: 12px;
    }

    .title {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .title h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text-main);
      line-height: 1.25;
    }

    .subtitle {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-btn {
      background: transparent;
      border: 1px solid var(--glass-border);
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 10px;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      min-width: 44px;
      min-height: 44px;
    }

    .close-btn:hover {
      background: var(--color-bg-card);
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    .body {
      display: grid;
      grid-template-columns: 140px 1fr;
      flex: 1;
      min-height: 0;
    }

    .nav {
      border-right: 1px solid var(--glass-border);
      padding: 12px;
      background: var(--color-bg-surface);
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
    }

    .nav-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: 1px solid transparent;
      padding: 10px 12px;
      border-radius: 12px;
      cursor: pointer;
      color: var(--color-text-main);
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      min-height: 44px;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-btn:hover {
      background: var(--color-bg-card);
      border-color: var(--glass-border);
      color: var(--color-primary);
    }

    .nav-btn.active {
      background: var(--color-bg-card);
      border-color: rgba(0, 0, 0, 0.08);
      color: var(--color-primary);
      box-shadow: var(--shadow-card);
    }

    .content {
      overflow-y: auto;
      padding: 18px;
      min-width: 0;
    }

    .section {
      margin-bottom: 22px;
      padding: 14px;
      border-radius: 14px;
      background: var(--color-bg-card);
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-card);
    }

    .section h3 {
      margin: 0 0 6px;
      font-size: 1rem;
    }

    .desc {
      margin: 0 0 14px;
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 12px 0;
      border-top: 1px solid var(--glass-border);
    }

    .row:first-of-type {
      border-top: none;
      padding-top: 0;
    }

    .row:last-of-type {
      padding-bottom: 0;
    }

    .label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .label strong {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      line-height: 1.25;
    }

    .label span {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      line-height: 1.35;
    }

    .control select,
    .control input[type="number"],
    .control input[type="password"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      background: var(--color-bg-main);
      color: var(--color-text-main);
      outline: none;
      min-height: 44px;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .control input[type="range"] {
      width: 180px;
    }

    .control select:focus,
    .control input[type="number"]:focus,
    .control input[type="password"]:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      flex: 0 0 auto;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      transition: 0.2s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--color-primary);
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 12px;
    }

    .theme-card {
      border: 2px solid transparent;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
      background: var(--color-bg-surface);
      min-height: 200px;
    }

    .theme-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }

    .theme-card.active {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
    }

    .theme-preview {
      width: 200px;
      height: 200px;
      max-width: 100%;
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .theme-info {
      padding: 12px;
      text-align: center;
      font-size: 0.95rem;
      font-weight: 700;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 0.85rem;
      border: 1px solid var(--glass-border);
      background: var(--color-bg-card);
      color: var(--color-text-secondary);
      max-width: 220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pill.ok {
      color: #047857;
      border-color: rgba(16, 185, 129, 0.35);
    }

    .pill.error {
      color: var(--color-state-error);
      border-color: rgba(239, 68, 68, 0.35);
    }

    .pill.loading {
      color: var(--color-text-secondary);
    }

    .btn {
      border: 1px solid var(--glass-border);
      background: var(--color-bg-main);
      color: var(--color-text-main);
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      min-height: 44px;
      min-width: 120px;
      font-weight: 700;
    }

    .btn:hover {
      border-color: rgba(0, 0, 0, 0.12);
      background: var(--color-bg-surface);
      color: var(--color-primary);
    }

    .btn.primary {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    .btn.primary:hover {
      background: var(--color-secondary);
      border-color: var(--color-secondary);
      color: white;
    }

    .btn.danger {
      border-color: rgba(239, 68, 68, 0.35);
      color: var(--color-state-error);
    }

    .btn.danger:hover {
      background: rgba(239, 68, 68, 0.08);
      color: var(--color-state-error);
    }

    .btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .confirm {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(0, 0, 0, 0.25);
      z-index: 2000;
      padding: 16px;
    }

    .confirm-card {
      width: min(520px, 100%);
      background: var(--color-bg-main);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
      padding: 16px;
    }

    .confirm-title {
      font-size: 1.05rem;
      font-weight: 800;
      margin: 0 0 8px;
      color: var(--color-text-main);
    }

    .confirm-msg {
      margin: 0 0 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .confirm-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .hint {
      margin-top: 8px;
      color: var(--color-text-secondary);
      font-size: 0.85rem;
      line-height: 1.35;
    }

    .msg {
      margin-top: 8px;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.35;
    }

    .msg.error {
      color: var(--color-state-error);
    }

    .msg.ok {
      color: #047857;
    }

    @media (max-width: 680px) {
      .panel {
        width: 100%;
      }

      .body {
        grid-template-columns: 1fr;
      }

      .nav {
        flex-direction: row;
        gap: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        border-right: none;
        border-bottom: 1px solid var(--glass-border);
      }

      .nav-btn {
        white-space: nowrap;
        width: auto;
      }

      .control input[type="range"] {
        width: 160px;
      }
    }
  `);function ue(o,t,e){const s=String(t).split(".");let i=o;for(let r=0;r<s.length-1;r++){const a=s[r],c=i[a];(!c||typeof c!="object")&&(i[a]={}),i=i[a]}i[s[s.length-1]]=e}customElements.define("settings-panel",ot);class rt extends b{constructor(){super(),this.isVisible=!1,this.currentView="updates",this.showAllVersions=!1,this.versionHistory=this._getVersionHistory()}_getVersionHistory(){return[{version:"V2.07.20250709.3",date:"2025-07-09",fixes:["修复了登录状态保持问题","优化了计时器功能的音频提醒","解决了部署后资源路径错误","修复了移动端样式错乱问题"],features:["新增了退出登录确认功能","添加了账号切换功能","完善了计时器双模式切换","优化了响应式设计","添加了浏览器通知功能"]},{version:"V2.07.20250709.2",date:"2025-07-09",fixes:["修复了音频重复播放问题","解决了设置面板保存失败问题"],features:["添加了多语言支持","优化了主题切换动画"]},{version:"V2.07.20250708.1",date:"2025-07-08",fixes:["修复了计算器计算错误问题","解决了侧边栏导航闪烁问题"],features:["新增了单位转换器工具","添加了数据导入/导出功能"]},{version:"V2.06.20250701.1",date:"2025-07-01",fixes:[],features:["实现了基础计算器功能","添加了计时器工具","设计了现代化UI界面"]}]}render(){const t=this.showAllVersions?this.versionHistory:[this.versionHistory[0]],e=s=>s;return n`
      <div class="overlay" @click=${this.close}></div>
      <div class="modal">
        <button class="close-btn" @click=${this.close}>&times;</button>
        <h2>抬头望星</h2>
        <p class="desc">
          一个现代化、模块化的网页工具箱应用。<br>
          旨在提供优雅、高效的用户体验。
        </p>

        <div class="creator">创作者：دوكنكد。</div>

        <div class="tech-stack">
          <span class="tech-badge">Lit</span>
          <span class="tech-badge">Vite</span>
          <span class="tech-badge">HTML5</span>
          <span class="tech-badge">CSS3</span>
          <span class="tech-badge">ES6</span>
        </div>

        <div class="version-updates">
          <h3 style="text-align: center; margin-bottom: 20px;">版本更新公告</h3>
          ${t.map(s=>n`
            <div class="update-item">
              <div class="update-header">
                <span class="update-version">${s.version}</span>
                <span class="update-date">${e(s.date)}</span>
              </div>
              ${s.fixes.length>0?n`
                <div class="update-section">
                  <h4>修复内容</h4>
                  <ul class="update-list">
                    ${s.fixes.map(i=>n`<li>${i}</li>`)}
                  </ul>
                </div>
              `:""}
              ${s.features.length>0?n`
                <div class="update-section">
                  <h4>更新内容</h4>
                  <ul class="update-list">
                    ${s.features.map(i=>n`<li>${i}</li>`)}
                  </ul>
                </div>
              `:""}
            </div>
          `)}
        </div>

        ${this.versionHistory.length>1?n`
          <button 
            class="show-more-btn" 
            @click=${()=>this.showAllVersions=!this.showAllVersions}
          >
            ${this.showAllVersions?"收起历史版本":"显示更多版本"}
          </button>
        `:""}

        <div class="footer">
          &copy; 2026 最后的希望 Project. All rights reserved.
        </div>
      </div>
    `}open(){this.isVisible=!0,this.setAttribute("isVisible","")}close(){this.isVisible=!1,this.removeAttribute("isVisible"),this.showAllVersions=!1}}h(rt,"properties",{isVisible:{type:Boolean},currentView:{type:String},showAllVersions:{type:Boolean},versionHistory:{type:Array}}),h(rt,"styles",f`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      justify-content: center;
      align-items: center;
    }

    :host([isVisible]) {
      display: flex;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
    }

    .modal {
      position: relative;
      width: 500px;
      background: rgba(20, 20, 30, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      color: white;
      text-align: left;
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      max-height: 80vh;
      overflow-y: auto;
    }

    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    h2 {
      margin-top: 0;
      font-size: 2rem;
      background: linear-gradient(45deg, #fff, #a0a0ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }

    .version {
      font-family: monospace;
      background: rgba(255,255,255,0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #a0a0ff;
      margin-bottom: 15px;
    }

    .desc {
      margin: 20px 0;
      line-height: 1.6;
      color: rgba(255,255,255,0.8);
      text-align: center;
    }

    .footer {
      margin-top: 30px;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      text-align: center;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .tech-stack {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .tech-badge {
      font-size: 0.8rem;
      padding: 5px 10px;
      border-radius: 15px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Version updates styles */
    .version-updates {
      margin: 20px 0;
      text-align: left;
    }

    .update-item {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      transition: all 0.2s;
    }

    .update-item:hover {
      background: rgba(255,255,255,0.08);
      transform: translateY(-2px);
    }

    .update-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .update-version {
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: bold;
      color: #a0a0ff;
    }

    .update-date {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.6);
    }

    .update-section {
      margin-bottom: 12px;
    }

    .update-section h4 {
      margin: 0 0 8px 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .update-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .update-list li {
      padding: 4px 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.7);
      position: relative;
      padding-left: 16px;
    }

    .update-list li:before {
      content: '•';
      position: absolute;
      left: 4px;
      color: #a0a0ff;
    }

    .show-more-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      margin: 10px 0;
      width: 100%;
    }

    .show-more-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .creator {
      text-align: center;
      margin: 20px 0;
      font-size: 1rem;
      color: rgba(255,255,255,0.8);
    }
  `);customElements.define("about-modal",rt);class at extends b{constructor(){super(),this.isSidebarOpen=!0,this.isAuthenticated=!1,this.user=null,this.darkMode=!1,this.hasUnreadMessages=!1}connectedCallback(){super.connectedCallback();const t=zt();t&&(this.isAuthenticated=!0,this.user=t),this._initSettings()}_initSettings(){const t=localStorage.getItem("app-settings"),e=y(t?JSON.parse(t):null);this.darkMode=e.darkMode}render(){var t;return n`
      <div class="layout">
        <div class="stars"></div>
        ${this.isAuthenticated?n`
          <app-header 
            .username=${((t=this.user)==null?void 0:t.username)||"User"}
            .darkMode=${this.darkMode}
            .hasUnreadMessages=${this.hasUnreadMessages}
            @toggle-settings=${this._toggleSettings}
            @toggle-dark-mode=${this._toggleDarkMode}
            @logout-success=${this._onLogout}
          ></app-header>
          <div class="content-wrapper">
            <app-sidebar @navigate=${this._onNavigate}></app-sidebar>
            <app-main 
              id="main" 
              @toggle-settings=${this._toggleSettings}
              @unread-status-changed=${this._handleUnreadStatusChanged}
            ></app-main>
          </div>
          <settings-panel id="settings" @settings-changed=${this._onSettingsChanged}></settings-panel>
          <about-modal id="about"></about-modal>
        `:n`
          <auth-modal @login-success=${this._onLogin}></auth-modal>
        `}
      </div>
    `}_onLogin(t){const{token:e,user:s}=t.detail;localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(s)),this.isAuthenticated=!0,this.user=s}_onLogout(){this.isAuthenticated=!1,this.user=null,this.hasUnreadMessages=!1,this.darkMode=!1,localStorage.removeItem("token"),localStorage.removeItem("user")}_onNavigate(t){const e=this.shadowRoot.getElementById("main");e&&(t.detail.id==="settings"?this._toggleSettings():t.detail.id==="about"?this._toggleAbout():e._navigate(t.detail.id))}_toggleSettings(){const t=this.shadowRoot.getElementById("settings");t&&t.open()}_toggleAbout(){const t=this.shadowRoot.getElementById("about");t&&t.open()}_toggleDarkMode(){const t=this.shadowRoot.getElementById("settings");t&&t.toggleDarkMode()}_onSettingsChanged(t){this.darkMode=t.detail.darkMode}_handleUnreadStatusChanged(t){this.hasUnreadMessages=t.detail.hasUnread}}h(at,"properties",{isSidebarOpen:{type:Boolean},isAuthenticated:{type:Boolean},user:{type:Object},darkMode:{type:Boolean},hasUnreadMessages:{type:Boolean}}),h(at,"styles",f`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background: var(--color-bg-main);
      color: var(--color-text-main);
      overflow: hidden;
    }

    .layout {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    app-sidebar {
      width: var(--sidebar-width);
      transition: transform var(--transition-speed) ease;
      z-index: 10;
    }

    app-main {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      position: relative;
    }

    .stars {
      display: none;
    }
  `);customElements.define("app-root",at);
